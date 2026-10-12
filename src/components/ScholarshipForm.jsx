
import React, { useState } from "react";

export default function ScholarshipForm({
  step = 0,
  form = {},
  updateForm,
  onNext,
  onBack,
  onSubmit,
  submitted = false,
  eligible,
}) {
  const [errors, setErrors] = useState({});

  const currentStep = Math.min(Math.max(Number(step) || 0, 0), 2);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    if (typeof updateForm === "function") {
      updateForm(name, nextValue);
    }

    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function validateStep() {
    const nextErrors = {};

    if (currentStep === 0) {
      if (!String(form.fullName || "").trim()) {
        nextErrors.fullName = "Please enter your full name.";
      }

      if (!String(form.email || "").trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email).trim())
      ) {
        nextErrors.email = "Please enter a valid email address.";
      }
    }

    if (currentStep === 1) {
      const percentage = Number(form.percentage);
      const income = Number(form.familyIncome);

      if (
        form.percentage === "" ||
        form.percentage == null ||
        !Number.isFinite(percentage) ||
        percentage < 0 ||
        percentage > 100
      ) {
        nextErrors.percentage = "Enter a percentage between 0 and 100.";
      }

      if (
        form.familyIncome === "" ||
        form.familyIncome == null ||
        !Number.isFinite(income) ||
        income < 0
      ) {
        nextErrors.familyIncome =
          "Enter a valid, non-negative annual family income.";
      }

      if (!String(form.category || "").trim()) {
        nextErrors.category = "Please select your category.";
      }

      if (!form.consent) {
        nextErrors.consent =
          "Please confirm the demonstration data notice.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function ErrorMessage({ name }) {
    if (!errors[name]) return null;

    return (
      <p className="form-error" id={`${name}-error`} role="alert">
        {errors[name]}
      </p>
    );
  }

  function handleNext() {
    if (validateStep() && typeof onNext === "function") {
      onNext();
    }
  }

  function handleSubmit() {
    if (validateStep() && typeof onSubmit === "function") {
      onSubmit();
    }
  }

  return (
    <section className="scholarship-form" aria-labelledby="application-title">
      <h2 id="application-title">Scholarship Application</h2>

      <p>
        Complete each step to review your details and check potential
        scholarship matches.
      </p>

      {submitted && (
        <p role="status" className="form-notice">
          Your details have been submitted for this demonstration.
        </p>
      )}

      {currentStep === 0 && (
        <fieldset className="form-step">
          <legend>Step 1: Personal Details</legend>

          <div className="form-field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName || ""}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            <ErrorMessage name="fullName" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email || ""}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <ErrorMessage name="email" />
          </div>
        </fieldset>
      )}

      {currentStep === 1 && (
        <fieldset className="form-step">
          <legend>Step 2: Eligibility Details</legend>

          <div className="form-field">
            <label htmlFor="percentage">Academic percentage (0–100)</label>
            <input
              id="percentage"
              name="percentage"
              type="number"
              min="0"
              max="100"
              step="any"
              value={form.percentage ?? ""}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.percentage)}
              aria-describedby={
                errors.percentage ? "percentage-error" : undefined
              }
            />
            <ErrorMessage name="percentage" />
          </div>

          <div className="form-field">
            <label htmlFor="familyIncome">Annual family income (₹)</label>
            <input
              id="familyIncome"
              name="familyIncome"
              type="number"
              min="0"
              step="any"
              value={form.familyIncome ?? ""}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.familyIncome)}
              aria-describedby={
                errors.familyIncome ? "familyIncome-error" : undefined
              }
            />
            <ErrorMessage name="familyIncome" />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? "category-error" : undefined}
            >
              <option value="">Select your category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
              <option value="Other">Other</option>
            </select>
            <ErrorMessage name="category" />
          </div>

          <div className="form-field form-field--checkbox">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={Boolean(form.consent)}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <label htmlFor="consent">
              I understand that this project uses illustrative demonstration
              scholarship data that must be independently verified.
            </label>
            <ErrorMessage name="consent" />
          </div>
        </fieldset>
      )}

      {currentStep === 2 && (
        <section className="form-step" aria-labelledby="review-title">
          <h3 id="review-title">Step 3: Review Your Details</h3>

          <dl className="application-review">
            <dt>Full name</dt>
            <dd>{form.fullName || "Not provided"}</dd>

            <dt>Email</dt>
            <dd>{form.email || "Not provided"}</dd>

            <dt>Academic percentage</dt>
            <dd>
              {form.percentage === "" || form.percentage == null
                ? "Not provided"
                : `${form.percentage}%`}
            </dd>

            <dt>Annual family income</dt>
            <dd>
              {form.familyIncome === "" || form.familyIncome == null
                ? "Not provided"
                : `₹${Number(form.familyIncome).toLocaleString("en-IN")}`}
            </dd>

            <dt>Category</dt>
            <dd>{form.category || "Not provided"}</dd>
          </dl>

          {eligible !== undefined && (
            <p role="status">
              Eligibility check:{" "}
              {eligible === true
                ? "Potential matches found."
                : eligible === false
                  ? "No matching scholarships were identified by the current rules."
                  : "Not checked yet."}
            </p>
          )}

          <p className="form-disclaimer">
            This is a demonstration, not an official scholarship application.
            Verify scholarship requirements and application details through
            official sources.
          </p>
        </section>
      )}

      <div className="form-actions">
        {currentStep > 0 && (
          <button type="button" onClick={onBack}>
            Back
          </button>
        )}

        {currentStep < 2 && (
          <button type="button" onClick={handleNext}>
            Continue
          </button>
        )}

        {currentStep === 2 && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
          >
            {submitted ? "Submitted" : "Submit details"}
          </button>
        )}
      </div>
    </section>
  );
}
