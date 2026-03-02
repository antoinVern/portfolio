import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════
   DATA  —  src/data/portfolio.js
════════════════════════════════════════════════════ */
const DATA = {
  name: "Alex Moreau",
  title: "Développeur Full-Stack",
  tagline: "Je construis des expériences numériques qui ont du sens.",
  about:
    "Passionné par l'intersection du code et du design, je crée des applications web soignées avec une attention particulière à l'expérience utilisateur. Chaque projet est une opportunité de repousser les limites techniques tout en gardant l'humain au centre.",
  email: "alex.moreau@dev.fr",
  github: "github.com/alexmoreau",
  linkedin: "linkedin.com/in/alexmoreau",
  location: "Paris, France",
  availability: "Disponible — Freelance / CDI",
  stats: [
    { value: "3+", label: "Années d'expérience" },
    { value: "24",  label: "Projets livrés" },
    { value: "12",  label: "Clients satisfaits" },
    { value: "99",  label: "Score Lighthouse" },
  ],
  skills: [
    { cat: "Front-end",      icon: "◈", items: ["React","TypeScript","Next.js","Tailwind CSS","Three.js","Framer Motion"] },
    { cat: "Back-end",       icon: "◉", items: ["Node.js","Python","PostgreSQL","REST API","GraphQL","Redis"] },
    { cat: "Outils & DevOps",icon: "◐", items: ["Git","Docker","Figma","Vercel","AWS","CI/CD"] },
  ],
  timeline: [
    { year:"2024", role:"Développeur Senior",   place:"Agence Pixel · Paris",        desc:"Lead front-end sur 8 projets clients. Migration vers Next.js 14, design system partagé.", type:"work" },
    { year:"2022", role:"Développeur Full-Stack",place:"StartupX · Lyon",             desc:"Construction du MVP de A à Z. Stack React + FastAPI + PostgreSQL. Levée série A réussie.", type:"work" },
    { year:"2021", role:"Master Informatique",  place:"Université Paris-Saclay",      desc:"Spécialisation génie logiciel et systèmes distribués. Major de promotion.", type:"edu" },
    { year:"2019", role:"Licence Informatique", place:"IUT de Grenoble",              desc:"Bases solides en algorithmique, POO et bases de données relationnelles.", type:"edu" },
  ],
  projects: [
    { id:1, cat:"Web App",    title:"Palette Studio",  desc:"Outil de génération de palettes avec IA. Export vers Figma, CSS et Tailwind en un clic.",               tech:["React","OpenAI API","Node.js"],            year:"2024", featured:true,  color:"#00d4ff" },
    { id:2, cat:"E-commerce", title:"Maison Blanche",  desc:"Boutique haut de gamme pour une marque de mobilier. SSR, SEO optimisé, score Lighthouse 99.",           tech:["Next.js","Stripe","Sanity CMS"],           year:"2024", featured:true,  color:"#a78bfa" },
    { id:3, cat:"Dashboard",  title:"AnalytiX",        desc:"Dashboard temps réel pour équipes marketing. Visualisation de données et exports PDF automatisés.",       tech:["React","D3.js","FastAPI","PostgreSQL"],    year:"2023", featured:false, color:"#34d399" },
    { id:4, cat:"Mobile",     title:"TrailMate",       desc:"Application de randonnée avec cartes offline, suivi GPS et partage de parcours communautaire.",           tech:["React Native","Mapbox","SQLite"],          year:"2023", featured:false, color:"#fb923c" },
    { id:5, cat:"Web App",    title:"CodeReview AI",   desc:"Assistant de code review automatisé intégré à GitHub. Détecte bugs et suggère des refactorisations.",     tech:["Python","GitHub API","GPT-4"],             year:"2022", featured:true,  color:"#f472b6" },
    { id:6, cat:"Dashboard",  title:"EcoTrack",        desc:"Suivi de l'empreinte carbone d'une entreprise avec rapports mensuels et objectifs RSE.",                 tech:["Vue.js","Chart.js","Django"],              year:"2022", featured:false, color:"#4ade80" },
  ],
};

