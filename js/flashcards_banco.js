// js/flashcards_banco.js

// BANCO DE DADOS GLOBAL DE FLASHCARDS
// Contém a Parte 1 de Versículos E as novas Perguntas da Jornada Bíblica
const BANCO_FLASHCARDS = [
    
    // =========================================================================
    // DIVISÃO 1: FLASHCARDS DE VERSÍCULOS (type: "versiculo")
    // =========================================================================

    // DECK 1: Fé e Confiança
    { id: "fc_fe_01", type: "versiculo", category: "Fé e Confiança", front: "Complete o versículo (Hebreus 11:1): 'Ora, a fé é a certeza de que haveremos de receber o que esperamos...'", back: "...e a prova daquilo que não vemos. (Hebreus 11:1 NVI)" },
    { id: "fc_fe_02", type: "versiculo", category: "Fé e Confiança", front: "O que Provérbios 3:5 nos orienta a fazer em relação ao nosso próprio entendimento?", back: "Confie no Senhor de todo o seu coração e não se apóie em seu próprio entendimento. (Provérbios 3:5 NVI)" },
    { id: "fc_fe_03", type: "versiculo", category: "Fé e Confiança", front: "Qual é a promessa no Salmo 37:5 ao entregarmos o nosso caminho ao Senhor?", back: "Entregue o seu caminho ao Senhor; confie nele, e ele agirá. (Salmo 37:5 NVI)" },
    { id: "fc_fe_04", type: "versiculo", category: "Fé e Confiança", front: "O que acontece com aqueles que esperam no Senhor segundo Isaías 40:31?", back: "Renovam as suas forças. Voam bem alto como águias; correm e não ficam exaustos, andam e não se cansam. (Isaías 40:31 NVI)" },
    { id: "fc_fe_05", type: "versiculo", category: "Fé e Confiança", front: "Qual orientação Jesus dá em Marcos 11:24 sobre o que pedimos em oração?", back: "Portanto, eu lhes digo: tudo o que vocês pedirem em oração, creiam que já o receberam, e assim lhes sucederá. (Marcos 11:24 NVI)" },
    { id: "fc_fe_06", type: "versiculo", category: "Fé e Confiança", front: "Como a fé é gerada no coração do homem de acordo com Romanos 10:17?", back: "Consequentemente, a fé vem por ouvir a mensagem, e a mensagem é ouvida por meio da palavra de Cristo. (Romanos 10:17 NVI)" },
    { id: "fc_fe_07", type: "versiculo", category: "Fé e Confiança", front: "Complete o versículo (Salmo 56:3): 'Mas, quando estiver com medo...'", back: "...confiarei em ti. (Salmo 56:3 NVI)" },
    { id: "fc_fe_08", type: "versiculo", category: "Fé e Confiança", front: "O que Mateus 21:22 diz que acontecerá se você crer?", back: "Se vocês crerem, receberão tudo o que pedirem em oração. (Mateus 21:22 NVI)" },
    { id: "fc_fe_09", type: "versiculo", category: "Fé e Confiança", front: "Por que é impossível agradar a Deus sem fé segundo Hebreus 11:6?", back: "Porque quem dele se aproxima precisa crer que ele existe e que recompensa aqueles que o buscam. (Hebreus 11:6 NVI)" },
    { id: "fc_fe_10", type: "versiculo", category: "Fé e Confiança", front: "Como os cristãos vivem seu dia a dia de acordo com 2 Coríntios 5:7?", back: "Porque vivemos por fé, e não pelo que vemos. (2 Coríntios 5:7 NVI)" },

    // DECK 2: Paz e Ansiedade
    { id: "fc_paz_01", type: "versiculo", category: "Paz e Ansiedade", front: "Qual é o antídoto para a ansiedade apresentado em Filipenses 4:6?", back: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. (Filipenses 4:6 NVI)" },
    { id: "fc_paz_02", type: "versiculo", category: "Paz e Ansiedade", front: "O que a paz de Deus faz por nós segundo Filipenses 4:7?", back: "E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus. (Filipenses 4:7 NVI)" },
    { id: "fc_paz_03", type: "versiculo", category: "Paz e Ansiedade", front: "Como Jesus nos dá a Sua paz em João 14:27?", back: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbem os seus corações, nem tenham medo. (João 14:27 NVI)" },
    { id: "fc_paz_04", type: "versiculo", category: "Paz e Ansiedade", front: "Por que devemos lançar nossa ansiedade sobre Deus segundo 1 Pedro 5:7?", back: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês. (1 Pedro 5:7 NVI)" },
    { id: "fc_paz_05", type: "versiculo", category: "Paz e Ansiedade", front: "A quem o Senhor guardará em perfeita paz segundo Isaías 26:3?", back: "Tu, Senhor, guardarás em perfeita paz aquele cujo propósito é firme, porque em ti confia. (Isaías 26:3 NVI)" },
    { id: "fc_paz_06", type: "versiculo", category: "Paz e Ansiedade", front: "Por que não devemos nos preocupar com o amanhã segundo Mateus 6:34?", back: "Pois o amanhã trará as suas próprias preocupações. Basta a cada dia o seu próprio mal. (Mateus 6:34 NVI)" },
    { id: "fc_paz_07", type: "versiculo", category: "Paz e Ansiedade", front: "Por que o salmista consegue deitar e dormir em paz no Salmo 4:8?", back: "Pois só tu, Senhor, me fazes viver em segurança. (Salmo 4:8 NVI)" },
    { id: "fc_paz_08", type: "versiculo", category: "Paz e Ansiedade", front: "Quais são as duas bênçãos concedidas ao povo de Deus no Salmo 29:11?", back: "O Senhor dá força ao seu povo; o Senhor abençoa com paz ao seu povo. (Salmo 29:11 NVI)" },
    { id: "fc_paz_09", type: "versiculo", category: "Paz e Ansiedade", front: "O que Jesus diz que teremos no mundo, seguido de qual encorajamento (João 16:33)?", back: "No mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo. (João 16:33 NVI)" },
    { id: "fc_paz_10", type: "versiculo", category: "Paz e Ansiedade", front: "Qual o papel da paz de Cristo em nossos corações segundo Colossenses 3:15?", back: "Que a paz de Cristo seja o juiz em seus corações, visto que vocês foram chamados para viver em paz... E sejam agradecidos. (Colossenses 3:15 NVI)" },

    // DECK 3: Força e Coragem
    { id: "fc_for_01", type: "versiculo", category: "Força e Coragem", front: "Qual é a ordem e a promessa dada a Josué em Josué 1:9?", back: "Seja forte e corajoso! Não se apavore, nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar. (Josué 1:9 NVI)" },
    { id: "fc_for_02", type: "versiculo", category: "Força e Coragem", front: "Complete a declaração de Filipenses 4:13: 'Tudo posso...'", back: "...naquele que me fortalece. (Filipenses 4:13 NVI)" },
    { id: "fc_for_03", type: "versiculo", category: "Força e Coragem", front: "Por que não devemos temer ou ter medo segundo Isaías 41:10?", back: "Pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa. (Isaías 41:10 NVI)" },
    { id: "fc_for_04", type: "versiculo", category: "Força e Coragem", front: "O que o Senhor representa para o salmista no Salmo 27:1?", back: "O Senhor é a minha luz e a minha salvação; de quem terei temor? O Senhor é o baluarte da minha vida; de quem terei medo? (Salmo 27:1 NVI)" },
    { id: "fc_for_05", type: "versiculo", category: "Força e Coragem", front: "Que tipo de espírito Deus nos deu em vez de covardia (2 Timóteo 1:7)?", back: "Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio. (2 Timóteo 1:7 NVI)" },
    { id: "fc_for_06", type: "versiculo", category: "Força e Coragem", front: "Quem deve ser forte e corajoso de acordo com o Salmo 31:24?", back: "Sejam fortes e corajosos, todos vocês que esperam no Senhor! (Salmo 31:24 NVI)" },
    { id: "fc_for_07", type: "versiculo", category: "Força e Coragem", front: "Onde os cristãos devem buscar fortalecimento segundo Efésios 6:10?", back: "Finalmente, fortaleçam-se no Senhor e no seu forte poder. (Efésios 6:10 NVI)" },
    { id: "fc_for_08", type: "versiculo", category: "Força e Coragem", front: "Como Deus é definido no Salmo 46:1?", back: "Deus é o nosso refúgio e a nossa força, auxílio sempre presente na adversidade. (Salmo 46:1 NVI)" },
    { id: "fc_for_09", type: "versiculo", category: "Força e Coragem", front: "Quais são as quatro exortações de 1 Coríntios 16:13?", back: "Estejam vigilantes, mantenham-se firmes na fé, sejam homens de coragem, sejam fortes. (1 Coríntios 16:13 NVI)" },
    { id: "fc_for_10", type: "versiculo", category: "Força e Coragem", front: "O que Deus faz pelo caminho do salmista segundo o Salmo 18:32?", back: "Ele é o Deus que me reveste de força e torna perfeito o meu caminho. (Salmo 18:32 NVI)" },

    // DECK 4: Amor e Unidade
    { id: "fc_amo_01", type: "versiculo", category: "Amor e Unidade", front: "Como as primeiras características do amor são descritas em 1 Coríntios 13:4?", back: "O amor é paciente, o amor é bondoso. Não inveja, não se gaba, não se orgulha. (1 Coríntios 13:4 NVI)" },
    { id: "fc_amo_02", type: "versiculo", category: "Amor e Unidade", front: "Quais são as três virtudes que permanecem, e qual é a maior (1 Coríntios 13:13)?", back: "Permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor. (1 Coríntios 13:13 NVI)" },
    { id: "fc_amo_03", type: "versiculo", category: "Amor e Unidade", front: "Qual é a razão pela qual nós amamos segundo 1 João 4:19?", back: "Nós amamos porque ele nos amou primeiro. (1 João 4:19 NVI)" },
    { id: "fc_amo_04", type: "versiculo", category: "Amor e Unidade", front: "Qual novo mandamento Jesus nos deixou em João 13:34?", back: "Amem-se uns aos outros. Como eu os amei, vocês devem amar-se uns aos outros. (João 13:34 NVI)" },
    { id: "fc_amo_05", type: "versiculo", category: "Amor e Unidade", front: "Do que devemos nos revestir acima de tudo, segundo Colossenses 3:14?", back: "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito. (Colossenses 3:14 NVI)" },
    { id: "fc_amo_06", type: "versiculo", category: "Amor e Unidade", front: "Por que devemos nos amar sinceramente uns aos outros (1 Pedro 4:8)?", back: "Porque o amor cobre uma multidão de pecados. (1 Pedro 4:8 NVI)" },
    { id: "fc_amo_07", type: "versiculo", category: "Amor e Unidade", front: "De onde procede o amor e quem conhece a Deus de acordo com 1 João 4:7?", back: "O amor procede de Deus. Aquele que ama é nascido de Deus e conhece a Deus. (1 João 4:7 NVI)" },
    { id: "fc_amo_08", type: "versiculo", category: "Amor e Unidade", front: "Como deve ser a nossa dedicação mútua e preferência segundo Romanos 12:10?", back: "Dediquem-se uns aos outros com amor fraternal. Prefiram dar honra aos outros mais do que a si mesmos. (Romanos 12:10 NVI)" },
    { id: "fc_amo_09", type: "versiculo", category: "Amor e Unidade", front: "Como NÃO devemos amar e como DEVEMOS amar segundo 1 João 3:18?", back: "Filhinhos, não amemos de palavra nem de boca, mas em ação e em verdade. (1 João 3:18 NVI)" },
    { id: "fc_amo_10", type: "versiculo", category: "Amor e Unidade", front: "Pelo que devemos nos esforçar para conservar segundo Efésios 4:3?", back: "Façam todo o esforço para conservar a unidade do Espírito pelo vínculo da paz. (Efésios 4:3 NVI)" },

    // DECK 5: Salvação e Graça
    { id: "fc_sal_01", type: "versiculo", category: "Salvação e Graça", front: "De onde vem e de onde NÃO vem a salvação segundo Efésios 2:8?", back: "Pois vocês são salvos pela graça, por meio da fé, e isto não vem de vocês, é dom de Deus. (Efésios 2:8 NVI)" },
    { id: "fc_sal_02", type: "versiculo", category: "Salvação e Graça", front: "Qual é o contraste entre o salário do pecado e o dom de Deus em Romanos 6:23?", back: "O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor. (Romanos 6:23 NVI)" },
    { id: "fc_sal_03", type: "versiculo", category: "Salvação e Graça", front: "Qual a demonstração do amor de Deus pelo mundo relatada em João 3:16?", back: "Que deu o seu Filho Unigênito, para que todo o que nele crer não perante, mas tenha a vida eterna. (João 3:16 NVI)" },
    { id: "fc_sal_04", type: "versiculo", category: "Salvação e Graça", front: "Como Deus demonstra o Seu amor por nós em Romanos 5:8?", back: "Cristo morreu em nosso favor quando ainda éramos pecadores. (Romanos 5:8 NVI)" },
    { id: "fc_sal_05", type: "versiculo", category: "Salvação e Graça", front: "Quais são as duas condições para ser salvo segundo Romanos 10:9?", back: "Confessar com a sua boca que Jesus é Senhor e crer em seu coração que Deus o ressuscitou dos mortos. (Romanos 10:9 NVI)" },
    { id: "fc_sal_06", type: "versiculo", category: "Salvação e Graça", front: "O que o Senhor disse a Paulo sobre a Sua graça em 2 Coríntios 12:9?", back: "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza. (2 Coríntios 12:9 NVI)" },
    { id: "fc_sal_07", type: "versiculo", category: "Salvação e Graça", front: "O que se manifestou salvadora a todos os homens segundo Tito 2:11?", back: "Porque a graça de Deus se manifestou salvadora a todos os homens. (Tito 2:11 NVI)" },
    { id: "fc_sal_08", type: "versiculo", category: "Salvação e Graça", front: "Existe salvação em outro nome além de Jesus Cristo segundo Atos 4:12?", back: "Não há salvação em nenhum outro, pois debaixo do céu não há nenhum outro nome dado aos homens pelo qual devamos ser salvos. (Atos 4:12 NVI)" },
    { id: "fc_sal_09", type: "versiculo", category: "Salvação e Graça", front: "Qual é a situação atual daqueles que estão em Cristo Jesus (Romanos 8:1)?", back: "Portanto, agora já não há condenação para os que estão em Cristo Jesus. (Romanos 8:1 NVI)" },
    { id: "fc_sal_10", type: "versiculo", category: "Salvação e Graça", front: "Qual direito foi dado àqueles que receberam e creram no nome de Jesus (João 1:12)?", back: "Deu-lhes o direito de se tornarem filhos de Deus. (João 1:12 NVI)" },

    // DECK 6: Sabedoria e Direção
    { id: "fc_sab_01", type: "versiculo", category: "Sabedoria e Direção", front: "O que deve fazer quem tem falta de sabedoria segundo Tiago 1:5?", back: "Peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida. (Tiago 1:5 NVI)" },
    { id: "fc_sab_02", type: "versiculo", category: "Sabedoria e Direção", front: "Qual é o princípio do conhecimento e o que os insensatos desprezam (Provérbios 1:7)?", back: "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria e a disciplina. (Provérbios 1:7 NVI)" },
    { id: "fc_sab_03", type: "versiculo", category: "Sabedoria e Direção", front: "O que a Palavra de Deus representa para os passos do salmista no Salmo 119:105?", back: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho. (Salmo 119:105 NVI)" },
    { id: "fc_sab_04", type: "versiculo", category: "Sabedoria e Direção", front: "Qual é o conselho fundamental da sabedoria em Provérbios 4:7?", back: "Procure obter sabedoria; use tudo o que você possui para adquirir entendimento. (Provérbios 4:7 NVI)" },
    { id: "fc_sab_05", type: "versiculo", category: "Sabedoria e Direção", front: "Qual a diferença entre o planejamento do homem e a ação do Senhor em Provérbios 16:9?", back: "Em seu coração o homem planeja o seu caminho, mas o Senhor determina os seus passos. (Provérbios 16:9 NVI)" },
    { id: "fc_sab_06", type: "versiculo", category: "Sabedoria e Direção", front: "Qual é a promessa de orientação divina registrada no Salmo 32:8?", back: "Eu o instruirei e o ensinarei no caminho que você deve seguir; eu o aconselharei e cuidarei de você. (Salmo 32:8 NVI)" },
    { id: "fc_sab_07", type: "versiculo", category: "Sabedoria e Direção", front: "Quais são as qualidades da sabedoria que vem do alto (Tiago 3:17)?", back: "É antes de tudo pura; depois, pacífica, amável, compreensiva, cheia de misericórdia e de bons frutos, imparcial e sincera. (Tiago 3:17 NVI)" },
    { id: "fc_sab_08", type: "versiculo", category: "Sabedoria e Direção", front: "O que é o princípio da sabedoria e o conhecimento do Santo em Provérbios 9:10?", back: "O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é entendimento. (Provérbios 9:10 NVI)" },
    { id: "fc_sab_09", type: "versiculo", category: "Sabedoria e Direção", front: "O que a voz aos nossos ouvidos dirá quando mudarmos de direção (Isaías 30:21)?", back: "'Este é o caminho; siga-o'. (Isaías 30:21 NVI)" },
    { id: "fc_sab_10", type: "versiculo", category: "Sabedoria e Direção", front: "O que prevalece diante dos muitos planos no coração do homem (Provérbios 19:21)?", back: "Muitos são os planos no coração do homem, mas o que prevalece é o propósito do Senhor. (Provérbios 19:21 NVI)" },

    // DECK 7: Oração e Clamor
    { id: "fc_ora_01", type: "versiculo", category: "Oração e Clamor", front: "O que Deus nos responderá se clamarmos a Ele segundo Jeremias 33:3?", back: "Clame a mim e eu responderei e lhe direi coisas grandiosas e insondáveis que você não conhece. (Jeremias 33:3 NVI)" },
    { id: "fc_ora_02", type: "versiculo", category: "Oração e Clamor", front: "Qual a curtíssima e poderosa instrução sobre oração em 1 Tessalonicenses 5:17?", back: "Orem continuamente. (1 Tessalonicenses 5:17 NVI)" },
    { id: "fc_ora_03", type: "versiculo", category: "Oração e Clamor", front: "De quem o Senhor está perto de acordo com o Salmo 145:18?", back: "O Senhor está perto de todos os que o invocam, de todos os que o invocam com sinceridade. (Salmo 145:18 NVI)" },
    { id: "fc_ora_04", type: "versiculo", category: "Oração e Clamor", front: "Quais são as três ações e respostas prometidas em Mateus 7:7?", back: "Peçam, e lhes será dado; busquem, e encontrarão; batam, e a porta lhes será aberta. (Mateus 7:7 NVI)" },
    { id: "fc_ora_05", type: "versiculo", category: "Oração e Clamor", front: "O que acontecerá quando clamarmos e orarmos a Deus segundo Jeremias 29:12?", back: "Então vocês clamarão a mim, virão orar a mim, e eu os ouvirei. (Jeremias 29:12 NVI)" },
    { id: "fc_ora_06", type: "versiculo", category: "Oração e Clamor", front: "O que devemos fazer ao orar se tivermos algo contra alguém (Marcos 11:25)?", back: "Perdoem-no, para que o Pai de vocês que está nos céus também perdoe os seus pecados. (Marcos 11:25 NVI)" },
    { id: "fc_ora_07", type: "versiculo", category: "Oração e Clamor", front: "Como deve ser a oração do justo de acordo com Tiago 5:16?", back: "Confessem os seus pecados uns aos outros e orem uns pelos outros... A oração de um justo é poderosa e eficaz. (Tiago 5:16 NVI)" },
    { id: "fc_ora_08", type: "versiculo", category: "Oração e Clamor", front: "O que acontece quando os justos clamam no Salmo 34:17?", back: "Os justos clamam, o Senhor os ouve e os livra de todas as suas tribulações. (Salmo 34:17 NVI)" },
    { id: "fc_ora_09", type: "versiculo", category: "Oração e Clamor", front: "Qual recomendação sobre o estado mental ao orar está em Colossenses 4:2?", back: "Dediquem-se à oração, estejam alertas e sejam agradecidos. (Colossenses 4:2 NVI)" },
    { id: "fc_ora_10", type: "versiculo", category: "Oração e Clamor", front: "Qual a confirmação de resposta à oração deixada no Salmo 66:19?", back: "Contudo, Deus me ouviu, deu atenção à minha oração. (Salmo 66:19 NVI)" },

    // DECK 8: Esperança e Futuro
    { id: "fc_esp_01", type: "versiculo", category: "Esperança e Futuro", front: "Que tipo de planos o Senhor tem para nós de acordo com Jeremias 29:11?", back: "Planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro. (Jeremias 29:11 NVI)" },
    { id: "fc_esp_02", type: "versiculo", category: "Esperança e Futuro", front: "Como Deus age em todas as coisas para os que o amam (Romanos 8:28)?", back: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito. (Romanos 8:28 NVI)" },
    { id: "fc_esp_03", type: "versiculo", category: "Esperança e Futuro", front: "Do que o Deus da esperança deseja nos encher segundo Romanos 15:13?", back: "Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele, para que vocês transbordem de esperança... (Romanos 15:13 NVI)" },
    { id: "fc_esp_04", type: "versiculo", category: "Esperança e Futuro", front: "Por que não somos consumidos segundo Lamentações 3:22?", back: "Graças ao grande amor do Senhor não somos consumidos, pois as suas misericórdias são inesgotáveis. (Lamentações 3:22 NVI)" },
    { id: "fc_esp_05", type: "versiculo", category: "Esperança e Futuro", front: "Com qual frequência se renovam as misericórdias de Deus (Lamentações 3:23)?", back: "Renovam-se cada manhã; grande é a tua fidelidade. (Lamentações 3:23 NVI)" },
    { id: "fc_esp_06", type: "versiculo", category: "Esperança e Futuro", front: "Quais são as três ordens práticas de Romanos 12:12 sobre o futuro?", back: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração. (Romanos 12:12 NVI)" },
    { id: "fc_esp_07", type: "versiculo", category: "Esperança e Futuro", front: "O que deixará de existir no novo céu e nova terra segundo Apocalipse 21:4?", back: "Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor... (Apocalipse 21:4 NVI)" },
    { id: "fc_esp_08", type: "versiculo", category: "Esperança e Futuro", front: "O que Deus promete abrir até mesmo no deserto em Isaías 43:19?", back: "Vejam, estou fazendo uma coisa nova! [...] Até no deserto farei um caminho e riachos no ermo. (Isaías 43:19 NVI)" },
    { id: "fc_esp_09", type: "versiculo", category: "Esperança e Futuro", front: "Onde o salmista coloca a sua esperança no Salmo 130:5?", back: "Espero no Senhor com todo o meu ser, e na sua palavra ponho a minha esperança. (Salmo 130:5 NVI)" },
    { id: "fc_esp_10", type: "versiculo", category: "Esperança e Futuro", front: "O que nossos sofrimentos leves e momentâneos estão produzindo (2 Coríntios 4:17)?", back: "Estão produzindo para nós uma glória eterna que pesa mais que todos eles. (2 Coríntios 4:17 NVI)" },


    // =========================================================================
    // DIVISÃO 2: FLASHCARDS DE PERGUNTAS / QUIZ (type: "pergunta")
    // =========================================================================
    
    // DECK UNIFICADO: Jornada Bíblica - Mundo 1 & 2
    { id: "m1_f1_q1", type: "pergunta", category: "Jornada Bíblica", front: "Quantos dias a Bíblia diz que Deus levou para criar o mundo e descansar?", back: "7 dias" },
    { id: "m1_f1_q2", type: "pergunta", category: "Jornada Bíblica", front: "O que Deus criou no primeiro dia?", back: "A luz" },
    { id: "m1_f1_q3", type: "pergunta", category: "Jornada Bíblica", front: "De onde Deus tirou a costela para criar a primeira mulher, Eva?", back: "Do corpo de Adão" },
    { id: "m1_f1_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome do jardim onde Adão e Eva moravam?", back: "Jardim do Éden" },
    { id: "m1_f1_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual animal enganou Eva para que ela comesse o fruto proibido?", back: "A serpente" },

    { id: "m1_f2_q1", type: "pergunta", category: "Jornada Bíblica", front: "Por que Deus decidiu enviar o Dilúvio sobre a Terra?", back: "Por causa da maldade e corrupção humana" },
    { id: "m1_f2_q2", type: "pergunta", category: "Jornada Bíblica", front: "Quantas pessoas entraram na Arca de Noé?", back: "Oito pessoas" },
    { id: "m1_f2_q3", type: "pergunta", category: "Jornada Bíblica", front: "De quantos em quantos animais considerados 'impuros' entraram na arca?", back: "Um casal de cada" },
    { id: "m1_f2_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual ave Noé soltou primeiro e que não voltou para a arca?", back: "Um corvo" },
    { id: "m1_f2_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual sinal Deus colocou no céu como promessa de que nunca mais destruiria a Terra com água?", back: "O arco-íris" },

    { id: "m1_f3_q1", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o profissão de Davi antes de se tornar um guerreiro e rei?", back: "Pastor de ovelhas" },
    { id: "m1_f3_q2", type: "pergunta", category: "Jornada Bíblica", front: "A qual povo pertencia o gigante Golias?", back: "Filisteus" },
    { id: "m1_f3_q3", type: "pergunta", category: "Jornada Bíblica", front: "Quantas pedras Davi pegou no ribeiro para enfrentar o gigante?", back: "Cinco pedras" },
    { id: "m1_f3_q4", type: "pergunta", category: "Jornada Bíblica", front: "Que arma Davi usou para derrubar Golias?", back: "Uma funda e uma pedra" },
    { id: "m1_f3_q5", type: "pergunta", category: "Jornada Bíblica", front: "O que Davi usou para cortar a cabeça de Golias após ele cair?", back: "A própria espada de Golias" },

    { id: "m1_f4_q1", type: "pergunta", category: "Jornada Bíblica", front: "Onde a mãe de Moisés o colocou para salvá-lo da morte quando ele era bebê?", back: "Num cesto de junco no rio Nilo" },
    { id: "m1_f4_q2", type: "pergunta", category: "Jornada Bíblica", front: "Através de que objeto Deus falou com Moisés no deserto pela primeira vez?", back: "Uma sarça ardente" },
    { id: "m1_f4_q3", type: "pergunta", category: "Jornada Bíblica", front: "Qual foi a primeira praga enviada ao Egito?", back: "A transformação da água em sangue" },
    { id: "m1_f4_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual foi a décima e última praga, que convenceu o Faraó a libertar o povo?", back: "A morte dos primogênitos" },
    { id: "m1_f4_q5", type: "pergunta", category: "Jornada Bíblica", front: "Que mar se abriu para que o povo de Israel passasse a pé enxuto?", back: "O Mar Vermelho" },

    { id: "m1_f5_q1", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o segredo da grande força de Sansão?", back: "O seu cabelo que nunca havia sido cortado" },
    { id: "m1_f5_q2", type: "pergunta", category: "Jornada Bíblica", front: "Que animal feroz Sansão rasgou ao meio com as próprias mãos?", back: "Um leão" },
    { id: "m1_f5_q3", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome da mulher que traiu Sansão descobrindo o seu segredo?", back: "Dalila" },
    { id: "m1_f5_q4", type: "pergunta", category: "Jornada Bíblica", front: "O que os filisteus fizeram com os olhos de Sansão após capturá-lo?", back: "Furaram os seus olhos" },
    { id: "m1_f5_q5", type: "pergunta", category: "Jornada Bíblica", front: "Como Sansão morreu?", back: "Derrubando as colunas do templo filisteu" },

    { id: "m1_f6_q1", type: "pergunta", category: "Jornada Bíblica", front: "Para qual reino Daniel e seus amigos foram levados como prisioneiros?", back: "Babilônia" },
    { id: "m1_f6_q2", type: "pergunta", category: "Jornada Bíblica", front: "Por que Daniel foi jogado na cova dos leões?", back: "Porque continuou orando a Deus desobedecendo ao rei" },
    { id: "m1_f6_q3", type: "pergunta", category: "Jornada Bíblica", front: "Quem o rei viu na fornalha ardente junto com os três amigos de Daniel?", back: "Um quarto homem semelhante a um anjo" },
    { id: "m1_f6_q4", type: "pergunta", category: "Jornada Bíblica", front: "Por que os leões não machucaram Daniel?", back: "Porque Deus enviou o seu anjo e fechou a boca dos leões" },
    { id: "m1_f6_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome babilônico dado a Daniel na corte?", back: "Beltessazar" },

    { id: "m1_f7_q1", type: "pergunta", category: "Jornada Bíblica", front: "Para qual cidade Deus mandou Jonas ir pregar?", back: "Nínive" },
    { id: "m1_f7_q2", type: "pergunta", category: "Jornada Bíblica", front: "O que Jonas fez quando recebeu a ordem de Deus?", back: "Fugiu em um navio na direção oposta" },
    { id: "m1_f7_q3", type: "pergunta", category: "Jornada Bíblica", front: "Como Jonas foi parar dentro do mar durante a tempestade?", back: "Os marinheiros o lançaram ao mar a pedido dele" },
    { id: "m1_f7_q4", type: "pergunta", category: "Jornada Bíblica", front: "Quantos dias Jonas ficou dentro da barriga do grande peixe?", back: "3 dias e 3 noites" },
    { id: "m1_f7_q5", type: "pergunta", category: "Jornada Bíblica", front: "O que a cidade de Nínive fez após ouvir a pregação de Jonas?", back: "Todos se arrependeram e jejuaram" },

    { id: "m1_f8_q1", type: "pergunta", category: "Jornada Bíblica", front: "Em qual cidade Jesus nasceu?", back: "Belém" },
    { id: "m1_f8_q2", type: "pergunta", category: "Jornada Bíblica", front: "Onde Jesus foi deitado logo após nascer por não haver lugar na hospedaria?", back: "Num manjedoura" },
    { id: "m1_f8_q3", type: "pergunta", category: "Jornada Bíblica", front: "Que sinal no céu guiou os Reis Magos até o menino Jesus?", back: "Uma estrela" },
    { id: "m1_f8_q4", type: "pergunta", category: "Jornada Bíblica", front: "Quais foram os três presentes que os Magos ofereceram a Jesus?", back: "Ouro, incenso e mirra" },
    { id: "m1_f8_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual rei mandou matar os bebês de Belém tentando eliminar Jesus?", back: "Rei Herodes" },

    { id: "m1_f9_q1", type: "pergunta", category: "Jornada Bíblica", front: "Qual foi o primeiro milagre realizado por Jesus publicamente?", back: "Transformou água em vinho" },
    { id: "m1_f9_q2", type: "pergunta", category: "Jornada Bíblica", front: "Quantos pães e peixes Jesus usou para alimentar uma multidão de 5 mil homens?", back: "Cinco pães e dois peixes" },
    { id: "m1_f9_q3", type: "pergunta", category: "Jornada Bíblica", front: "O que Jesus fez para acalmar a tempestade no mar que assustava os discípulos?", back: "Repreendeu o vento e o mar ordenando calma" },
    { id: "m1_f9_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual amigo de Jesus foi ressuscitado por Ele após estar morto há quatro dias?", back: "Lázaro" },
    { id: "m1_f9_q5", type: "pergunta", category: "Jornada Bíblica", front: "Como Jesus curou o cego de nascença no tanque de Siloé?", back: "Fez lama com saliva e terra, passou nos olhos dele e mandou lavar" },

    { id: "m1_f10_q1", type: "pergunta", category: "Jornada Bíblica", front: "Na parábola do Filho Pródigo, o que o filho mais novo pediu ao pai antes de ir embora?", back: "A sua parte da herança" },
    { id: "m1_f10_q2", type: "pergunta", category: "Jornada Bíblica", front: "Quem foi o único que parou para ajudar o homem assaltado na parábola famosa?", back: "O Samaritano" },
    { id: "m1_f10_q3", type: "pergunta", category: "Jornada Bíblica", front: "Na parábola da Ovelha Perdida, quantas ovelhas o pastor deixou seguras para buscar a que sumiu?", back: "Noventa e nove (99)" },
    { id: "m1_f10_q4", type: "pergunta", category: "Jornada Bíblica", front: "Na parábola do Semeador, o que aconteceu com as sementes que caíram entre os espinhos?", back: "Foram sufocadas pelos espinhos e não frutificaram" },
    { id: "m1_f10_q5", type: "pergunta", category: "Jornada Bíblica", front: "O homem sábio construiu sua casa sobre a rocha. Sobre o que o homem insensato construiu a sua?", back: "Sobre a areia" },

    { id: "m1_f11_q1", type: "pergunta", category: "Jornada Bíblica", front: "O que Deus pediu para Abraão deixar quando o chamou?", back: "Sua terra, sua parentela e a casa de seu pai" },
    { id: "m1_f11_q2", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome da esposa de Abraão?", back: "Sara" },
    { id: "m1_f11_q3", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome do filho da promessa que Abraão teve na velhice?", back: "Isaque" },
    { id: "m1_f11_q4", type: "pergunta", category: "Jornada Bíblica", front: "Que teste difícil Deus pediu para Abraão fazer envolvendo seu filho Isaque?", back: "Que o oferecesse em sacrifício" },
    { id: "m1_f11_q5", type: "pergunta", category: "Jornada Bíblica", front: "O que Deus providenciou para ser sacrificado no lugar de Isaque?", back: "Um cordeiro preso pelos chifres num matagal" },

    { id: "m1_f12_q1", type: "pergunta", category: "Jornada Bíblica", front: "O que o pai de José (Jacó) deu a ele que causou ciúmes em seus irmãos?", back: "Uma túnica colorida" },
    { id: "m1_f12_q2", type: "pergunta", category: "Jornada Bíblica", front: "O que os irmãos de José fizeram com ele em vez de matá-lo?", back: "Venderam-no para mercadores nômades" },
    { id: "m1_f12_q3", type: "pergunta", category: "Jornada Bíblica", front: "Para qual país José foi levado como escravo?", back: "Egito" },
    { id: "m1_f12_q4", type: "pergunta", category: "Jornada Bíblica", front: "Que dom José tinha que o ajudou a sair da prisão no Egito?", back: "O dom de interpretar sonhos" },
    { id: "m1_f12_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual cargo José assumiu após decifrar os sonhos do Faraó?", back: "Governador do Egito" },

    { id: "m1_f13_q1", type: "pergunta", category: "Jornada Bíblica", front: "Em qual monte Moisés recebeu as tábuas da Lei de Deus?", back: "Monte Sinai" },
    { id: "m1_f13_q2", type: "pergunta", category: "Jornada Bíblica", front: "O segundo mandamento proíbe fazer e adorar o quê?", back: "Imagens de escultura (ídolos)" },
    { id: "m1_f13_q3", type: "pergunta", category: "Jornada Bíblica", front: "Qual dia da semana o quarto mandamento ordena guardar e santificar?", back: "O sábado" },
    { id: "m1_f13_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual é o primeiro mandamento que vem acompanhado de uma promessa de vida longa?", back: "Honrar pai e mãe" },
    { id: "m1_f13_q5", type: "pergunta", category: "Jornada Bíblica", front: "Que erro o povo cometeu ao pé do monte enquanto Moisés demorava a descer?", back: "Construíram e adoraram um bezerro de ouro" },

    { id: "m1_f14_q1", type: "pergunta", category: "Jornada Bíblica", front: "Quantos discípulos faziam parte do círculo principal escolhido por Jesus?", back: "Doze (12)" },
    { id: "m1_f14_q2", type: "pergunta", category: "Jornada Bíblica", front: "Qual era a profissão dos irmãos Pedro e André antes de seguirem Jesus?", back: "Pescadores" },
    { id: "m1_f14_q3", type: "pergunta", category: "Jornada Bíblica", front: "Qual discípulo andou sobre as águas em direção a Jesus, mas afundou por temer o vento?", back: "Pedro" },
    { id: "m1_f14_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual discípulo disse que só acreditaria na ressurreição se visse as marcas dos cravos nas mãos de Jesus?", back: "Tomé" },
    { id: "m1_f14_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual discípulo traiu Jesus por 30 moedas de prata?", back: "Judas Iscariotes" },

    { id: "m1_f15_q1", type: "pergunta", category: "Jornada Bíblica", front: "Em qual jardim Jesus foi orar antes de ser preso e transpirou gotas de sangue?", back: "Getsêmani (ou Jardim das Oliveiras)" },
    { id: "m1_f15_q2", type: "pergunta", category: "Jornada Bíblica", front: "Que sinal Judas usou para identificar Jesus para os guardas no momento da prisão?", back: "Um beijo" },
    { id: "m1_f15_q3", type: "pergunta", category: "Jornada Bíblica", front: "Quantas vezes Pedro negou conhecer Jesus antes que o galo cantasse?", back: "Três vezes" },
    { id: "m1_f15_q4", type: "pergunta", category: "Jornada Bíblica", front: "Qual governador romano lavou as mãos dizendo que estava inocente do sangue de Jesus?", back: "Pôncio Pilatos" },
    { id: "m1_f15_q5", type: "pergunta", category: "Jornada Bíblica", front: "Qual era o nome do lugar onde Jesus foi crucificado (conhecido como Lugar da Caveira)?", back: "Gólgota (ou Calvário)" },

    { id: "m1_f16_q1", type: "pergunta", category: "Jornada Bíblica", front: "Em qual dia da semana as mulheres foram ao sepulcro e descobriram que Jesus tinha ressuscitado?", back: "No primeiro dia da semana (Domingo)" },
    { id: "m1_f16_q2", type: "pergunta", category: "Jornada Bíblica", front: "Quem removeu a grande pedra que fechava a entrada do túmulo de Jesus?", back: "Um anjo do Senhor" },
    { id: "m1_f16_q3", type: "pergunta", category: "Jornada Bíblica", front: "Quem foi a primeira pessoa a ver e falar com Jesus ressuscitado perto do túmulo?", back: "Maria Madalena" },
    { id: "m1_f16_q4", type: "pergunta", category: "Jornada Bíblica", front: "Quantos dias Jesus permaneceu na Terra aparecendo aos discípulos após ressuscitar?", back: "40 dias" },
    { id: "m1_f16_q5", type: "pergunta", category: "Jornada Bíblica", front: "O que aconteceu com Jesus no final do Evangelho de Lucas quando Ele abençoava os discípulos?", back: "Ele foi elevado ao céu (Ascensão)" },

   
];

// 2. CONTROLE DE ESTADO GLOBAL
let flashcardProgress = { activeCategories: [], cardsState: {} };

// Carregamento isolado do LocalStorage
(function loadSecureProgress() {
    try {
        const localData = localStorage.getItem("biblical_flashcards_progress");
        if (localData) {
            const parsed = JSON.parse(localData);
            if (parsed && Array.isArray(parsed.activeCategories) && parsed.cardsState) {
                flashcardProgress = parsed;
            }
        }
    } catch (error) {
        console.error("Erro ao carregar progresso dos flashcards:", error);
    }
})();

// Variáveis de controle operacional
let currentQueue = [];
let currentIndex = 0;
let isFlipped = false;

// 3. INICIALIZADOR PRINCIPAL
function initFlashcardsModule() {
    isFlipped = false;
    currentIndex = 0;
    
    const dashView = document.getElementById("fc-view-dashboard");
    const studyView = document.getElementById("fc-view-study-session");
    if (dashView) dashView.style.display = "block";
    if (studyView) studyView.style.display = "none";

    const nativeAlert = document.getElementById("fc-native-alert");
    if (nativeAlert) nativeAlert.style.display = "none";

    buildTodayQueue();
    renderDecksManager();

    const dashCountEl = document.getElementById("fc-dash-count");
    if (dashCountEl) dashCountEl.textContent = currentQueue.length;
}

// 4. LÓGICA DE FILTRAGEM (REPETIÇÃO ESPAÇADA)
function buildTodayQueue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    currentQueue = BANCO_FLASHCARDS.filter(card => {
        // Regra 1: O deck deve estar ativo
        if (!flashcardProgress.activeCategories.includes(card.category)) return false;
        
        // Regra 2: Se for novo ou se a data de revisão chegou
        const nextReview = flashcardProgress.cardsState[card.id];
        if (!nextReview) return true; 
        return nextReview <= todayStr;
    });

    // Embaralha a fila para não ser sempre na mesma ordem
    currentQueue.sort(() => Math.random() - 0.5);
}

function startFlashcardSession() {
    const nativeAlert = document.getElementById("fc-native-alert");

    if (currentQueue.length === 0) {
        if (nativeAlert) {
            nativeAlert.style.display = "block";
            setTimeout(() => { nativeAlert.style.display = "none"; }, 4000);
        }
        return;
    }
    
    const dashView = document.getElementById("fc-view-dashboard");
    const studyView = document.getElementById("fc-view-study-session");
    if (dashView) dashView.style.display = "none";
    if (studyView) studyView.style.display = "block";
    
    // Ocultar a navbar ao iniciar sessão de flashcards
    const navbar = document.querySelector(".app-navbar");
    if (navbar) navbar.classList.add("navbar-hidden");
    
    currentIndex = 0;
    isFlipped = false;
    
    const inner = document.getElementById("flashcard-inner");
    if (inner) inner.style.transform = "rotateY(0deg)";
    
    toggleActionButtons(false);
    updateCardDOM();

    // Atualiza estatísticas de missões se o gameState existir
    if (window.gameState) {
        window.gameState.openedFlashcards = (window.gameState.openedFlashcards || 0) + 1;
        if (window.updateHeaderStats) window.updateHeaderStats();
    }
}

function exitFlashcardSession() {
    // Mostrar a navbar ao sair da sessão de flashcards
    const navbar = document.querySelector(".app-navbar");
    if (navbar) navbar.classList.remove("navbar-hidden");
    
    initFlashcardsModule();
}

function updateCardDOM() {
    const totalCountEl = document.getElementById("fc-total-count");
    const currentIndexEl = document.getElementById("fc-current-index");
    const frontCat = document.getElementById("fc-front-category");
    const frontTxt = document.getElementById("fc-front-text");
    const backTxt = document.getElementById("fc-back-text");

    if (!totalCountEl) return;
    totalCountEl.textContent = currentQueue.length;

    if (currentIndex >= currentQueue.length) {
        // Fim da sessão
        showSessionComplete();
        return;
    }

    currentIndexEl.textContent = currentIndex + 1;
    const currentCard = currentQueue[currentIndex];

    if (frontCat) frontCat.textContent = currentCard.category;
    if (frontTxt) frontTxt.textContent = currentCard.front;
    if (backTxt) backTxt.textContent = currentCard.back;
}

function showSessionComplete() {
    // Atualiza missão de round perfeito
    if (window.gameState) {
        if (!window.gameState.sessionHasError) {
            window.gameState.perfectCardRound = true;
        }
        window.gameState.sessionHasError = false; // Reseta para a próxima
        if (window.updateHeaderStats) window.updateHeaderStats();
    }

    const studyView = document.getElementById("fc-view-study-session");
    if (studyView) {
        studyView.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
                <h2 style="color: var(--text-main); margin-bottom: 10px;">Treino Concluído!</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">Você revisou todos os cartões agendados para hoje.</p>
                <button onclick="exitFlashcardSession()" style="background: #487E56; color: white; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 800; cursor: pointer;">
                    Voltar ao Início
                </button>
            </div>
        `;
    }
}

function flipFlashcard() {
    if (currentIndex >= currentQueue.length) return;
    const inner = document.getElementById("flashcard-inner");
    if (!inner) return;

    isFlipped = !isFlipped;
    inner.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
    toggleActionButtons(isFlipped);
}

function toggleActionButtons(showSpaced) {
    const revealBtn = document.getElementById("btn-fc-reveal-action");
    const controllers = document.getElementById("fc-spaced-controllers");

    if (!revealBtn || !controllers) return;

    if (showSpaced) {
        revealBtn.style.display = "none";
        controllers.style.display = "flex";
    } else {
        revealBtn.style.display = "flex";
        controllers.style.display = "none";
    }
}

// 5. SISTEMA DE REPETIÇÃO ESPAÇADA (DIFICULDADE)
function handleSpacedRepetition(difficulty) {
    if (currentIndex >= currentQueue.length) return;
    const card = currentQueue[currentIndex];

    let daysToAdd = 1;
    if (difficulty === 'easy') daysToAdd = 5;
    if (difficulty === 'medium') daysToAdd = 3;
    if (difficulty === 'hard') daysToAdd = 1;

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    const futureStr = futureDate.toISOString().split('T')[0];

    // Salva o novo estado
    flashcardProgress.cardsState[card.id] = futureStr;
    localStorage.setItem("biblical_flashcards_progress", JSON.stringify(flashcardProgress));

    // Atualiza estatísticas de missões
    if (window.gameState) {
        window.gameState.totalFlashcardsReviewed = (window.gameState.totalFlashcardsReviewed || 0) + 1;
        
        if (difficulty === 'easy') {
            window.gameState.totalFlashcardsCorrect = (window.gameState.totalFlashcardsCorrect || 0) + 1;
            window.gameState.flashcardsStreak = (window.gameState.flashcardsStreak || 0) + 1;
        } else {
            window.gameState.flashcardsStreak = 0; // Reseta streak se não for fácil
            window.gameState.sessionHasError = true; // Marca que errou nesta sessão
        }
        
        if (window.updateHeaderStats) window.updateHeaderStats();
    }

    // Transição para o próximo card
    const inner = document.getElementById("flashcard-inner");
    if (inner) inner.style.transform = "rotateY(0deg)";
    
    isFlipped = false;
    toggleActionButtons(false);

    setTimeout(() => {
        currentIndex++;
        updateCardDOM();
    }, 300);
}

// 6. GERENCIADOR DE DECKS
function renderDecksManager() {
    const container = document.getElementById("fc-decks-list-container");
    if (!container) return;
    container.innerHTML = "";

    // Agrupa cartões por categoria
    const categoriesMap = {};
    BANCO_FLASHCARDS.forEach(card => {
        categoriesMap[card.category] = (categoriesMap[card.category] || 0) + 1;
    });

    Object.keys(categoriesMap).forEach(catName => {
        const count = categoriesMap[catName];
        const isActive = flashcardProgress.activeCategories.includes(catName);

        const cardBox = document.createElement("div");
        cardBox.style.cssText = "background: var(--v2-bg-surface); border: 1px solid var(--border-subtle); padding: 16px; display: flex; align-items: center; justify-content: space-between; border-radius: 16px; margin-bottom: 8px;";

        cardBox.innerHTML = `
            <div style="text-align: left;">
                <h4 style="margin:0; font-size:0.95rem; color: var(--text-main); font-weight:700;">${catName}</h4>
                <p style="margin:4px 0 0 0; font-size:0.75rem; color:var(--text-muted);">${count} Cartões no total</p>
            </div>
            <button style="background: ${isActive ? 'rgba(72,126,86,0.1)' : '#487E56'}; 
                            color: ${isActive ? '#487E56' : '#FFFFFF'}; 
                            border: none; padding: 10px 18px; border-radius: 12px; 
                            font-size: 0.85rem; font-weight: 800; cursor: pointer; transition: all 0.2s;" 
                    onclick="toggleCategory('${catName}')">
                ${isActive ? '<i class="fa-solid fa-check"></i> Ativo' : 'Ativar'}
            </button>
        `;
        container.appendChild(cardBox);
    });
}

function toggleCategory(categoryName) {
    const index = flashcardProgress.activeCategories.indexOf(categoryName);
    if (index > -1) {
        flashcardProgress.activeCategories.splice(index, 1);
    } else {
        flashcardProgress.activeCategories.push(categoryName);
    }
    
    localStorage.setItem("biblical_flashcards_progress", JSON.stringify(flashcardProgress));
    
    buildTodayQueue();
    renderDecksManager();
    
    const dashCountEl = document.getElementById("fc-dash-count");
    if (dashCountEl) dashCountEl.textContent = currentQueue.length;
}

// Expõe a função globalmente para o index.html/main.js
window.initFlashcardsModule = initFlashcardsModule;