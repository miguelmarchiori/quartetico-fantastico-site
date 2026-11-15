import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronRight,
  Code2,
  Cpu,
  Instagram,
  MapPin,
  Menu,
  RadioTower,
  Route,
  ScanSearch,
  ShieldCheck,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import ShinyText from './components/ShinyText';

const INSTAGRAM_URL = 'https://www.instagram.com/quartetofantastico_sesi/';
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';
const FOOTER_PLATE = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4a917d4c-123f-4b68-8125-b201961b7791.jpg';
const FOOTER_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a8f60da5-538f-403a-a812-6be0f098e319.mp4';

const navItems = [
  ['Início', '#inicio'],
  ['A equipe', '#equipe'],
  ['Resgate OBR', '#resgate'],
  ['Tecnologia', '#tecnologia'],
  ['Conquistas', '#conquistas'],
] as const;

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#inicio" aria-label="Quarteto Fantástico — início">
      <img src="./images/brasao-quarteto.png" alt="Símbolo azul do Quarteto Fantástico" />
      <span className="brand-copy">
        <strong>QUARTETO</strong>
        <small>FANTÁSTICO</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('#inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.querySelector(href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} className={active === href ? 'is-active' : undefined} aria-current={active === href ? 'location' : undefined}>{label}</a>
          ))}
          <a className="nav-contact" href="#contato">Fale com a equipe <ArrowUpRight size={14} /></a>
        </nav>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Navegação móvel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map(([label, href]) => (
              <a href={href} key={href} className={active === href ? 'is-active' : undefined} onClick={() => setOpen(false)}>{label}<ChevronRight size={16} /></a>
            ))}
            <a href="#contato" onClick={() => setOpen(false)}>Fale com a equipe <ArrowUpRight size={16} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="hero-scrim" />
      <div className="hero-grid" />
      <div className="hero-content shell">
        <motion.div className="hero-overline" initial="hidden" animate="visible" variants={reveal}>
          <span className="status-dot" />
          <span>ROBÓTICA DE RESGATE · APUCARANA, PARANÁ</span>
        </motion.div>
        <div className="hero-topline">
          <motion.p initial="hidden" animate="visible" variants={reveal}>
            Somos uma equipe de estudantes que transforma curiosidade em engenharia, código e robôs autônomos preparados para desafios reais.
          </motion.p>
          <motion.p className="hero-location" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.12 }}>
            <MapPin size={15} /> SESI Apucarana <span className="topline-divider" /> OBR 2025 · Modalidade Resgate
          </motion.p>
        </div>
        <div className="hero-title-wrap">
          <motion.p className="hero-kicker" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.18 }}>
            LEGO SPIKE PRIME · PYTHON · OBR RESGATE
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }}>
            Construindo robôs.<br />
            <ShinyText>Preparados para resgatar.</ShinyText>
          </motion.h1>
          <motion.p className="hero-description" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.32 }}>
            Na Olimpíada Brasileira de Robótica, cada segundo, sensor e decisão conta. Com LEGO SPIKE Prime e Python, criamos um robô capaz de agir sozinho quando mais importa.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.4 }}>
            <a className="button button-primary" href="#equipe">Conheça a equipe <ArrowRight size={17} /></a>
            <a className="button button-ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Acompanhe no Instagram <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#equipe"><span>ROLE PARA EXPLORAR</span><ArrowDown size={15} /></a>
        <div className="hero-index"><span>01</span><i /><span>05</span></div>
      </div>
    </section>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><i />{children}</div>;
}

