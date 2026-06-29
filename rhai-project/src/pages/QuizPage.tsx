import './QuizPage.css';
import { useState, useEffect, useRef } from 'react';
import { firePixelEvent, fireClarity } from '../hooks/usePixelConsent';
import VideoBackground from '../components/VideoBackground';

const CHECKOUT_URL = 'https://pay.kiwify.com.br/1e2xhVp';
const TOTAL = 8;
type Screen = 'intro' | 'quiz' | 'loading' | 'resultado';
type Letra = 'A' | 'B' | 'C' | 'D';
const LETRAS: Letra[] = ['A', 'B', 'C', 'D'];

const PERGUNTAS: { texto: string; opcoes: string[] }[] = [
  {
    texto: 'Como costumam começar seus relacionamentos?',
    opcoes: [
      'Começa incrível — muito interesse, muito contato — e depois ele vai esfriando sem explicação',
      'Ele é quente e frio o tempo todo. Nunca sei onde estou com ele',
      'Parece interessado mas nunca avança de verdade. Fica naquele vai não vai',
      'Tenho dificuldade de atrair o tipo de homem que realmente quero',
    ],
  },
  {
    texto: 'Quando ele para de dar atenção, o que você faz?',
    opcoes: [
      'Fico ansiosa. Mando mensagem pra ver o que aconteceu',
      'Me afasto por fora mas por dentro fico destruída tentando entender o que fiz de errado',
      'Tento ser mais presente, mais legal, mais disponível pra recuperar o que havia antes',
      'Finjo que não ligo. Mas ligo demais',
    ],
  },
  {
    texto: 'Quando você está interessada num homem, como você age?',
    opcoes: [
      'Me entrego rápido. Fico muito disponível desde o início',
      'Faço tudo pra agradá-lo. Tenho medo de decepcionar',
      'Fico no controle — mas quando começa a ficar sério eu saio fora',
      'Espero ele tomar a frente, mas acabo cedendo antes que ele faça algo',
    ],
  },
  {
    texto: 'O que você faz com mais frequência nos relacionamentos?',
    opcoes: [
      'Invisto muito mais do que recebo de volta',
      'Fico explicando meu valor, tentando fazer ele entender o que está perdendo',
      'Tolero coisas que me machucam esperando que ele mude',
      'Me diminuo pra não parecer exigente demais',
    ],
  },
  {
    texto: 'Quando ele some ou esfria, o que vem primeiro na sua cabeça?',
    opcoes: [
      '"O que eu fiz de errado?"',
      '"Ele deve estar ocupado. Vou esperar"',
      '"Todos os homens fazem isso, é assim mesmo"',
      '"Eu sabia que ia acabar assim"',
    ],
  },
  {
    texto: 'Como você lida com seus limites?',
    opcoes: [
      'Coloco limite, mas cedo quando ele resiste ou fica chateado',
      'Tenho dificuldade de dizer não. Tenho medo de perder ele',
      'Sei o que quero mas não consigo falar sem me sentir a chata da história',
      'Tenho limites. O problema é que os homens que escolho nunca os respeitam',
    ],
  },
  {
    texto: 'O que você mais quer num relacionamento?',
    opcoes: [
      'Reciprocidade de verdade. Alguém que invista tanto quanto eu',
      'Segurança emocional. Saber onde estou, sem aquela ansiedade constante',
      'Ser escolhida de verdade. Não só quando é conveniente pra ele',
      'Um homem que me veja como prioridade. Não como opção',
    ],
  },
  {
    texto: 'Qual dessas frases chega mais fundo em você?',
    opcoes: [
      '"Você faz tudo certo. E mesmo assim eles perdem o interesse"',
      '"Quanto mais você corre atrás, mais ele se afasta"',
      '"Ele nunca vai te dar o que você precisa. E você já sabe disso"',
      '"Você merece muito mais do que tem aceitado"',
    ],
  },
];

