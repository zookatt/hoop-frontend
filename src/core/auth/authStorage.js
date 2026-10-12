const AUTH_TOKEN_KEY = "hoop_auth_token";
const AUTH_USER_KEY = "hoop_auth_user";

function decodeJwtPayload(token) {
  const [, payload] = token.split(".");

  if (!payload) {
    return {};
  }

  const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedPayload = normalizedPayload.padEnd(
    normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
    "=",
  );

  return JSON.parse(window.atob(paddedPayload));
}

function getPrimaryRole(scope = "") {
  return scope
    .split(" ")
    .find((authority) =>
      ["ADMIN", "RECEPTION", "MAINTENANCE", "CLEANING"].includes(authority),
    );
}

export function buildSessionFromToken(token) {
  const payload = decodeJwtPayload(token);

  return {
    email: payload.sub ?? "",
    role: getPrimaryRole(payload.scope) ?? "",
    expiresAt: payload.exp ? payload.exp * 1000 : null,
  };
}

export function saveAuthSession(token) {
  const user = buildSessionFromToken(token);

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

  return user;
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthUser() {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function isAuthenticated() {
  const token = getAuthToken();
  const user = getAuthUser();

  if (!token || !user) {
    return false;
  }

  if (!user.expiresAt) {
    return true;
  }

  return user.expiresAt > Date.now();
}
