const STEPS = [
  { title: "Your Details", description: "Personal information" },
  { title: "Education & Income", description: "Eligibility details" },
  { title: "Review", description: "Confirm your information" },
];

export default function ProgressIndicator({ step = 0 }) {
  const currentStep = Math.max(
    0,
    Math.min(STEPS.length - 1, Number(step) || 0)
  );

  return (
    <nav className="step-navigation" aria-label="Application progress">
      {STEPS.map((item, index) => {
        const completed = index < currentStep;
        const current = index === currentStep;

        return (
          <div
            key={item.title}
            className={[
              "step-item",
              completed ? "complete" : "",
              current ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={current ? "step" : undefined}
          >
            <span className="step-number" aria-hidden="true">
              {completed ? "✓" : index + 1}
            </span>

            <span className="step-copy">
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
          </div>
        );
      })}
    </nav>
  );
}