import { useState } from "react";
import { Reveal } from "./useReveal";
import { DATA } from "../data/portfolio";

const styles = `
  .contact-section {
    background: var(--bg-2);
    border-top: 1px solid var(--border);
    padding: 112px 56px;
    position: relative;
    overflow: hidden;
    id: contact;
  }
  .contact-inner {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 80px;
    align-items: start;
  }

  /* Glow bg */
  .contact-glow {
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    bottom: -200px; right: -100px;
    pointer-events: none;
  }

  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(40px, 4.5vw, 62px);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 16px;
  }
  .contact-title span { color: var(--cyan); }

  .contact-sub {
    font-size: 15px;
    color: var(--muted-2);
    line-height: 1.8;
    margin-bottom: 40px;
    max-width: 380px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .contact-link-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
    text-decoration: none;
    color: var(--text);
  }
  .contact-link-item:hover {
    border-color: var(--border-bright);
    background: rgba(0, 212, 255, 0.04);
    transform: translateX(4px);
  }
  .contact-link-icon {
    width: 38px; height: 38px;
    border-radius: var(--radius);
    background: var(--cyan-dim);
    border: 1px solid var(--border-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    color: var(--cyan);
  }
  .contact-link-info label {
    display: block;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 3px;
    font-weight: 500;
  }
  .contact-link-info span {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  /* FORM */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    z-index: 1;
  }
  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .form-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted-2);
    letter-spacing: 0.5px;
  }
  .form-input,
  .form-textarea {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    padding: 13px 16px;
    font-size: 14px;
    font-family: var(--font-body);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: none;
    width: 100%;
  }
  .form-input::placeholder,
  .form-textarea::placeholder { color: var(--muted); }
  .form-input:focus,
  .form-textarea:focus {
    border-color: var(--border-bright);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.07);
  }

  .form-success {
    text-align: center;
    padding: 48px 24px;
  }
  .form-success-icon {
    font-size: 48px;
    color: var(--cyan);
    margin-bottom: 16px;
    display: block;
  }
  .form-success-title {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .form-success-sub {
    font-size: 14px;
    color: var(--muted-2);
  }

  @media (max-width: 768px) {
    .contact-section { padding: 64px 24px; }
    .contact-inner { grid-template-columns: 1fr; gap: 48px; }
    .form-row-2 { grid-template-columns: 1fr; }
  }
`;

const contactLinks = [
  { icon: "✉", label: "Email", val: DATA.email },
  { icon: "⌥", label: "GitHub", val: DATA.github },
  { icon: "⊞", label: "LinkedIn", val: DATA.linkedin },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-inner">
          <Reveal>
            <div className="section-label">Contact</div>
            <h2 className="contact-title">
              Travaillons<br /><span>ensemble</span>
            </h2>
            <p className="contact-sub">
              Vous avez un projet en tête ? Parlons-en. Je suis disponible pour des missions freelance et des opportunités en CDI.
            </p>
            <div className="contact-links">
              {contactLinks.map((l) => (
                <div key={l.label} className="contact-link-item">
                  <div className="contact-link-icon">{l.icon}</div>
                  <div className="contact-link-info">
                    <label>{l.label}</label>
                    <span>{l.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {sent ? (
              <div className="form-success">
                <span className="form-success-icon">✓</span>
                <div className="form-success-title">Message envoyé !</div>
                <div className="form-success-sub">Je vous réponds sous 24h. À bientôt !</div>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row-2">
                  <div className="form-field">
                    <label className="form-label">Prénom</label>
                    <input className="form-input" type="text" placeholder="Jean" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Nom</label>
                    <input className="form-input" type="text" placeholder="Dupont" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="jean@exemple.fr" />
                </div>
                <div className="form-field">
                  <label className="form-label">Sujet</label>
                  <input className="form-input" type="text" placeholder="Projet freelance, collaboration..." />
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows={5} placeholder="Décrivez votre projet en quelques lignes..." />
                </div>
                <button className="btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => setSent(true)}>
                  Envoyer le message →
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
