import { useState } from "react";

function HomePage({ onNavigate }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className="home-page">
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home");
          }}
          aria-label="AccessPath home"
        >
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>AccessPath</span>
        </a>

        <nav aria-label="Main navigation">
          <button
            className="nav-link"
            type="button"
            onClick={() => setShowAbout(!showAbout)}
            aria-expanded={showAbout}
          >
            About
          </button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">ACCESSIBLE OPPORTUNITIES</p>

        <h1 id="hero-title">
          Find opportunities.
          <br />
          <span>Navigate with confidence.</span>
        </h1>

        <p className="hero-description">
          AccessPath is a demonstration platform designed to make exploring
          scholarship information easier through a clear interface, accessible
          navigation, and step-by-step guidance.
        </p>

        <div className="hero-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => onNavigate("explorer")}
          >
            Explore scholarships
            <span aria-hidden="true"> →</span>
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={() => setShowAbout(!showAbout)}
            aria-expanded={showAbout}
          >
            How it works
          </button>
        </div>

        {showAbout && (
          <section className="about-panel" aria-labelledby="about-title">
            <h2 id="about-title">How AccessPath works</h2>
            <ol>
              <li>Explore the illustrative scholarship dataset.</li>
              <li>Review scholarship details in a readable format.</li>
              <li>Use the planned eligibility and assistance features.</li>
            </ol>
            <p>
              This is a prototype. Scholarship records are demonstration data,
              not verified live opportunities.
            </p>
          </section>
        )}
      </section>

      <section className="features" aria-labelledby="features-title">
        <h2 id="features-title">Designed for easier access</h2>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">
              ◉
            </span>
            <h3>Clear information</h3>
            <p>
              Browse scholarship details in a consistent, readable format.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">
              ✓
            </span>
            <h3>Guided exploration</h3>
            <p>
              Move through the interface with clear actions and simple steps.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-icon" aria-hidden="true">
              ≋
            </span>
            <h3>Accessible interaction</h3>
            <p>
              The team is building keyboard-friendly controls and speech
              assistance to support different user needs.
            </p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <p>AccessPath — Accessibility-focused hackathon prototype</p>
      </footer>
    </main>
  );
}

export default HomePage;