/* ════════════════════════════════════════════════════
   GLOBAL STYLES  —  src/styles/global.css
════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

:root {
  --bg:           #080b10;
  --bg-2:         #0d1117;
  --bg-3:         #111820;
  --border:       rgba(255,255,255,0.07);
  --border-bright:rgba(0,212,255,0.25);
  --cyan:         #00d4ff;
  --cyan-dim:     rgba(0,212,255,0.10);
  --text:         #e8edf5;
  --muted:        #5a6a80;
  --muted-2:      #8a9ab0;
  --font-display: 'Syne', sans-serif;
  --font-body:    'Outfit', sans-serif;
  --radius:       6px;
  --nav-h:        68px;
}

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
body::before {
  content:'';
  position:fixed; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity:0.025; pointer-events:none; z-index:9999;
}
::selection { background:var(--cyan); color:var(--bg); }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:var(--bg); }
::-webkit-scrollbar-thumb { background:var(--border-bright); border-radius:2px; }

.section-label { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:var(--cyan); font-weight:600; margin-bottom:14px; }
.section-title  { font-family:var(--font-display); font-size:clamp(36px,4.5vw,60px); font-weight:800; line-height:1.05; letter-spacing:-2px; color:var(--text); }
.divider        { height:1px; background:var(--border); }

@keyframes fade-up    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes glow-pulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
@keyframes scan       { 0%{left:-100%} 100%{left:100%} }

.anim-1 { animation:fade-up .75s cubic-bezier(.22,1,.36,1) .05s both; }
.anim-2 { animation:fade-up .75s cubic-bezier(.22,1,.36,1) .18s both; }
.anim-3 { animation:fade-up .75s cubic-bezier(.22,1,.36,1) .31s both; }
.anim-4 { animation:fade-up .75s cubic-bezier(.22,1,.36,1) .44s both; }
.anim-5 { animation:fade-up .75s cubic-bezier(.22,1,.36,1) .57s both; }

.reveal { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

.btn-primary {
  display:inline-flex; align-items:center; gap:10px;
  background:var(--cyan); color:var(--bg); border:none;
  padding:14px 30px; border-radius:var(--radius);
  font-size:14px; font-weight:600; font-family:var(--font-body);
  cursor:pointer; transition:box-shadow .25s, transform .2s; letter-spacing:.3px;
}
.btn-primary:hover { box-shadow:0 0 28px rgba(0,212,255,.45); transform:translateY(-2px); }
.btn-ghost {
  display:inline-flex; align-items:center; gap:10px;
  background:transparent; color:var(--text); border:1px solid var(--border);
  padding:14px 30px; border-radius:var(--radius);
  font-size:14px; font-weight:500; font-family:var(--font-body);
  cursor:pointer; transition:border-color .2s, color .2s, transform .2s;
}
.btn-ghost:hover { border-color:var(--cyan); color:var(--cyan); transform:translateY(-2px); }
`;

/* ════════════════════════════════════════════════════
   HOOK  —  src/components/useReveal.jsx
════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR  —  src/components/Navbar.jsx
════════════════════════════════════════════════════ */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (p, anchor) => {
    setOpen(false); setPage(p);
    if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior:"smooth" }), 80);
    else window.scrollTo(0, 0);
  };
  const links = [
    { label:"Accueil",     fn: () => go("home") },
    { label:"À propos",    fn: () => go("home","about") },
    { label:"Compétences", fn: () => go("home","skills") },
    { label:"Projets",     fn: () => go("projects") },
  ];
  return (
    <>
      <style>{`
        .nav { position:fixed; top:0; left:0; right:0; z-index:200; height:var(--nav-h);
          display:flex; align-items:center; justify-content:space-between; padding:0 56px;
          transition:background .35s, border-color .35s; }
        .nav.scrolled { background:rgba(8,11,16,.9); backdrop-filter:blur(16px);
          border-bottom:1px solid var(--border); }
        .nav-logo { font-family:var(--font-display); font-size:18px; font-weight:800;
          letter-spacing:-.5px; cursor:pointer; color:var(--text); }
        .nav-logo span { color:var(--cyan); }
        .nav-links { display:flex; align-items:center; gap:36px; list-style:none; }
        .nav-link { font-size:13.5px; font-weight:500; color:var(--muted-2); cursor:pointer;
          position:relative; padding-bottom:3px; transition:color .2s; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px;
          background:var(--cyan); transition:width .25s; }
        .nav-link:hover, .nav-link.active { color:var(--text); }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }
        .nav-cta { background:var(--cyan-dim); color:var(--cyan); border:1px solid var(--border-bright);
          padding:9px 20px; border-radius:var(--radius); font-size:13px; font-weight:600;
          font-family:var(--font-body); cursor:pointer; transition:background .2s, box-shadow .2s; }
        .nav-cta:hover { background:rgba(0,212,255,.18); box-shadow:0 0 20px rgba(0,212,255,.2); }
        .nav-burger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; background:none; border:none; }
        .nav-burger span { display:block; width:24px; height:2px; background:var(--text); border-radius:2px; transition:all .3s; }
        .nav-mobile { display:none; position:fixed; top:var(--nav-h); left:0; right:0;
          background:var(--bg-2); border-bottom:1px solid var(--border);
          padding:24px 32px; flex-direction:column; gap:20px; z-index:199; }
        .nav-mobile.open { display:flex; }
        @media(max-width:768px){ .nav{padding:0 24px;} .nav-links,.nav-cta-d{display:none!important;}
          .nav-burger{display:flex!important;} .nav-mobile .nav-link{font-size:16px;} }
      `}</style>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => go("home")}>
          {DATA.name.split(" ")[0]}<span>.</span>
        </div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <span className={`nav-link ${page==="home" && l.label==="Accueil" ? "active" : page==="projects" && l.label==="Projets" ? "active" : ""}`}
                onClick={l.fn}>{l.label}</span>
            </li>
          ))}
        </ul>
        <button className="nav-cta nav-cta-d" onClick={() => go("home","contact")}>Me contacter</button>
        <button className="nav-burger" onClick={() => setOpen(v => !v)}>
          <span style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
        </button>
      </nav>
      <div className={`nav-mobile ${open ? "open" : ""}`}>
        {links.map(l => <span key={l.label} className="nav-link" onClick={l.fn}>{l.label}</span>)}
        <button className="nav-cta" style={{ alignSelf:"flex-start" }} onClick={() => go("home","contact")}>Me contacter</button>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════
   HERO  —  src/components/Hero.jsx
