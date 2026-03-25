import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Person } from '../types';
import { fetchPeople } from '../api/peopleApi';
import { readCache } from '../api/sheetsClient';

const ADMIN_PASSWORD = 'showtime2026';

interface AppContextType {
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  people: Person[];
  refreshPeople: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('showtime_admin') === 'true';
  });
  const [people, setPeople] = useState<Person[]>(() => readCache<Person>('Personas'));

  const refreshPeople = async () => {
    const result = await fetchPeople();
    setPeople(result);
  };

  useEffect(() => {
    refreshPeople();
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('showtime_admin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('showtime_admin');
  };

  return (
    <AppContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin, people, refreshPeople }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
