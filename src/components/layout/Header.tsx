import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export function Header() {
  const { currentUser, setCurrentUser, people } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-night-lighter bg-night/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">&#9733;</span>
            <span className="text-xl font-bold text-gold">ShowTime</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link
              to="/"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive('/') ? 'bg-night-lighter text-gold' : 'text-gray-300 hover:text-gold'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/estructura"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive('/estructura') ? 'bg-night-lighter text-gold' : 'text-gray-300 hover:text-gold'
              }`}
            >
              Contexto
            </Link>
            <Link
              to="/admin"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive('/admin') ? 'bg-night-lighter text-gold' : 'text-gray-300 hover:text-gold'
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg border border-night-lighter px-3 py-2 text-sm text-gray-300 transition hover:border-gold hover:text-gold"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {currentUser ? currentUser.nombre : 'Seleccionar usuario'}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-night-lighter bg-night-light p-2 shadow-xl">
              <p className="mb-2 px-2 text-xs font-medium uppercase text-gray-400">
                Quien eres?
              </p>
              {people.filter(p => p.activo).map((person) => (
                <button
                  key={person.id}
                  onClick={() => {
                    setCurrentUser(person);
                    setShowUserMenu(false);
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    currentUser?.id === person.id
                      ? 'bg-gold/20 text-gold'
                      : 'text-gray-300 hover:bg-night-lighter hover:text-white'
                  }`}
                >
                  <div className="font-medium">{person.nombre}</div>
                  <div className="text-xs text-gray-400">{person.rol}</div>
                </button>
              ))}
              {people.length === 0 && (
                <p className="px-2 py-4 text-center text-xs text-gray-500">
                  No hay personas registradas. Ve a Admin para agregar.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