════════════════════════════════════════════════════ */
function Hero({ setPage }) {
  return (
    <>
      <style>{`
        .hero { min-height:100vh; display:flex; align-items:center;
          padding:var(--nav-h) 56px 0; position:relative; overflow:hidden; }
        .hero-blob-1 { position:absolute; width:600px; height:600px; border-radius:50%;
          background:radial-gradient(circle,rgba(0,212,255,.07) 0%,transparent 70%);
          top:-100px; right:-100px; pointer-events:none; animation:glow-pulse 6s ease-in-out infinite; }
        .hero-blob-2 { position:absolute; width:400px; height:400px; border-radius:50%;
          background:radial-gradient(circle,rgba(167,139,250,.06) 0%,transparent 70%);
          bottom:50px; left:-50px; pointer-events:none; animation:glow-pulse 8s ease-in-out 2s infinite; }
        .hero-grid-bg { position:absolute; inset:0;
          background-image:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
          background-size:60px 60px; pointer-events:none; }
        .hero-content { max-width:1200px; width:100%; margin:auto;
          display:grid; grid-template-columns:1.1fr 0.9fr; gap:80px; align-items:center; position:relative; z-index:1; }
        .hero-eyebrow { display:flex; align-items:center; gap:12px; font-size:12px;
          letter-spacing:4px; text-transform:uppercase; color:var(--cyan); font-weight:600; margin-bottom:20px; }
        .hero-eyebrow::before { content:''; display:block; width:32px; height:1px; background:var(--cyan); }
        .hero-title { font-family:var(--font-display); font-size:clamp(52px,6.5vw,88px);
          font-weight:800; line-height:1.0; letter-spacing:-3px; white-space:pre-line; }
        .hero-title .c { color:var(--cyan); }
        .hero-title .d { color:var(--muted); }
        .hero-sub { font-size:16px; color:var(--muted-2); margin-top:24px; line-height:1.75; max-width:460px; }
        .hero-actions { display:flex; align-items:center; gap:16px; margin-top:40px; flex-wrap:wrap; }
        .hero-scroll { position:absolute; bottom:48px; left:56px; display:flex; align-items:center; gap:12px;
          font-size:11px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); }
        .hero-scroll-line { width:40px; height:1px; background:var(--muted); position:relative; overflow:hidden; }
        .hero-scroll-line::after { content:''; position:absolute; top:0; left:-100%;
          width:100%; height:100%; background:var(--cyan); animation:scan 2s ease-in-out infinite; }
        .hero-card { width:300px; background:var(--bg-2); border:1px solid var(--border);
          border-radius:12px; padding:32px; position:relative; overflow:hidden; }
        .hero-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--cyan),transparent); }
        .hero-card-avatar { width:72px; height:72px; border-radius:50%;
          background:linear-gradient(135deg,var(--cyan-dim),rgba(167,139,250,.15));
          border:1px solid var(--border-bright); display:flex; align-items:center; justify-content:center;
          font-family:var(--font-display); font-size:24px; font-weight:800; color:var(--cyan); margin-bottom:20px; }
        .hero-card-name { font-family:var(--font-display); font-size:18px; font-weight:700; margin-bottom:4px; }
        .hero-card-role { font-size:13px; color:var(--muted-2); margin-bottom:20px; }
        .hero-card-badge { display:inline-flex; align-items:center; gap:6px;
          background:rgba(52,211,153,.1); border:1px solid rgba(52,211,153,.25);
          color:#34d399; font-size:12px; font-weight:500; padding:5px 12px; border-radius:20px; margin-bottom:24px; }
        .hero-card-badge::before { content:''; width:6px; height:6px; border-radius:50%;
          background:#34d399; animation:glow-pulse 2s ease-in-out infinite; }
        .hero-card-stats { display:grid; grid-template-columns:1fr 1fr; gap:12px;
          border-top:1px solid var(--border); padding-top:20px; }
        .hero-stat-val { font-family:var(--font-display); font-size:22px; font-weight:800; }
        .hero-stat-val span { color:var(--cyan); }
        .hero-stat-lbl { font-size:11px; color:var(--muted); margin-top:2px; }
        .hero-visual { display:flex; justify-content:center; }
        @media(max-width:768px){
          .hero{padding:calc(var(--nav-h) + 32px) 24px 80px;}
          .hero-content{grid-template-columns:1fr;} .hero-visual{display:none;}
          .hero-scroll{left:24px;bottom:32px;} .hero-title{letter-spacing:-2px;} }
      `}</style>
      <section className="hero">
        <div className="hero-blob-1" /><div className="hero-blob-2" /><div className="hero-grid-bg" />
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow anim-1">Portfolio 2024</div>
            <h1 className="hero-title anim-2">
              {"Coder c'est\ncréer du\n"}<span className="c">futur</span><span className="d">.</span>
            </h1>
            <p className="hero-sub anim-3">{DATA.tagline}</p>
            <div className="hero-actions anim-4">
              <button className="btn-primary" onClick={() => { setPage("projects"); window.scrollTo(0,0); }}>Voir mes projets →</button>
              <button className="btn-ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}>En savoir plus</button>
            </div>
          </div>
          <div className="hero-visual anim-5">
            <div className="hero-card">
              <div className="hero-card-avatar">{DATA.name.split(" ").map(n=>n[0]).join("")}</div>
              <div className="hero-card-name">{DATA.name}</div>
              <div className="hero-card-role">{DATA.title}</div>
              <div className="hero-card-badge">{DATA.availability}</div>
              <div className="hero-card-stats">
                {DATA.stats.map(s => (
                  <div key={s.label}>
                    <div className="hero-stat-val">{s.value.replace("+","")}<span>{s.value.includes("+") ? "+" : ""}</span></div>
                    <div className="hero-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll"><div className="hero-scroll-line" />Scroll</div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════
   ABOUT  —  src/components/About.jsx
════════════════════════════════════════════════════ */
function About() {
  const infos = [
    { label:"Localisation", value:DATA.location,     icon:"📍" },
    { label:"Statut",       value:DATA.availability, icon:"✦" },
    { label:"Email",        value:DATA.email,         icon:"✉" },
    { label:"GitHub",       value:DATA.github,        icon:"⌥" },
  ];
  return (
    <>
      <style>{`
        .about-section { padding:112px 56px; max-width:1200px; margin:auto; }
        .about-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:80px; align-items:start; margin-top:56px; }
        .about-quote { font-family:var(--font-display); font-size:26px; font-weight:700; line-height:1.4;
          letter-spacing:-.5px; border-left:2px solid var(--cyan); padding-left:24px; margin-bottom:32px; }
        .about-links { display:flex; flex-direction:column; gap:12px; margin-top:32px; }
        .about-ci { display:flex; align-items:center; gap:12px; font-size:13.5px; color:var(--muted-2); }
        .about-ci-icon { width:32px; height:32px; border-radius:var(--radius); background:var(--bg-3);
          border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
        .about-body { font-size:16px; color:var(--muted-2); line-height:1.85; margin-bottom:40px; }
        .about-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .about-info-card { background:var(--bg-2); border:1px solid var(--border); border-radius:var(--radius);
          padding:16px 18px; transition:border-color .2s; }
        .about-info-card:hover { border-color:var(--border-bright); }
        .about-info-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:6px; font-weight:500; }
        .about-info-value { font-size:14px; font-weight:500; }
        @media(max-width:768px){ .about-section{padding:64px 24px;} .about-grid{grid-template-columns:1fr; gap:40px;} .about-info-grid{grid-template-columns:1fr;} }
      `}</style>
      <section className="about-section" id="about">
        <Reveal><div className="section-label">À propos</div><h2 className="section-title">Qui suis-je ?</h2></Reveal>
        <div className="about-grid">
          <Reveal delay={0.1}>
            <blockquote className="about-quote">« Le bon code, c'est comme le bon design — invisible quand ça marche. »</blockquote>
            <div className="about-links">
              {infos.slice(0,2).map(i => (
                <div key={i.label} className="about-ci">
                  <div className="about-ci-icon">{i.icon}</div><span>{i.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="about-body">{DATA.about}</p>
            <div className="about-info-grid">
              {infos.map(i => (
                <div key={i.label} className="about-info-card">
                  <div className="about-info-label">{i.label}</div>
                  <div className="about-info-value">{i.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════
   SKILLS  —  src/components/Skills.jsx
════════════════════════════════════════════════════ */
function Skills() {
  return (
    <>
      <style>{`
        .skills-section { background:var(--bg-2); border-top:1px solid var(--border);
          border-bottom:1px solid var(--border); padding:112px 56px; position:relative; overflow:hidden; }
        .skills-inner { max-width:1200px; margin:auto; }
        .skills-bg-text { position:absolute; right:-20px; top:50%; transform:translateY(-50%);
          font-family:var(--font-display); font-size:200px; font-weight:800;
          color:rgba(255,255,255,.015); pointer-events:none; user-select:none; line-height:1; }
        .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; margin-top:56px; }
        .skill-card { background:var(--bg-3); border:1px solid var(--border); border-radius:10px;
          padding:32px; transition:border-color .3s, transform .3s; position:relative; overflow:hidden; }
        .skill-card::after { content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,var(--cyan-dim),transparent 60%); opacity:0; transition:opacity .3s; }
        .skill-card:hover { border-color:var(--border-bright); transform:translateY(-4px); }
        .skill-card:hover::after { opacity:1; }
        .skill-card-icon { font-size:22px; color:var(--cyan); margin-bottom:16px; display:block; }
        .skill-card-title { font-family:var(--font-display); font-size:20px; font-weight:700;
          margin-bottom:20px; position:relative; z-index:1; }
        .skill-tags { display:flex; flex-wrap:wrap; gap:8px; position:relative; z-index:1; }
        .skill-tag { padding:5px 14px; border:1px solid var(--border); border-radius:20px;
          font-size:12.5px; color:var(--muted-2); transition:all .2s; cursor:default; }
        .skill-tag:hover { border-color:var(--cyan)!important; color:var(--cyan)!important; background:var(--cyan-dim); }
        @media(max-width:768px){ .skills-section{padding:64px 24px;} .skills-grid{grid-template-columns:1fr; gap:16px;} .skills-bg-text{display:none;} }
      `}</style>
      <section className="skills-section" id="skills">
        <div className="skills-bg-text">SKILLS</div>
        <div className="skills-inner">
          <Reveal><div className="section-label">Compétences</div><h2 className="section-title">Ce que je maîtrise</h2></Reveal>
          <div className="skills-grid">
            {DATA.skills.map((s,i) => (
              <Reveal key={s.cat} delay={i*.1}>
                <div className="skill-card">
                  <span className="skill-card-icon">{s.icon}</span>
                  <h3 className="skill-card-title">{s.cat}</h3>
                  <div className="skill-tags">{s.items.map(item => <span key={item} className="skill-tag">{item}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════
   TIMELINE  —  src/components/Timeline.jsx
════════════════════════════════════════════════════ */
function Timeline() {
  const work = DATA.timeline.filter(t => t.type === "work");
  const edu  = DATA.timeline.filter(t => t.type === "edu");
  const renderItems = (items) => (
    <div>
      {items.map(t => (
        <div key={t.year + t.role} style={{ display:"grid", gridTemplateColumns:"20px 1fr", gap:20, paddingBottom:36, position:"relative" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:4 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", border:"2px solid var(--cyan)", background:"var(--bg)",
              flexShrink:0, boxShadow:"0 0 10px rgba(0,212,255,.3)" }} />
            <div style={{ flex:1, width:1, background:"var(--border)", marginTop:6 }} />
          </div>
          <div>
            <span style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:600, padding:"3px 8px",
              borderRadius:3, background: t.type==="work" ? "rgba(0,212,255,.1)" : "rgba(167,139,250,.1)",
              color: t.type==="work" ? "var(--cyan)" : "#a78bfa",
              border: `1px solid ${t.type==="work" ? "rgba(0,212,255,.2)" : "rgba(167,139,250,.2)"}`,
              display:"inline-block", marginBottom:10 }}>
              {t.type==="work" ? "Expérience" : "Formation"}
            </span>
            <div style={{ fontSize:12, color:"var(--cyan)", fontWeight:600, letterSpacing:1, marginBottom:6 }}>{t.year}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, marginBottom:4 }}>{t.role}</div>
            <div style={{ fontSize:13, color:"var(--muted-2)", marginBottom:8 }}>{t.place}</div>
            <div style={{ fontSize:14, color:"var(--muted)", lineHeight:1.7 }}>{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section style={{ padding:"112px 56px", maxWidth:1200, margin:"auto" }}>
      <Reveal><div className="section-label">Parcours</div><h2 className="section-title">Mon chemin</h2></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, marginTop:56 }}>
        <Reveal delay={0.1}>
          <div style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"var(--muted)", marginBottom:28,
            display:"flex", alignItems:"center", gap:12, fontWeight:500 }}>
            Expériences<span style={{ flex:1, height:1, background:"var(--border)" }} />
          </div>
          {renderItems(work)}
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"var(--muted)", marginBottom:28,
            display:"flex", alignItems:"center", gap:12, fontWeight:500 }}>
            Formation<span style={{ flex:1, height:1, background:"var(--border)" }} />
          </div>
          {renderItems(edu)}
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   CONTACT  —  src/components/Contact.jsx
════════════════════════════════════════════════════ */
function Contact() {
  const [sent, setSent] = useState(false);
  const clinks = [
    { icon:"✉", label:"Email",    val:DATA.email },
    { icon:"⌥", label:"GitHub",   val:DATA.github },
    { icon:"⊞", label:"LinkedIn", val:DATA.linkedin },
  ];
  return (
    <>
      <style>{`
        .contact-section { background:var(--bg-2); border-top:1px solid var(--border); padding:112px 56px; position:relative; overflow:hidden; }
        .contact-inner { max-width:1200px; margin:auto; display:grid; grid-template-columns:1fr 1.1fr; gap:80px; align-items:start; }
        .contact-glow { position:absolute; width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle,rgba(0,212,255,.06) 0%,transparent 70%);
          bottom:-200px; right:-100px; pointer-events:none; }
        .contact-title { font-family:var(--font-display); font-size:clamp(40px,4.5vw,62px); font-weight:800;
          letter-spacing:-2px; line-height:1.05; margin-bottom:16px; }
        .contact-title span { color:var(--cyan); }
        .contact-sub { font-size:15px; color:var(--muted-2); line-height:1.8; margin-bottom:40px; max-width:380px; }
        .clink { display:flex; align-items:center; gap:16px; padding:16px 20px; background:var(--bg-3);
          border:1px solid var(--border); border-radius:var(--radius); cursor:pointer;
          transition:border-color .2s, transform .2s, background .2s; margin-bottom:12px; }
        .clink:hover { border-color:var(--border-bright); background:rgba(0,212,255,.04); transform:translateX(4px); }
        .clink-icon { width:38px; height:38px; border-radius:var(--radius); background:var(--cyan-dim);
          border:1px solid var(--border-bright); display:flex; align-items:center; justify-content:center;
          font-size:16px; flex-shrink:0; color:var(--cyan); }
        .clink label { display:block; font-size:11px; letter-spacing:2px; text-transform:uppercase;
          color:var(--muted); margin-bottom:3px; font-weight:500; cursor:pointer; }
        .clink span { font-size:14px; font-weight:500; }
        .form-wrap { display:flex; flex-direction:column; gap:16px; }
        .form-r2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .fld { display:flex; flex-direction:column; gap:7px; }
        .flbl { font-size:12px; font-weight:500; color:var(--muted-2); letter-spacing:.5px; }
        .finp, .ftxt { background:var(--bg-3); border:1px solid var(--border); border-radius:var(--radius);
          color:var(--text); padding:13px 16px; font-size:14px; font-family:var(--font-body);
          outline:none; transition:border-color .2s, box-shadow .2s; resize:none; width:100%; }
        .finp::placeholder, .ftxt::placeholder { color:var(--muted); }
        .finp:focus, .ftxt:focus { border-color:var(--border-bright); box-shadow:0 0 0 3px rgba(0,212,255,.07); }
        .fsuccess { text-align:center; padding:48px 24px; }
        .fsuccess-icon { font-size:48px; color:var(--cyan); margin-bottom:16px; display:block; }
        .fsuccess-title { font-family:var(--font-display); font-size:24px; font-weight:700; margin-bottom:8px; }
        .fsuccess-sub { font-size:14px; color:var(--muted-2); }
        @media(max-width:768px){ .contact-section{padding:64px 24px;} .contact-inner{grid-template-columns:1fr; gap:48px;} .form-r2{grid-template-columns:1fr;} }
      `}</style>
      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-inner">
          <Reveal>
            <div className="section-label">Contact</div>
            <h2 className="contact-title">Travaillons<br /><span>ensemble</span></h2>
            <p className="contact-sub">Vous avez un projet en tête ? Parlons-en. Je suis disponible pour des missions freelance et des opportunités en CDI.</p>
            <div>
              {clinks.map(l => (
                <div key={l.label} className="clink">
                  <div className="clink-icon">{l.icon}</div>
                  <div><label>{l.label}</label><span>{l.val}</span></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            {sent ? (
              <div className="fsuccess">
                <span className="fsuccess-icon">✓</span>
                <div className="fsuccess-title">Message envoyé !</div>
                <div className="fsuccess-sub">Je vous réponds sous 24h. À bientôt !</div>
              </div>
            ) : (
              <div className="form-wrap">
                <div className="form-r2">
                  <div className="fld"><label className="flbl">Prénom</label><input className="finp" placeholder="Jean" /></div>
                  <div className="fld"><label className="flbl">Nom</label><input className="finp" placeholder="Dupont" /></div>
                </div>
                <div className="fld"><label className="flbl">Email</label><input className="finp" type="email" placeholder="jean@exemple.fr" /></div>
                <div className="fld"><label className="flbl">Sujet</label><input className="finp" placeholder="Projet freelance, collaboration…" /></div>
                <div className="fld"><label className="flbl">Message</label><textarea className="ftxt" rows={5} placeholder="Décrivez votre projet…" /></div>
                <button className="btn-primary" style={{ alignSelf:"flex-start" }} onClick={() => setSent(true)}>Envoyer →</button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════
   FOOTER  —  src/components/Footer.jsx
════════════════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding:"28px 56px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      fontSize:13, color:"var(--muted)" }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:700, color:"var(--text)" }}>
        {DATA.name.split(" ")[0]}<span style={{ color:"var(--cyan)" }}>.</span>
      </div>
      <span>{DATA.location} · {new Date().getFullYear()}</span>
      <div style={{ display:"flex", gap:24 }}>
        {[["Accueil","home"],["Projets","projects"]].map(([l,p]) => (
          <span key={l} style={{ cursor:"pointer", transition:"color .2s" }}
            onMouseOver={e => e.target.style.color="var(--cyan)"}
            onMouseOut={e => e.target.style.color="var(--muted)"}
            onClick={() => { setPage(p); window.scrollTo(0,0); }}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════
   HOME PAGE  —  src/pages/HomePage.jsx
════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Timeline />
      <div className="divider" />
      <Contact />
      <Footer setPage={setPage} />
    </>
  );
}

/* ════════════════════════════════════════════════════
   PROJECTS PAGE  —  src/pages/ProjectsPage.jsx
════════════════════════════════════════════════════ */
const CATS = ["Tous","Web App","E-commerce","Dashboard","Mobile"];

function ProjectsPage({ setPage }) {
  const [filter, setFilter] = useState("Tous");
  const filtered = filter === "Tous" ? DATA.projects : DATA.projects.filter(p => p.cat === filter);
  return (
    <>
      <style>{`
        .proj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; padding:0 56px 96px; max-width:1200px; margin:0 auto; }
        .pcard { background:var(--bg-2); border:1px solid var(--border); border-radius:10px;
          padding:32px 28px; cursor:pointer; position:relative; overflow:hidden;
          display:flex; flex-direction:column;
          transition:border-color .3s, transform .3s, box-shadow .3s; }
        .pcard::before { content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--pc, var(--cyan)); transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1); }
        .pcard:hover { border-color:rgba(255,255,255,.12); transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,.35); }
        .pcard:hover::before { transform:scaleX(1); }
        .pcard-hdr { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:16px; }
        .pcat { font-size:11px; letter-spacing:3px; text-transform:uppercase; font-weight:600;
          padding:4px 10px; border-radius:4px; background:rgba(255,255,255,.04); border:1px solid var(--border); }
        .pyear { font-size:12px; color:var(--muted); }
        .ptitle { font-family:var(--font-display); font-size:22px; font-weight:700; letter-spacing:-.5px;
          margin-bottom:10px; line-height:1.2; }
        .pdesc { font-size:14px; color:var(--muted-2); line-height:1.75; flex:1; margin-bottom:24px; }
        .ptech { display:flex; flex-wrap:wrap; gap:7px; }
        .ptag { font-size:11.5px; padding:4px 10px; background:var(--bg-3); border:1px solid var(--border);
          border-radius:4px; color:var(--muted-2); }
        .parrow { position:absolute; bottom:24px; right:24px; font-size:18px; color:var(--muted);
          opacity:0; transform:translate(-4px,4px); transition:all .25s; }
        .pcard:hover .parrow { opacity:1; transform:translate(0,0); color:var(--cyan); }
        .feat-badge { display:inline-flex; align-items:center; gap:5px; font-size:10px; letter-spacing:2px;
          text-transform:uppercase; color:#facc15; font-weight:600; }
        .feat-badge::before { content:'★'; font-size:10px; }
        @media(max-width:900px){ .proj-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:768px){ .proj-grid{grid-template-columns:1fr; padding:0 24px 64px;} }
      `}</style>
      <div style={{ paddingTop:"var(--nav-h)" }}>
        <div style={{ padding:"80px 56px 64px", maxWidth:1200, margin:"auto" }}>
          <Reveal>
            <div className="section-label">Portfolio</div>
            <h1 className="section-title">Mes Projets</h1>
            <p style={{ fontSize:16, color:"var(--muted-2)", marginTop:16, lineHeight:1.75, maxWidth:520 }}>
              Une sélection de travaux réalisés ces 3 dernières années — du MVP au produit en production.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:40 }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  style={{ padding:"9px 20px", border:`1px solid ${filter===c ? "var(--cyan)" : "var(--border)"}`,
                    background: filter===c ? "var(--cyan)" : "transparent",
                    color: filter===c ? "var(--bg)" : "var(--muted-2)",
                    borderRadius:20, fontSize:13, fontWeight: filter===c ? 600 : 500,
                    fontFamily:"var(--font-body)", cursor:"pointer", transition:"all .2s" }}>
                  {c}{c!=="Tous" && <span style={{ marginLeft:6, opacity:.6 }}>({DATA.projects.filter(p=>p.cat===c).length})</span>}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="proj-grid">
          {filtered.map((p,i) => (
            <Reveal key={p.id} delay={i*.07}>
              <div className="pcard" style={{ "--pc": p.color }}>
                <div className="pcard-hdr">
                  <span className="pcat" style={{ color:p.color }}>{p.cat}</span>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span className="pyear">{p.year}</span>
                    {p.featured && <span className="feat-badge">Sélectionné</span>}
                  </div>
                </div>
                <h3 className="ptitle">{p.title}</h3>
                <p className="pdesc">{p.desc}</p>
                <div className="ptech">{p.tech.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                <span className="parrow">↗</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="divider" />
        <Contact />
        <Footer setPage={setPage} />
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════
   APP  —  src/App.jsx
════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, [page]);
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === "home"     && <HomePage     setPage={setPage} />}
        {page === "projects" && <ProjectsPage setPage={setPage} />}
      </main>
    </>
  );
}
