import { Reveal } from "./useReveal";
import { DATA } from "../data/portfolio";

const styles = `
  .timeline-section {
    padding: 112px 56px;
    max-width: 1200px;
    margin: auto;
  }

  .timeline-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    margin-top: 56px;
    align-items: start;
  }

  .timeline-intro {
    font-size: 16px;
    color: var(--muted-2);
    line-height: 1.8;
    margin-top: 20px;
  }

  /* Separator */
  .timeline-col-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
  }
  .timeline-col-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .timeline {
    position: relative;
  }
  .timeline-items {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tl-item {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 20px;
    padding-bottom: 36px;
    position: relative;
  }
  .tl-item:last-child { padding-bottom: 0; }

  /* Dot + line */
  .tl-dot-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
  }
  .tl-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 2px solid var(--cyan);
    background: var(--bg);
    flex-shrink: 0;
    transition: background 0.2s;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
  }
  .tl-item:hover .tl-dot {
    background: var(--cyan);
  }
  .tl-line {
    flex: 1;
    width: 1px;
    background: var(--border);
    margin-top: 6px;
  }
  .tl-item:last-child .tl-line { display: none; }

  .tl-content {
    padding-top: 0;
  }
  .tl-year {
    font-size: 12px;
    color: var(--cyan);
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .tl-role {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--text);
  }
  .tl-place {
    font-size: 13px;
    color: var(--muted-2);
    margin-bottom: 8px;
  }
  .tl-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
  }

  .tl-type-badge {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 3px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .tl-type-work {
    background: rgba(0, 212, 255, 0.1);
    color: var(--cyan);
    border: 1px solid rgba(0, 212, 255, 0.2);
  }
  .tl-type-edu {
    background: rgba(167, 139, 250, 0.1);
    color: #a78bfa;
    border: 1px solid rgba(167, 139, 250, 0.2);
  }

  @media (max-width: 768px) {
    .timeline-section { padding: 64px 24px; }
    .timeline-layout { grid-template-columns: 1fr; gap: 48px; }
  }
`;

export default function Timeline() {
  const work = DATA.timeline.filter(t => t.type === "work");
  const edu  = DATA.timeline.filter(t => t.type === "edu");

  const renderItems = (items) => (
    <div className="timeline-items">
      {items.map((t, i) => (
        <div className="tl-item" key={t.year + t.role}>
          <div className="tl-dot-col">
            <div className="tl-dot" />
            <div className="tl-line" />
          </div>
          <div className="tl-content">
            <span className={`tl-type-badge ${t.type === "work" ? "tl-type-work" : "tl-type-edu"}`}>
              {t.type === "work" ? "Expérience" : "Formation"}
            </span>
            <div className="tl-year">{t.year}</div>
            <div className="tl-role">{t.role}</div>
            <div className="tl-place">{t.place}</div>
            <div className="tl-desc">{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <section className="timeline-section" id="parcours">
        <Reveal>
          <div className="section-label">Parcours</div>
          <h2 className="section-title">Mon chemin</h2>
        </Reveal>

        <div className="timeline-layout">
          <Reveal delay={0.1}>
            <div className="timeline-col-label">Expériences</div>
            {renderItems(work)}
          </Reveal>
          <Reveal delay={0.2}>
            <div className="timeline-col-label">Formation</div>
            {renderItems(edu)}
          </Reveal>
        </div>
      </section>
    </>
  );
}
