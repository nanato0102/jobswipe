"use client";

import { useState, useEffect } from "react";
import type { UserType, UserSession } from "@/types";

const AUTH_STORAGE_KEY = "jobswipe_session";

export function useAuthSession() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setSession(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
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

  const demoLogin = (role: UserType) => {
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
    login(dummyUser);
    return dummyUser;
  };

  return {
    session,
    loading,
    isStudent: session?.userType === "STUDENT",
    isCompany: session?.userType === "COMPANY",
    isAdmin: session?.userType === "ADMIN",
    isLoggedIn: !!session,
    login,
    logout,
    demoLogin,
  };
}