'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Stub user for development ───────────────────────────────────────────────
const STUB_USER: User = {
  id: '1',
  name: 'Gabriel',
  email: 'gabriel@tacticalai.com',
  avatarUrl: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking stored session
    const stored = localStorage.getItem('tactical_ai_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('tactical_ai_user');
      }
    } else {
      // Auto-login with stub user in development
      setUser(STUB_USER);
      localStorage.setItem('tactical_ai_user', JSON.stringify(STUB_USER));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // TODO: Replace with real API call to NEXT_PUBLIC_API_URL/auth/login
    await new Promise((r) => setTimeout(r, 800));
    const loggedUser: User = { ...STUB_USER, email };
    setUser(loggedUser);
    localStorage.setItem('tactical_ai_user', JSON.stringify(loggedUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tactical_ai_user');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
