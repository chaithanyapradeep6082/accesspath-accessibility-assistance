
export const scholarships = [
  {
    id: "S001",
    name: "AccessPath Future Scholars",
    min_percentage: 60,
    max_family_income: 300000,
    award_amount: 15000,
    category: "General",
  },
  {
    id: "S002",
    name: "Digital Learning Grant",
    min_percentage: 75,
    max_family_income: 500000,
    award_amount: 25000,
    category: "General",
  },
  {
    id: "S003",
    name: "Inclusive Education Award",
    min_percentage: 50,
    max_family_income: 250000,
    award_amount: 20000,
    category: "Disability",
  },
  {
    id: "S004",
    name: "STEM Opportunity Fund",
    min_percentage: 85,
    max_family_income: 600000,
    award_amount: 40000,
    category: "STEM",
  },
  {
    id: "S005",
    name: "Community Learning Support",
    min_percentage: 65,
    max_family_income: 200000,
    award_amount: 12000,
    category: "Need-Based",
  },
];

export function findEligibleScholarships(percentage, income) {
  const marks = Number(percentage);
  const familyIncome = Number(income);

  if (
    percentage === "" ||
    income === "" ||
    !Number.isFinite(marks) ||
    !Number.isFinite(familyIncome)
  ) {
    return [];
  }

  return scholarships.filter(
    (item) =>
      marks >= item.min_percentage &&
      familyIncome <= item.max_family_income
  );
}

export function answerScholarshipQuestion(question, items = scholarships) {
  const q = question.toLowerCase().trim();

  if (!q) return "Please enter a question about the sample scholarships.";

  if (q.includes("lowest cutoff") || q.includes("lowest percentage")) {
    const item = [...items].sort(
      (a, b) => a.min_percentage - b.min_percentage
    )[0];
    return `${item.name} has the lowest sample cutoff at ${item.min_percentage} percent.`;
  }

  if (q.includes("highest cutoff") || q.includes("highest percentage")) {
    const item = [...items].sort(
      (a, b) => b.min_percentage - a.min_percentage
    )[0];
    return `${item.name} has the highest sample cutoff at ${item.min_percentage} percent.`;
  }

  if (q.includes("highest award") || q.includes("largest award")) {
    const item = [...items].sort(
      (a, b) => b.award_amount - a.award_amount
    )[0];
    return `${item.name} has the highest illustrative award of ${item.award_amount.toLocaleString("en-IN")} rupees.`;
  }

  if (q.includes("disability") || q.includes("inclusive")) {
    const results = items.filter(
      (item) => item.category.toLowerCase() === "disability"
    );
    return results.length
      ? `The sample disability category includes ${results.map((item) => item.name).join(", ")}.`
      : "There are no sample records in the disability category.";
  }

  if (q.includes("how many") || q.includes("number of scholarships")) {
    return `There are ${items.length} illustrative scholarship records in this demo.`;
  }

  if (q.includes("income")) {
    const item = [...items].sort(
      (a, b) => b.max_family_income - a.max_family_income
    )[0];
    return `${item.name} has the highest sample family income limit, ${item.max_family_income.toLocaleString("en-IN")} rupees per year.`;
  }

  if (q.includes("list") || q.includes("all scholarships")) {
    return `The sample scholarships are: ${items.map((item) => item.name).join(", ")}.`;
  }

  return "I can answer questions about the lowest or highest cutoff, award amounts, income limits, disability category, or the number of sample scholarships. Try asking one of those questions.";
}
