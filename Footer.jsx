import { DATA } from "../data/portfolio";

const styles = `
  .footer {
    border-top: 1px solid var(--border);
    padding: 28px 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: var(--muted);
  }
  .footer-logo {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }
  .footer-logo span { color: var(--cyan); }
  .footer-links {
    display: flex;
    gap: 24px;
  }
  .footer-link {
    cursor: pointer;
    transition: color 0.2s;
  }
  .footer-link:hover { color: var(--cyan); }

  @media (max-width: 768px) {
    .footer {
      padding: 24px;
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
`;

export default function Footer({ setPage }) {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-logo">
          {DATA.name.split(" ")[0]}<span>.</span>
        </div>
        <span>{DATA.location} · {new Date().getFullYear()}</span>
        <div className="footer-links">
          <span className="footer-link" onClick={() => setPage("home")}>Accueil</span>
          <span className="footer-link" onClick={() => setPage("projects")}>Projets</span>
          <span className="footer-link" onClick={() => {
            setPage("home");
            setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80);
          }}>Contact</span>
        </div>
      </footer>
    </>
  );
}
