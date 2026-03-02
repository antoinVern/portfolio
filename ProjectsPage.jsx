import { useState } from "react";
import { Reveal } from "../components/useReveal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { DATA } from "../data/portfolio";

const styles = `
  .projects-page {
    padding-top: var(--nav-h);
  }

  .projects-hero {
    padding: 80px 56px 64px;
    max-width: 1200px;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  .projects-hero-bg {
    position: absolute;
    width: 700px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%);
    top: 0; right: -200px;
    pointer-events: none;
  }

  .projects-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  .projects-count {
    font-size: 13px;
    color: var(--muted);
  }
  .projects-count span {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--cyan);
    margin-right: 4px;
  }

  /* FILTERS */
  .projects-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 40px;
  }
  .filter-btn {
    padding: 9px 20px;
    border: 1px solid var(--border);
    background: transparent;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-body);
    color: var(--muted-2);
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn:hover {
    border-color: var(--border-bright);
    color: var(--text);
  }
  .filter-btn.active {
    background: var(--cyan);
    color: var(--bg);
    border-color: var(--cyan);
    font-weight: 600;
  }

  /* GRID */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0 56px 96px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .proj-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 32px 28px;
    cursor: pointer;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .proj-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--proj-color, var(--cyan));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(.22,1,.36,1);
  }
  .proj-card:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }
  .proj-card:hover::before { transform: scaleX(1); }

  .proj-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .proj-cat {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
  }
  .proj-year {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
  }

  .proj-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text);
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .proj-desc {
    font-size: 14px;
    color: var(--muted-2);
    line-height: 1.75;
    flex: 1;
    margin-bottom: 24px;
  }

  .proj-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .proj-tech-tag {
    font-size: 11.5px;
    padding: 4px 10px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--muted-2);
  }

  .proj-arrow {
    position: absolute;
    bottom: 24px;
    right: 24px;
    font-size: 18px;
    color: var(--muted);
    opacity: 0;
    transform: translate(-4px, 4px);
    transition: all 0.25s;
  }
  .proj-card:hover .proj-arrow {
    opacity: 1;
    transform: translate(0, 0);
    color: var(--cyan);
  }

  .featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #facc15;
    font-weight: 600;
  }
  .featured-badge::before {
    content: '★';
    font-size: 10px;
  }

  /* Empty state */
  .projects-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
    color: var(--muted);
    font-size: 15px;
  }

  @media (max-width: 900px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .projects-hero { padding: 48px 24px 40px; }
    .projects-grid { grid-template-columns: 1fr; padding: 0 24px 64px; }
  }
`;

const CATS = ["Tous", "Web App", "E-commerce", "Dashboard", "Mobile"];

export default function ProjectsPage({ setPage }) {
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous"
    ? DATA.projects
    : DATA.projects.filter((p) => p.cat === filter);

  return (
    <>
      <style>{styles}</style>
      <div className="projects-page">
        {/* Hero */}
        <div className="projects-hero">
          <div className="projects-hero-bg" />
          <Reveal>
            <div className="section-label">Portfolio</div>
            <h1 className="section-title">Mes Projets</h1>
            <div className="projects-meta">
              <p style={{ fontSize: 16, color: "var(--muted-2)", lineHeight: 1.75, maxWidth: 520 }}>
                Une sélection de travaux réalisés ces 3 dernières années — du MVP au produit en production.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="projects-filters">
              {CATS.map((c) => (
                <button
                  key={c}
                  className={`filter-btn ${filter === c ? "active" : ""}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                  {c !== "Tous" && (
                    <span style={{ marginLeft: 6, opacity: 0.6 }}>
                      ({DATA.projects.filter((p) => p.cat === c).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.length === 0 ? (
            <div className="projects-empty">Aucun projet dans cette catégorie.</div>
          ) : (
            filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <div
                  className="proj-card"
                  style={{ "--proj-color": p.color }}
                >
                  <div className="proj-card-header">
                    <span className="proj-cat" style={{ color: p.color }}>{p.cat}</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span className="proj-year">{p.year}</span>
                      {p.featured && <span className="featured-badge">Sélectionné</span>}
                    </div>
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="proj-tech-tag">{t}</span>
                    ))}
                  </div>
                  <span className="proj-arrow">↗</span>
                </div>
              </Reveal>
            ))
          )}
        </div>

        <div className="divider" />
        <Contact />
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
