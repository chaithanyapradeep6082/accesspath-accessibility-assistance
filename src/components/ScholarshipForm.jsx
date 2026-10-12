const STEPS = [
  "Your Details",
  "Education & Income",
  "Review",
];

export default function ScholarshipForm({
  step,
  form,
  updateForm,
  onNext,
  onBack,
  onSubmit,
  submitted,
  eligible = [],
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (step < 2) {
      onNext();
    } else {
      onSubmit();
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    updateForm(
      name,
      type === "checkbox" ? checked : value
    );
  }

  if (submitted) {
    return (
      <section className="application-card" aria-live="polite">
        <h3>Application overview</h3>

        <p>
          Your demonstration application has been completed.
          No information was submitted to a real scholarship provider.
        </p>

        <h4>Sample scholarships matching your details</h4>

        {eligible.length > 0 ? (
          <ul>
            {eligible.map((item) => (
              <li key={item.id ?? item.name}>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No matching sample scholarships were found.
            You can still explore all available scholarships.
          </p>
        )}

        <button
          type="button"
          className="button button-secondary"
          onClick={onBack}
        >
          Back to review
        </button>
      </section>
    );
  }

  return (
    <form
      className="application-card"
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="eyebrow">
        STEP {step + 1} OF {STEPS.length}
      </p>

      <h3>{STEPS[step]}</h3>

      {step === 0 && (
        <div className="form-grid">
          <div className="field full-width">
            <label htmlFor="fullName">
              Full name *
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field full-width">
            <label htmlFor="email">
              Email address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="form-grid">
          <div className="field">
            <label htmlFor="percentage">
              Academic percentage *
            </label>

            <input
              id="percentage"
              name="percentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={form.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="familyIncome">
              Annual family income (₹) *
            </label>

            <input
              id="familyIncome"
              name="familyIncome"
              type="number"
              min="0"
              value={form.familyIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="category">
              Category *
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="field full-width">
            <label className="consent-label">
              <input
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                required
              />

              I agree to use fictional sample information
              for this demonstration.
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="review-list">
          <div>
            <strong>Full name</strong>
            <p>{form.fullName}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{form.email}</p>
          </div>

          <div>
            <strong>Academic percentage</strong>
            <p>{form.percentage}%</p>
          </div>

          <div>
            <strong>Annual family income</strong>
            <p>
              ₹{Number(form.familyIncome).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <strong>Category</strong>
            <p>{form.category}</p>
          </div>

          <p className="disclaimer">
            These are demonstration details, not an official
            scholarship application.
          </p>
        </div>
      )}

      <div className="form-actions">
        {step > 0 && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onBack}
          >
            Back
          </button>
        )}

        <button
          type="submit"
          className="button button-primary"
        >
          {step === 2 ? "Complete demo" : "Continue →"}
        </button>
      </div>

      <p className="required-note">
        Fields marked with * are required.
      </p>
    </form>
  );
}