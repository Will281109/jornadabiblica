// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // ========================================================================== //
    // 1. SINTETIZADOR DE ÁUDIO NATIVO
    // ========================================================================== //
    const SoundFX = {
        playCorrect() {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        },
        playWrong() {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(220.00, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(130.81, ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        }
    };

    // ========================================================================== //
    // UTILS - CONTROLE DE ROLAGEM MOBILE (ANTI-RUBBERBANDING)
    // ========================================================================== //
    function lockBodyScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100dvh";
    }

    function unlockBodyScroll() {
        document.body.style.overflow = "";
        document.body.style.height = "";
    }

    // ========================================================================== //
    // 2. CORE DO APP & SISTEMA DE VIDAS PASSIVAS
    // ========================================================================== //
    const navButtons = document.querySelectorAll(".nav-button");
    const screens = document.querySelectorAll(".app-screen");
    const ONE_HOUR_MS = 60 * 60 * 1000;

    let gameState = JSON.parse(localStorage.getItem('biblical_quest_state')) || {
        streak: 0,
        maxStreak: 0,
        lastActiveDate: "",
        streakHistory: [],
        coins: 150,
        lives: 5,
        currentWorld: 1,
        unlockedWorldMax: 1,
        unlockedPhases: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
        livesCheckTimestamp: Date.now(),
        claimedMissions: [],
        completedStudies: []
    };

    gameState.completedStudies = gameState.completedStudies || [];
    gameState.streakHistory = gameState.streakHistory || [];
    gameState.maxStreak = gameState.maxStreak || 0;
    gameState.streak = gameState.streak || 0;
    gameState.currentWorld = gameState.currentWorld || 1;
    gameState.unlockedWorldMax = gameState.unlockedWorldMax || 1;

    if (!gameState.unlockedPhases || typeof gameState.unlockedPhases !== 'object') {
        gameState.unlockedPhases = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    }

    for (let m = 1; m <= 5; m++) {
        if (m < gameState.unlockedWorldMax) {
            gameState.unlockedPhases[m] = 16;
        } else if (m === gameState.unlockedWorldMax) {
            if (gameState.unlockedPhases[m] === 16 && m < 5) {
                gameState.unlockedPhases[m] = 1;
            }
        } else {
            gameState.unlockedPhases[m] = 1;
        }
    }

    localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));

    let currentStudyTab = "available";
    let currentMissionTab = "active";
    let calendarCurrentDate = new Date();

    window.gameState = gameState;
    window.currentStudyTab = currentStudyTab;

    validateStreakRetention();

    function validateStreakRetention() {
        if (!gameState.lastActiveDate) return;
        const todayStr = new Date().toISOString().split('T')[0];
        const lastDate = new Date(gameState.lastActiveDate + "T00:00:00");
        const todayDate = new Date(todayStr + "T00:00:00");
        const diffTime = Math.abs(todayDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
            gameState.streak = 0;
            localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));
        }
    }

    function markDayAsActive() {
        const todayStr = new Date().toISOString().split('T')[0];
        if (!gameState.streakHistory.includes(todayStr)) {
            gameState.streakHistory.push(todayStr);
        }
        if (gameState.lastActiveDate !== todayStr) {
            if (gameState.lastActiveDate) {
                const lastDate = new Date(gameState.lastActiveDate + "T00:00:00");
                const todayDate = new Date(todayStr + "T00:00:00");
                const diffDays = Math.ceil(Math.abs(todayDate - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    gameState.streak++;
                } else if (diffDays > 1) {
                    gameState.streak = 1;
                }
            } else {
                gameState.streak = 1;
            }
            gameState.lastActiveDate = todayStr;
            if (gameState.streak > gameState.maxStreak) {
                gameState.maxStreak = gameState.streak;
            }
            updateHeaderStats();
        }
    }

    function checkPassiveLivesRecovery() {
        const MAX_LIVES = 10;
        if (gameState.lives >= MAX_LIVES) {
            gameState.livesCheckTimestamp = Date.now();
            updateLiveShopUI();
            return;
        }
        const now = Date.now();
        const diffMs = now - gameState.livesCheckTimestamp;
        if (diffMs >= ONE_HOUR_MS) {
            const hoursPassed = Math.floor(diffMs / ONE_HOUR_MS);
            if (hoursPassed > 0) {
                gameState.lives += hoursPassed;
                if (gameState.lives > MAX_LIVES) gameState.lives = MAX_LIVES;
                gameState.livesCheckTimestamp = gameState.livesCheckTimestamp + (hoursPassed * ONE_HOUR_MS);
                updateHeaderStats();
            }
        }
        updateLiveShopUI();
    }

    function updateLiveShopUI() {
        const countEl = document.getElementById("shop-lives-count");
        const timerEl = document.getElementById("shop-lives-timer");
        if (countEl) countEl.textContent = `${gameState.lives} / 10`;
        if (timerEl) {
            if (gameState.lives >= 10) {
                timerEl.textContent = "Sua energia está no máximo!";
            } else {
                const nextRecovery = gameState.livesCheckTimestamp + ONE_HOUR_MS;
                const remainingMs = nextRecovery - Date.now();
                if (remainingMs <= 0) {
                    timerEl.textContent = "Recarregando...";
                } else {
                    const mins = Math.floor(remainingMs / 60000);
                    const secs = Math.floor((remainingMs % 60000) / 1000);
                    timerEl.textContent = `Próxima vida em ${mins}:${secs < 10 ? '0' : ''}${secs}`;
                }
            }
        }
    }

    setInterval(() => {
        checkPassiveLivesRecovery();
    }, 1000);

    function updateHeaderStats() {
        const streakEl = document.getElementById("user-streak");
        const coinsEl = document.getElementById("user-coins");
        const livesEl = document.getElementById("user-lives");
        if (streakEl) streakEl.textContent = gameState.streak;
        if (coinsEl) coinsEl.textContent = gameState.coins;
        if (livesEl) livesEl.textContent = gameState.lives;
        localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));
    }

    // ========================================================================== //
    // 3. SISTEMA DE NAVEGAÇÃO ENTRE TELAS (SPA DINÂMICO)
    // ========================================================================== //
    function navigateToScreen(screenId) {
        screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add("active");
                loadScreenContent(screen);
            } else {
                screen.classList.remove("active");
            }
        });
        navButtons.forEach(btn => {
            if (btn.id === `nav-${screenId.replace("screen-", "")}`) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = `screen-${button.id.replace("nav-", "")}`;
            navigateToScreen(targetId);
        });
    });

    const triggerStreak = document.getElementById("streak-trigger");
    if (triggerStreak) {
        triggerStreak.addEventListener("click", () => {
            openStreakModal();
        });
    }

    const pillarCoin = document.querySelector(".highlight-coin");
    if (pillarCoin) {
        pillarCoin.addEventListener("click", () => {
            navigateToScreen("screen-shop");
        });
    }

    const pillarHeart = document.querySelector(".highlight-heart");
    if (pillarHeart) {
        pillarHeart.addEventListener("click", () => {
            navigateToScreen("screen-lives");
        });
    }

    async function loadScreenContent(screenElement) {
        const src = screenElement.getAttribute("data-src");
        if (!src) return;
        if (screenElement.innerHTML.trim() !== "") {
            rebindScreenEvents(screenElement.id);
            return;
        }
        try {
            screenElement.innerHTML = `<div class="loading-spinner-box"><div class="spinner-core"></div><p>Carregando conteúdo divino...</p></div>`;
            const response = await fetch(src);
            if (!response.ok) throw new Error("Erro de rede");
            const html = await response.text();
            screenElement.innerHTML = html;
            rebindScreenEvents(screenElement.id);
        } catch (err) {
            screenElement.innerHTML = `<div class="error-state-box"><i class="fa-solid fa-triangle-exclamation"></i><h3>Erro ao carregar conteúdo</h3><p>Verifique sua conexão. Se o erro persistir nos avise.</p><button class="retry-btn-action" id="retry-${screenElement.id}">Tentar Novamente</button></div>`;
            document.getElementById(`retry-${screenElement.id}`)?.addEventListener("click", () => loadScreenContent(screenElement));
        }
    }

    function rebindScreenEvents(screenId) {
        if (screenId === "screen-journey") setupJourneyScreen();
        if (screenId === "screen-shop") setupShopScreen();
        if (screenId === "screen-lives") setupLivesScreen();
        if (screenId === "screen-missions") setupMissionsScreen();
        if (screenId === "screen-studies") setupStudiesScreen();
        if (screenId === "screen-flashcards") setupFlashcardsScreen();
    }

    // ========================================================================== //
    // 4. LÓGICA DA TELA DA JORNADA (MAPA DE TRILHAS)
    // ========================================================================== //
    const WORLDS_DATA = {
        1: { title: "Jornada Inicial", total: 16, tag: "Mundo 1" },
        2: { title: "Caminho da Fé", total: 16, tag: "Mundo 2" },
        3: { title: "Reino e Justiça", total: 16, tag: "Mundo 3" },
        4: { title: "Sabedoria Antiga", total: 16, tag: "Mundo 4" },
        5: { title: "Profetas e Reis", total: 16, tag: "Mundo 5" }
    };

    function setupJourneyScreen() {
        const world = gameState.currentWorld;
        const currentData = WORLDS_DATA[world];
        const currentPhase = gameState.unlockedPhases[world] || 1;

        const tagEl = document.getElementById("current-world-tag");
        const titleEl = document.getElementById("current-world-title");
        const progEl = document.getElementById("current-world-progress");

        if (tagEl) tagEl.textContent = currentData.tag;
        if (titleEl) titleEl.textContent = currentData.title;
        if (progEl) progEl.textContent = `Fase ${currentPhase > 16 ? 16 : currentPhase} de 16`;

        renderMapTrail(world, currentPhase);

        document.getElementById("btn-change-map")?.addEventListener("click", openWorldsPicker);
        document.getElementById("btn-jornada-comunidade")?.addEventListener("click", () => {
            window.open("https://t.me/seu_grupo", "_blank");
        });
    }

    function renderMapTrail(world, currentPhase) {
        const container = document.getElementById("journey-container");
        if (!container) return;
        container.innerHTML = "";

        const positionsPattern = [0, 25, 45, 25, 0, -25, -45, -25];

        for (let i = 1; i <= 16; i++) {
            const isUnlocked = i <= currentPhase;
            const isCompleted = i < currentPhase;
            const isCurrent = i === currentPhase;

            const node = document.createElement("div");
            node.className = `trail-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current-active' : ''} ${isCompleted ? 'completed' : ''}`;
            
            const sideOffset = positionsPattern[(i - 1) % positionsPattern.length];
            node.style.transform = `translateX(${sideOffset}px)`;

            if (isCurrent) {
                node.innerHTML = `
                    <div class="current-avatar-glow"></div>
                    <div class="node-badge-index">${i}</div>
                    <div class="pulse-ring-effect"></div>
                `;
            } else if (isCompleted) {
                node.innerHTML = `<i class="fa-solid fa-check"></i>`;
            } else {
                node.innerHTML = `<i class="fa-solid fa-lock"></i>`;
            }

            if (isUnlocked) {
                node.style.cursor = "pointer";
                node.addEventListener("click", () => startQuizPhase(world, i));
            }

            container.appendChild(node);
        }
    }

    function openWorldsPicker() {
        const picker = document.getElementById("worlds-picker-overlay");
        const list = document.getElementById("worlds-list-container");
        if (!picker || !list) return;

        list.innerHTML = "";
        picker.style.display = "flex";

        document.getElementById("btn-close-worlds")?.onclick = () => picker.style.display = "none";

        for (let m = 1; m <= 5; m++) {
            const data = WORLDS_DATA[m];
            const isWorldUnlocked = m <= gameState.unlockedWorldMax;
            const card = document.createElement("div");
            card.style = `background: ${m === gameState.currentWorld ? '#EFECE3' : '#FFFFFF'}; border: 2px solid ${m === gameState.currentWorld ? '#D4A327' : '#E6E4DF'}; padding: 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; cursor: ${isWorldUnlocked ? 'pointer' : 'not-allowed'}; opacity: ${isWorldUnlocked ? 1 : 0.6}; transition: all 0.2s ease;`;

            card.innerHTML = `
                <div>
                    <span style="font-size: 0.75rem; font-weight: 800; color: #8A8378; text-transform: uppercase;">${data.tag}</span>
                    <h4 style="margin: 2px 0; font-size: 1rem; font-weight: 800; color: #2E2922;">${data.title}</h4>
                    <p style="margin: 0; font-size: 0.75rem; color: #6E685E;">${isWorldUnlocked ? `Fase ${gameState.unlockedPhases[m] || 1}/16` : 'Bloqueado'}</p>
                </div>
                <div>${isWorldUnlocked ? (m === gameState.currentWorld ? '<i class="fa-solid fa-circle-check" style="color: #D4A327; font-size: 1.3rem;"></i>' : '<i class="fa-solid fa-chevron-right" style="color: #8A8378;"></i>') : '<i class="fa-solid fa-lock" style="color: #BAAFA1;"></i>'}</div>
            `;

            if (isWorldUnlocked) {
                card.addEventListener("click", () => {
                    gameState.currentWorld = m;
                    picker.style.display = "none";
                    setupJourneyScreen();
                });
            }
            list.appendChild(card);
        }
    }

    // ========================================================================== //
    // 5. MOTOR DO QUIZ COMPLETO COM FEEDBACK ESTILIZADO E ANIMAÇÕES
    // ========================================================================== //
    let quizCurrentWorld = 1;
    let quizCurrentPhase = 1;
    let quizQuestionsList = [];
    let quizCurrentIndex = 0;

    function startQuizPhase(world, phase) {
        if (gameState.lives <= 0) {
            navigateToScreen("screen-lives");
            return;
        }

        const database = window.QUIZ_DATABASE;
        if (!database || !database[world] || !database[world][phase]) {
            alert("Conteúdo desta fase está em manutenção preventiva.");
            return;
        }

        // OCULTA A NAVBAR AO ENTRAR NO QUIZ
        document.body.classList.add("hide-navbar");

        quizCurrentWorld = world;
        quizCurrentPhase = phase;
        quizQuestionsList = [...database[world][phase]];
        quizCurrentIndex = 0;

        const quizOverlay = document.getElementById("active-quiz-overlay");
        if (!quizOverlay) return;

        quizOverlay.classList.remove("hidden");
        quizOverlay.style.setProperty("display", "flex", "important");
        lockBodyScroll();

        document.getElementById("btn-quit-quiz").onclick = () => {
            // MOSTRA A NAVBAR SE SAIR VOLUNTARIAMENTE
            document.body.classList.remove("hide-navbar");
            quizOverlay.classList.add("hidden");
            quizOverlay.style.display = "none";
            unlockBodyScroll();
        };

        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        if (quizCurrentIndex >= quizQuestionsList.length) {
            finishQuizSuccess();
            return;
        }

        const question = quizQuestionsList[quizCurrentIndex];
        const indicator = document.getElementById("quiz-title-indicator");
        const progressBar = document.getElementById("quiz-progress-bar");
        const qText = document.getElementById("quiz-question-text");
        const optionsBox = document.getElementById("quiz-options-container");

        if (indicator) indicator.textContent = `Fase ${quizCurrentPhase} - Pergunta ${quizCurrentIndex + 1}/${quizQuestionsList.length}`;
        if (progressBar) {
            const pct = (quizCurrentIndex / quizQuestionsList.length) * 100;
            progressBar.style.width = `${pct}%`;
        }
        if (qText) qText.textContent = question.question;

        if (optionsBox) {
            optionsBox.innerHTML = "";
            question.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.className = "quiz-option-item";
                btn.innerHTML = `
                    <div class="option-letter-prefix">${String.fromCharCode(65 + idx)}</div>
                    <div class="option-main-text">${opt}</div>
                `;
                btn.addEventListener("click", () => evaluateSelectedAnswer(idx, btn));
                optionsBox.appendChild(btn);
            });
        }
    }

    function evaluateSelectedAnswer(selectedIndex, selectedBtn) {
        const question = quizQuestionsList[quizCurrentIndex];
        const optionsBox = document.getElementById("quiz-options-container");
        const allButtons = optionsBox.querySelectorAll(".quiz-option-item");

        allButtons.forEach(b => b.disabled = true);

        const bottomFeedback = document.createElement("div");
        bottomFeedback.className = "bottom-feedback-panel animated-slide-up";

        if (selectedIndex === question.correct) {
            SoundFX.playCorrect();
            selectedBtn.classList.add("selected-correct");
            bottomFeedback.classList.add("feedback-success-theme");
            bottomFeedback.innerHTML = `
                <div class="feedback-layout-inner">
                    <div class="feedback-headline-row">
                        <div class="feedback-icon-wrapper"><i class="fa-solid fa-circle-check"></i></div>
                        <h3>Glória a Deus, você acertou!</h3>
                    </div>
                    <p class="feedback-verse-explanation">${question.explanation || 'Excelente resposta, continue assim!'}</p>
                    <button class="feedback-action-continue-btn" id="btn-next-step-quiz">Continuar</button>
                </div>
            `;
        } else {
            SoundFX.playWrong();
            selectedBtn.classList.add("selected-wrong");
            allButtons[question.correct].classList.add("selected-correct");
            
            gameState.lives--;
            updateHeaderStats();

            bottomFeedback.classList.add("feedback-error-theme");
            bottomFeedback.innerHTML = `
                <div class="feedback-layout-inner">
                    <div class="feedback-headline-row">
                        <div class="feedback-icon-wrapper"><i class="fa-solid fa-heart-crack"></i></div>
                        <h3>Resposta incorreta</h3>
                    </div>
                    <p class="feedback-verse-explanation">${question.explanation || 'Estude mais as escrituras sagradas.'}</p>
                    <button class="feedback-action-continue-btn" id="btn-next-step-quiz">Continuar</button>
                </div>
            `;
        }

        document.getElementById("active-quiz-overlay").appendChild(bottomFeedback);

        document.getElementById("btn-next-step-quiz").onclick = () => {
            bottomFeedback.remove();
            if (gameState.lives <= 0) {
                // MOSTRA A NAVBAR SE PERDER TODAS AS VIDAS
                document.body.classList.remove("hide-navbar");
                document.getElementById("active-quiz-overlay").classList.add("hidden");
                document.getElementById("active-quiz-overlay").style.display = "none";
                unlockBodyScroll();
                navigateToScreen("screen-lives");
                return;
            }
            quizCurrentIndex++;
            renderQuizQuestion();
        };
    }

    function finishQuizSuccess() {
        const progressBar = document.getElementById("quiz-progress-bar");
        if (progressBar) progressBar.style.width = "100%";

        markDayAsActive();

        const rewardCoins = 15;
        gameState.coins += rewardCoins;

        const currentUnlocked = gameState.unlockedPhases[quizCurrentWorld] || 1;
        if (quizCurrentPhase === currentUnlocked && currentUnlocked < 16) {
            gameState.unlockedPhases[quizCurrentWorld] = currentUnlocked + 1;
        } else if (quizCurrentPhase === 16 && quizCurrentWorld === gameState.unlockedWorldMax && quizCurrentWorld < 5) {
            gameState.unlockedWorldMax += 1;
            gameState.currentWorld = gameState.unlockedWorldMax;
            gameState.unlockedPhases[gameState.unlockedWorldMax] = 1;
        }

        updateHeaderStats();

        const successPanel = document.createElement("div");
        successPanel.className = "quiz-finished-victory-overlay animated-fade-in";
        successPanel.innerHTML = `
            <div class="victory-card-box animated-scale-up">
                <div class="victory-trophy-illustration">🏆</div>
                <h2>Fase Concluída!</h2>
                <p class="victory-sub-paragraph">Sua sabedoria e conhecimento bíblico aumentaram!</p>
                <div class="victory-rewards-display-row">
                    <div class="reward-pill-item"><i class="fa-solid fa-star" style="color: #D4A327;"></i> +${rewardCoins} Estrelas</div>
                </div>
                <button class="victory-completion-close-btn" id="btn-finish-quiz-clear">Voltar ao Mapa</button>
            </div>
        `;

        document.getElementById("active-quiz-overlay").appendChild(successPanel);

        document.getElementById("btn-finish-quiz-clear").onclick = () => {
            successPanel.remove();
            // MOSTRA A NAVBAR QUANDO DISMISS DO SUCESSO DO QUIZ
            document.body.classList.remove("hide-navbar");
            const quizOverlay = document.getElementById("active-quiz-overlay");
            quizOverlay.classList.add("hidden");
            quizOverlay.style.display = "none";
            unlockBodyScroll();
            setupJourneyScreen();
        };
    }

    // ========================================================================== //
    // 6. OUTRAS TELAS (LOJA, VIDAS, MISSÕES, ESTUDOS, FLASHCARDS)
    // ========================================================================== //
    function setupShopScreen() {
        const container = document.getElementById("shop-products-wrapper");
        if (!container) return;
        container.innerHTML = "";

        const PRODUCTS = [
            { id: "buy_life_1", title: "1 Vida Extra", desc: "Recupere um coração instantaneamente.", price: 30, icon: "fa-heart", color: "#E25C5C" },
            { id: "buy_life_5", title: "Combo 5 Vidas", desc: "Preencha sua energia divina para o jogo.", price: 120, icon: "fa-bolt", color: "#D4A327" }
        ];

        PRODUCTS.forEach(p => {
            const card = document.createElement("div");
            card.className = "store-item-card";
            card.innerHTML = `
                <div class="store-item-main-details">
                    <div class="store-item-icon-box" style="background: rgba(250,250,250,0.1); color: ${p.color};">
                        <i class="fa-solid ${p.icon}"></i>
                    </div>
                    <div class="store-item-textual">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                    </div>
                </div>
                <button class="store-purchase-action-btn ${gameState.coins >= p.price ? 'affordable' : 'locked'}" data-id="${p.id}">
                    <i class="fa-solid fa-star"></i> ${p.price}
                </button>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll(".store-purchase-action-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const prodId = btn.getAttribute("data-id");
                const item = PRODUCTS.find(p => p.id === prodId);
                if (gameState.coins >= item.price) {
                    gameState.coins -= item.price;
                    if (prodId === "buy_life_1") gameState.lives += 1;
                    if (prodId === "buy_life_5") gameState.lives = Math.max(gameState.lives + 5, 5);
                    updateHeaderStats();
                    setupShopScreen();
                } else {
                    alert("Você não tem estrelas suficientes!");
                }
            });
        });
    }

    function setupLivesScreen() {
        updateLiveShopUI();
        document.getElementById("btn-shop-refill-lives")?.addEventListener("click", () => {
            if (gameState.lives >= 10) {
                alert("Sua energia já está cheia!");
                return;
            }
            if (gameState.coins >= 150) {
                gameState.coins -= 150;
                gameState.lives = 10;
                updateHeaderStats();
                setupLivesScreen();
            } else {
                alert("Moedas insuficientes.");
            }
        });
    }

    function setupMissionsScreen() {
        const activeTabBtn = document.getElementById("tab-missions-active");
        const doneTabBtn = document.getElementById("tab-missions-done");
        if (activeTabBtn && doneTabBtn) {
            activeTabBtn.onclick = () => { currentMissionTab = "active"; updateMissionsUI(); };
            doneTabBtn.onclick = () => { currentMissionTab = "done"; updateMissionsUI(); };
        }
        updateMissionsUI();
    }

    function updateMissionsUI() {
        const activeTabBtn = document.getElementById("tab-missions-active");
        const doneTabBtn = document.getElementById("tab-missions-done");
        if (activeTabBtn && doneTabBtn) {
            activeTabBtn.className = `mission-filter-tab-pill ${currentMissionTab === "active" ? "active" : ""}`;
            doneTabBtn.className = `mission-filter-tab-pill ${currentMissionTab === "done" ? "active" : ""}`;
        }

        const container = document.getElementById("missions-list-container");
        if (!container) return;
        container.innerHTML = "";

        const db = window.MISSIONS_DATABASE || [];
        const filtered = db.filter(m => {
            const isClaimed = gameState.claimedMissions.includes(m.id);
            return currentMissionTab === "active" ? !isClaimed : isClaimed;
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="empty-list-notice-box"><p>Nenhuma missão encontrada nesta aba.</p></div>`;
            return;
        }

        filtered.forEach(m => {
            const currentProgress = getMissionProgressValue(m);
            const isCompleted = currentProgress >= m.target;
            const isClaimed = gameState.claimedMissions.includes(m.id);

            const card = document.createElement("div");
            card.className = "mission-task-card-row";
            card.innerHTML = `
                <div class="mission-task-main-details">
                    <h4>${m.title}</h4>
                    <p>${m.desc}</p>
                    <div class="mission-task-progress-bar-container">
                        <div class="mission-task-progress-fill" style="width: ${Math.min((currentProgress / m.target) * 100, 100)}%;"></div>
                    </div>
                    <span class="mission-task-numeric-counter-label">${Math.min(currentProgress, m.target)} / ${m.target}</span>
                </div>
                <div class="mission-task-reward-claim-action-box">
                    ${isClaimed ? '<span class="mission-claimed-badge">Coletado</span>' : (isCompleted ? `<button class="mission-claim-reward-btn active-claimable" data-id="${m.id}"><i class="fa-solid fa-gift"></i> +${m.reward}</button>` : `<div class="mission-locked-reward-indicator"><i class="fa-solid fa-star"></i> +${m.reward}</div>`)}
                </div>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll(".mission-claim-reward-btn").forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute("data-id");
                const m = db.find(x => x.id === id);
                if (m && !gameState.claimedMissions.includes(id)) {
                    gameState.claimedMissions.push(id);
                    gameState.coins += m.reward;
                    updateHeaderStats();
                    updateMissionsUI();
                }
            };
        });
    }

    function getMissionProgressValue(mission) {
        if (mission.type === "streak") return gameState.streak;
        if (mission.type === "coins") return gameState.coins;
        if (mission.type === "phases") {
            let total = 0;
            for (let k in gameState.unlockedPhases) {
                total += (gameState.unlockedPhases[k] - 1);
            }
            return total;
        }
        if (mission.type === "studies") return gameState.completedStudies.length;
        return 0;
    }

    // ========================================================================== //
    // 7. SISTEMA DE LEITURAS RECOMPENSADAS (ESTUDOS)
    // ========================================================================== //
    function setupStudiesScreen() {
        const availBtn = document.getElementById("tab-studies-available");
        const doneBtn = document.getElementById("tab-studies-done");
        if (availBtn && doneBtn) {
            availBtn.onclick = () => { currentStudyTab = "available"; updateStudiesUI(); };
            doneBtn.onclick = () => { currentStudyTab = "done"; updateStudiesUI(); };
        }
        updateStudiesUI();
    }

    function updateStudiesUI() {
        const availBtn = document.getElementById("tab-studies-available");
        const doneBtn = document.getElementById("tab-studies-done");
        if (availBtn && doneBtn) {
            availBtn.className = `study-filter-tab-pill ${currentStudyTab === "available" ? "active" : ""}`;
            doneBtn.className = `study-filter-tab-pill ${currentStudyTab === "done" ? "active" : ""}`;
        }

        const container = document.getElementById("studies-list-container");
        if (!container) return;
        container.innerHTML = "";

        const db = window.STUDIES_DATABASE || [];
        const filtered = db.filter(s => {
            const isDone = gameState.completedStudies.includes(s.id);
            return currentStudyTab === "available" ? !isDone : isDone;
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="empty-list-notice-box"><p>Nenhum estudo espiritual cadastrado nesta categoria.</p></div>`;
            return;
        }

        filtered.forEach(s => {
            const isDone = gameState.completedStudies.includes(s.id);
            const card = document.createElement("div");
            card.className = "study-article-card-row";
            card.innerHTML = `
                <div class="study-article-meta-info">
                    <span class="study-article-category-tag">${s.category}</span>
                    <h4>${s.title}</h4>
                    <p>${s.description}</p>
                </div>
                <button class="study-article-read-trigger-btn ${isDone ? 'completed-view' : 'pending-read'}" data-id="${s.id}">
                    ${isDone ? '<i class="fa-solid fa-circle-check"></i> Ler Novamente' : '<i class="fa-solid fa-book-open"></i> Iniciar Leitura (+10)'}
                </button>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll(".study-article-read-trigger-btn").forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute("data-id");
                openStudyReaderModal(id);
            };
        });
    }

    function openStudyReaderModal(studyId) {
        const db = window.STUDIES_DATABASE || [];
        const study = db.find(s => s.id === studyId);
        if (!study) return;

        const overlay = document.createElement("div");
        overlay.className = "study-fullscreen-reader-overlay animated-fade-in";
        overlay.innerHTML = `
            <div class="study-reader-viewport-container animated-slide-up">
                <div class="study-reader-header-bar">
                    <div class="study-reader-title-context">
                        <span>${study.category}</span>
                        <h3>${study.title}</h3>
                    </div>
                    <button class="study-reader-close-dismiss-btn" id="btn-close-reader">✕</button>
                </div>
                <div class="study-reader-scrollable-body-content">
                    <div class="study-reader-markdown-text-p">${study.content.replace(/\n/g, '<br>')}</div>
                    <div class="study-reader-verse-callout-box">
                        <i class="fa-solid fa-quote-left"></i>
                        <p>${study.verseKey}</p>
                    </div>
                </div>
                <div class="study-reader-footer-action-bar">
                    ${gameState.completedStudies.includes(studyId) ? '<button class="study-reader-final-action-btn secondary-dismiss" id="btn-finish-reading">Fechar Leitura</button>' : '<button class="study-reader-final-action-btn primary-rewardable" id="btn-finish-reading"><i class="fa-solid fa-circle-check"></i> Concluir e Coletar +10 Estrelas</button>'}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        lockBodyScroll();

        document.getElementById("btn-close-reader").onclick = () => { overlay.remove(); unlockBodyScroll(); };
        document.getElementById("btn-finish-reading").onclick = () => {
            if (!gameState.completedStudies.includes(studyId)) {
                gameState.completedStudies.push(studyId);
                gameState.coins += 10;
                markDayAsActive();
                updateHeaderStats();
            }
            overlay.remove();
            unlockBodyScroll();
            updateStudiesUI();
        };
    }

    // ========================================================================== //
    // 8. GERENCIADOR DE MEMORIZAÇÃO ACELERADA (FLASHCARDS)
    // ========================================================================== //
    let flashcardsActiveDeck = [];
    let flashcardsCurrentIndex = 0;

    function setupFlashcardsScreen() {
        const db = window.FLASHCARDS_DATABASE || [];
        const categoriesContainer = document.getElementById("flashcards-categories-wrapper");
        const playground = document.getElementById("flashcards-active-playground");
        
        if (!categoriesContainer || !playground) return;

        categoriesContainer.style.display = "flex";
        playground.style.display = "none";
        categoriesContainer.innerHTML = "";

        const categoriesList = [...new Set(db.map(f => f.category))];

        categoriesList.forEach(cat => {
            const count = db.filter(f => f.category === cat).length;
            const card = document.createElement("div");
            card.className = "flashcard-category-deck-card";
            card.innerHTML = `
                <div class="deck-icon-branding"><i class="fa-solid fa-clone"></i></div>
                <h4>${cat}</h4>
                <p>${count} cartões de memorização</p>
                <button class="deck-start-practice-btn" data-cat="${cat}">Praticar Deck</button>
            `;
            categoriesContainer.appendChild(card);
        });

        categoriesContainer.querySelectorAll(".deck-start-practice-btn").forEach(btn => {
            btn.onclick = () => {
                const cat = btn.getAttribute("data-cat");
                startFlashcardsSession(cat);
            };
        });
    }

    function startFlashcardsSession(category) {
        const db = window.FLASHCARDS_DATABASE || [];
        flashcardsActiveDeck = db.filter(f => f.category === category);
        flashcardsCurrentIndex = 0;

        document.getElementById("flashcards-categories-wrapper").style.display = "none";
        const playground = document.getElementById("flashcards-active-playground");
        playground.style.display = "flex";

        renderSingleFlashcard();
    }

    function renderSingleFlashcard() {
        const container = document.getElementById("flashcard-render-zone");
        if (!container) return;
        container.innerHTML = "";

        if (flashcardsCurrentIndex >= flashcardsActiveDeck.length) {
            container.innerHTML = `
                <div class="deck-finished-success-state animated-scale-up">
                    <div class="deck-success-icon-badge">🎉</div>
                    <h3>Deck Concluído!</h3>
                    <p>Excelente trabalho de memorização das escrituras.</p>
                    <button class="deck-back-to-selection-btn" id="btn-exit-flashcards">Voltar aos Decks</button>
                </div>
            `;
            document.getElementById("btn-exit-flashcards").onclick = setupFlashcardsScreen;
            return;
        }

        const data = flashcardsActiveDeck[flashcardsCurrentIndex];

        const wrapper = document.createElement("div");
        wrapper.className = "flashcard-flip-perspective-wrapper";
        wrapper.innerHTML = `
            <div class="flashcard-inner-rotator-card" id="interactive-flip-card">
                <div class="flashcard-face-front-side">
                    <span class="flashcard-face-badge-label">PERGUNTA</span>
                    <p class="flashcard-face-main-text-question">${data.front}</p>
                    <div class="flashcard-action-hint-tap"><i class="fa-solid fa-hand-pointer"></i> Toque para revelar a resposta</div>
                </div>
                <div class="flashcard-face-back-side">
                    <span class="flashcard-face-badge-label correct-theme">RESPOSTA / VERSÍCULO</span>
                    <p class="flashcard-face-main-text-answer">${data.back}</p>
                    <div class="flashcard-action-next-step-row">
                        <button class="flashcard-next-step-btn" id="btn-next-flashcard">Próximo Cartão <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        const cardElement = document.getElementById("interactive-flip-card");
        cardElement.onclick = (e) => {
            if (e.target.closest("#btn-next-flashcard")) return;
            cardElement.classList.toggle("is-flipped-active");
        };

        document.getElementById("btn-next-flashcard").onclick = (e) => {
            e.stopPropagation();
            flashcardsCurrentIndex++;
            renderSingleFlashcard();
        };
    }

    // ========================================================================== //
    // 9. CALENDÁRIO DE OFENSIVAS AVANÇADO (MODAL POPUP)
    // ========================================================================== //
    function openStreakModal() {
        const overlay = document.getElementById("streak-modal-overlay");
        if (!overlay) return;

        overlay.classList.remove("hidden");
        overlay.style.setProperty("display", "flex", "important");
        lockBodyScroll();

        document.getElementById("modal-current-streak").textContent = gameState.streak;
        document.getElementById("modal-max-streak").textContent = gameState.maxStreak;

        renderCalendarDaysGrid();

        document.getElementById("btn-close-streak-modal").onclick = () => {
            overlay.classList.add("hidden");
            overlay.style.display = "none";
            unlockBodyScroll();
        };

        document.getElementById("btn-prev-month").onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
            renderCalendarDaysGrid();
        };

        document.getElementById("btn-next-month").onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
            renderCalendarDaysGrid();
        };
    }

    function renderCalendarDaysGrid() {
        const grid = document.getElementById("calendar-days-grid");
        const label = document.getElementById("calendar-month-year");
        if (!grid || !label) return;

        grid.innerHTML = "";

        const monthsNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const year = calendarCurrentDate.getFullYear();
        const month = calendarCurrentDate.getMonth();

        label.textContent = `${monthsNames[month]} ${year}`;

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const blank = document.createElement("div");
            grid.appendChild(blank);
        }

        const todayStr = new Date().toISOString().split('T')[0];

        for (let day = 1; day <= totalDaysInMonth; day++) {
            const cell = document.createElement("div");
            
            const currentLoopDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isActive = gameState.streakHistory.includes(currentLoopDateStr);
            const isToday = currentLoopDateStr === todayStr;

            cell.style = `
                height: 34px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                border-radius: 50%; 
                font-size: 0.8rem; 
                font-weight: 700;
                transition: all 0.2s ease;
                background: ${isActive ? '#df6a2b' : (isToday ? 'rgba(255,255,255,0.1)' : 'transparent')};
                color: ${isActive ? '#FFFFFF' : (isToday ? '#df6a2b' : 'var(--text-main)')};
                border: ${isToday ? '2px solid #df6a2b' : 'none'};
                box-shadow: ${isActive ? '0 4px 10px rgba(223,106,43,0.3)' : 'none'};
            `;

            cell.textContent = day;
            grid.appendChild(cell);
        }
    }

    // ========================================================================== //
    // 10. INICIALIZAÇÃO AUTOMÁTICA DO APLICATIVO
    // ========================================================================== //
    updateHeaderStats();
    navigateToScreen("screen-journey");
});
