
export default function AccessibilityControls({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  onSpeak,
  onStop,
  speechSupported,
}) {
  return (
    <section className="accessibility-bar" aria-label="Accessibility settings">
      <div className="accessibility-label">
        <span className="accessibility-symbol" aria-hidden="true">◉</span>
        <div>
          <strong>Make it work for you</strong>
          <small>Choose how you prefer to interact</small>
        </div>
      </div>

      <div className="control-group" aria-label="Text size">
        <span className="control-label">Text size</span>
        <button
          className="icon-button"
          aria-label="Decrease text size"
          disabled={fontSize <= 90}
          onClick={() => setFontSize((size) => Math.max(90, size - 10))}
        >
          A−
        </button>
        <span className="font-value" aria-live="polite">{fontSize}%</span>
        <button
          className="icon-button"
          aria-label="Increase text size"
          disabled={fontSize >= 130}
          onClick={() => setFontSize((size) => Math.min(130, size + 10))}
        >
          A+
        </button>
      </div>

      <button
        className={`button ${highContrast ? "button-primary" : "button-secondary"}`}
        aria-pressed={highContrast}
        onClick={() => setHighContrast((value) => !value)}
      >
        ◐ High contrast
      </button>

      <div className="speech-controls">
        <button className="button button-secondary" onClick={onSpeak} disabled={!speechSupported}>
          <span aria-hidden="true">▶</span> Read welcome
        </button>
        <button className="button button-quiet" onClick={onStop} disabled={!speechSupported}>
          Stop speech
        </button>
      </div>
    </section>
  );
}