function About() {
  return (
    <section id="equipe" className="section about-section">
      <div className="shell about-grid">
        <motion.div className="about-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <SectionLabel number="01">QUEM SOMOS</SectionLabel>
          <h2>Ideias que ganham forma.<br /><span>Robôs que ganham missão.</span></h2>
        </motion.div>
        <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <p className="lead-copy">O Quarteto Fantástico é uma equipe de robótica do SESI Apucarana, no Paraná, que disputou em 2025 a modalidade Resgate da Olimpíada Brasileira de Robótica (OBR).</p>
          <p>Nosso trabalho une construção, programação e muitos testes. Montamos o robô com LEGO SPIKE Prime e o programamos em Python para seguir a pista, desviar de obstáculos e cumprir a missão de resgate sem nenhuma ajuda humana.</p>
          <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Veja os bastidores da equipe <ArrowUpRight size={16} /></a>
        </motion.div>
      </div>
      <div className="shell about-bottom">
        <div className="about-mark"><img src="./images/brasao-quarteto.png" alt="" /></div>
        <div className="about-statement"><span>APUCARANA · PARANÁ · BRASIL</span><strong>Aprender fazendo.<br />Evoluir testando.</strong></div>
        <div className="about-stat"><strong>2025</strong><span>Temporada<br />OBR Resgate</span></div>
      </div>
    </section>
  );
}

const ROBOT_PATH = 'M 70 400 L 70 330 C 70 290 90 270 130 270 L 230 270 L 230 170 C 230 130 250 120 290 120 L 415 120 C 435 120 440 70 460 70 C 480 70 485 120 505 120 L 530 120 C 570 120 580 140 580 180 L 580 300 C 580 325 565 338 542 338';

const challenges = [
  { title: 'Seguir a linha', text: 'Sensores de cor leem a linha preta e o controle PID mantém o robô no caminho, mesmo em curvas fechadas.' },
  { title: 'Marcadores verdes', text: 'Nas interseções, quadrados verdes indicam para que lado virar. O robô precisa reconhecê-los e decidir na hora.' },
  { title: 'Lacunas', text: 'Trechos em que a linha some. O robô mantém a direção até reencontrar o caminho.' },
  { title: 'Obstáculos', text: 'O sensor de distância detecta o bloqueio, o robô contorna e volta para a linha.' },
  { title: 'Rampas e redutores', text: 'Subidas, descidas e lombadas testam tração, estabilidade e a calibração dos sensores.' },
  { title: 'Sala de resgate', text: 'No fim do percurso, o robô precisa localizar as vítimas e levá-las até a área de resgate.' },
];

