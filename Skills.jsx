import { Reveal } from "./useReveal";
import { DATA } from "../data/portfolio";

const styles = `
  .skills-section {
    background: var(--bg-2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 112px 56px;
    position: relative;
    overflow: hidden;
  }
  .skills-inner {
    max-width: 1200px;
    margin: auto;
  }

  /* Decorative bg text */
  .skills-bg-text {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-display);
    font-size: 200px;
    font-weight: 800;
    color: rgba(255,255,255,0.015);
    pointer-events: none;
    line-height: 1;
    letter-spacing: -8px;
    user-select: none;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-top: 56px;
  }

  .skill-card {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 32px;
    transition: border-color 0.3s, transform 0.3s;
    position: relative;
    overflow: hidden;
  }
  .skill-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--cyan-dim), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .skill-card:hover {
    border-color: var(--border-bright);
    transform: translateY(-4px);
  }
  .skill-card:hover::after { opacity: 1; }

  .skill-card-icon {
    font-size: 22px;
    color: var(--cyan);
    margin-bottom: 16px;
    display: block;
  }
  .skill-card-title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 1;
  }
  .skill-tag {
    padding: 5px 14px;
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 12.5px;
    color: var(--muted-2);
    transition: all 0.2s;
    cursor: default;
  }
  .skill-card:hover .skill-tag {
    border-color: rgba(0, 212, 255, 0.2);
  }
  .skill-tag:hover {
    border-color: var(--cyan) !important;
    color: var(--cyan) !important;
    background: var(--cyan-dim);
  }

  @media (max-width: 768px) {
    .skills-section { padding: 64px 24px; }
    .skills-grid { grid-template-columns: 1fr; gap: 16px; }
    .skills-bg-text { display: none; }
  }
`;

export default function Skills() {
  return (
    <>
      <style>{styles}</style>
      <section className="skills-section" id="skills">
        <div className="skills-bg-text">SKILLS</div>
        <div className="skills-inner">
          <Reveal>
            <div className="section-label">Compétences</div>
            <h2 className="section-title">Ce que je maîtrise</h2>
          </Reveal>

          <div className="skills-grid">
            {DATA.skills.map((s, i) => (
              <Reveal key={s.cat} delay={i * 0.1}>
                <div className="skill-card">
                  <span className="skill-card-icon">{s.icon}</span>
                  <h3 className="skill-card-title">{s.cat}</h3>
                  <div className="skill-tags">
                    {s.items.map((item) => (
                      <span key={item} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
