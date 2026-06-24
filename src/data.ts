import { PainCard, Phase, CourseBlock, BeforeAfterItem, Testimonial, Objection, OrderBump, FAQItem } from './types';

export const PAIN_CARDS: PainCard[] = [
  {
    id: 'pain-1',
    icon: '01',
    title: 'Ele parecia interessado, mas foi se afastando sem explicação.',
    description: 'No início era perfeito, mas depois foi ficando frio e distante.',
    highlight: 'Afastamento sem explicação'
  },
  {
    id: 'pain-2',
    icon: '02',
    title: 'Disse que "não estava pronto e não era hora", mas assumiu outra.',
    description: 'A desculpa que machuca: não estava pronto pra você, mas pra ela estava.',
    highlight: 'A desculpa que não era desculpa'
  },
  {
    id: 'pain-3',
    icon: '03',
    title: 'Você se sente inferior, não se sente suficiente pra ele.',
    description: 'Por mais que se esforce, parece que nunca é interessante o suficiente pra ele.',
    highlight: 'Nunca suficiente'
  },
  {
    id: 'pain-4',
    icon: '04',
    title: 'Diz que te ama, mas vive te traindo.',
    description: 'Você vive tentando acreditar na pessoa que ele diz que é, mas vive se decepcionando com as atitudes dele.',
    highlight: 'Amor que decepciona'
  },
  {
    id: 'pain-5',
    icon: '05',
    title: 'Vive se perguntando: "O que ela tem que eu não tenho?"',
    description: 'Vê outras mulheres sendo escolhidas enquanto você continua nesse vai não vai.',
    highlight: 'Comparação constante'
  },
  {
    id: 'pain-6',
    icon: '06',
    title: 'Se sentiu usada depois de dormir com ele.',
    description: 'Achou que ia aproximar vocês, mas ele só se afastou mais.',
    highlight: 'Intimidade que afasta'
  },
  {
    id: 'pain-7',
    icon: '07',
    title: 'Está cansada. Cansada de verdade.',
    description: 'Cansada de apostar, de esperar, de acreditar e sempre quebrar a cara. Você não quer muito. Só quer se sentir amada.',
    highlight: 'Cansaço de verdade'
  }
];

export const MALE_BRAIN_PHASES: Phase[] = [
  {
    id: 'fase-1',
    num: '01',
    phaseName: 'Alívio & Autossuficiência',
    title: 'A Falsa Sensação de Controle',
    description: 'Sabe aquela mulher que ele simplesmente não consegue tirar da cabeça? Eu vou te mostrar exatamente o que é isso.',
    mindset: 'Ele tem 100% de certeza da posse',
    impact: 'Espaço temporário de segurança'
  },
  {
    id: 'fase-2',
    num: '02',
    phaseName: 'Curiosidade Instintiva',
    title: 'A Quebra da Previsibilidade',
    description: 'Passamos horas tentando entender o que ele pensa. Quando você entende como a mente dele funciona, você para de tentar adivinhar e começa a agir com inteligência.',
    mindset: 'Gatilho inconsciente da dúvida competitiva',
    impact: 'Estímulo cerebral de caça reativado'
  },
  {
    id: 'fase-3',
    num: '03',
    phaseName: 'Ego Ferido',
    title: 'A Perda do Suprimento de Atenção',
    description: 'Ele não vai parar de pensar em você. Não porque você correu atrás. Mas porque você vai saber como deixar uma marca que nenhuma outra deixou.',
    mindset: 'Sensação real de desvalorização dele',
    impact: 'Despertar imediato do arrependimento'
  },
  {
    id: 'fase-4',
    num: '04',
    phaseName: 'Reavaliação de Urgência',
    title: 'A Procura Ativa e Repentina',
    description: 'Ele vai te olhar e pensar: não consigo imaginar minha vida sem ela.',
    mindset: 'Ele corre atrás buscando reaver o valor que perdeu',
    impact: 'Interesse restabelecido em menos de 48h'
  }
];