const PERFIS: Record<1 | 2 | 3, { titulo: string; corpo: string }> = {
  1: {
    titulo: 'Você não tem falta de valor.<br>Você tem um padrão que <em>ensina ele a não te valorizar</em>.',
    corpo: `<p>Você está cansada. Não de amar — você ama bonito. Você está cansada de investir num lugar que não te devolve nada.</p>
<p>Você faz tudo. Está presente, apoia, entende, perdoa. E mesmo assim ele esfria. Ele some. Ele te trata como garantida.</p>
<p><strong>Não é porque você não é suficiente.</strong> É porque existe um mecanismo que opera em silêncio nos relacionamentos — e quando você está nesse padrão, quanto mais você dá, menos ele valoriza.</p>
<p>Não é culpa sua. Mas continuar sem entender esse mecanismo vai te custar mais relacionamentos como esse.</p>`,
  },
  2: {
    titulo: 'Você sabe o que está acontecendo.<br>Mas na hora H, <em>o desespero fala mais alto</em>.',
    corpo: `<p>Você tem consciência. Consegue analisar, percebe os padrões, entende o que está errado. Mas quando ele some, quando ele esfria, quando aparece aquela insegurança — você age do medo, não do valor.</p>
<p>E aí você faz exatamente o que sabia que não devia fazer.</p>
<p><strong>Isso não é fraqueza.</strong> É o que acontece quando você tem a consciência mas não tem a ferramenta certa pra agir diferente no momento certo.</p>
<p>A boa notícia: mulheres no seu perfil mudam mais rápido. Porque você não precisa construir consciência do zero — precisa aprender a agir de um lugar diferente quando a emoção sobe.</p>`,
  },
  3: {
    titulo: 'Você construiu uma vida linda.<br>E aprendeu a não precisar de ninguém.<br><em>O problema é que os homens certos sentem isso como rejeição.</em>',
    corpo: `<p>Você é independente, segura, tem a sua vida. Mas tem uma armadura emocional que você usa sem perceber — e ela comunica ao outro que não tem espaço pra ele entrar.</p>
<p>Não é frieza. É proteção. Você aprendeu a se proteger porque já se machucou muito. Mas o efeito é o mesmo: os homens que poderiam ser parceiros reais se afastam antes de tentar.</p>
<p><strong>O paradoxo é esse:</strong> você quer profundidade, mas o comportamento que te protege impede que ela aconteça.</p>`,
  },
};

const FASES = [
  { n: '01', titulo: 'Faça ele se apegar', desc: 'Sabe aquela mulher que ele simplesmente não consegue tirar da cabeça? Você vai entender exatamente o que é isso — e como se tornar essa mulher pra ele.' },
  { n: '02', titulo: 'Conquiste a mente dele', desc: 'Quando você entende como a mente dele funciona, você para de tentar adivinhar e começa a agir com inteligência.' },
  { n: '03', titulo: 'Seja inesquecível', desc: 'Ele não vai parar de pensar em você. Não porque você correu atrás. Mas porque você vai saber como deixar uma marca que nenhuma outra deixou.' },
  { n: '04', titulo: 'Se torne a mulher da vida dele', desc: 'Ele vai te olhar e pensar: não consigo imaginar minha vida sem ela.' },
];

const BONUS = [
  { icone: '⏱', titulo: 'O Protocolo 48H', desc: 'Sabe aquela sensação de não saber se age ou espera? Aqui acaba. Você vai saber exatamente o que fazer nas próximas 48 horas — porque cada passo errado agora custa caro.' },
  { icone: '🧠', titulo: 'A Mente Dele Revelada', desc: 'Você nunca mais vai ficar acordada tentando decifrar o comportamento dele. Você vai finalmente entender o que acontece dentro da cabeça dele.' },
  { icone: '⚡', titulo: 'O Gatilho Que Vira o Jogo', desc: 'Existe um movimento que faz ele acordar pra o que está prestes a perder. Esse é o gatilho que aciona o instinto dele de valorizar e escolher — e que a maioria das mulheres nunca soube que existia.' },
];