function ArenaIllustration() {
  const reduceMotion = useReducedMotion();
  const markers: [number, number, number][] = [
    [1, 100, 362], [2, 196, 300], [3, 355, 152], [4, 460, 170], [5, 542, 218], [6, 486, 288],
  ];
  return (
    <svg className="arena-svg" viewBox="0 0 640 440" role="img" aria-labelledby="arena-title arena-desc">
      <title id="arena-title">Pista da modalidade Resgate da OBR</title>
      <desc id="arena-desc">Ilustração de um robô seguindo a linha, passando por marcador verde, lacuna, obstáculo e rampa até a sala de resgate.</desc>
      <defs>
        <pattern id="arena-tiles" width="100" height="100" patternUnits="userSpaceOnUse" x="20" y="20">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(120,165,225,.13)" strokeWidth="1" />
        </pattern>
        <pattern id="arena-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(92,232,255,.45)" strokeWidth="3" />
        </pattern>
        <radialGradient id="arena-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5ce8ff" stopOpacity=".9" />
          <stop offset="1" stopColor="#5ce8ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="20" y="20" width="600" height="400" rx="6" fill="rgba(7,19,38,.85)" stroke="rgba(120,165,225,.28)" />
      <rect x="20" y="20" width="600" height="400" fill="url(#arena-tiles)" />

      <rect x="460" y="260" width="160" height="160" fill="rgba(80,229,255,.05)" stroke="rgba(92,232,255,.55)" strokeDasharray="6 5" />
      <polygon points="620,420 560,420 620,360" fill="#3ddc84" opacity=".85" />
      <polygon points="460,420 520,420 460,360" fill="#ff5a6e" opacity=".8" />
      <circle cx="515" cy="338" r="8" fill="#d7e1ee" />
      <circle cx="512" cy="335" r="2.5" fill="#fff" />
      <circle cx="588" cy="300" r="8" fill="#d7e1ee" />
      <circle cx="585" cy="297" r="2.5" fill="#fff" />
      <circle cx="560" cy="385" r="8" fill="#06090f" stroke="#7d93b2" strokeWidth="1.5" />

      <g fill="none" stroke="#e8f1ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 70 400 L 70 330 C 70 290 90 270 130 270 L 300 270" />
        <path d="M 230 330 L 230 170 C 230 130 250 120 290 120 L 330 120" />
        <path d="M 380 120 L 530 120 C 570 120 580 140 580 180 L 580 260" />
      </g>

      <rect x="203" y="245" width="14" height="14" fill="#3ddc84" />
      <rect x="566" y="190" width="28" height="56" fill="url(#arena-hatch)" stroke="rgba(92,232,255,.6)" />
      <rect x="440" y="100" width="40" height="40" rx="4" fill="#12325c" stroke="#79cfff" strokeWidth="1.5" />
      <path d="M 446 106 L 474 134 M 474 106 L 446 134" stroke="rgba(121,207,255,.4)" strokeWidth="1.5" />

      {markers.map(([n, x, y]) => (
        <g key={n} className="arena-marker">
          <circle cx={x} cy={y} r="11" fill="#030914" stroke="#5ce8ff" strokeWidth="1.2" />
          <text x={x} y={y + 4} textAnchor="middle" fill="#5ce8ff" fontSize="11" fontWeight="700" fontFamily="Space Grotesk, sans-serif">{n}</text>
        </g>
      ))}

      <path id="arena-robot-path" d={ROBOT_PATH} fill="none" stroke="none" />
      <g className="arena-robot" transform={reduceMotion ? 'translate(70 380) rotate(-90)' : undefined}>
        <circle cx="14" cy="0" r="14" fill="url(#arena-glow)" opacity=".55" />
        <rect x="-13" y="-10" width="26" height="20" rx="5" fill="#1876e5" stroke="#9fdcff" strokeWidth="1.5" />
        <rect x="-16" y="-13" width="10" height="4" rx="1.5" fill="#0b1d36" />
        <rect x="-16" y="9" width="10" height="4" rx="1.5" fill="#0b1d36" />
        <circle cx="9" cy="-4" r="1.8" fill="#e9fbff" />
        <circle cx="9" cy="4" r="1.8" fill="#e9fbff" />
        {!reduceMotion && (
          <>
            <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
              <mpath href="#arena-robot-path" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.04;0.95;1" dur="16s" repeatCount="indefinite" />
          </>
        )}
      </g>
    </svg>
  );
}

const stages = [
  { icon: ScanSearch, number: '01', title: 'Perceber', text: 'Sensores de cor e distância ajudam o robô a interpretar a pista e identificar o que está à sua frente.' },
  { icon: Code2, number: '02', title: 'Decidir', text: 'O código em Python e o controle PID transformam leituras em decisões de movimento, correção e navegação.' },
  { icon: Bot, number: '03', title: 'Agir', text: 'Os motores do SPIKE Prime executam a estratégia com autonomia, consistência e precisão.' },
];

