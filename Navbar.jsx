import { useState, useEffect } from "react";
import { DATA } from "../data/portfolio";

const styles = `
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 56px;
    transition: background 0.35s, border-color 0.35s;
  }
  .nav.scrolled {
    background: rgba(8, 11, 16, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.5px;
    cursor: pointer;
    color: var(--text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .nav-logo span { color: var(--cyan); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }
  .nav-link {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--muted-2);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
    padding-bottom: 3px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: var(--cyan);
    transition: width 0.25s cubic-bezier(.22,1,.36,1);
  }
  .nav-link:hover,
  .nav-link.active { color: var(--text); }
  .nav-link:hover::after,
  .nav-link.active::after { width: 100%; }

  .nav-cta {
    background: var(--cyan-dim);
    color: var(--cyan);
    border: 1px solid var(--border-bright);
    padding: 9px 20px;
    border-radius: var(--radius);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .nav-cta:hover {
    background: rgba(0, 212, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  }

  /* Mobile burger */
  .nav-burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
  }
  .nav-burger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.3s;
  }
  .nav-mobile {
    display: none;
    position: fixed;
    top: var(--nav-h);
    left: 0; right: 0;
    background: var(--bg-2);
    border-bottom: 1px solid var(--border);
    padding: 24px 32px;
    flex-direction: column;
    gap: 20px;
  }
  .nav-mobile.open { display: flex; }

  @media (max-width: 768px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-cta-desktop { display: none; }
    .nav-burger { display: flex; }
    .nav-mobile .nav-link { font-size: 16px; }
  }
`;

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = (p, anchor) => {
    setMenuOpen(false);
    setPage(p);
    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const links = [
    { label: "Accueil",     action: () => navigate("home") },
    { label: "À propos",    action: () => navigate("home", "about") },
    { label: "Compétences", action: () => navigate("home", "skills") },
    { label: "Projets",     action: () => navigate("projects") },
  ];

  return (
    <>
      <style>{styles}</style>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => navigate("home")}>
          {DATA.name.split(" ")[0]}
          <span>.</span>
        </div>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.label}>
              <span className="nav-link" onClick={l.action}>
                {l.label}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="nav-cta nav-cta-desktop"
          onClick={() => navigate("home", "contact")}
        >
          Me contacter
        </button>

        <div className="nav-burger" onClick={() => setMenuOpen((v) => !v)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "" }} />
        </div>
      </nav>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <span key={l.label} className="nav-link" onClick={l.action}>
            {l.label}
          </span>
        ))}
        <button className="nav-cta" style={{ alignSelf: "flex-start" }}
          onClick={() => navigate("home", "contact")}>
          Me contacter
        </button>
      </div>
    </>
  );
}
