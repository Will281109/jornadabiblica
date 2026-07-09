// js/estudos_banco.js

const BANCO_ESTUDOS = [
    {
        id: "estudo1",
        title: "O Caráter de Deus",
        desc: "Lento para a Ira: O que o 'nariz comprido' de Deus nos ensina sobre Sua paciência?",
        icon: "fa-heart",
        src: "paginas/estudos/estudo1.html"
    },
    {
        id: "estudo6",
        title: "Fundamentos da Fé",
        desc: "A Criação: Explore a origem do universo e o propósito eterno de Deus ao chamar a luz.",
        icon: "fa-sun",
        src: "paginas/estudos/estudo6.html"
    },
    {
        id: "estudo7",
        title: "Festas Bíblicas",
        desc: "A Páscoa: Do sangue nos batentes no Egito ao sacrifício supremo de Cristo na cruz.",
        icon: "fa-wine-glass",
        src: "paginas/estudos/estudo7.html"
    },
    {
        id: "estudo8",
        title: "Grandes Personagens",
        desc: "O Chamado de Abraão: Entenda o princípio da separação e por que ele é o exemplo de fé.",
        icon: "fa-route",
        src: "paginas/estudos/estudo8.html"
    },
    {
        id: "estudo9",
        title: "Doutrinas Bíblicas",
        desc: "A Providência de Deus: Descubra como Deus preserva, provê e governa o mundo com cuidado.",
        icon: "fa-hand-holding-heart",
        src: "paginas/estudos/estudo9.html"
    },
    {
        id: "estudo10",
        title: "A Aliança de Deus",
        desc: "O Concerto com os Patriarcas: Aprenda como a fidelidade de Deus atravessa gerações.",
        icon: "fa-file-contract",
        src: "paginas/estudos/estudo10.html"
    },
    {
        id: "estudo11",
        title: "Fundamentos Bíblicos",
        desc: "A Lei do Antigo Testamento: Entenda o propósito da Torah e como ela aponta para a graça.",
        icon: "fa-scroll",
        src: "paginas/estudos/estudo11.html"
    },
    {
        id: "estudo12",
        title: "Sacerdócio e Sacrifício",
        desc: "O Dia da Expiação: Entenda o ritual do Yom Kippur e o cumprimento definitivo em Jesus.",
        icon: "fa-fire-alt",
        src: "paginas/estudos/estudo12.html"
    },
    {
        id: "estudo13",
        title: "Sabedoria e Vida Cristã",
        desc: "O Temor do Senhor: Entenda por que o temor não é medo, mas o princípio da sabedoria.",
        icon: "fa-graduation-cap",
        src: "paginas/estudos/estudo13.html"
    },
    {
        id: "estudo14",
        title: "Aliança Nacional",
        desc: "O Concerto com os Israelitas: Do Sinai às Campinas de Moabe e a Nova Aliança.",
        icon: "fa-monument",
        src: "paginas/estudos/estudo14.html"
    },
    {
        id: "estudo15",
        title: "Justiça e Conquista",
        desc: "A Destruição dos Cananeus: Entenda o juízo sobre a corrupção moral e a separação espiritual.",
        icon: "fa-shield-halved",
        src: "paginas/estudos/estudo15.html"
    },
    {
        id: "estudo16",
        title: "Doutrina Bíblica",
        desc: "Anjos e o Anjo do Senhor: Explore a natureza dos mensageiros e a teofania bíblica.",
        icon: "fa-dove",
        src: "paginas/estudos/estudo16.html"
    },
    {
        id: "estudo17",
        title: "Doutrina e Vida Cristã",
        desc: "A Natureza da Idolatria: Ídolos não são apenas estátuas. Entenda sua influência sutil.",
        icon: "fa-masks-theater",
        src: "paginas/estudos/estudo17.html"
    },
    {
        id: "estudo18",
        title: "Doutrina e Vida Cristã",
        desc: "Fugindo da Idolatria Moderna: Como as redes sociais, materialismo e ego se tornam deuses.",
        icon: "fa-mobile-screen",
        src: "paginas/estudos/estudo18.html"
    },
    {
        id: "estudo19",
        title: "Concertos de Deus",
        desc: "O Concerto de Deus com Davi: A promessa de um trono eterno cumprida plenamente em Jesus.",
        icon: "fa-crown",
        src: "paginas/estudos/estudo19.html"
    },
    {
        id: "estudo20",
        title: "Vida de Oração",
        desc: "A Oração Eficaz: Descubra o que torna a oração poderosa através de exemplos como Elias.",
        icon: "fa-hands-praying",
        src: "paginas/estudos/estudo20.html"
    },
    {
        id: "estudo21",
        title: "Cristologia Bíblica",
        desc: "Cristo no Antigo Testamento: Descubra como tipos, profecias e eventos apontam para Jesus.",
        icon: "fa-cross",
        src: "paginas/estudos/estudo21.html"
    },
    {
        id: "estudo22",
        title: "História Bíblica",
        desc: "A Cidade de Jerusalém: Entenda o significado histórico, espiritual e profético da capital.",
        icon: "fa-gopuram",
        src: "paginas/estudos/estudo22.html"
    },
    {
        id: "estudo23",
        title: "História Bíblica",
        desc: "O Templo: Do tabernáculo ao templo de Salomão, e o cumprimento em Cristo e na igreja.",
        icon: "fa-place-of-worship",
        src: "paginas/estudos/estudo23.html"
    },
    {
        id: "estudo24",
        title: "Vida Cristã",
        desc: "A Adoração: Definição, expressões bíblicas e as bênçãos da verdadeira adoração em espírito.",
        icon: "fa-music",
        src: "paginas/estudos/estudo24.html"
    },
    {
        id: "estudo25",
        title: "Vida Cristã",
        desc: "O Sofrimento dos Justos: Por que Deus permite a dor aos fiéis? Entenda como vencer com fé.",
        icon: "fa-cloud-showers-water",
        src: "paginas/estudos/estudo25.html"
    },
    {
        id: "estudo26",
        title: "Vida Cristã",
        desc: "A Morte: O resultado físico e moral do pecado, mas com vitória e esperança plena em Cristo.",
        icon: "fa-hourglass-end",
        src: "paginas/estudos/estudo26.html"
    },
    {
        id: "estudo27",
        title: "Vida Cristã",
        desc: "O Louvor: A importância, métodos e razões bíblicas para cantar de todo o coração a Deus.",
        icon: "fa-guitar",
        src: "paginas/estudos/estudo27.html"
    },
    {
        id: "estudo28",
        title: "Vida Cristã",
        desc: "A Esperança segundo a Bíblia: Uma âncora firme para a alma ancorada em promessas eternas.",
        icon: "fa-anchor",
        src: "paginas/estudos/estudo28.html"
    },
    {
        id: "estudo29",
        title: "Teologia Bíblica",
        desc: "Os Atributos de Deus: Atributos exclusivos (onisciência, onipresença) e morais de Deus.",
        icon: "fa-eye",
        src: "paginas/estudos/estudo29.html"
    },
    {
        id: "estudo30",
        title: "Vida Cristã",
        desc: "O Coração: O centro das emoções e vontades, sua queda natural e a regeneração espiritual.",
        icon: "fa-heart-pulse",
        src: "paginas/estudos/estudo30.html"
    },
    {
        id: "estudo32",
        title: "Teologia Bíblica",
        desc: "Natureza Humana: Criados à imagem de Deus, danificados pelo pecado e triunos (corpo, alma, espírito).",
        icon: "fa-children",
        src: "paginas/estudos/estudo32.html"
    },
    {
        id: "estudo33",
        title: "Teologia Bíblica",
        desc: "O Profeta no Antigo Testamento: Intimidade com Deus, mensagem prática e o contraste com falsos ensinos.",
        icon: "fa-bullhorn",
        src: "paginas/estudos/estudo33.html"
    },
    {
        id: "estudo34",
        title: "Teologia Bíblica",
        desc: "A Vontade de Deus: Três sentidos da vontade (lei, perfeita e tolerante) e respostas práticas.",
        icon: "fa-compass",
        src: "paginas/estudos/estudo34.html"
    },
    {
        id: "estudo35",
        title: "Teologia Bíblica",
        desc: "A Palavra de Deus: Natureza criativa e sustentadora, e a resposta humana de obediência.",
        icon: "fa-book-open",
        src: "paginas/estudos/estudo35.html"
    },
    {
        id: "estudo36",
        title: "Vida Cristã",
        desc: "A Paz de Deus: O Shalom como harmonia plena, rompido pela queda e restaurado por Cristo.",
        icon: "fa-handshake",
        src: "paginas/estudos/estudo36.html"
    },
    {
        id: "estudo50",
        title: "Teologia Bíblica",
        desc: "A Glória de Deus: Esplendor, majestade e presença shekhinah revelada e experimentada.",
        icon: "fa-gem",
        src: "paginas/estudos/estudo50.html"
    },
    {
        id: "estudo37",
        title: "Vida Cristã",
        desc: "A Intercessão: O papel intercessor de Cristo e do Espírito Santo através de exemplos práticos.",
        icon: "fa-comments",
        src: "paginas/estudos/estudo37.html"
    },
    {
        id: "estudo38",
        title: "Teologia Bíblica",
        desc: "O Espírito Santo no Antigo Testamento: Atuação na criação, profecias, lideranças e a promessa de Joel.",
        icon: "fa-wind",
        src: "paginas/estudos/estudo38.html"
    },
    {
        id: "estudo39",
        title: "Teologia Bíblica / Ética Cristã",
        desc: "O Cuidado dos Pobres e Desfavorecidos: Deus como defensor absoluto dos necessitados.",
        icon: "fa-hand-holding-dollar",
        src: "paginas/estudos/estudo39.html"
    },
    {
        id: "estudo40",
        title: "Administração Cristã / Finanças",
        desc: "Dizimos e Ofertas: Princípios de generosidade voluntária e fidelidade no Reino.",
        icon: "fa-coins",
        src: "paginas/estudos/estudo40.html"
    },
    {
        id: "estudo41",
        title: "Teologia Bíblica / Reino de Deus",
        desc: "O Reino de Deus: Poder transformador ativo nos corações e a esperança de consumação.",
        icon: "fa-mountain",
        src: "paginas/estudos/estudo41.html"
    },
    {
        id: "estudo42",
        title: "Teologia Bíblica / Cura Divina",
        desc: "A Cura Divina: A provisão de saúde física e restauração através da expiação de Cristo.",
        icon: "fa-kit-medical",
        src: "paginas/estudos/estudo42.html"
    },
    {
        id: "estudo43",
        title: "Teologia Bíblica / Eclesiologia",
        desc: "A Igreja: Corpo de Cristo, templo vivo do Espírito Santo e agência restauradora na Terra.",
        icon: "fa-house-chimney-window",
        src: "paginas/estudos/estudo43.html"
    },
    {
        id: "estudo44",
        title: "Escatologia / Fim dos Tempos",
        desc: "A Grande Tribulação: O período final de aflições e juízos profetizados pelas Escrituras.",
        icon: "fa-cloud-bolt",
        src: "paginas/estudos/estudo44.html"
    },
    {
        id: "estudo45",
        title: "Teologia Bíblica / Guerra Espiritual",
        desc: "Poder sobre Satanás e os Demônios: A autoridade delegada aos crentes em Nome de Jesus.",
        icon: "fa-burst",
        src: "paginas/estudos/estudo45.html"
    },
    {
        id: "estudo46",
        title: "Teologia Bíblica / Discernimento",
        desc: "Falsos Ensinadores: Como discernir lobos em pele de cordeiro por meio de seus frutos e caráter.",
        icon: "fa-mask",
        src: "paginas/estudos/estudo46.html"
    },
    {
        id: "estudo47",
        title: "Vida Cristã / Poder do Espírito",
        desc: "Sinais dos Crentes: O sobrenatural e os milagres como provas visíveis do Reino hoje.",
        icon: "fa-wand-magic-sparkles",
        src: "paginas/estudos/estudo47.html"
    },
    {
        id: "estudo48",
        title: "Cristologia / Pneumatologia",
        desc: "Jesus e o Espírito Santo: O relacionamento vital da Trindade da encarnação à ressurreição.",
        icon: "fa-fire",
        src: "paginas/estudos/estudo48.html"
    },
    {
        id: "estudo49",
        title: "Ética Cristã / Vida Prática",
        desc: "Riqueza e Pobreza: O perigo da ganância e o chamado cristão à mordomia espiritual dos bens.",
        icon: "fa-scale-balanced",
        src: "paginas/estudos/estudo49.html"
    },
    {
        id: "estudo31",
        title: "Vida Cristã",
        desc: "O Vinho no Antigo Testamento: Advertências bíblicas contra a embriaguez e o voto de abstinência.",
        icon: "fa-wheat-awn",
        src: "paginas/estudos/estudo31.html"
    },
    {
        id: "estudo4",
        title: "Temas Bíblicos",
        desc: "Cidades na Bíblia: Da cidade de refúgio de Caim até o plano eterno da Nova Jerusalém.",
        icon: "fa-city",
        src: "paginas/estudos/estudo4.html"
    },
    {
        id: "estudo2",
        title: "Doutrinas Fundamentais",
        desc: "Redenção: Entenda o significado bíblico do resgate e a libertação pelo sangue do Cordeiro.",
        icon: "fa-key",
        src: "paginas/estudos/estudo2.html"
    }
];

// Garantir que as funções globais do main.js continuem enxergando o repositório
if (typeof window !== "undefined") {
    window.BANCO_ESTUDOS = BANCO_ESTUDOS;
}