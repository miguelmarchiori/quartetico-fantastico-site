import { useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
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
              <a href={href} key={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={16} /></a>
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
      <Header />
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
            <MapPin size={15} /> SESI Apucarana <span className="topline-divider" /> OBR · Modalidade Resgate
          </motion.p>
        </div>
        <div className="hero-title-wrap">
          <motion.p className="hero-kicker" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.18 }}>
            ENGENHARIA, ESTRATÉGIA E PROPÓSITO
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }}>
            Construindo robôs.<br />
            <ShinyText>Preparados para resgatar.</ShinyText>
          </motion.h1>
          <motion.p className="hero-description" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.32 }}>
            Na Olimpíada Brasileira de Robótica, cada segundo, sensor e decisão conta. Nosso desafio é criar tecnologia capaz de agir com autonomia quando mais importa.
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
          <p className="lead-copy">O Quarteto Fantástico é uma equipe de robótica de Apucarana, no Paraná, dedicada à modalidade Resgate da Olimpíada Brasileira de Robótica (OBR).</p>
          <p>Nosso trabalho une programação, construção e testes. Projetamos um robô autônomo para interpretar o ambiente, seguir trajetos, reconhecer obstáculos e cumprir a missão de resgate com precisão.</p>
          <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Veja os bastidores da equipe <ArrowUpRight size={16} /></a>
        </motion.div>
      </div>
      <div className="shell about-bottom">
        <div className="about-mark"><img src="./images/brasao-quarteto.png" alt="" /></div>
        <div className="about-statement"><span>APUCARANA · PARANÁ · BRASIL</span><strong>Aprender fazendo.<br />Evoluir testando.</strong></div>
        <div className="about-stat"><strong>OBR</strong><span>Olimpíada Brasileira<br />de Robótica</span></div>
      </div>
    </section>
  );
}

const stages = [
  { icon: ScanSearch, number: '01', title: 'Perceber', text: 'Sensores de cor e distância ajudam o robô a interpretar a pista e identificar o que está à sua frente.' },
  { icon: Code2, number: '02', title: 'Decidir', text: 'Algoritmos e controle PID transformam leituras em decisões de movimento, correção e navegação.' },
  { icon: Bot, number: '03', title: 'Agir', text: 'Motores e mecanismos executam a estratégia com autonomia, consistência e precisão.' },
];

function Rescue() {
  return (
    <section id="resgate" className="section rescue-section">
      <div className="shell">
        <motion.div className="section-heading section-heading-row" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
          <div>
            <SectionLabel number="02">A MISSÃO</SectionLabel>
            <h2>Resgate é mais do que<br /><span>chegar ao destino.</span></h2>
          </div>
          <p>Na modalidade Resgate da OBR, o robô precisa superar um percurso que exige leitura de pista, desvio de obstáculos e tomada de decisão. O desafio está em fazer tudo isso sem intervenção humana.</p>
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
  { icon: Code2, label: 'SOFTWARE', title: 'Python + Pybricks', description: 'Lógica de controle, leitura de sensores e rotinas autônomas desenvolvidas em Python.' },
  { icon: Cpu, label: 'HARDWARE', title: 'LEGO SPIKE Prime', description: 'Motores, sensores e mecanismos integrados em uma plataforma robótica programável.' },
  { icon: Route, label: 'NAVEGAÇÃO', title: 'PID + planejamento', description: 'Acompanhamento de linha, correções de trajetória e estratégias para lidar com obstáculos.' },
];

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
          <span className="eyebrow">CONQUISTA REGIONAL</span>
          <h2>Uma etapa vencida.<br /><ShinyText>Novos desafios pela frente.</ShinyText></h2>
          <p>A equipe conquistou o destaque de campeã da etapa regional da OBR no Norte do Paraná. Uma conquista construída com colaboração, dedicação e vontade de aprender.</p>
          <a className="button button-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Acompanhe nossa jornada <ArrowUpRight size={16} /></a>
        </motion.div>
        <motion.div className="achievement-badge" initial={{ opacity: 0, scale: 0.9, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <div className="badge-orbit badge-orbit-one" />
          <div className="badge-orbit badge-orbit-two" />
          <div className="badge-core"><Trophy size={46} strokeWidth={1.2} /><span>OBR</span><small>NORTE DO PARANÁ</small></div>
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
        <div className="contact-side-note"><RadioTower size={18} /><span>APUCARANA / PR</span><i /> <span>OBR RESGATE</span></div>
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
            <p>Ideias, código e engenharia unidos por um objetivo: construir robôs autônomos para os desafios da OBR.</p>
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
    <main>
      <Hero />
      <About />
      <Rescue />
      <Technology />
      <Achievement />
      <Contact />
      <Footer />
    </main>
  );
}
