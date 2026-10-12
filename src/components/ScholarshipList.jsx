import { useState } from "react";
import { scholarships } from "../utils/scholarshipCalculations";

function ScholarshipList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(scholarships.map((scholarship) => scholarship.category))
  ];

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      scholarship.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="scholarship-section">
      <h2>Scholarship List</h2>

      <input
        type="text"
        placeholder="Search scholarships..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="Search scholarships"
      />

      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        aria-label="Filter by category"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <p aria-live="polite">
        {filteredScholarships.length} scholarships found
      </p>

      {filteredScholarships.length > 0 ? (
        <div className="scholarship-list">
          {filteredScholarships.map((scholarship) => (
            <article className="scholarship-card" key={scholarship.id}>
              <h3>{scholarship.name}</h3>
              <p>Category: {scholarship.category}</p>
              <p>Minimum Percentage: {scholarship.min_percentage}%</p>
              <p>
                Maximum Family Income: ₹
                {scholarship.max_family_income.toLocaleString("en-IN")}
              </p>
              <p>
                Award Amount: ₹
                {scholarship.award_amount.toLocaleString("en-IN")}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p>No scholarships found.</p>
      )}
    </section>
  );
}

export default ScholarshipList;