const DEPOS = [
  { q: '"Eu sempre achei que era eu que estava errando. Depois de entender o mecanismo, tudo mudou. Não mudei quem eu sou — mudei o lugar de onde eu agia."', nome: 'Fernanda M. · São Paulo' },
  { q: '"Ele voltou em 3 dias. Mas o mais importante é que eu finalmente entendi por que ele tinha ido."', nome: 'Camila R. · Belo Horizonte' },
  { q: '"Passei anos tentando amar do jeito certo. Precisava entender o mecanismo, não me esforçar mais."', nome: 'Juliana T. · Curitiba' },
];

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [atual, setAtual] = useState(1);
  const [respostas, setRespostas] = useState<Record<number, Letra>>({});
  const [progPct, setProgPct] = useState(0);
  const [perfil, setPerfil] = useState<1 | 2 | 3 | null>(null);
  const tempos = useRef<Record<number, number>>({});
  const particlesRef = useRef<HTMLDivElement>(null);
  const transicaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = particlesRef.current;
    if (!c) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${Math.random() * 100}%;width:${Math.random() * 2 + 0.5}px;height:${Math.random() * 2 + 0.5}px;animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;`;
      c.appendChild(p);
    }
    return () => { if (c) c.innerHTML = ''; };
  }, []);

  function track(evento: string, params?: Record<string, unknown>) {
    firePixelEvent(evento, params);
    fireClarity('quiz', evento);
  }

  function comecar() {
    setScreen('quiz');
    tempos.current[1] = Date.now();
    window.scrollTo(0, 0);
    track('quiz_start');
    track('quiz_pergunta_1');
  }

  function resp(n: number, letra: Letra) {
    if (respostas[n]) return;
    const novas = { ...respostas, [n]: letra };
    setRespostas(novas);
    const seg = Math.round((Date.now() - (tempos.current[n] || Date.now())) / 1000);
    track(`quiz_p${n}_respondida`, { resposta: letra, segundos: seg });

    setTimeout(() => {
      if (n < TOTAL) {
        irPara(n + 1);
      } else {
        mostrarLoading(novas);
      }
    }, 400);
  }

  function irPara(n: number) {
    setAtual(n);
    tempos.current[n] = Date.now();
    setProgPct(((n - 1) / TOTAL) * 100);
    track('quiz_pergunta_' + n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function mostrarLoading(finais: Record<number, Letra>) {
    setScreen('loading');
    setTimeout(() => {
      const p = calcularPerfil(finais);
      setPerfil(p);
      setScreen('resultado');
      window.scrollTo(0, 0);
      const nomes: Record<number, string> = { 1: 'investidora', 2: 'ansiosa', 3: 'autossuficiente' };
      track('quiz_resultado_' + nomes[p]);
      firePixelEvent('Lead', { content_name: 'perfil_' + nomes[p] });
    }, 2000);
  }

  function calcularPerfil(r: Record<number, Letra>): 1 | 2 | 3 {
    const c = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(r).forEach(l => c[l]++);
    if (c.A >= c.B && c.A >= c.C && c.A >= c.D) return 1;
    if (c.B >= c.C && c.B >= c.D) return 2;
    return 3;
  }

  function trackCTA() {
    track('quiz_cta_clicado');
    firePixelEvent('InitiateCheckout', { value: 97, currency: 'BRL' });
  }

  return (
    <div className="qw">
      <VideoBackground />
      <div className="qw-particles" ref={particlesRef} />

      {screen === 'loading' && (
        <div className="qw-loading" style={{ display: 'flex' }}>
          <p className="loading-texto">Analisando seu padrão...</p>
          <div className="loading-barra"><div className="loading-fill" /></div>
        </div>
      )}

      {/* INTRO */}
      <div className={`tela tela-intro${screen === 'intro' ? ' ativa' : ''}`}>
        <div className="glow-orb" />
        <p className="marca">Método Sem Migalhas</p>
        <h1 className="intro-h1">
          Descubra por que eles<br />
          perdem o interesse <em>em você</em>
        </h1>
        <div className="intro-linha" />
        <p className="intro-sub">
          Não é o que você pensa.<br />
          E tem solução. São 8 perguntas.<br />
          O resultado pode mudar tudo.
        </p>
        <div className="pills">
          <span className="pill">8 perguntas</span>
          <span className="pill">2 minutos</span>
          <span className="pill">Diagnóstico personalizado</span>
        </div>
        <button className="btn-start" onClick={comecar}>
          Quero descobrir o meu padrão
        </button>
        <p className="intro-nota">Gratuito · Sem cadastro</p>
      </div>

      {/* QUIZ */}
      <div className={`tela tela-quiz${screen === 'quiz' ? ' ativa' : ''}`}>
        <div className="barra-fixa">
          <span className="barra-marca">MSM</span>
          <div className="progresso-wrap">
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${progPct}%` }} />
            </div>
            <span className="prog-num">{atual}/{TOTAL}</span>
          </div>
        </div>
        <div className="quiz-stage">
          <div className="pergunta-wrap">
            {PERGUNTAS.map((perg, idx) => {
              const n = idx + 1;
              return (
                <div key={n} className={`q-card${atual === n ? ' ativa' : ''}`}>
                  <p className="q-num">
                    Pergunta {String(n).padStart(2, '0')} · {String(TOTAL).padStart(2, '0')}
                  </p>
                  <h2 className="q-texto">{perg.texto}</h2>
                  <div className="opcoes">
                    {perg.opcoes.map((texto, oi) => {
                      const letra = LETRAS[oi];
                      return (
                        <button
                          key={letra}
                          className={`op${respostas[n] === letra ? ' escolhida' : ''}`}
                          onClick={() => resp(n, letra)}
                        >
                          <span className="op-bolinha" />
                          {texto}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      {screen === 'resultado' && perfil && (
        <div className="tela tela-resultado ativa">
          <div className="res-hero">
            <div className="res-bg-glow" />
            <p className="res-tag">Seu diagnóstico</p>
            <h2
              className="res-h1"
              dangerouslySetInnerHTML={{ __html: PERFIS[perfil].titulo }}
            />
            <div
              className="res-corpo"
              dangerouslySetInnerHTML={{ __html: PERFIS[perfil].corpo }}
            />
            <div
              className="res-seta"
              onClick={() => transicaoRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Continue lendo</span>
              <span className="seta-icon">↓</span>
            </div>
          </div>

          <div className="transicao" ref={transicaoRef}>
            <div className="transicao-inner">
              <div className="transicao-linha" />
              <p>Esse padrão que você acabou de identificar não surgiu do nada.</p>
              <p>Ele tem uma lógica. Uma sequência.</p>
              <p>E — mais importante — tem saída.</p>
              <p className="transicao-sub">
                Passei anos dentro de uma instituição de apoio à mulher entendendo exatamente isso.
                O que acontece no momento em que o interesse some. Por que acontece.
                E o que as mulheres que viraram esse jogo fizeram de diferente.
              </p>
            </div>
          </div>

          <div className="oferta">
            <p className="oferta-eyebrow">A solução</p>
            <h3 className="oferta-titulo">Por Que Eles Perdem o Interesse</h3>

            <div className="fases">
              {FASES.map(f => (
                <div key={f.n} className="fase">
                  <div className="fase-n">{f.n}</div>
                  <div className="fase-info">
                    <h4>{f.titulo}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bonus-box">
              <span className="bonus-label">Bônus incluídos</span>
              {BONUS.map(b => (
                <div key={b.titulo} className="bonus-item">
                  <div className="bonus-icone">{b.icone}</div>
                  <div className="bonus-txt">
                    <h5>{b.titulo}</h5>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ciencia">
              <p className="ciencia-fonte">Harvard Medical School</p>
              <p>
                Quando um homem desenvolve atração emocional de verdade, as{' '}
                <strong>mesmas áreas do cérebro ligadas ao vício são ativadas</strong>.
                Ele não consegue parar de pensar em você. Não é sorte. É neurologia.
              </p>
            </div>

            <div className="depos">
              {DEPOS.map(d => (
                <div key={d.nome} className="depo">
                  <p className="depo-q">{d.q}</p>
                  <p className="depo-nome">{d.nome}</p>
                </div>
              ))}
            </div>

            <div className="preco-bloco">
              <p className="preco-de">De R$ 197</p>
              <div className="preco-main">
                <span className="preco-rs">R$</span>
                <span className="preco-val">97</span>
              </div>
              <p className="preco-nota">Acesso imediato · Para sempre</p>
            </div>

            <a
              href={CHECKOUT_URL}
              className="btn-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCTA}
            >
              Quero entender o que está acontecendo →
            </a>

            <p className="seguranca">
              🔒 Pagamento seguro · Acesso na hora · Garantia de 7 dias
            </p>
          </div>

          <footer>© Método Sem Migalhas · Todos os direitos reservados</footer>
        </div>
      )}
    </div>
  );
}
