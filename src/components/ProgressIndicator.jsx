
import React from "react";

const STEPS = [
  { label: "Personal Details", description: "Your basic information" },
  { label: "Eligibility Details", description: "Your academic and income details" },
  { label: "Review", description: "Review and submit your application" },
];

export default function ProgressIndicator({ step = 0, onStepChange }) {
  const currentStep = Math.min(
    Math.max(Number(step) || 0, 0),
    STEPS.length - 1
  );

  return (
    <nav className="progress-indicator" aria-label="Application progress">
      <ol className="progress-indicator__list">
        {STEPS.map((item, index) => {
          const isCurrent = index === currentStep;
          const isCompleted = index < currentStep;
          const canNavigate = index <= currentStep && onStepChange;

          return (
            <li
              className={[
                "progress-indicator__step",
                isCurrent ? "is-current" : "",
                isCompleted ? "is-completed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={item.label}
              aria-current={isCurrent ? "step" : undefined}
            >
              {canNavigate ? (
                <button
                  type="button"
                  className="progress-indicator__button"
                  onClick={() => onStepChange(index)}
                  aria-label={`Go to step ${index + 1}: ${item.label}`}
                >
                  <span className="progress-indicator__number">
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span className="progress-indicator__text">
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              ) : (
                <div className="progress-indicator__button">
                  <span className="progress-indicator__number">
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span className="progress-indicator__text">
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <p className="progress-indicator__status" aria-live="polite">
        Step {currentStep + 1} of {STEPS.length}:{" "}
        {STEPS[currentStep].label}
      </p>
    </nav>
  );
}
