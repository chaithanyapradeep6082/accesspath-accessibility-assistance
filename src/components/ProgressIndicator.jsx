const STEPS = [
  "Your Details",
  "Education & Income",
  "Review",
];

export default function ProgressIndicator({
  step = 0,
  onStepChange = () => {},
}) {
  return (
    <nav
      className="progress-navigation"
      aria-label="Scholarship application progress"
    >
      <ol className="progress-steps">
        {STEPS.map((label, index) => {
          const completed = index < step;
          const active = index === step;

          return (
            <li
              key={label}
              className={[
                "progress-step",
                active ? "active" : "",
                completed ? "completed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className="progress-step-button"
                onClick={() => onStepChange(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`Go to step ${index + 1}: ${label}`}
              >
                <span className="progress-step-number">
                  {completed ? "✓" : index + 1}
                </span>

                <span className="progress-step-label">
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="progress-description" aria-live="polite">
        Step {step + 1} of {STEPS.length}
      </p>
    </nav>
  );
}