function Rescue() {
  return (
    <section id="resgate" className="section rescue-section">
      <div className="shell">
        <motion.div className="section-heading section-heading-row" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
          <div>
            <SectionLabel number="02">A MISSÃO</SectionLabel>
            <h2>Resgate é mais do que<br className="br-wide" /> <span>chegar ao destino.</span></h2>
          </div>
          <p>Na modalidade Resgate da OBR, o robô percorre sozinho uma pista com linha preta, interseções, lacunas, obstáculos e rampas até chegar à sala de resgate, onde precisa salvar as vítimas. Tudo sem intervenção humana.</p>
        </motion.div>
        <motion.div className="arena" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
          <figure className="arena-visual">
            <ArenaIllustration />
            <figcaption>Ilustração simplificada da pista de Resgate</figcaption>
          </figure>
          <ol className="arena-list">
            {challenges.map((item, index) => (
              <li key={item.title}>
                <span className="arena-num">{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
        <div className="stage-grid">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.article className="stage-card" key={stage.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ delay: index * 0.1 }}>
                <div className="stage-card-top"><span>{stage.number}</span><Icon size={25} strokeWidth={1.5} /></div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <div className="stage-card-line" />
              </motion.article>
            );
          })}
        </div>
        <div className="mission-note"><ShieldCheck size={18} /><span>Autonomia não é improviso: é resultado de planejamento, programação e muitos testes.</span></div>
      </div>
    </section>
  );
}

const tech = [
  { icon: Code2, label: 'SOFTWARE', title: 'Python', description: 'Todo o código do robô é escrito em Python: leitura de sensores, controle dos motores e a estratégia da sala de resgate.' },
  { icon: Cpu, label: 'HARDWARE', title: 'LEGO SPIKE Prime', description: 'Hub programável, motores e sensores de cor e distância montados em um robô pensado para a pista da OBR.' },
  { icon: Route, label: 'NAVEGAÇÃO', title: 'Controle PID', description: 'Correção contínua da trajetória para seguir a linha com precisão, fazer curvas suaves e voltar rápido ao caminho.' },
];

type Token = [kind: 'k' | 'c' | 'f' | 'n' | 'p', text: string];
const codeLines: Token[][] = [
  [['c', '# Seguidor de linha com controle PID']],
  [['k', 'while'], ['p', ' '], ['k', 'True'], ['p', ':']],
  [['p', '    erro = esquerdo.'], ['f', 'reflexao'], ['p', '() - direito.'], ['f', 'reflexao'], ['p', '()']],
  [['p', '    integral += erro']],
  [['p', '    derivada = erro - erro_anterior']],
  [['p', '    curva = '], ['n', 'KP'], ['p', '*erro + '], ['n', 'KI'], ['p', '*integral + '], ['n', 'KD'], ['p', '*derivada']],
  [['p', '    robo.'], ['f', 'andar'], ['p', '('], ['n', 'VELOCIDADE'], ['p', ', curva)']],
  [['p', '    erro_anterior = erro']],
];

function CodeShowcase() {
  return (
    <motion.div className="code-showcase" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
      <div className="code-copy">
        <span className="eyebrow">NA PRÁTICA</span>
        <h3>Do sensor ao motor,<br />em Python.</h3>
        <p>A cada ciclo, o robô compara as leituras dos sensores, calcula o quanto saiu da linha e corrige a direção. É esse laço, repetido sem parar, que mantém o robô no caminho.</p>
      </div>
      <div className="code-card">
        <div className="code-head">
          <span className="code-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="code-file">seguidor_de_linha.py</span>
          <span className="code-tag">trecho ilustrativo</span>
        </div>
        <pre aria-label="Exemplo de código Python de um seguidor de linha com PID">
          <code>
            {codeLines.map((line, i) => (
              <span className="code-line" key={i}>
                <span className="code-ln" aria-hidden="true">{i + 1}</span>
                {line.map(([kind, text], j) => <span className={`tok-${kind}`} key={j}>{text}</span>)}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}

function Technology() {
  return (
    <section id="tecnologia" className="section technology-section">
      <div className="shell">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
          <SectionLabel number="03">POR TRÁS DO ROBÔ</SectionLabel>
          <h2>Tecnologia aplicada.<br /><span>Conhecimento em movimento.</span></h2>
          <p>O resultado aparece na arena. O desenvolvimento acontece muito antes dela: na bancada, no código e em cada ciclo de teste.</p>
        </motion.div>
        <div className="tech-grid">
          {tech.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article className="tech-card" key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ delay: index * 0.1 }}>
                <div className="tech-icon"><Icon size={24} strokeWidth={1.5} /></div>
                <span className="eyebrow">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="tech-card-number">0{index + 1}</span>
              </motion.article>
            );
          })}
        </div>
        <CodeShowcase />
        <div className="tech-footnote"><Zap size={15} /> Cada melhoria começa com uma pergunta, passa por um teste e termina em aprendizado.</div>
      </div>
    </section>
  );
}

