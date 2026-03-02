import { DATA } from "../data/portfolio";

const styles = `
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--nav-h) 56px 0;
    position: relative;
    overflow: hidden;
  }

  /* Background glow blobs */
  .hero-blob-1 {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%);
    top: -100px; right: -100px;
    pointer-events: none;
    animation: glow-pulse 6s ease-in-out infinite;
  }
  .hero-blob-2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
    bottom: 50px; left: -50px;
    pointer-events: none;
    animation: glow-pulse 8s ease-in-out 2s infinite;
  }

  /* Grid lines */
  .hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .hero-content {
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--cyan);
    font-weight: 600;
    margin-bottom: 20px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--cyan);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 6.5vw, 88px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -3px;
    color: var(--text);
    white-space: pre-line;
  }
  .hero-title .cyan { color: var(--cyan); }
  .hero-title .dim  { color: var(--muted); }

  .hero-sub {
    font-size: 16px;
    color: var(--muted-2);
    margin-top: 24px;
    line-height: 1.75;
    max-width: 460px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .hero-scroll {
    position: absolute;
    bottom: 48px;
    left: 56px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .hero-scroll-line {
    width: 40px;
    height: 1px;
    background: var(--muted);
    position: relative;
    overflow: hidden;
  }
  .hero-scroll-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: var(--cyan);
    animation: scan 2s ease-in-out infinite;
  }
  @keyframes scan {
    0%   { left: -100%; }
    100% { left: 100%; }
  }

  /* Right side visual */
  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero-card {
    width: 300px;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
    position: relative;
    overflow: hidden;
  }
  .hero-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  }
  .hero-card-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--cyan-dim), rgba(167,139,250,0.15));
    border: 1px solid var(--border-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 800;
    color: var(--cyan);
    margin-bottom: 20px;
  }
  .hero-card-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .hero-card-role {
    font-size: 13px;
    color: var(--muted-2);
    margin-bottom: 20px;
  }
  .hero-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(52, 211, 153, 0.1);
    border: 1px solid rgba(52, 211, 153, 0.25);
    color: #34d399;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 24px;
  }
  .hero-card-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #34d399;
    animation: glow-pulse 2s ease-in-out infinite;
  }
  .hero-card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }
  .hero-card-stat-value {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
  }
  .hero-card-stat-value span { color: var(--cyan); }
  .hero-card-stat-label {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    .hero { padding: calc(var(--nav-h) + 32px) 24px 80px; }
    .hero-content { grid-template-columns: 1fr; gap: 48px; }
    .hero-visual { display: none; }
    .hero-scroll { left: 24px; bottom: 32px; }
    .hero-title { letter-spacing: -2px; }
  }
`;

export default function Hero({ setPage }) {
  return (
    <>
      <style>{styles}</style>
      <section className="hero">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-grid-bg" />

        <div className="hero-content">
          {/* Left */}
          <div>
            <div className="hero-eyebrow anim-1">Portfolio 2024</div>
            <h1 className="hero-title anim-2">
              {"Coder c'est\ncréer du\n"}<span className="cyan">futur</span><span className="dim">.</span>
            </h1>
            <p className="hero-sub anim-3">{DATA.tagline}</p>
            <div className="hero-actions anim-4">
              <button className="btn-primary" onClick={() => { setPage("projects"); window.scrollTo(0,0); }}>
                Voir mes projets <span>→</span>
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                En savoir plus
              </button>
            </div>
          </div>

          {/* Right — card */}
          <div className="hero-visual anim-5">
            <div className="hero-card">
              <div className="hero-card-avatar">
                {DATA.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="hero-card-name">{DATA.name}</div>
              <div className="hero-card-role">{DATA.title}</div>
              <div className="hero-card-badge">{DATA.availability}</div>
              <div className="hero-card-stats">
                {DATA.stats.slice(0, 4).map(s => (
                  <div key={s.label}>
                    <div className="hero-card-stat-value">
                      {s.value.replace(/\+/, "")}<span>{s.value.includes("+") ? "+" : ""}</span>
                    </div>
                    <div className="hero-card-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>
    </>
  );
}
