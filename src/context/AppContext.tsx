import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Person } from '../types';
import { fetchPeople } from '../api/peopleApi';
import { readCache } from '../api/sheetsClient';

interface AppContextType {
  currentUser: Person | null;
  setCurrentUser: (user: Person | null) => void;
  people: Person[];
  refreshPeople: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<Person | null>(null);
  const [people, setPeople] = useState<Person[]>(() => readCache<Person>('Personas'));

  const refreshPeople = async () => {
    const result = await fetchPeople();
    setPeople(result);
  };

  useEffect(() => {
    refreshPeople();

    const saved = localStorage.getItem('showtime_currentUser');
    if (saved) {
      try {
        setCurrentUserState(JSON.parse(saved));
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  const setCurrentUser = (user: Person | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('showtime_currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('showtime_currentUser');
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, people, refreshPeople }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
