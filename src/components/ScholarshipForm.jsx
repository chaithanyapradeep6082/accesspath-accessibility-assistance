import { useState } from "react";

export default function ScholarshipForm({
  step,
  form,
  updateForm,
  onNext,
  onBack,
  onSubmit,
  submitted,
  eligible,
}) {
  const [errors, setErrors] = useState({});

  function validateAbout() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateEligibility() {
    const next = {};
    const percentage = Number(form.percentage);
    const income = Number(form.familyIncome);

    if (form.percentage === "" || percentage < 0 || percentage > 100)
      next.percentage = "Enter a percentage between 0 and 100.";

    if (form.familyIncome === "" || income < 0)
      next.familyIncome = "Enter a valid annual family income.";

    if (!form.consent)
      next.consent = "Please confirm that you reviewed the demo information.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (step === 0 && validateAbout()) onNext();
    if (step === 1 && validateEligibility()) onNext();
  }

  if (submitted) {
    return (
      <div className="success-state" role="status">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">DEMO COMPLETE</p>
        <h3>You've reached the end of the journey.</h3>
        <p>
          Your details have not been submitted to any scholarship provider.
          You can review the matching sample scholarships below.
        </p>
        <div className="eligible-list">
          {eligible.length ? eligible.map((item) => (
            <div className="eligible-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p className="muted tiny">
                  Minimum percentage: {item.min_percentage}%
                </p>
              </div>
              <span className="award-amount">
                ₹{item.award_amount.toLocaleString("en-IN")}
              </span>
            </div>
          )) : (
            <p>No sample scholarships match these inputs. This is not an official eligibility decision.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      className="application-form"
      onSubmit={(event) => {
        event.preventDefault();
        next();
      }}
      noValidate
    >
      {step === 0 && (
        <div className="form-section">
          <span className="section-number">STEP 01</span>
          <h3>Let's start with the basics.</h3>
          <p className="muted">
            Enter your details to personalise this demonstration.
            Your information stays in this browser.
          </p>

          <div className="field">
            <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
            <input
              id="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "name-error" : undefined}
              required
            />
            {errors.fullName && <p id="name-error" className="field-error">{errors.fullName}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="form-section">
          <span className="section-number">STEP 02</span>
          <h3>Let's explore your eligibility.</h3>
          <p className="muted">
            These details are compared only with the fictional records included in this demo.
          </p>

          <div className="field">
            <label htmlFor="percentage">Academic percentage <span aria-hidden="true">*</span></label>
            <input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              inputMode="decimal"
              value={form.percentage}
              onChange={(e) => updateForm("percentage", e.target.value)}
              aria-invalid={Boolean(errors.percentage)}
              aria-describedby={errors.percentage ? "percentage-error" : "percentage-hint"}
              required
            />
            <small id="percentage-hint" className="field-hint">Enter a value between 0 and 100.</small>
            {errors.percentage && <p id="percentage-error" className="field-error">{errors.percentage}</p>}
          </div>

          <div className="field">
            <label htmlFor="familyIncome">Annual family income (₹) <span aria-hidden="true">*</span></label>
            <input
              id="familyIncome"
              type="number"
              min="0"
              step="1000"
              inputMode="numeric"
              value={form.familyIncome}
              onChange={(e) => updateForm("familyIncome", e.target.value)}
              aria-invalid={Boolean(errors.familyIncome)}
              aria-describedby={errors.familyIncome ? "income-error" : undefined}
              required
            />
            {errors.familyIncome && <p id="income-error" className="field-error">{errors.familyIncome}</p>}
          </div>

          <div className="field">
            <label htmlFor="category">Scholarship category of interest</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => updateForm("category", e.target.value)}
            >
              <option>General</option>
              <option>Disability</option>
              <option>STEM</option>
              <option>Need-Based</option>
            </select>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => updateForm("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
            />
            <span>I understand that these are sample records and this is not an official application.</span>
          </label>
          {errors.consent && <p className="field-error">{errors.consent}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <span className="section-number">STEP 03</span>
          <h3>Review your details.</h3>
          <p className="muted">Check your entries before completing this local demonstration.</p>

          <dl className="review-list">
            <div><dt>Full name</dt><dd>{form.fullName || "Not entered"}</dd></div>
            <div><dt>Email</dt><dd>{form.email || "Not entered"}</dd></div>
            <div><dt>Academic percentage</dt><dd>{form.percentage || "Not entered"}{form.percentage !== "" ? "%" : ""}</dd></div>
            <div><dt>Annual family income</dt><dd>{form.familyIncome === "" ? "Not entered" : `₹${Number(form.familyIncome).toLocaleString("en-IN")}`}</dd></div>
            <div><dt>Interest category</dt><dd>{form.category}</dd></div>
          </dl>

          <h4>Sample scholarships matching your entries</h4>
          {eligible.length ? (
            <div className="eligible-list">
              {eligible.map((item) => (
                <div className="eligible-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p className="muted tiny">Minimum percentage: {item.min_percentage}%</p>
                  </div>
                  <span className="award-amount">₹{item.award_amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">No sample matches found yet. Go back to check your entries.</p>
          )}
          <p className="field-hint">
            Matching is based on percentage and income only. This is not an official eligibility determination.
          </p>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onBack}
          disabled={step === 0}
        >
          ← Back
        </button>

        {step < 2 ? (
          <button type="submit" className="button button-primary">
            Continue <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="button" className="button button-primary" onClick={onSubmit}>
            Complete demo <span aria-hidden="true">✓</span>
          </button>
        )}
      </div>
    </form>
  );
}