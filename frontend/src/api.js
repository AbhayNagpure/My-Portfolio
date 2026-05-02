const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function fetchPortfolio() {
  const response = await fetch(`${BASE_URL}/portfolio`);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to load portfolio data (${response.status}): ${body}`);
  }
  return response.json();
}

export async function sendContactMessage(messageData) {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Unable to send message");
  }
  return response.json();
}

export async function fetchCreatives() {
  const response = await fetch(`${BASE_URL}/creatives`);
  if (!response.ok) throw new Error("Failed to fetch gallery items");
  return response.json();
}

export async function addCreative(data) {
  const response = await fetch(`${BASE_URL}/creatives`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add item");
  }
  return response.json();
}

export async function deleteCreative(id, adminPassword) {
  const response = await fetch(`${BASE_URL}/creatives/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPassword }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete item");
  }
  return response.json();
}
