
const steps = [
  { title: "About you", description: "Basic details" },
  { title: "Eligibility", description: "Academic and income details" },
  { title: "Review", description: "Check your application" },
];

export default function ProgressIndicator({ step, onStepChange }) {
  return (
    <nav className="step-navigation" aria-label="Application progress">
      {steps.map((item, index) => (
        <button
          key={item.title}
          className={`step-item ${step === index ? "active" : ""} ${
            step > index ? "complete" : ""
          }`}
          onClick={() => onStepChange(index)}
          aria-current={step === index ? "step" : undefined}
        >
          <span className="step-number" aria-hidden="true">
            {step > index ? "✓" : index + 1}
          </span>
          <span className="step-copy">
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </span>
        </button>
      ))}
    </nav>
  );
}
