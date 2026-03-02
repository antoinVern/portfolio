import { Reveal } from "./useReveal";
import { DATA } from "../data/portfolio";

const styles = `
  .about-section {
    padding: 112px 56px;
    max-width: 1200px;
    margin: auto;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;
    margin-top: 56px;
  }

  .about-left {}

  .about-quote {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.5px;
    color: var(--text);
    border-left: 2px solid var(--cyan);
    padding-left: 24px;
    margin-bottom: 32px;
  }

  .about-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
  }
  .about-contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13.5px;
    color: var(--muted-2);
  }
  .about-contact-icon {
    width: 32px; height: 32px;
    border-radius: var(--radius);
    background: var(--bg-3);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .about-body {
    font-size: 16px;
    color: var(--muted-2);
    line-height: 1.85;
    margin-bottom: 40px;
  }

  .about-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .about-info-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 18px;
    transition: border-color 0.2s;
  }
  .about-info-card:hover {
    border-color: var(--border-bright);
  }
  .about-info-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
    font-weight: 500;
  }
  .about-info-value {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  @media (max-width: 768px) {
    .about-section { padding: 64px 24px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-info-grid { grid-template-columns: 1fr; }
  }
`;

const infos = [
  { label: "Localisation", value: DATA.location, icon: "📍" },
  { label: "Statut", value: DATA.availability, icon: "✦" },
  { label: "Email", value: DATA.email, icon: "✉" },
  { label: "GitHub", value: DATA.github, icon: "⌥" },
];

export default function About() {
  return (
    <>
      <style>{styles}</style>
      <section className="about-section" id="about">
        <Reveal>
          <div className="section-label">À propos</div>
          <h2 className="section-title">Qui suis-je ?</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={0.1}>
            <blockquote className="about-quote">
              « Le bon code, c'est comme le bon design — invisible quand ça marche. »
            </blockquote>
            <div className="about-links">
              {infos.slice(0, 2).map((i) => (
                <div key={i.label} className="about-contact-item">
                  <div className="about-contact-icon">{i.icon}</div>
                  <span>{i.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="about-body">{DATA.about}</p>
            <div className="about-info-grid">
              {infos.map((i) => (
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
