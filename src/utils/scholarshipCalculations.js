import Papa from "papaparse";
import csvData from "../data/scholarships.csv?raw";

export const scholarships = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true
}).data;

export function findEligibleScholarships(percentage, familyIncome) {
  return scholarships.filter(
    (scholarship) =>
      percentage >= scholarship.min_percentage &&
      familyIncome <= scholarship.max_family_income
  );
}

export function getScholarshipStatistics(data = scholarships) {
  const totalScholarships = data.length;

  const totalAwardAmount = data.reduce(
    (total, scholarship) =>
      total + Number(scholarship.award_amount || 0),
    0
  );

  const averageAwardAmount =
    totalScholarships > 0
      ? totalAwardAmount / totalScholarships
      : 0;

  const categories = {};

  data.forEach((scholarship) => {
    const category = scholarship.category || "Uncategorized";
    categories[category] = (categories[category] || 0) + 1;
  });

  return {
    totalScholarships,
    totalAwardAmount,
    averageAwardAmount,
    categories
  };
}

export function answerScholarshipQuestion(question) {
  const text = question.toLowerCase();
  const statistics = getScholarshipStatistics();

  if (text.includes("how many") || text.includes("total scholarship")) {
    return `There are ${statistics.totalScholarships} scholarships available.`;
  }

  if (text.includes("average")) {
    return `The average scholarship award is ₹${statistics.averageAwardAmount.toLocaleString("en-IN")}.`;
  }

  if (text.includes("total award") || text.includes("combined award")) {
    return `The total scholarship award amount is ₹${statistics.totalAwardAmount.toLocaleString("en-IN")}.`;
  }

  if (text.includes("category")) {
    return Object.entries(statistics.categories)
      .map(([category, count]) => `${category}: ${count} scholarships`)
      .join(", ");
  }

  return "Ask about the number of scholarships, average award, total award amount, or scholarship categories.";
}