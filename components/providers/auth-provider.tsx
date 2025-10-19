'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { storage } from '@/lib/storage';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  hydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(storage.getUser());
    setHydrated(true);
  }, []);

  const login = useCallback((nextUser: User) => {
    storage.saveUser(nextUser);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    storage.clearUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      login,
      logout,
    }),
    [user, hydrated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
