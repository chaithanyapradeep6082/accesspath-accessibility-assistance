
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:5000/api";

export default function ExplorerPage() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [percentage, setPercentage] = useState("");
  const [familyIncome, setFamilyIncome] = useState("");
  const [eligibleScholarships, setEligibleScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    async function loadScholarships() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/scholarships`);

        if (!response.ok) {
          throw new Error("Unable to load scholarships.");
        }

        const data = await response.json();
        const records = Array.isArray(data)
          ? data
          : data.scholarships;

        if (!Array.isArray(records)) {
          throw new Error("The API returned an unexpected data format.");
        }

        setScholarships(records);
      } catch (err) {
        setError(
          "Could not connect to the scholarship server. Please ensure the Flask backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadScholarships();
  }, []);

  const filteredScholarships = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return scholarships;

    return scholarships.filter((scholarship) =>
      String(scholarship.name ?? "")
        .toLowerCase()
        .includes(term)
    );
  }, [scholarships, search]);

  async function checkEligibility(event) {
    event.preventDefault();
    setError("");
    setResultMessage("");
    setEligibleScholarships([]);

    const marks = Number(percentage);
    const income = Number(familyIncome);

    if (
      percentage === "" ||
      familyIncome === "" ||
      !Number.isFinite(marks) ||
      !Number.isFinite(income) ||
      marks < 0 ||
      marks > 100 ||
      income < 0
    ) {
      setError(
        "Enter valid marks between 0 and 100 and a non-negative annual family income."
      );
      return;
    }

    try {
      setChecking(true);

      const response = await fetch(`${API_URL}/eligibility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          percentage: marks,
          family_income: income,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Eligibility check failed.");
      }

      const matches =
        data.scholarships ??
        data.eligible_scholarships ??
        [];

      setEligibleScholarships(
        Array.isArray(matches) ? matches : []
      );

      setResultMessage(
        data.message ??
          `Found ${matches.length} matching scholarships.`
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to check eligibility. Please try again."
      );
    } finally {
      setChecking(false);
    }
  }

  function formatCurrency(value) {
    const amount = Number(value);

    if (!Number.isFinite(amount)) return "Not specified";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function ScholarshipCard({ scholarship }) {
    return (
      <article className="scholarship-card">
        <h3>{scholarship.name}</h3>

        <p>
          <strong>Minimum percentage:</strong>{" "}
          {scholarship.min_percentage ?? "Not specified"}%
        </p>

        <p>
          <strong>Maximum family income:</strong>{" "}
          {formatCurrency(scholarship.max_family_income)}
        </p>

        <p>
          <strong>Award amount:</strong>{" "}
          {formatCurrency(scholarship.award_amount)}
        </p>
      </article>
    );
  }

  return (
    <main className="explorer-page">
      <header className="explorer-header">
        <h1>Scholarship Explorer</h1>
        <p>
          Discover scholarships and check which demo opportunities
          match your academic marks and annual family income.
        </p>
      </header>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading">Explore Scholarships</h2>

        <label htmlFor="scholarship-search">
          Search by scholarship name
        </label>

        <input
          id="scholarship-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Enter a scholarship name"
        />

        {loading ? (
          <p role="status">Loading scholarships...</p>
        ) : (
          <>
            <p role="status">
              {filteredScholarships.length} scholarship(s) found.
            </p>

            <div className="scholarship-grid">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id ?? scholarship.name}
                  scholarship={scholarship}
                />
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <p>No scholarships match your search.</p>
            )}
          </>
        )}
      </section>

      <section
        className="eligibility-section"
        aria-labelledby="eligibility-heading"
      >
        <h2 id="eligibility-heading">Check Your Eligibility</h2>

        <form onSubmit={checkEligibility}>
          <div className="form-field">
            <label htmlFor="percentage">
              Academic percentage (0–100)
            </label>

            <input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={percentage}
              onChange={(event) => setPercentage(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="family-income">
              Annual family income (₹)
            </label>

            <input
              id="family-income"
              type="number"
              min="0"
              step="1"
              value={familyIncome}
              onChange={(event) => setFamilyIncome(event.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={checking}>
            {checking ? "Checking..." : "Check Eligibility"}
          </button>
        </form>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {resultMessage && (
          <div aria-live="polite">
            <h3>Eligibility Results</h3>
            <p>{resultMessage}</p>

            {eligibleScholarships.length > 0 ? (
              <div className="scholarship-grid">
                {eligibleScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id ?? scholarship.name}
                    scholarship={scholarship}
                  />
                ))}
              </div>
            ) : (
              <p>
                No matching scholarships were returned. Check the
                eligibility rules and your entered details.
              </p>
            )}
          </div>
        )}

        <p className="demo-notice">
          Demo notice: Scholarship records are sample data for
          project testing. They are not verified real offers.
          Always confirm eligibility with the official provider.
        </p>
      </section>
    </main>
  );
}
