const BANCO_MISSOES = [
    // --- CATEGORIA: TRILHA ---
    { id: "m1", cat: "Trilha", title: "Primeiro Passo", desc: "Conclua a Fase 1 do Mundo 1.", reward: 10, icon: "fa-map-pin", check: (state) => state.unlockedWorldMax > 1 || state.unlockedPhase > 1 },
    { id: "m2", cat: "Trilha", title: "Desbravador I", desc: "Conclua 10 fases no Mundo 1.", reward: 30, icon: "fa-compass", check: (state) => state.unlockedWorldMax > 1 || state.unlockedPhase > 10 },
    { id: "m3", cat: "Trilha", title: "Dominador do Início", desc: "Complete as 16 fases do Mundo 1.", reward: 100, icon: "fa-trophy", check: (state) => state.unlockedWorldMax > 1 },
    { id: "m4", cat: "Trilha", title: "Reis e Profetas", desc: "Inicie o Mundo 2.", reward: 40, icon: "fa-crown", check: (state) => state.unlockedWorldMax >= 2 },
    { id: "m5", cat: "Trilha", title: "Explorador Avançado", desc: "Conclua 5 fases no Mundo 2.", reward: 60, icon: "fa-scroll", check: (state) => state.unlockedWorldMax > 2 || (state.unlockedWorldMax === 2 && state.unlockedPhase > 5) },
    { id: "m6", cat: "Trilha", title: "Teólogo Iniciante", desc: "Conclua 10 fases no Mundo 2.", reward: 80, icon: "fa-book-open", check: (state) => state.unlockedWorldMax > 2 || (state.unlockedWorldMax === 2 && state.unlockedPhase > 10) },
    { id: "m7", cat: "Trilha", title: "Mestre do Mundo 2", desc: "Complete as 16 fases do Mundo 2.", reward: 150, icon: "fa-gavel", check: (state) => state.unlockedWorldMax > 2 },
    { id: "m8", cat: "Trilha", title: "Maratonista", desc: "Jogue 10 fases diferentes.", reward: 30, icon: "fa-person-running", check: (state) => (state.totalPhasesPlayed || 0) >= 10 },
    { id: "m9", cat: "Trilha", title: "Inabalável", desc: "Conclua a fase final sem errar nada.", reward: 100, icon: "fa-shield-halved", check: (state) => !!state.perfectFinalPhase },

    // --- CATEGORIA: MÉRITO/PERFORMANCE ---
    { id: "m10", cat: "Mérito", title: "Gênio Bíblico", desc: "Acerte 100% de uma fase de primeira.", reward: 50, icon: "fa-brain", check: (state) => !!state.hasPerfectPhase },
    { id: "m11", cat: "Mérito", title: "Mente Afiada", desc: "Consiga 100% em 10 fases seguidas.", reward: 100, icon: "fa-lightbulb", check: (state) => (state.perfectStreak || 0) >= 10 },
    { id: "m12", cat: "Mérito", title: "Quase Perfeito", desc: "Acerte 90% de primeira em uma fase.", reward: 15, icon: "fa-star-half-stroke", check: (state) => !!state.has90PercentPhase },
    { id: "m13", cat: "Mérito", title: "Sabedoria Pura", desc: "Acumule 500 pontos de mérito.", reward: 80, icon: "fa-gem", check: (state) => (state.totalMeritPoints || 0) >= 500 },
    { id: "m14", cat: "Mérito", title: "Erudição", desc: "Acumule 1.000 pontos de mérito.", reward: 150, icon: "fa-graduation-cap", check: (state) => (state.totalMeritPoints || 0) >= 1000 },
    { id: "m15", cat: "Mérito", title: "Sobrevivente", desc: "Passe de fase restando 1 coração.", reward: 20, icon: "fa-heart-crack", check: (state) => !!state.passedWithOneHeart },
    { id: "m16", cat: "Mérito", title: "Estrategista", desc: "Use a repescagem para salvar 5 fases.", reward: 30, icon: "fa-kit-medical", check: (state) => (state.repescagemSaves || 0) >= 5 },
    { id: "m17", cat: "Mérito", title: "Imbatível", desc: "Acerte 50 questões de primeira no app.", reward: 100, icon: "fa-bolt", check: (state) => (state.totalCorrectFirstTry || 0) >= 50 },
    { id: "m18", cat: "Mérito", title: "Enciclopédia Viva", desc: "Acerte 150 questões de primeira no app.", reward: 250, icon: "fa-book-atlas", check: (state) => (state.totalCorrectFirstTry || 0) >= 150 },

    // --- CATEGORIA: FOGO/CONSISTÊNCIA ---
    { id: "m19", cat: "Fogo", title: "Fogo Inicial", desc: "Alcance ofensiva de 3 dias seguidos.", reward: 15, icon: "fa-fire-flame-curved", check: (state) => state.streak >= 3 },
    { id: "m20", cat: "Fogo", title: "Hábito Santo", desc: "Alcance ofensiva de 7 dias seguidos.", reward: 40, icon: "fa-calendar-check", check: (state) => state.streak >= 7 },
    { id: "m21", cat: "Fogo", title: "Constância Pura", desc: "Alcance ofensiva de 15 dias seguidos.", reward: 80, icon: "fa-hourglass-half", check: (state) => state.streak >= 15 },
    { id: "m22", cat: "Fogo", title: "Inabalável", desc: "Alcance ofensiva de 30 dias seguidos.", reward: 200, icon: "fa-infinity", check: (state) => state.streak >= 30 },
    { id: "m23", cat: "Fogo", title: "Firme na Rocha", desc: "Complete 1 fase por dia durante 5 dias.", reward: 30, icon: "fa-cubes", check: (state) => (state.consecutiveDaysPlayed || 0) >= 5 },
    { id: "m24", cat: "Fogo", title: "Devocional Diário", desc: "Abra o aplicativo por 50 dias seguidos.", reward: 10, icon: "fa-mobile-screen-button", check: (state) => (state.totalDaysOpened || 0) >= 50 },
    { id: "m25", cat: "Fogo", title: "Fidelidade", desc: "Abra o aplicativo por 14 dias seguidos.", reward: 30, icon: "fa-handshake", check: (state) => (state.totalDaysOpened || 0) >= 14 },
    { id: "m26", cat: "Fogo", title: "Compromisso", desc: "Jogue no sábado e no domingo.", reward: 20, icon: "fa-cross", check: (state) => !!state.playedWeekend },
    { id: "m27", cat: "Fogo", title: "Fogo Eterno", desc: "Chegue a 50 dias de ofensiva ativa.", reward: 400, icon: "fa-fire-flame-full", check: (state) => state.streak >= 50 },
    { id: "m28", cat: "Fogo", title: "Madrugador", desc: "Conclua uma fase antes das 08:00.", reward: 15, icon: "fa-sun", check: (state) => !!state.completedEarlyMorning },

    // --- CATEGORIA: CARDS/REVISÃO ---
    { id: "m29", cat: "Cards", title: "Boa Memória", desc: "Abra a Revisão Rápida pela primeira vez.", reward: 10, icon: "fa-window-maximize", check: (state) => !!state.openedFlashcards },
    { id: "m30", cat: "Cards", title: "Estudioso Atento", desc: "Acerte 5 Flashcards seguidos no modal.", reward: 25, icon: "fa-check-double", check: (state) => (state.flashcardsStreak || 0) >= 5 },
    { id: "m31", cat: "Cards", title: "Lembrança Viva", desc: "Revise 10 Flashcards no total.", reward: 20, icon: "fa-clone", check: (state) => (state.totalFlashcardsReviewed || 0) >= 10 },
    { id: "m32", cat: "Cards", title: "Gênio dos Cards", desc: "Revise 30 Flashcards no total.", reward: 50, icon: "fa-layer-group", check: (state) => (state.totalFlashcardsReviewed || 0) >= 30 },
    { id: "m33", cat: "Cards", title: "Sem Esquecimento", desc: "Use o botão 'Acertei' 50 vezes.", reward: 70, icon: "fa-circle-check", check: (state) => (state.totalFlashcardsCorrect || 0) >= 50 },
    { id: "m34", cat: "Cards", title: "Persistente", desc: "Use a revisão após perder todas as vidas.", reward: 15, icon: "fa-heart-pulse", check: (state) => !!state.reviewedOnZeroLives },
    { id: "m35", cat: "Cards", title: "Revisão Semanal", desc: "Acerte cards em 3 dias na mesma semana.", reward: 40, icon: "fa-calendar-days", check: (state) => !!state.weeklyCardsDone },
    { id: "m36", cat: "Cards", title: "Foco em Memorização", desc: "Complete uma rodada sem errar nenhum.", reward: 35, icon: "fa-award", check: (state) => !!state.perfectCardRound },
    { id: "m37", cat: "Cards", title: "Sábio dos Versículos", desc: "Acerte 100 flashcards acumulados.", reward: 150, icon: "fa-book-bookmark", check: (state) => (state.totalFlashcardsCorrect || 0) >= 100 },
    { id: "m38", cat: "Cards", title: "Mestre do Altar", desc: "Acerte 200 flashcards acumulados.", reward: 300, icon: "fa-church", check: (state) => (state.totalFlashcardsCorrect || 0) >= 200 },

    // --- CATEGORIA: LOJA ---
    { id: "m39", cat: "Loja", title: "Primeira Compra", desc: "Compre qualquer item na Loja.", reward: 15, icon: "fa-basket-shopping", check: (state) => (state.totalShopPurchases || 0) >= 1 },
    { id: "m40", cat: "Loja", title: "Poder da Leitura", desc: "Desbloqueie 'Estudo: Tabernáculo'.", reward: 35, icon: "fa-book-open-reader", check: (state) => !!state.unlockedTabernaculo },
    { id: "m41", cat: "Loja", title: "Coração de Ferro", desc: "Compre um refil completo de vidas.", reward: 20, icon: "fa-heart-circle-bolt", check: (state) => !!state.boughtHeartRefill },
    { id: "m42", cat: "Loja", title: "Investidor", desc: "Acumule 300 moedas de uma só vez.", reward: 30, icon: "fa-coins", check: (state) => state.coins >= 300 },
    { id: "m43", cat: "Loja", title: "Riqueza de Sabedoria", desc: "Acumule 600 moedas de uma só vez.", reward: 60, icon: "fa-piggy-bank", check: (state) => state.coins >= 600 },
    { id: "m44", cat: "Loja", title: "Ostentação", desc: "Gaste +200 moedas na loja em um dia.", reward: 40, icon: "fa-cart-plus", check: (state) => !!state.spent200InDay },
    { id: "m45", cat: "Loja", title: "Energia Total", desc: "Chegue ao limite de 10 vidas simultâneas.", reward: 25, icon: "fa-battery-full", check: (state) => state.lives >= 10 },
    { id: "m46", cat: "Loja", title: "Paciente", desc: "Recupere 5 vidas de forma passiva.", reward: 20, icon: "fa-clock", check: (state) => (state.passiveLivesRecovered || 0) >= 5 },
    { id: "m47", cat: "Loja", title: "Colecionador", desc: "Desbloqueie 3 materiais de estudos.", reward: 100, icon: "fa-boxes-stacked", check: (state) => (state.unlockedStudiesCount || 0) >= 3 },
    { id: "m48", cat: "Loja", title: "Dono do Tesouro", desc: "Ganhe 2.000 moedas acumuladas.", reward: 500, icon: "fa-vault", check: (state) => (state.lifetimeCoinsEarned || 0) >= 2000 },
    { id: "m49", cat: "Trilha", title: "Explorador da Fé", desc: "Abra todas as abas do menu principal.", reward: 15, icon: "fa-network-wired", check: (state) => !!state.openedAllTabs },
    { id: "m50", cat: "Mérito", title: "Estudioso Exemplar", desc: "Termine uma fase sem errar a alternativa A.", reward: 20, icon: "fa-check", check: (state) => !!state.noWrongAOption }
];