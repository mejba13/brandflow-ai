// Social accounts storage - localStorage persistence

import type { SocialAccount, SocialPlatform } from "./types";

const STORAGE_KEY = "brandflow_social_accounts";
const OAUTH_STATE_KEY = "brandflow_oauth_state";

// Get all connected accounts
export function getStoredAccounts(): SocialAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error("Failed to parse stored accounts");
  }
  return [];
}

// Save accounts to storage
export function setStoredAccounts(accounts: SocialAccount[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

// Add a new account
export function addAccount(account: SocialAccount): SocialAccount[] {
  const accounts = getStoredAccounts();

  // Check if account already exists (same platform and platformAccountId)
  const existingIndex = accounts.findIndex(
    (a) => a.platform === account.platform && a.platformAccountId === account.platformAccountId
  );

  if (existingIndex >= 0) {
    // Update existing account
    accounts[existingIndex] = {
      ...accounts[existingIndex],
      ...account,
      updatedAt: new Date().toISOString(),
    };
  } else {
    // Add new account
    accounts.push(account);
  }

  setStoredAccounts(accounts);
  return accounts;
}

// Remove an account
export function removeAccount(accountId: string): SocialAccount[] {
  const accounts = getStoredAccounts();
  const filtered = accounts.filter((a) => a.id !== accountId);
  setStoredAccounts(filtered);
  return filtered;
}

// Update account status
export function updateAccountStatus(
  accountId: string,
  status: SocialAccount["status"]
): SocialAccount[] {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex((a) => a.id === accountId);

  if (index >= 0) {
    accounts[index] = {
      ...accounts[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    setStoredAccounts(accounts);
  }

  return accounts;
}

// Get accounts by platform
export function getAccountsByPlatform(platform: SocialPlatform): SocialAccount[] {
  return getStoredAccounts().filter((a) => a.platform === platform);
}

// Check if platform is connected
export function isPlatformConnected(platform: SocialPlatform): boolean {
  return getStoredAccounts().some(
    (a) => a.platform === platform && a.status === "connected"
  );
}

// OAuth state management (for CSRF protection)
export function setOAuthState(state: string, data: object): void {
  if (typeof window === "undefined") return;
  const states = getOAuthStates();
  states[state] = { ...data, createdAt: Date.now() };
  localStorage.setItem(OAUTH_STATE_KEY, JSON.stringify(states));
}

export function getOAuthState(state: string): object | null {
  const states = getOAuthStates();
  return states[state] || null;
}

export function removeOAuthState(state: string): void {
  const states = getOAuthStates();
  delete states[state];
  localStorage.setItem(OAUTH_STATE_KEY, JSON.stringify(states));
}

function getOAuthStates(): Record<string, object & { createdAt: number }> {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(OAUTH_STATE_KEY);
    if (stored) {
      const states = JSON.parse(stored);
      // Clean up states older than 10 minutes
      const now = Date.now();
      const cleaned: Record<string, object & { createdAt: number }> = {};
      for (const [key, value] of Object.entries(states)) {
        const stateValue = value as { createdAt: number };
        if (now - stateValue.createdAt < 10 * 60 * 1000) {
          cleaned[key] = stateValue;
        }
      }
      return cleaned;
    }
  } catch {
    console.error("Failed to parse OAuth states");
  }
  return {};
}

// Generate a random state for OAuth
export function generateOAuthState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// PKCE helpers for Twitter OAuth 2.0
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