function Achievement() {
  return (
    <section id="conquistas" className="section achievement-section">
      <div className="shell achievement-panel">
        <div className="achievement-glow" />
        <motion.div className="achievement-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
          <SectionLabel number="04">NOSSA TRAJETÓRIA</SectionLabel>
          <span className="eyebrow">CONQUISTA REGIONAL · 2025</span>
          <h2>Uma etapa vencida.<br /><ShinyText>Novos desafios pela frente.</ShinyText></h2>
          <p>Em 2025, a equipe foi campeã da etapa regional da OBR no Norte do Paraná. Uma conquista construída com colaboração, dedicação e muita vontade de aprender.</p>
          <a className="button button-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Acompanhe nossa jornada <ArrowUpRight size={16} /></a>
        </motion.div>
        <motion.div className="achievement-badge" initial={{ opacity: 0, scale: 0.9, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <div className="badge-orbit badge-orbit-one" />
          <div className="badge-orbit badge-orbit-two" />
          <div className="badge-core"><Trophy size={46} strokeWidth={1.2} /><span>OBR 2025</span><small>REGIONAL · NORTE PR</small></div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="contact-section">
      <div className="shell contact-inner">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <SectionLabel number="05">FAÇA PARTE DA NOSSA HISTÓRIA</SectionLabel>
          <h2>O próximo desafio<br /><ShinyText>começa com uma conexão.</ShinyText></h2>
          <p>Quer acompanhar nossos projetos, conhecer os bastidores ou conversar sobre robótica? Encontre a equipe nas redes.</p>
          <a className="button button-primary contact-button" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Siga @quartetofantastico_sesi <ArrowUpRight size={17} /></a>
        </motion.div>
        <div className="contact-side-note"><RadioTower size={18} /><span>APUCARANA / PR</span><i /> <span>OBR RESGATE 2025</span></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-aurora" style={{ backgroundImage: `url(${FOOTER_PLATE})` }}>
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={FOOTER_VIDEO} type="video/mp4" />
        </video>
        <div className="footer-aurora-mask" />
      </div>
      <svg className="footer-arc" viewBox="0 0 1326 386" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2A6DFC" /><stop offset="1" stopColor="#3FD0FF" /></linearGradient></defs>
        <path d="M0 143 C270 250 520 400 816 386 C1040 376 1192 342 1326 334" fill="none" stroke="url(#arc-gradient)" strokeWidth="1.5" opacity=".72" />
      </svg>
      <div className="footer-ring" aria-hidden="true"><div /></div>
      <div className="shell footer-content">
        <div className="footer-main">
          <div className="footer-intro">
            <Brand compact />
            <p>Ideias, código e engenharia unidos por um objetivo: construir robôs autônomos com LEGO SPIKE Prime e Python para os desafios da OBR.</p>
            <a className="footer-book" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span><ArrowUpRight size={20} /></span> Acompanhe a equipe</a>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#equipe">A equipe</a>
            <a href="#resgate">Resgate OBR</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#conquistas">Conquistas</a>
          </div>
          <div className="footer-column">
            <h3>Conecte-se</h3>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>
            <a href="#contato">Contato</a>
            <a href="#inicio">Voltar ao topo <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Quarteto Fantástico. Todos os direitos reservados.</span>
          <div className="footer-socials"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="#inicio" aria-label="Voltar ao topo"><ArrowUpRight size={17} /></a></div>
          <span className="footer-location"><MapPin size={13} /> Apucarana, Paraná, Brasil</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#equipe">Pular para o conteúdo</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Rescue />
        <Technology />
        <Achievement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