export const COURSE_BLOCKS: CourseBlock[] = [
  {
    id: 'block-1',
    title: 'BLOCO I',
    subtitle: 'POR QUE ELE SUMIU E O QUE FAZER NAS PRÓXIMAS HORAS',
    items: [
      'Sabe aquela sensação de não saber se age ou espera? Aqui acaba.',
      'Você vai entender por que ele se afastou.',
      'Saber exatamente o que fazer nas próximas horas que ainda podem mudar tudo.'
    ]
  },
  {
    id: 'block-2',
    title: 'BLOCO II',
    subtitle: 'A MENTE DELE REVELADA',
    items: [
      'Você nunca mais vai ficar acordada tentando decifrar os comportamentos dele.',
      'Você finalmente vai entender o que acontece dentro da cabeça dele.',
      'E por que nada do que você fez até hoje funcionou.'
    ]
  },
  {
    id: 'block-3',
    title: 'BLOCO III',
    subtitle: 'O PROTOCOLO 48H',
    items: [
      'Em 48h ele vai te enxergar diferente!',
      'Você vai saber exatamente o que fazer e o que parar de fazer.',
      'Cada passo errado agora custa caro, e você não pode mais errar.'
    ]
  },
  {
    id: 'block-4',
    title: 'BLOCO IV',
    subtitle: 'DE INVISÍVEL A INESQUECÍVEL',
    items: [
      'Tem mulher que o homem não consegue tirar da cabeça. Pensa nela o dia inteiro.',
      'Não é beleza, não é sorte.',
      'Aqui você descobre o que é e se torna essa mulher pra ele.'
    ]
  },
  {
    id: 'block-bonus-1',
    title: 'BÔNUS',
    subtitle: 'O GATILHO QUE VIRA O JOGO',
    isBonus: true,
    items: [
      'Existe um movimento que faz ele acordar pra o que está prestes a perder.',
      'Esse é o gatilho que aciona o instinto dele de valorizar e escolher.',
      'E que a maioria das mulheres nunca soube que existia.'
    ]
  },
  {
    id: 'block-bonus-2',
    title: 'BÔNUS',
    subtitle: 'AS 4 FASES DA RECONQUISTA',
    isBonus: true,
    items: [
      'Entenda como se posicionar em cada etapa, sem correr atrás, sem implorar e sem se humilhar.',
      'Quando você entende o que está acontecendo na mente dele, você para de agir no desespero.',
      'E passa a dominar a situação.'
    ]
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    before: 'Vive checando o celular ansiosa por uma mensagem.',
    after: 'Entende o comportamento masculino.'
  },
  {
    id: 'ba-2',
    before: 'Corre atrás e implora por atenção.',
    after: 'Reconhece seu valor e por isso se posiciona.'
  },
  {
    id: 'ba-3',
    before: 'Vive ansiosa com medo de perdê-lo.',
    after: 'Não abre mão da própria paz.'
  },
  {
    id: 'ba-4',
    before: 'Aceita migalhas com medo de se posicionar.',
    after: 'Escolhe quem merece acesso à sua vida.'
  },
  {
    id: 'ba-5',
    before: 'Espera ser assumida.',
    after: 'Se torna inesquecível.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    initial: 'C',
    name: 'Camila S.',
    text: '"Eu me doava demais e sufocava o interesse dele. No fundo, eliminei o mistério. A Rhaiane fez eu abrir os olhos na primeira aula. Apliquei o recuo e ele enlouqueceu de curiosidade."'
  },
  {
    id: 'test-2',
    initial: 'J',
    name: 'Juliana M.',
    text: '"O Protocolo de 48h salvou meu relacionamento de anos que estava morrendo. Usei o recuo estratégica de forma cirúrgica e na mesma tarde ele me ligou aflito perguntando o que houve."'
  },
  {
    id: 'test-3',
    initial: 'F',
    name: 'Fernanda R.',
    text: '"Parar de mandar textões gigantescos e me posicionar com escassez elegante mudou absolutamente tudo. Sinto que tirei um peso enorme de ansiedade dos meus ombros."'
  },
  {
    id: 'test-4',
    initial: 'B',
    name: 'Beatriz L.',
    text: '"Conhecer as 4 fases do cérebro masculino abriu uma caixa-preta. É assustador como eles reagem exatamente do jeito que a Rhaiane descreve nas aulas do curso. É ouro puro."'
  },
  {
    id: 'test-5',
    initial: 'A',
    name: 'Amanda C.',
    text: '"Eu fazia absolutamente tudo errado pós-date e implorava atenção. Ao aplicar o curso, o comportamento dele virou da água pro vinho. Agora ele me procura com flores."'
  },
  {
    id: 'test-6',
    initial: 'L',
    name: 'Larissa P.',
    text: '"R$ 147 foi o melhor investimento estratégico da minha vida amorosa. O método de posicionamento de alto valor me deu frutos e resultados visíveis em menos de dois dias."'
  }
];

