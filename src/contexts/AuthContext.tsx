import React, { createContext, useContext, useState, useCallback } from "react";
import { authService } from "@/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
    setIsAuthenticated(true);
    setUserEmail(email);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    await authService.register(email, password);
    setIsAuthenticated(true);
    setUserEmail(email);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
