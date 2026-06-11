import { PainCard, Phase, CourseBlock, BeforeAfterItem, Testimonial, Objection, OrderBump, FAQItem } from './types';

export const PAIN_CARDS: PainCard[] = [
  {
    id: 'pain-1',
    icon: '01',
    title: 'Você faz de tudo. E ele não percebe.',
    description: 'Você responde na hora. Muda seus planos. Está sempre disponível. Aceita migalhas. O que você não percebe é que disponibilidade sem valor não gera desejo. Gera acomodação.',
    highlight: 'Dosagem programada de atenção'
  },
  {
    id: 'pain-2',
    icon: '02',
    title: 'A relação não anda. Mas você também não vai embora.',
    description: 'Os meses passam. Tem intimidade, momentos bons. Mas toda vez que você tenta clareza, compromisso ou posicionamento, ele recua. E você começa a aceitar cada vez menos.',
    highlight: 'Responsabilidades de solteiro com luxos de casal'
  },
  {
    id: 'pain-3',
    icon: '03',
    title: 'Você só pensa nele. E ele nem lembra que você existe.',
    description: 'Você passa horas tentando entende-lo. Relê mensagens. Analisa tudo... Enquanto isso, ele oferece o mínimo e ainda ocupa espaço demais na sua mente.',
    highlight: 'Desgaste e ansiedade crônica'
  }
];

export const MALE_BRAIN_PHASES: Phase[] = [
  {
    id: 'fase-1',
    num: '01',
    phaseName: 'Alívio & Autossuficiência',
    title: 'A Falsa Sensação de Controle',
    description: 'Existe uma razão específica para isso e quando você entende, para de interpretar o comportamento dele da forma errada.',
    mindset: 'Ele tem 100% de certeza da posse',
    impact: 'Espaço temporário de segurança'
  },
  {
    id: 'fase-2',
    num: '02',
    phaseName: 'Curiosidade Instintiva',
    title: 'A Quebra da Previsibilidade',
    description: 'Ele está te observando sem te avisar. E o que você faz nesse momento define o quanto ele vai te valorizar depois.',
    mindset: 'Gatilho inconsciente da dúvida competitiva',
    impact: 'Estímulo cerebral de caça reativado'
  },
  {
    id: 'fase-3',
    num: '03',
    phaseName: 'Ego Ferido',
    title: 'A Perda do Suprimento de Atenção',
    description: 'Não é coincidência. Existe um mecanismo por trás disso e entender ele muda a forma como você age.',
    mindset: 'Sensação real de desvalorização dele',
    impact: 'Despertar imediato do arrependimento'
  },
  {
    id: 'fase-4',
    num: '04',
    phaseName: 'Reavaliação de Urgência',
    title: 'A Procura Ativa e Repentina',
    description: 'Tudo que aconteceu antes desemboca nessa fase. Quem entende esse momento sabe exatamente como se posicionar.',
    mindset: 'Ele corre atrás buscando reaver o valor que perdeu',
    impact: 'Interesse restabelecido em menos de 48h'
  }
];

export const COURSE_BLOCKS: CourseBlock[] = [
  {
    id: 'block-1',
    title: 'BLOCO I',
    subtitle: 'O ERRO QUE TE FAZ OPÇÃO E O PROTOCOLO 48H',
    items: [
      'Entenda por que ele muda;',
      'Reconheça os sinais de um homem de valor e de um cafajeste;',
      'O erro que parece amor: descubra o que está te sabotando;',
      'Recupere seu controle emocional quando ele muda e saiba como agir.'
    ]
  },
  {
    id: 'block-2',
    title: 'BLOCO II',
    subtitle: 'O MANUAL DA MULHER QUE NÃO CORRE ATRÁS',
    items: [
      'O verdadeiro significado dos sumiços masculinos e por que alguns homens voltam.',
      'Como interpretar o silêncio masculino;',
      'Como agir depois de um date;',
      'Por que algumas mulheres viram prioridade e outras são as eternas "ficantes".'
    ]
  },
  {
    id: 'block-3',
    title: '',
    subtitle: '',
    items: [
      'O GATILHO QUE VIRA O JOGO: O que acontece na mente dele quando você muda o jogo, e ele não consegue te ignorar.'
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
    image: 'https://viraojogo.mvmlp.com/assets/bump-7-passos-4RPqTi0Q.png',
    title: '7 Passos para se Tornar Inesquecível',
    description: '7 dias para despertar sua melhor versão e se tornar a mulher que marca presença por onde passa: mais desejada, admirada e inesquecível.',
    price: '3,92',
    cashPrice: '47'
  },
  {
    id: 'bump-2',
    image: 'https://viraojogo.mvmlp.com/assets/bump-magnetismo-2o3GIZRi.png',
    title: 'Magnetismo Digital na Prática',
    description: 'Aprenda as regras de ouro para dominar as redes sociais. Use sua presença online para comunicar desejo, elegância, carisma e atrair o homem certo.',
    price: '3,08',
    cashPrice: '37'
  },
  {
    id: 'bump-3',
    image: 'https://viraojogo.mvmlp.com/assets/bump-raio-x-Bmvsz9AB.png',
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
