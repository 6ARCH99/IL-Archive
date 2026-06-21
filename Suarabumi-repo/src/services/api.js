const API_BASE = import.meta.env.VITE_API_URL || "";

function getToken() {
  return localStorage.getItem("suarabumi_token");
}

export function setAuth(token, user) {
  if (token) localStorage.setItem("suarabumi_token", token);
  if (user) localStorage.setItem("suarabumi_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("suarabumi_token");
  localStorage.removeItem("suarabumi_user");
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("suarabumi_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || data.error || res.statusText;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (body) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getDashboard: () => request("/api/dashboard"),
  getProfile: () => request("/api/profile"),
  getProfileStats: () => request("/api/profile/stats"),
  getProfileBadges: () => request("/api/profile/badges"),
  getProfileActivities: () => request("/api/profile/activities"),
  getClimateImpact: () => request("/api/climate-impact"),
};
