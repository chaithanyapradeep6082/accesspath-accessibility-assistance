const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export function getHealth() {
  return request("/api/health");
}

export async function getScholarships() {
  const data = await request("/api/scholarships");

  // Supports the agreed response format and a plain array if needed.
  return Array.isArray(data) ? data : data.scholarships ?? [];
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