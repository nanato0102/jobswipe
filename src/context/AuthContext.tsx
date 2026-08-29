"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserType, UserSession } from "@/types";

interface AuthContextType {
  session: UserSession | null;
  loading: boolean;
  isStudent: boolean;
  isCompany: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  demoLogin: (role: UserType) => UserSession;
}

const AUTH_STORAGE_KEY = "jobswipe_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setSession(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse auth session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user: UserSession) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    setSession(user);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
    window.location.href = "/";
  };

  const demoLogin = (role: UserType): UserSession => {
    let dummyUser: UserSession;
    if (role === "STUDENT") {
      dummyUser = {
        id: "s1",
        email: "sato@example.com",
        userType: "STUDENT",
        name: "佐藤 健太",
      };
    } else if (role === "COMPANY") {
      dummyUser = {
        id: "c1",
        email: "hr@tech-innovations.jp",
        userType: "COMPANY",
        name: "テックイノベーション株式会社",
      };
    } else {
      dummyUser = {
        id: "admin-1",
        email: "admin@jobswipe.jp",
        userType: "ADMIN",
        name: "システム管理者",
      };
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dummyUser));
    setSession(dummyUser);
    return dummyUser;
  };

  const isStudent = session?.userType === "STUDENT";
  const isCompany = session?.userType === "COMPANY";
  const isAdmin = session?.userType === "ADMIN";
  const isLoggedIn = !!session;

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isStudent,
        isCompany,
        isAdmin,
        isLoggedIn,
        login,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}