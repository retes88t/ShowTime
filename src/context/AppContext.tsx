import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Person } from '../types';
import { fetchPeople } from '../api/peopleApi';
import { readCache, setAdminPassword, clearAdminPassword, writeSheet } from '../api/sheetsClient';

interface AppContextType {
  isAdmin: boolean;
  loginAdmin: (password: string) => Promise<boolean>;
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

  const loginAdmin = async (password: string): Promise<boolean> => {
    // Guardar la contraseña temporalmente para probarla
    setAdminPassword(password);
    try {
      // Intentar una operacion de escritura para validar la contraseña
      await writeSheet('update', 'Personas', { id: '__auth_test__' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('No hay datos') || msg.includes('No encontrado')) {
        // La contraseña es correcta, la operacion fallo porque el ID no existe
        setIsAdmin(true);
        localStorage.setItem('showtime_admin', 'true');
        return true;
      }
      // Contraseña incorrecta u otro error
      clearAdminPassword();
      return false;
    }
    // Si no lanza error, la contraseña es correcta
    setIsAdmin(true);
    localStorage.setItem('showtime_admin', 'true');
    return true;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('showtime_admin');
    clearAdminPassword();
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
