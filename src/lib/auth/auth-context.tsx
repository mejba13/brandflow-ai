"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AuthUser,
  ProfileUpdateData,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  validateCredentials,
  registerUser,
  updateUserProfile,
  demoUsers,
} from "./auth";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>;
  demoCredentials: { email: string; password: string };
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  // Load user from storage on mount
  React.useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const validatedUser = validateCredentials(email, password);

    if (validatedUser) {
      setUser(validatedUser);
      setStoredUser(validatedUser);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Invalid email or password" };
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = registerUser(data);

    if ("error" in result) {
      setIsLoading(false);
      return { success: false, error: result.error };
    }

    // Auto login after registration
    setUser(result);
    setStoredUser(result);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    clearStoredUser();
    router.push("/login");
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedUser = updateUserProfile(data);

    if (updatedUser) {
      setUser(updatedUser);
      return { success: true };
    }

    return { success: false, error: "Failed to update profile" };
  };

  // Demo credentials for easy testing
  const demoCredentials = {
    email: demoUsers[0].email,
    password: "demo123",
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        demoCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// HOC for protected pages
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
