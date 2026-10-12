import { useEffect, useMemo, useState } from "react";
import "./App.css";

import AccessibilityControls from "./components/AccessibilityControls";
import DataAssistant from "./components/DataAssistant";
import ProgressIndicator from "./components/ProgressIndicator";
import ScholarshipChart from "./components/ScholarshipChart";
import ScholarshipForm from "./components/ScholarshipForm";
import { useSpeech } from "./hooks/useSpeech";
import { scholarships } from "./utils/scholarshipCalculations";

const initialForm = {
  fullName: "",
  email: "",
  percentage: "",
  familyIncome: "",
  category: "General",
  consent: false,
};

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => {
    try {
      return {
        ...initialForm,
        ...JSON.parse(localStorage.getItem("accesspath-form") || "{}"),
      };
    } catch {
      return initialForm;
    }
  });

  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [view, setView] = useState("application");
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { speak, stop, supported } = useSpeech();

  useEffect(() => {
    localStorage.setItem("accesspath-form", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.body.classList.toggle("high-contrast", highContrast);

    return () => {
      document.documentElement.style.fontSize = "";
      document.body.classList.remove("high-contrast");
    };
  }, [fontSize, highContrast]);

  const eligible = useMemo(() => {
    if (form.percentage === "" || form.familyIncome === "") return [];
    return scholarships.filter(
      (item) =>
        Number(form.percentage) >= item.min_percentage &&
        Number(form.familyIncome) <= item.max_family_income
    );
  }, [form.percentage, form.familyIncome]);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function goToStep(nextStep) {
    setStep(Math.max(0, Math.min(2, nextStep)));
    setView("application");
    setNotice("");
    document.getElementById("main-content")?.focus();
  }

  function resetApplication() {
    if (!window.confirm("Clear your saved application and start again?")) return;
    setForm(initialForm);
    setStep(0);
    setSubmitted(false);
    localStorage.removeItem("accesspath-form");
    setNotice("Your application has been reset.");
  }

  function submitApplication() {
    setSubmitted(true);
    setNotice("Demo application completed. No information was sent to a server.");
    speak("Your demo application has been completed successfully.");
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="topbar">
        <a
          href="#home"
          className="brand"
          onClick={() => {
            setView("application");
            setStep(0);
          }}
          aria-label="AccessPath home"
        >
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>
            <strong>AccessPath</strong>
            <small>Accessible opportunities</small>
          </span>
        </a>

        <div className="topbar-right">
          <span className="demo-tag">DEMO MODE</span>
          <button
            className="button button-quiet"
            onClick={() => setView(view === "explorer" ? "application" : "explorer")}
          >
            {view === "explorer" ? "← Application" : "Explore scholarships"}
          </button>
        </div>
      </header>

      <div className="welcome-band">
        <div>
          <p className="eyebrow">YOUR NEXT STEP, MADE CLEARER</p>
          <h1>Opportunity should be accessible to everyone.</h1>
          <p>
            Navigate your application at your own pace. Explore information
            without losing your progress.
          </p>
        </div>
        <div className="welcome-symbol" aria-hidden="true">✳</div>
      </div>

      <AccessibilityControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onSpeak={() =>
          speak(
            "Welcome to AccessPath. Use the application steps, explore scholarships,or ask the data assistant a question."
          )
        }
        onStop={stop}
        speechSupported={supported}
      />

      <main id="main-content" tabIndex="-1" className="main-layout">
        <section className="primary-panel" aria-labelledby="page-title">
          {view === "application" ? (
            <>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">SCHOLARSHIP APPLICATION</p>
                  <h2 id="page-title">
                    {submitted ? "Application overview" : "Your application"}
                  </h2>
                  <p className="muted">
                    Your progress is saved automatically in this browser.
                  </p>
                </div>
                <span className="saved-indicator">
                  <span aria-hidden="true">●</span> Saved locally
                </span>
              </div>

              <ProgressIndicator step={step} onStepChange={goToStep} />

              <ScholarshipForm
                step={step}
                form={form}
                updateForm={updateForm}
                onNext={() => goToStep(step + 1)}
                onBack={() => goToStep(step - 1)}
                onSubmit={submitApplication}
                submitted={submitted}
                eligible={eligible}
              />

              <div className="panel-footer">
                <button className="text-button" onClick={resetApplication}>
                  Clear saved application
                </button>
                <span className="muted tiny">Illustrative demo · Not an official portal</span>
              </div>
            </>
          ) : (
            <ScholarshipChart
              items={scholarships}
              onBack={() => setView("application")}
              speak={speak}
            />
          )}
        </section>

        <aside className="side-panel" aria-label="Scholarship data assistant">
          <DataAssistant
            items={scholarships}
            form={form}
            onExplore={() => setView("explorer")}
            onSpeak={speak}
          />

          <div className="privacy-card">
            <span className="privacy-icon" aria-hidden="true">♧</span>
            <div>
              <h3>Your information stays here</h3>
              <p>
                This frontend demo stores form progress in your browser.
                It does not submit your details to a server.
              </p>
            </div>
          </div>
        </aside>
      </main>

      {notice && (
        <div className="notice" role="status" aria-live="polite">
          {notice}
          <button
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}

      <footer className="site-footer">
        <span>AccessPath · A student accessibility prototype</span>
        <span>Built to explore inclusive digital experiences</span>
      </footer>
    </div>
  );
}