
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function checkBackendHealth() {
  return request("/api/health");
}

export function getScholarships() {
  return request("/api/scholarships");
}

export function checkEligibility(details) {
  return request("/api/eligibility", {
    method: "POST",
    body: JSON.stringify(details),
  });
}

export function askAssistant(question) {
  return request("/api/ask", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
}
