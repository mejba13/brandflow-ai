// Simple auth system with seed data for development
// This replaces Clerk when not configured

import { seedCurrentUser, seedTeamMembers } from "@/lib/seed-data";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  plan: string;
  avatarUrl?: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  avatarUrl?: string;
}

// Demo users for login (using seed data)
export const demoUsers: Array<AuthUser & { password: string }> = [
  {
    ...seedCurrentUser,
    password: "demo123", // Demo password for seed user
  },
  ...seedTeamMembers.map((member) => ({
    id: member.id,
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    company: seedCurrentUser.company,
    role: member.role,
    plan: seedCurrentUser.plan,
    password: "demo123",
  })),
  // Additional demo account for easy testing
  {
    id: "demo_user",
    email: "demo@brandflowai.com",
    firstName: "Demo",
    lastName: "User",
    company: "BrandFlow AI",
    role: "owner",
    plan: "pro",
    password: "demo",
  },
];

// Session storage key
const AUTH_STORAGE_KEY = "brandflow_auth_session";
const AUTH_COOKIE_NAME = "brandflow_session";

// Client-side auth functions
export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Invalid stored data
  }
  return null;
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  // Also set a cookie for server-side access
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
}

// Validate credentials
export function validateCredentials(email: string, password: string): AuthUser | null {
  const user = demoUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
}

// Register new user (adds to session, simulated)
export function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): AuthUser | { error: string } {
  // Check if email already exists
  const existingUser = demoUsers.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase()
  );

  if (existingUser) {
    return { error: "Email already registered" };
  }

  // Create new user
  const newUser: AuthUser = {
    id: `user_${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    company: "My Company",
    role: "owner",
    plan: "starter",
  };

  // In a real app, this would save to database
  // For demo, we just return the user (they can log in with demo credentials)
  return newUser;
}

// Get user from cookie (for server-side)
export function getUserFromCookie(cookieHeader: string | null): AuthUser | null {
  if (!cookieHeader) return null;

  try {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const sessionCookie = cookies[AUTH_COOKIE_NAME];
    if (sessionCookie) {
      return JSON.parse(decodeURIComponent(sessionCookie));
    }
  } catch {
    // Invalid cookie
  }

  return null;
}

// Update user profile
export function updateUserProfile(updates: ProfileUpdateData): AuthUser | null {
  const currentUser = getStoredUser();
  if (!currentUser) return null;

  const updatedUser: AuthUser = {
    ...currentUser,
    ...updates,
  };

  setStoredUser(updatedUser);
  return updatedUser;
}

// Convert file to base64 for storage
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
