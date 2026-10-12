
import { useEffect, useState } from "react";
import useSpeech from "../hooks/useSpeech";

export default function AccessibilityControls() {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("accesspath-text-size");
    return saved ? Number(saved) : 16;
  });

  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem("accesspath-contrast") === "true"
  );

  const [speechEnabled, setSpeechEnabled] = useState(
    () => localStorage.getItem("accesspath-speech") !== "false"
  );

  const { speak, stop, speaking, supported } = useSpeech();

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("accesspath-text-size", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast",
      highContrast
    );
    localStorage.setItem("accesspath-contrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("accesspath-speech", String(speechEnabled));

    if (!speechEnabled) {
      stop();
    }
  }, [speechEnabled, stop]);

  function readInstructions() {
    if (!speechEnabled) return;

    speak(
      "Welcome to AccessPath. Use the increase and decrease text size buttons " +
      "to adjust the text. You can enable high contrast for better visibility. " +
      "Explore scholarships and check your eligibility."
    );
  }

  return (
    <section
      className="accessibility-controls"
      aria-labelledby="accessibility-heading"
    >
      <h2 id="accessibility-heading">Accessibility Settings</h2>

      <div className="accessibility-control-group">
        <span>Text size: {fontSize}px</span>

        <button
          type="button"
          onClick={() => setFontSize((size) => Math.max(14, size - 2))}
          disabled={fontSize <= 14}
          aria-label="Decrease text size"
        >
          A−
        </button>

        <button
          type="button"
          onClick={() => setFontSize((size) => Math.min(24, size + 2))}
          disabled={fontSize >= 24}
          aria-label="Increase text size"
        >
          A+
        </button>

        <button
          type="button"
          onClick={() => setFontSize(16)}
        >
          Reset text
        </button>
      </div>

      <div className="accessibility-control-group">
        <label>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(event) => setHighContrast(event.target.checked)}
          />
          High contrast mode
        </label>
      </div>

      <div className="accessibility-control-group">
        <label>
          <input
            type="checkbox"
            checked={speechEnabled}
            onChange={(event) => setSpeechEnabled(event.target.checked)}
          />
          Enable speech
        </label>
      </div>

      <div className="accessibility-control-group">
        <button
          type="button"
          onClick={readInstructions}
          disabled={!speechEnabled || !supported}
        >
          Read instructions aloud
        </button>

        <button
          type="button"
          onClick={stop}
          disabled={!speaking}
        >
          Stop speech
        </button>
      </div>

      {!supported && (
        <p role="status">
          Speech output is not supported in this browser.
        </p>
      )}
    </section>
  );
}