export const OBJECTIONS: Objection[] = [
  {
    id: 'obj-1',
    question: '◆ "Mas ele é orgulhoso demais... se eu recuar, ele nunca mais vai me procurar na vida."',
    answer: 'Que bela mentira conveniente a sua ansiedade adora usar para prender você na humilhação! O orgulho absoluto dele só se sustenta hoje porque ele possui 100% de firme certeza de que você está ali rendida, implorando por afeto. No momento em que você corta o suprimento de bajulação de surpresa e ele enfrenta o vácuo insolúvel, a mente dele é assaltada pelo desespero da perda. O ego masculino desmorona quando descobre que não é mais o imperador absoluto do seu tempo.'
  },
  {
    id: 'obj-2',
    question: '◆ "Eu já tentei dar espaço e sumir antes, mas não surtiu nenhum efeito nele."',
    answer: 'Você não deu espaço de verdade, você encenou um "afastamento falso". Você parou de enviar mensagens, mas continuou visualizando as publicações dele em menos de dez minutos, postando fotos apelativas tentando atingi-lo, e estando online de madrugada. Ele conseguia ler todo o seu desespero por trás da sua pose de mistério. O Protocolo 48 Horas ensina o afastamento estratégico profundo com quebras de comportamento reais, impossíveis de rastrear — é isso que o tira do eixo.'
  },
  {
    id: 'obj-3',
    question: '◆ "E se eu aplicar o recuo e ele simplesmente me esquecer ou encontrar outra mulher?"',
    answer: 'Compreenda isto de vez por todas: os homens NUNCA esquecem mulheres magnéticas que se valorizam e detêm respeito próprio absoluto; eles apenas esquecem as fáceis que aceitam migalhas em silêncio. Como o ouro, as pedras preciosas e as marcas de grife, o valor advém puramente de sua escassez indomável. Se você nunca permitir que ele experimente a sua completa e verdadeira ausência, ele jamais terá o motivo neurológico para valorizar o privilégio de ter você presente.'
  },
  {
    id: 'obj-4',
    question: '◆ "Nós já estamos bloqueados, brigados ou com afastamento grave. Vira o jogo mesmo assim?"',
    answer: 'Funciona ainda melhor nessas condições dramáticas. Estar bloqueado ou vivendo um conflito agudo significa que a tensão afetiva entre vocês dois está inflamada no patamar mais alto. Ele está psicologicamente preparado para ver você ter crises de choro, mandar SMS de madrugada ou pedir conselhos aos amigos dele. Quando seu posicionamento for o oposto absoluto do esperado, a quebra de padrão será colossal, forçando o cérebro dele a repensar a asfixia que cometeu.'
  }
];

export const ORDER_BUMPS: OrderBump[] = [
  {
    id: 'bump-1',
    image: '/assets/bump-7-passos.png',
    title: '7 Passos para se Tornar Inesquecível',
    description: '7 dias para despertar sua melhor versão e se tornar a mulher que marca presença por onde passa: mais desejada, admirada e inesquecível.',
    price: '3,92',
    cashPrice: '47'
  },
  {
    id: 'bump-2',
    image: '/assets/bump-magnetismo.png',
    title: 'Magnetismo Digital na Prática',
    description: 'Aprenda as regras de ouro para dominar as redes sociais. Use sua presença online para comunicar desejo, elegância, carisma e atrair o homem certo.',
    price: '3,08',
    cashPrice: '37'
  },
  {
    id: 'bump-3',
    image: '/assets/bump-raio-x.png',
    title: 'Análise Estratégica de Posicionamento (Raio-X)',
    description: 'Vou te mostrar exatamente o que o seu perfil comunica e o que pode estar afastando homens que querem algo sério. Descubra o padrão invisível que o seu perfil está ativando nos homens, sem você perceber.',
    price: '16,49',
    cashPrice: '197,90'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Isso é pra mim mesmo ou só funciona em situações específicas?',
    answer: 'Se você já se sentiu disponível demais, confusa com o comportamento dele ou presa num ciclo que não evolui — esse curso foi feito pra você. <strong>Não importa se a relação é recente, antiga ou se você está sozinha agora.</strong> O que você vai aprender muda a forma como você se posiciona em qualquer situação.'
  },
  {
    id: 'faq-2',
    question: 'Como funciona o acesso? Precisa de horário ou internet o tempo todo?',
    answer: 'O acesso é 100% digital e imediato — pelo celular ou computador, no horário que quiser. <strong>Sem aula ao vivo, sem prazo pra assistir.</strong> É seu, e você acessa quantas vezes precisar.'
  },
  {
    id: 'faq-3',
    question: 'Isso vai funcionar mesmo que eu tenha pouco tempo no dia a dia?',
    answer: 'Sim. O conteúdo foi pensado pra ser direto — <strong>sem enrolação, sem horas de vídeo pra chegar no ponto.</strong> Você consegue aplicar o que aprende ainda no mesmo dia, independente de onde estiver.'
  },
  {
    id: 'faq-4',
    question: 'Isso é sobre manipulação ou joguinhos psicológicos?',
    answer: 'Não. É sobre <strong>entender como a atração masculina funciona de verdade</strong> — e parar de agir de um jeito que te prejudica sem você perceber. Sem falsidade, sem fingimento. Você continua sendo você — só para de se colocar no lugar errado.'
  },
  {
    id: 'faq-5',
    question: 'E se eu comprar e não gostar? Tenho alguma garantia?',
    answer: 'Sim. Você tem <strong>7 dias de garantia total.</strong> Se por qualquer motivo você sentir que não foi pra você, é só pedir o reembolso — sem burocracia, sem precisar explicar nada. <strong>O risco é zero.</strong>'
  }
];
