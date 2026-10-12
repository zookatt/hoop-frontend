import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildSessionFromToken,
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  isAuthenticated,
  saveAuthSession,
} from "./authStorage";

function createToken(payload) {
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `header.${encodedPayload}.signature`;
}

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it("builds a session using the first supported role in the JWT scope", () => {
    const token = createToken({
      sub: "admin@hoop.test",
      scope: "profile ADMIN MAINTENANCE",
      exp: 2_000_000_000,
    });

    expect(buildSessionFromToken(token)).toEqual({
      email: "admin@hoop.test",
      role: "ADMIN",
      expiresAt: 2_000_000_000_000,
    });
  });

  it("returns empty session fields when optional claims are absent", () => {
    expect(buildSessionFromToken(createToken({ scope: "profile" }))).toEqual({
      email: "",
      role: "",
      expiresAt: null,
    });
  });

  it("saves and reads the token and decoded user session", () => {
    const token = createToken({ sub: "user@hoop.test", scope: "CLEANING" });

    expect(saveAuthSession(token)).toEqual({
      email: "user@hoop.test",
      role: "CLEANING",
      expiresAt: null,
    });
    expect(getAuthToken()).toBe(token);
    expect(getAuthUser()).toEqual({
      email: "user@hoop.test",
      role: "CLEANING",
      expiresAt: null,
    });
  });

  it("returns no user for missing or malformed stored data", () => {
    expect(getAuthUser()).toBeNull();

    localStorage.setItem("hoop_auth_user", "{invalid");

    expect(getAuthUser()).toBeNull();
  });

  it("requires both a token and a user, and accepts sessions without expiry", () => {
    const token = createToken({ sub: "user@hoop.test", scope: "RECEPTION" });

    expect(isAuthenticated()).toBe(false);
    saveAuthSession(token);
    expect(isAuthenticated()).toBe(true);
    localStorage.removeItem("hoop_auth_token");
    expect(isAuthenticated()).toBe(false);
  });

  it("rejects expired sessions and accepts future expirations", () => {
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
    localStorage.setItem("hoop_auth_token", "token");
    localStorage.setItem(
      "hoop_auth_user",
      JSON.stringify({ role: "ADMIN", expiresAt: Date.now() }),
    );
    expect(isAuthenticated()).toBe(false);

    localStorage.setItem(
      "hoop_auth_user",
      JSON.stringify({ role: "ADMIN", expiresAt: Date.now() + 1000 }),
    );
    expect(isAuthenticated()).toBe(true);
  });

  it("clears stored authentication", () => {
    localStorage.setItem("hoop_auth_token", "token");
    localStorage.setItem("hoop_auth_user", "{}");

    clearAuthSession();

    expect(getAuthToken()).toBeNull();
    expect(getAuthUser()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});
