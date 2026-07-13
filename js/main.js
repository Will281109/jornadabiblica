// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. SINTETIZADOR DE ÁUDIO NATIVO
    // ==========================================================================
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
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime + 0.3);
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
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime + 0.25);
        }
    };

    // ==========================================================================
    // 2. CORE DO APP & SISTEMA DE VIDAS PASSIVAS
    // ==========================================================================
    const navButtons = document.querySelectorAll(".nav-button");
    const screens = document.querySelectorAll(".app-screen");
    const ONE_HOUR_MS = 60 * 60 * 1000; 

    // Inicialização do estado expandida com histórico de ofensivas
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
    
    // Garantia de propriedades obrigatórias
    gameState.completedStudies = gameState.completedStudies || []; 
    gameState.streakHistory = gameState.streakHistory || [];
    gameState.maxStreak = gameState.maxStreak || 0;
    gameState.streak = gameState.streak || 0;
    gameState.currentWorld = gameState.currentWorld || 1;
    gameState.unlockedWorldMax = gameState.unlockedWorldMax || 1;

    // --------------------------------------------------------------------------
    // [NOVO] INJETOR SANITIZADOR DE DADOS - CORREÇÃO AUTOMÁTICA DE SAVE QUEBRADO
    // --------------------------------------------------------------------------
    if (!gameState.unlockedPhases || typeof gameState.unlockedPhases !== 'object') {
        gameState.unlockedPhases = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    }

    // Varre os mundos para limpar resquícios do bug antigo sem apagar moedas ou ofensivas
    for (let m = 1; m <= 5; m++) {
        if (m < gameState.unlockedWorldMax) {
            // Garante que mundos anteriores fiquem totalmente completados na fase 16
            gameState.unlockedPhases[m] = 16; 
        } else if (m === gameState.unlockedWorldMax) {
            // Se o seu mundo atual travou na fase 16 por causa do bug antigo, força voltar para a fase 1
            if (gameState.unlockedPhases[m] === 16 && m < 5) {
                gameState.unlockedPhases[m] = 1;
            }
        } else {
            // Mundos futuros bloqueados começam na fase 1
            gameState.unlockedPhases[m] = 1;
        }
    }
    // Salva imediatamente o estado limpo para corrigir o LocalStorage do seu navegador
    localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));
    // --------------------------------------------------------------------------

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
                const remainingMs = ONE_HOUR_MS - (Date.now() - gameState.livesCheckTimestamp);
                if (remainingMs > 0) {
                    const minutes = Math.floor(remainingMs / 60000);
                    const seconds = Math.floor((remainingMs % 60000) / 1000);
                    timerEl.textContent = `Próxima vida em ${minutes}m ${seconds}s`;
                }
            }
        }
    }

    function updateHeaderStats() {
        const streakEl = document.getElementById("user-streak");
        const coinsEl = document.getElementById("user-coins");
        const livesEl = document.getElementById("user-lives");
        
        if (streakEl) streakEl.textContent = gameState.streak;
        if (coinsEl) coinsEl.textContent = gameState.coins;
        if (livesEl) livesEl.textContent = gameState.lives;
        
        localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));
        updateLiveShopUI();
    }
    window.updateHeaderStats = updateHeaderStats;

    // ==========================================================================
    // SISTEMA DE CALENDÁRIO INTERATIVO (MODAL)
    // ==========================================================================
    const streakTrigger = document.getElementById("streak-trigger");
    const streakModal = document.getElementById("streak-modal-overlay");
    const btnCloseStreak = document.getElementById("btn-close-streak-modal");
    const btnPrevMonth = document.getElementById("btn-prev-month");
    const btnNextMonth = document.getElementById("btn-next-month");

    if (streakTrigger && streakModal && btnCloseStreak) {
        streakTrigger.onclick = () => {
            calendarCurrentDate = new Date(); 
            renderStreakCalendar();
            streakModal.classList.remove("hidden");
        };
        btnCloseStreak.onclick = () => streakModal.classList.add("hidden");
        
        streakModal.onclick = (e) => {
            if (e.target === streakModal) streakModal.classList.add("hidden");
        };
    }

    if (btnPrevMonth && btnNextMonth) {
        btnPrevMonth.onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
            renderStreakCalendar();
        };
        btnNextMonth.onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
            renderStreakCalendar();
        };
    }

    function renderStreakCalendar() {
        const monthYearEl = document.getElementById("calendar-month-year");
        const daysGrid = document.getElementById("calendar-days-grid");
        const currentStreakEl = document.getElementById("modal-current-streak");
        const maxStreakEl = document.getElementById("modal-max-streak");

        if (!monthYearEl || !daysGrid) return;

        if (currentStreakEl) currentStreakEl.textContent = gameState.streak;
        if (maxStreakEl) maxStreakEl.textContent = gameState.maxStreak;

        daysGrid.innerHTML = "";

        const year = calendarCurrentDate.getFullYear();
        const month = calendarCurrentDate.getMonth();

        const mesesExtenso = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        monthYearEl.textContent = `${mesesExtenso[month]} ${year}`;

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const todayStr = new Date().toISOString().split('T')[0];

        for (let i = 0; i < firstDayIndex; i++) {
            const blank = document.createElement("div");
            daysGrid.appendChild(blank);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayBox = document.createElement("div");
            dayBox.style.cssText = "height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; font-weight: 700; position: relative;";
            dayBox.textContent = day;

            const currentStringMonth = String(month + 1).padStart(2, '0');
            const currentStringDay = String(day).padStart(2, '0');
            const checkDateStr = `${year}-${currentStringMonth}-${currentStringDay}`;

            const isAccessed = gameState.streakHistory.includes(checkDateStr);
            const isToday = (todayStr === checkDateStr);

            if (isAccessed) {
                dayBox.style.background = "#df6a2b";
                dayBox.style.color = "#ffffff";
                dayBox.innerHTML = `<i class="fa-solid fa-fire" style="font-size: 0.55rem; position: absolute; top: 2px; right: 2px; color: #ffca28;"></i><span style="position:relative; z-index:2;">${day}</span>`;
            } else if (isToday) {
                dayBox.style.border = "2px dashed #df6a2b";
                dayBox.style.color = "#df6a2b";
            } else {
                dayBox.style.color = "var(--text-main, #ffffff)";
                dayBox.style.background = "rgba(255,255,255,0.03)";
            }

            daysGrid.appendChild(dayBox);
        }
    }

    // ==========================================================================
    // SISTEMA AJAX DINÂMICO
    // ==========================================================================
    async function loadScreenContent(screenElement) {
        const url = screenElement.getAttribute("data-src");
        
        if (!url) {
            if (screenElement.id === "screen-journey") initJourneyMap();
            if (screenElement.id === "screen-lives") initLivesShopEvents();
            if (screenElement.id === "screen-missions") setupMissionsTabListeners();
            if (screenElement.id === "screen-studies") setupStudiesTabListeners();
            if (screenElement.id === "screen-flashcards") initFlashcardsModule();
            return;
        }

        try {
            const response = await fetch(url);
            if (response.ok) {
                screenElement.innerHTML = await response.text();
                if (screenElement.id === "screen-journey") initJourneyMap();
                if (screenElement.id === "screen-lives") initLivesShopEvents();
                if (screenElement.id === "screen-missions") setupMissionsTabListeners();
                if (screenElement.id === "screen-studies") setupStudiesTabListeners();
                if (screenElement.id === "screen-flashcards") initFlashcardsModule();
            } else {
                screenElement.innerHTML = `<p style="padding: 20px; color: var(--text-muted);">Erro ao carregar conteúdo.</p>`;
            }
        } catch (error) {
            console.error("Erro ao buscar página:", error);
        }
    }

    // ==========================================================================
    // SISTEMA DE MISSÕES COLETÁVEIS
    // ==========================================================================
    function setupMissionsTabListeners() {
        const btnActive = document.getElementById("tab-active-missions");
        const btnCompleted = document.getElementById("tab-completed-missions");

        if(btnActive && btnCompleted) {
            btnActive.onclick = () => {
                currentMissionTab = "active";
                btnActive.className = "tab-btn active";
                btnActive.style.cssText = "flex: 1; padding: 10px; border: none; background: var(--v2-bg-surface); border-radius: 10px; color: var(--text-main); font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.05);";
                btnCompleted.className = "tab-btn";
                btnCompleted.style.cssText = "flex: 1; padding: 10px; border: none; background: transparent; border-radius: 10px; color: var(--text-muted); font-weight: 700; font-size: 0.85rem; cursor: pointer;";
                renderMissionsList();
            };

            btnCompleted.onclick = () => {
                currentMissionTab = "completed";
                btnCompleted.className = "tab-btn active";
                btnCompleted.style.cssText = "flex: 1; padding: 10px; border: none; background: var(--v2-bg-surface); border-radius: 10px; color: var(--text-main); font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.05);";
                btnActive.className = "tab-btn";
                btnActive.style.cssText = "flex: 1; padding: 10px; border: none; background: transparent; border-radius: 10px; color: var(--text-muted); font-weight: 700; font-size: 0.85rem; cursor: pointer;";
                renderMissionsList();
            };
        }
        renderMissionsList();
    }

    function renderMissionsList() {
        const container = document.getElementById("missions-dynamic-container");
        if (!container) return;

        if (typeof BANCO_MISSOES === 'undefined') {
            container.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--text-muted);">Erro: Arquivo js/missoes.js não foi encontrado.</p>`;
            return;
        }

        container.innerHTML = "";

        let processedMissions = BANCO_MISSOES.map(m => {
            const isCompleted = m.check(gameState);
            const isClaimed = gameState.claimedMissions.includes(m.id);
            let sortGroup = 2; 
            if (isClaimed) sortGroup = 1;
            else if (isCompleted) sortGroup = 3;

            let numericProgress = (typeof m.progress === 'function') ? m.progress(gameState) : 0;
            return { ...m, isCompleted, isClaimed, sortGroup, numericProgress };
        });

        processedMissions.sort((a, b) => {
            if (b.sortGroup !== a.sortGroup) return b.sortGroup - a.sortGroup; 
            return b.numericProgress - a.numericProgress; 
        });

        let filteredMissions = [];
        if (currentMissionTab === "active") {
            filteredMissions = processedMissions.filter(m => !m.isClaimed);
        } else {
            filteredMissions = processedMissions.filter(m => m.isClaimed);
        }

        if (filteredMissions.length === 0) {
            const msg = currentMissionTab === "active" 
                ? "Incrível! Você coletou e completou absolutamente tudo por enquanto!" 
                : "Sua galeria de troféus está vazia. Colete recompensas para exibi-las aqui!";
            container.innerHTML = `<p style="padding: 32px 16px; text-align: center; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${msg}</p>`;
            return;
        }

        filteredMissions.forEach(m => {
            const card = document.createElement("div");
            card.className = "mission-card";

            if (m.isClaimed) {
                card.style.cssText = "background: linear-gradient(135deg, var(--v2-bg-surface) 0%, var(--v2-bg-deep) 100%); border: 1px solid rgba(212, 163, 39, 0.25); padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between;";
                card.innerHTML = `
                    <div style="display: flex; gap: 14px; align-items: center;">
                        <div style="background: rgba(212, 163, 39, 0.1); color: #D4A327; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; border: 1px solid #D4A327;">
                            <i class="fa-solid ${m.icon}"></i>
                        </div>
                        <div>
                            <h4 style="font-size: 0.9rem; font-weight: 700; margin: 0; color: var(--text-main);">${m.title}</h4>
                            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 3px 0 0 0;">${m.desc}</p>
                        </div>
                    </div>
                    <div style="font-weight: 800; font-size: 0.75rem; color: #D4A327; padding: 6px 12px; background: rgba(212, 163, 39, 0.08); border-radius: 12px;">
                        <i class="fa-solid fa-ribbon"></i> Conquistado
                    </div>
                `;
            } else if (m.isCompleted) {
                card.style.cssText = "background: var(--v2-bg-surface); border: 2px solid #D4A327; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between;";
                card.innerHTML = `
                    <div style="display: flex; gap: 14px; align-items: center;">
                        <div style="background: rgba(212, 163, 39, 0.1); color: #D4A327; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; border: 2px solid #D4A327;">
                            <i class="fa-solid ${m.icon}"></i>
                        </div>
                        <div>
                            <h4 style="font-size: 0.9rem; font-weight: 700; margin: 0; color: var(--text-main);">${m.title}</h4>
                            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 3px 0 0 0;">${m.desc}</p>
                        </div>
                    </div>
                    <button class="claim-reward-action-btn" data-id="${m.id}" data-reward="${m.reward}" style="background: #487E56; border: none; padding: 10px 14px; border-radius: 14px; font-weight: 800; font-size: 0.8rem; color: #FFFFFF; display: flex; align-items: center; gap: 5px; cursor: pointer;">
                        Coletar <i class="fa-solid fa-star"></i> ${m.reward}
                    </button>
                `;
            } else {
                card.style.cssText = "background: var(--v2-bg-surface); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; opacity: 0.85;";
                card.innerHTML = `
                    <div style="display: flex; gap: 14px; align-items: center;">
                        <div style="background: var(--v2-bg-deep); color: #8a8a8a; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; border: 1px dashed var(--border-subtle);">
                            <i class="fa-solid ${m.icon}"></i>
                        </div>
                        <div>
                            <h4 style="font-size: 0.9rem; font-weight: 700; margin: 0; color: var(--text-main);">${m.title}</h4>
                            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 3px 0 0 0;">${m.desc}</p>
                        </div>
                    </div>
                    <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-muted); padding: 6px 12px; background: var(--v2-bg-deep); border-radius: 12px;">
                        <i class="fa-solid fa-star" style="color: gray;"></i> ${m.reward}
                    </div>
                `;
            }
            container.appendChild(card);
        });

        container.querySelectorAll(".claim-reward-action-btn").forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute("data-id");
                const prize = parseInt(btn.getAttribute("data-reward"));
                gameState.coins += prize;
                gameState.claimedMissions.push(id);
                updateHeaderStats();
                renderMissionsList(); 
            };
        });
    }

    function initLivesShopEvents() {
        updateLiveShopUI();
        const buyBtn = document.querySelector(".buy-lives-btn");
        if (buyBtn) {
            buyBtn.onclick = () => {
                if (gameState.lives >= 10) return;
                if (gameState.coins >= 50) {
                    gameState.coins -= 50;
                    gameState.lives = 10;
                    gameState.livesCheckTimestamp = Date.now();
                    updateHeaderStats();
                } else {
                    buyBtn.style.background = "#D95D55";
                    setTimeout(() => buyBtn.style.background = "var(--v2-bg-deep)", 1000);
                }
            };
        }
    }

    async function navigateToScreen(screenId) {
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;

        navButtons.forEach(btn => btn.classList.remove("active"));
        screens.forEach(scr => scr.classList.remove("active"));

        const matchingNavBtn = document.getElementById(screenId.replace("screen-", "nav-"));
        if (matchingNavBtn) matchingNavBtn.classList.add("active");

        await loadScreenContent(targetScreen);
        targetScreen.classList.add("active");
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetScreenId = button.id.replace("nav-", "screen-");
            navigateToScreen(targetScreenId);
        });
    });

    const coinBadge = document.querySelector(".highlight-coin");
    if (coinBadge) coinBadge.addEventListener("click", () => navigateToScreen("screen-shop"));

    const heartBadge = document.querySelector(".highlight-heart");
    if (heartBadge) heartBadge.addEventListener("click", () => navigateToScreen("screen-lives"));

    gameState.livesCheckTimestamp = gameState.livesCheckTimestamp || Date.now();
    checkPassiveLivesRecovery();
    setInterval(checkPassiveLivesRecovery, 1000); 

    updateHeaderStats();
    navigateToScreen("screen-journey");

    // ==========================================================================
    // 3. ENGENHARIA DO QUIZ (TRILHA PRINCIPAL)
    // ==========================================================================
    let currentQuizQuestions = [];
    let wrongQuestionsQueue = [];
    let currentQuestionIndex = 0;
    let isRepescagemPhase = false;
    let activePhasePlaying = 1;
    let baseCorrectAnswersCount = 0;
    let wrongAnswerInThisPhaseRound = false; 
    let selectedWrongAOptionThisRound = false;
    let activeStudyObject = null; 

    const mundosDetalhes = {
        1: { title: "Mundo 1: Jornada Inicial", desc: "A base dos princípios bíblicos." },
        2: { title: "Mundo 2: Reis e Profetas", desc: "A história dos reinos e mensageiros." },
        3: { title: "Mundo 3: Ministério de Jesus", desc: "Os Evangelhos e as primeiras igrejas." },
        4: { title: "Mundo 4: Cartas e Doutrinas", desc: "As epístolas apostólicas e ensinamentos." },
        5: { title: "Mundo 5: Profecias e Apocalipse", desc: "Mistérios profundos e escatologia final." }
    };

    function getQuestionsForPhase(worldNum, phaseNum) {
        const phaseStr = String(phaseNum);
        const phaseInt = Number(phaseNum);

        if (typeof BANCO_PERGUNTAS !== 'undefined' && BANCO_PERGUNTAS[worldNum] && BANCO_PERGUNTAS[worldNum].fases) {
            const fasesDoMundo = BANCO_PERGUNTAS[worldNum].fases;
            
            if (fasesDoMundo[phaseStr]) return fasesDoMundo[phaseStr];
            if (fasesDoMundo[phaseInt]) return fasesDoMundo[phaseInt];
        }
        
        console.warn(`[Aviso] Fase ${phaseNum} do Mundo ${worldNum} não encontrada. Gerando fallback.`);
        let fallbackQuestions = [];
        for (let i = 1; i <= 10; i++) {
            fallbackQuestions.push({
                question: `[Mundo ${worldNum} - Fase ${phaseNum}] Pergunta de segurança ${i}?`,
                options: ["Alternativa Correta", "Opção Errada B", "Opção Errada C", "Opção Errada D"],
                correct: 0
            });
        }
        return fallbackQuestions;
    }

    function startQuizPhase(phaseNum) {
        if (gameState.lives <= 0) {
            alert("Você não tem vidas suficientes para jogar!");
            return;
        }

        activePhasePlaying = phaseNum;
        activeStudyObject = null;
        
        currentQuizQuestions = getQuestionsForPhase(gameState.currentWorld, phaseNum);
        wrongQuestionsQueue = [];
        currentQuestionIndex = 0;
        isRepescagemPhase = false;
        baseCorrectAnswersCount = 0;
        wrongAnswerInThisPhaseRound = false; 
        selectedWrongAOptionThisRound = false;

        const quizOverlay = document.getElementById("active-quiz-overlay");
        if (quizOverlay) {
            quizOverlay.classList.remove("hidden");
            quizOverlay.style.setProperty("display", "flex", "important"); 
            
            // Ocultar a navbar ao iniciar o quiz
            const navbar = document.querySelector(".app-navbar");
            if (navbar) navbar.classList.add("navbar-hidden");
            
            renderCurrentQuestion();
        }
    }

    function renderCurrentQuestion() {
        const feedbackContainer = document.getElementById("quiz-feedback-container");
        if (feedbackContainer) {
            feedbackContainer.innerHTML = "";
            feedbackContainer.classList.add("hidden");
            feedbackContainer.className = "hidden"; // Limpa classes de cores
        }

        let currentQuestion;
        let totalCount = currentQuizQuestions.length;

        if (!isRepescagemPhase) {
            currentQuestion = currentQuizQuestions[currentQuestionIndex];
            if (!currentQuestion) return;
            if (activeStudyObject) {
                document.getElementById("quiz-title-indicator").textContent = `Teste: ${activeStudyObject.title} - Q${currentQuestionIndex + 1}/${totalCount}`;
            } else {
                document.getElementById("quiz-title-indicator").textContent = `Fase ${activePhasePlaying} - Pergunta ${currentQuestionIndex + 1}/${totalCount}`;
            }
            document.getElementById("quiz-progress-bar").style.width = `${(currentQuestionIndex / totalCount) * 100}%`;
            document.getElementById("quiz-progress-bar").style.background = `var(--gradient-primary)`;
        } else {
            currentQuestion = wrongQuestionsQueue[currentQuestionIndex];
            if (!currentQuestion) return;
            document.getElementById("quiz-title-indicator").textContent = `Repescagem - Restam ${wrongQuestionsQueue.length - currentQuestionIndex}`;
            document.getElementById("quiz-progress-bar").style.width = `100%`;
            document.getElementById("quiz-progress-bar").style.background = `var(--color-streak)`;
        }

        document.getElementById("quiz-question-text").textContent = currentQuestion.question;
        const optionsContainer = document.getElementById("quiz-options-container");
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option-button";
            
            const letters = ["A", "B", "C", "D"];
            btn.innerHTML = `<span style="background: var(--v2-bg-deep); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 0.75rem; font-weight: 800; color: var(--text-main); flex-shrink: 0;">${letters[idx]}</span> <span>${opt}</span>`;
            
            btn.onclick = () => checkAnswer(idx, currentQuestion, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function initJourneyMap() {
        const btnComunidadeJornada = document.getElementById("btn-jornada-comunidade");
        if (btnComunidadeJornada) {
            btnComunidadeJornada.onclick = () => navigateToScreen("screen-telegram");
        }

        const container = document.getElementById("journey-container");
        if (!container) return;

        container.innerHTML = "";
        
        const worldData = mundosDetalhes[gameState.currentWorld] || { title: `Mundo ${gameState.currentWorld}` };
        
        document.getElementById("current-world-tag").textContent = `Mundo ${gameState.currentWorld}`;
        document.getElementById("current-world-title").textContent = worldData.title;

        const faseAtualDoMundo = gameState.unlockedPhases[gameState.currentWorld] || 1;
        document.getElementById("current-world-progress").textContent = `Fase ${faseAtualDoMundo} de 16`;

        for (let i = 1; i <= 16; i++) {
            const node = document.createElement("div");
            node.className = "trail-node";

            let statusClass = "locked";
            let icon = '<i class="fa-solid fa-lock"></i>';

            if (gameState.currentWorld < gameState.unlockedWorldMax) {
                statusClass = "completed";
                icon = '<i class="fa-solid fa-check"></i>';
            } else {
                if (i < faseAtualDoMundo) {
                    statusClass = "completed";
                    icon = '<i class="fa-solid fa-check"></i>';
                } else if (i === faseAtualDoMundo) {
                    statusClass = "current";
                    icon = `<span>${i}</span>`;
                }
            }

            node.classList.add(statusClass);
            node.innerHTML = `
                <button class="node-button" ${statusClass === 'locked' ? 'disabled' : ''} data-phase="${i}">
                    ${icon}
                </button>
                <span class="node-title">Fase ${i}</span>
            `;
            container.appendChild(node);
        }

        container.querySelectorAll(".node-button").forEach(btn => {
            btn.addEventListener("click", () => {
                startQuizPhase(parseInt(btn.getAttribute("data-phase")));
            });
        });

        const btnChangeMap = document.getElementById("btn-change-map");
        if (btnChangeMap) {
            btnChangeMap.onclick = () => openWorldSelectorModal();
        }
        
        const btnCloseWorlds = document.getElementById("btn-close-worlds");
        if (btnCloseWorlds) {
            btnCloseWorlds.onclick = () => {
                document.getElementById('worlds-picker-overlay').style.display = 'none';
            };
        }

        const btnQuitQuiz = document.getElementById("btn-quit-quiz");
        if (btnQuitQuiz) {
            btnQuitQuiz.onclick = () => {
                const feedbackContainer = document.getElementById("quiz-feedback-container");
                if (feedbackContainer) {
                    feedbackContainer.innerHTML = "";
                    feedbackContainer.classList.add("hidden");
                }
                const quizOverlay = document.getElementById("active-quiz-overlay");
                if (quizOverlay) {
                    quizOverlay.classList.add("hidden");
                    quizOverlay.style.setProperty("display", "none", "important");
                    
                    // Mostrar a navbar ao sair do quiz
                    const navbar = document.querySelector(".app-navbar");
                    if (navbar) navbar.classList.remove("navbar-hidden");
                }
            };
        }
    }

    function openWorldSelectorModal() {
        const pickerOverlay = document.getElementById('worlds-picker-overlay');
        const container = document.getElementById('worlds-list-container');
        if (!pickerOverlay || !container) return;

        container.innerHTML = '';

        Object.keys(mundosDetalhes).forEach(worldId => {
            const id = parseInt(worldId);
            const isUnlocked = id <= gameState.unlockedWorldMax;
            const isActive = id === gameState.currentWorld;

            const card = document.createElement("div");
            card.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18px 20px;
                border-radius: 20px;
                cursor: ${isUnlocked ? 'pointer' : 'not-allowed'};
                transition: all 0.2s ease;
                background: ${isActive ? '#FFFFFF' : '#EFECE6'};
                border: ${isActive ? '2px solid #487E56' : '1px solid transparent'};
                opacity: ${isUnlocked ? '1' : '0.6'};
            `;

            card.innerHTML = `
                <div style="text-align: left; display: flex; flex-direction: column; gap: 4px;">
                    <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: ${isActive ? '#2E2922' : '#736C62'};">${mundosDetalhes[id].title}</h4>
                    <p style="margin: 0; font-size: 0.88rem; color: ${isActive ? '#80796E' : '#968E82'};">${mundosDetalhes[id].desc}</p>
                </div>
                <div>
                    ${!isUnlocked 
                        ? '<i class="fa-solid fa-lock" style="color: #736C62; font-size: 1.1rem; opacity: 0.6;"></i>' 
                        : (isActive 
                            ? '<i class="fa-solid fa-circle-check" style="color: #487E56; font-size: 1.25rem;"></i>' 
                            : '<i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>')
                    }
                </div>
            `;

            if (isUnlocked && !isActive) {
                card.onclick = () => {
                    gameState.currentWorld = id;
                    pickerOverlay.style.display = 'none';
                    initJourneyMap();
                    updateHeaderStats();
                };
            }
            container.appendChild(card);
        });

        pickerOverlay.style.display = 'flex';
    }

    function checkAnswer(selectedIndex, questionObj, selectedBtn) {
        const buttons = document.getElementById("quiz-options-container").querySelectorAll("button");
        buttons.forEach(b => b.removeAttribute("onclick"));

        const isCorrect = (selectedIndex === questionObj.correct);
        const feedbackContainer = document.getElementById("quiz-feedback-container");
        
        if (!feedbackContainer) return;

        if (isCorrect) {
            SoundFX.playCorrect();
            selectedBtn.style.background = "#487E56"; selectedBtn.style.color = "#FFFFFF";
            if(!isRepescagemPhase) {
                baseCorrectAnswersCount++;
            }
            feedbackContainer.className = "quiz-feedback-bar correct-bar";
            feedbackContainer.innerHTML = `
                <div class="feedback-title"><i class="fa-solid fa-circle-check"></i> Você acertou!</div>
                <button class="btn-next-question" id="btn-next-flow">Continuar</button>
            `;
        } else {
            SoundFX.playWrong();
            selectedBtn.style.background = "#D95D55"; selectedBtn.style.color = "#FFFFFF";
            
            wrongAnswerInThisPhaseRound = true;
            if (selectedIndex === 0) selectedWrongAOptionThisRound = true;

            gameState.lives--;
            if (gameState.lives < 0) gameState.lives = 0;
            if (gameState.lives < 10 && !gameState.livesCheckTimestamp) gameState.livesCheckTimestamp = Date.now();

            const correctBtn = buttons[questionObj.correct];
            if (correctBtn) correctBtn.style.border = "2px dashed #487E56";

            wrongQuestionsQueue.push(questionObj);
            feedbackContainer.className = "quiz-feedback-bar wrong-bar";
            feedbackContainer.innerHTML = `
                <div class="feedback-title"><i class="fa-solid fa-circle-xmark"></i> Resposta incorreta</div>
                <button class="btn-next-question" id="btn-next-flow">Entendi</button>
            `;
        }

        feedbackContainer.classList.remove("hidden");
        updateHeaderStats();

        document.getElementById("btn-next-flow").onclick = () => {
            if (gameState.lives <= 0) {
                const quizOverlay = document.getElementById("active-quiz-overlay");
                if (quizOverlay) {
                    quizOverlay.classList.add("hidden");
                    quizOverlay.style.setProperty("display", "none", "important");
                    
                    // Mostrar a navbar ao sair do quiz por falta de vidas
                    const navbar = document.querySelector(".app-navbar");
                    if (navbar) navbar.classList.remove("navbar-hidden");
                }
                if (!activeStudyObject) initJourneyMap();
                return;
            }
            advanceQuizFlow();
        };
    }

    function advanceQuizFlow() {
        currentQuestionIndex++;
        if (!isRepescagemPhase) {
            if (currentQuestionIndex >= currentQuizQuestions.length) {
                                if (wrongQuestionsQueue.length > 0) {
                    const feedbackContainer = document.getElementById("quiz-feedback-container");
                    if (!feedbackContainer) return;

                    isRepescagemPhase = true;
                    currentQuestionIndex = 0;

                    feedbackContainer.className = "quiz-feedback-bar warning-transition-bar";
                    feedbackContainer.innerHTML = `
                        <div class="feedback-title"><i class="fa-solid fa-rotate-left"></i> Correção de Erros</div>
                        <p style="font-size: 0.85rem; margin-bottom: 4px;">Vamos ajustar as ${wrongQuestionsQueue.length} questões que você pulou para concluir.</p>
                        <button class="btn-next-question" id="btn-start-repescagem">Revisar</button>
                    `;
                    feedbackContainer.classList.remove("hidden");
                    document.getElementById("btn-start-repescagem").onclick = () => renderCurrentQuestion();
                } else {
                    triggerQuizSuccess();
                }
            } else {
                renderCurrentQuestion();
            }
        } else {
            if (currentQuestionIndex >= wrongQuestionsQueue.length) {
                triggerQuizSuccess();
            } else {
                renderCurrentQuestion();
            }
        }
    }

    function triggerQuizSuccess() {
        markDayAsActive();
        if (activeStudyObject) {
            completeStudySuccess(activeStudyObject);
        } else {
            completePhaseSuccess();
        }
    }

    function completePhaseSuccess() {
        const oldBar = document.querySelector(".quiz-feedback-bar");
        if (oldBar) oldBar.remove();

        const totalQuestions = currentQuizQuestions.length;
        const percentage = Math.round((baseCorrectAnswersCount / totalQuestions) * 100);
        const moedasGanhass = baseCorrectAnswersCount * 10;
        gameState.coins += moedasGanhass;

        if (!wrongAnswerInThisPhaseRound) {
            gameState.hasPerfectPhase = true;
            gameState.perfectStreak = (gameState.perfectStreak || 0) + 1;
        } else {
            gameState.perfectStreak = 0;
        }
        
        if (percentage >= 90) gameState.has90PercentPhase = true;
        if (gameState.lives === 1) gameState.passedWithOneHeart = true;
        if (!selectedWrongAOptionThisRound) gameState.noWrongAOption = true;

        let mudouMundo = false;
        const currentPlayingPhaseNumeric = Number(activePhasePlaying);
        const currentUnlockedPhaseNumeric = Number(gameState.unlockedPhases[gameState.currentWorld] || 1);

        if (gameState.currentWorld === gameState.unlockedWorldMax) {
            if (currentPlayingPhaseNumeric === currentUnlockedPhaseNumeric) {
                if (currentUnlockedPhaseNumeric < 16) {
                    gameState.unlockedPhases[gameState.currentWorld] = currentPlayingPhaseNumeric + 1;
                } else if (currentPlayingPhaseNumeric === 16) {
                    if (gameState.unlockedWorldMax < 5) {
                        gameState.unlockedWorldMax += 1;
                        gameState.currentWorld = gameState.unlockedWorldMax;
                        gameState.unlockedPhases[gameState.currentWorld] = 1; 
                        mudouMundo = true;
                    }
                }
            }
        }

        localStorage.setItem('biblical_quest_state', JSON.stringify(gameState));
        updateHeaderStats();

        const victoryOverlay = document.createElement("div");
        victoryOverlay.className = "victory-overlay";
        victoryOverlay.style.cssText = "position: fixed; inset: 0; background: var(--v2-bg-app); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; text-align: center;";
        
        let subTexto = `Você acertou ${percentage}% das questões de primeira e faturou <b>+${moedasGanhass} moedas</b>!`;
        if (mudouMundo) {
            const novoMundoNome = mundosDetalhes[gameState.currentWorld]?.title || `Mundo ${gameState.currentWorld}`;
            subTexto = `🔥 EXTRAORDINÁRIO! O mundo anterior foi completamente conquistado. O <b>${novoMundoNome}</b> já está disponível e ativo!`;
        } else if (currentPlayingPhaseNumeric === 16 && gameState.currentWorld === 5) {
            subTexto = `🏆 SENSACIONAL! Você completou a última fase do Mundo 5 e zerou com maestria toda a Jornada Bíblica!`;
        }

        victoryOverlay.innerHTML = `
            <div class="victory-icon"><i class="fa-solid fa-trophy"></i></div>
            <h2 class="victory-title">${mudouMundo ? 'Próximo Mundo Desbloqueado!' : `Fase ${activePhasePlaying} Concluída!`}</h2>
            <p class="victory-subtitle">${subTexto}</p>
            <button class="btn-primary-action" id="btn-victory-close" style="max-width: 250px;">Voltar para a Trilha</button>
        `;

        document.getElementById("active-quiz-overlay").appendChild(victoryOverlay);
        document.getElementById("btn-victory-close").onclick = () => {
            victoryOverlay.remove();
            const quizOverlay = document.getElementById("active-quiz-overlay");
            if (quizOverlay) {
                quizOverlay.classList.add("hidden");
                quizOverlay.style.setProperty("display", "none", "important");
                
                // Mostrar a navbar ao concluir o quiz
                const navbar = document.querySelector(".app-navbar");
                if (navbar) navbar.classList.remove("navbar-hidden");
            }
            initJourneyMap();
        };
    }

    // ==========================================================================
    // 4. SISTEMA DE ESTUDOS ACADÊMICOS
    // ==========================================================================
    function setupStudiesTabListeners() {
        const btnAvailable = document.getElementById("tab-available-studies");
        const btnCompleted = document.getElementById("tab-completed-studies");

        if (btnAvailable && btnCompleted) {
            btnAvailable.onclick = () => {
                window.currentStudyTab = "available";
                btnAvailable.className = "tab-btn active";
                btnAvailable.style.cssText = "flex: 1; padding: 10px; border: none; background: var(--v2-bg-surface); border-radius: 10px; color: var(--text-main); font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.05);";
                btnCompleted.className = "tab-btn";
                btnCompleted.style.cssText = "flex: 1; padding: 10px; border: none; background: transparent; border-radius: 10px; color: var(--text-muted); font-weight: 700; font-size: 0.85rem; cursor: pointer;";
                renderStudiesList();
            };

            btnCompleted.onclick = () => {
                window.currentStudyTab = "completed";
                btnCompleted.className = "tab-btn active";
                btnCompleted.style.cssText = "flex: 1; padding: 10px; border: none; background: var(--v2-bg-surface); border-radius: 10px; color: var(--text-main); font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.05);";
                btnAvailable.className = "tab-btn";
                btnAvailable.style.cssText = "flex: 1; padding: 10px; border: none; background: transparent; border-radius: 10px; color: var(--text-muted); font-weight: 700; font-size: 0.85rem; cursor: pointer;";
                renderStudiesList();
            };
        }
        renderStudiesList();
    }

    function renderStudiesList() {
        const container = document.getElementById("studies-dynamic-container");
        if (!container) return; 

        if (typeof BANCO_ESTUDOS === 'undefined') {
            container.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--text-muted);">Erro: Arquivo js/estudos_banco.js não foi encontrado.</p>`;
            return;
        }

        container.innerHTML = "";
        if (!window.gameState.completedStudies) window.gameState.completedStudies = [];

        const filtered = BANCO_ESTUDOS.filter(estudo => {
            const isDone = window.gameState.completedStudies.includes(estudo.id);
            return window.currentStudyTab === "available" ? !isDone : isDone;
        });

        if (filtered.length === 0) {
            const msg = window.currentStudyTab === "available"
                ? "Parabéns! Você leu todos os estudos disponíveis!"
                : "Você ainda não marcou nenhum estudo como concluído.";
            container.innerHTML = `<p style="padding: 32px 16px; text-align: center; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${msg}</p>`;
            return;
        }

        filtered.forEach(estudo => {
            const card = document.createElement("div");
            card.className = "study-card";
            card.setAttribute("data-id", estudo.id);
            
            const isDone = window.gameState.completedStudies.includes(estudo.id);
            card.style.cssText = "background: var(--v2-bg-surface); border: 1px solid var(--border-subtle); padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer; transition: transform 0.2s, border-color 0.2s;";
            
            card.onmouseenter = () => { card.style.borderColor = "#487E56"; card.style.transform = "translateY(-1px)"; };
            card.onmouseleave = () => { card.style.borderColor = "var(--border-subtle)"; card.style.transform = "none"; };

            card.innerHTML = `
                <div style="display: flex; gap: 14px; align-items: center; flex: 1;">
                    <div style="background: ${isDone ? 'rgba(212, 163, 39, 0.1)' : 'rgba(72, 126, 86, 0.1)'}; color: ${isDone ? '#D4A327' : '#487E56'}; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; border: 1px solid ${isDone ? '#D4A327' : '#487E56'}; flex-shrink: 0;">
                        <i class="fa-solid ${estudo.icon || 'fa-book'}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                            <h4 style="font-size: 0.95rem; font-weight: 700; margin: 0; color: var(--text-main);">${estudo.title}</h4>
                            <span style="font-size: 0.75rem; font-weight: 700; color: ${isDone ? '#D4A327' : '#487E56'}; background: ${isDone ? 'rgba(212, 163, 39, 0.08)' : 'rgba(72, 126, 86, 0.08)'}; padding: 3px 8px; border-radius: 8px; white-space: nowrap;">
                                ${isDone ? 'Lido' : 'Disponível'}
                            </span>
                        </div>
                        <p style="font-size: 0.78rem; color: var(--text-muted); margin: 5px 0 0 0; line-height: 1.3;">${estudo.desc}</p>
                    </div>
                </div>
            `;

            card.onclick = () => {
                const id = card.getAttribute("data-id");
                const estudoObj = BANCO_ESTUDOS.find(e => e.id === id);
                if (estudoObj) openStudyReader(estudoObj);
            };

            container.appendChild(card);
        });
    }

    async function openStudyReader(estudoObj) {
        const overlay = document.getElementById("study-reader-overlay");
        const titleEl = document.getElementById("study-reader-title");
        const scroller = document.getElementById("study-content-scroller");
        let footerBtn = document.getElementById("btn-finish-study-direct");

        if(!overlay || !titleEl || !scroller || !footerBtn) return;

        titleEl.textContent = estudoObj.title;
        scroller.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">Carregando material de leitura...</p>`;
        overlay.classList.remove("hidden");
        
        // Ocultar navbar ao entrar no estudo
        const navbar = document.querySelector(".app-navbar");
        if (navbar) navbar.classList.add("navbar-hidden");

        const isAlreadyDone = window.gameState.completedStudies.includes(estudoObj.id);
        if (isAlreadyDone) {
            footerBtn.textContent = "Estudo já Concluído (Voltar)";
            footerBtn.style.background = "var(--v2-bg-deep)";
            footerBtn.style.color = "var(--text-main)";
        } else {
            footerBtn.textContent = "Concluir Leitura do Estudo";
            footerBtn.style.background = "#487E56";
            footerBtn.style.color = "#FFFFFF";
        }

        try {
            const response = await fetch(estudoObj.src);
            if (response.ok) {
                scroller.innerHTML = await response.text();
                scroller.scrollTop = 0;
            } else {
                scroller.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">Erro ao carregar o conteúdo deste estudo.</p>`;
            }
        } catch (err) {
            scroller.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">Falha ao conectar com o repositório do estudo.</p>`;
        }

        document.getElementById("btn-close-study").onclick = () => {
            overlay.classList.add("hidden");
            // Restaurar navbar ao sair
            const navbar = document.querySelector(".app-navbar");
            if (navbar) navbar.classList.remove("navbar-hidden");
        };

        const newFooterBtn = footerBtn.cloneNode(true);
        footerBtn.parentNode.replaceChild(newFooterBtn, footerBtn);

        newFooterBtn.onclick = (e) => {
            e.preventDefault();
            if (!isAlreadyDone) {
                window.gameState.completedStudies.push(estudoObj.id);
                markDayAsActive();
            }
            overlay.classList.add("hidden");
            // Restaurar navbar ao sair
            const navbar = document.querySelector(".app-navbar");
            if (navbar) navbar.classList.remove("navbar-hidden");
            renderStudiesList();
        };
    }

    window.setupStudiesTabListeners = setupStudiesTabListeners;
    window.renderStudiesList = renderStudiesList;

    window.resetGameProgress = () => {
        if (confirm("Tem certeza que deseja resetar todo o seu progresso? Isso não pode ser desfeito.")) {
            localStorage.removeItem('biblical_quest_state');
            location.reload();
        }
    };
});