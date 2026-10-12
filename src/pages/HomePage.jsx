
export default function HomePage({
  onExplore,
  form,
  progress,
  backendStatus,
}) {
  return (
    <main className="page-container">
      <section className="hero-section" aria-labelledby="home-title">
        <p className="eyebrow">ACCESSIBLE DIGITAL ASSISTANCE</p>

        <h1 id="home-title">
          Find opportunities. Apply with confidence.
        </h1>

        <p className="hero-description">
          AccessPath helps you explore scholarship information and
          navigate application steps through a more accessible,
          easy-to-understand experience.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={onExplore}
          >
            Explore scholarships
          </button>
        </div>

        <p className="status-message" role="status">
          Backend status: {backendStatus}
        </p>
      </section>

      <section className="content-section" aria-labelledby="apply-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GUIDED APPLICATION</p>
            <h2 id="apply-title">Application assistance</h2>
          </div>
          <p>Complete the steps at your own pace.</p>
        </div>

        {progress}
        {form}
      </section>

      <p className="demo-notice">
        Demonstration project: scholarship records and eligibility
        results are illustrative and are not official funding offers.
      </p>
    </main>
  );
}
