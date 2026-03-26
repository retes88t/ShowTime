import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export function Header() {
  const { isAdmin, loginAdmin, logoutAdmin } = useAppContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await loginAdmin(password);
      if (ok) {
        setShowLoginModal(false);
        setPassword('');
        setError('');
      } else {
        setError('Contrasena incorrecta');
      }
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/estructura', label: 'Contexto' },
    { to: '/audicion', label: 'Audiciones' },
    { to: '/ayuda-audiciones', label: 'Ayuda para Audiciones' },
    { to: '/libreto', label: 'Libreto' },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-night-lighter bg-night/95 backdrop-blur print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">&#9733;</span>
            <span className="text-xl font-bold text-gold">ShowTime</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'bg-night-lighter text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: admin button + hamburger */}
          <div className="flex items-center gap-2">
            {/* Admin button (desktop) */}
            <div className="hidden md:block">
              {isAdmin ? (
                <button
                  onClick={logoutAdmin}
                  className="flex items-center gap-2 rounded-lg border border-rose/30 px-3 py-2 text-sm text-rose-light transition hover:border-rose hover:bg-rose/10"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Salir Admin
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 rounded-lg border border-night-lighter px-3 py-2 text-sm text-gray-300 transition hover:border-gold hover:text-gold"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin
                </button>
              )}
            </div>

            {/* Hamburger button (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition hover:bg-night-lighter hover:text-gold md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-night-lighter md:hidden">
            <nav className="mx-auto max-w-7xl space-y-1 px-4 pb-4 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive(link.to)
                      ? 'bg-night-lighter text-gold'
                      : 'text-gray-300 active:bg-night-lighter hover:bg-night-lighter/50 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Admin button in mobile menu */}
              <div className="mt-2 border-t border-night-lighter pt-3">
                {isAdmin ? (
                  <button
                    onClick={() => { logoutAdmin(); setMobileOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-rose-light transition active:bg-night-lighter hover:bg-night-lighter/50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Salir Admin
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowLoginModal(true); setMobileOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-gray-300 transition active:bg-night-lighter hover:bg-night-lighter/50 hover:text-gold"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Admin
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-night-lighter bg-night-light p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-bold text-gold">Acceso Admin</h2>
            <form onSubmit={handleLogin}>
              <label className="mb-1 block text-sm text-gray-300">Contrasena</label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="mb-2 w-full rounded-lg border border-night-lighter bg-night px-3 py-2 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Ingresa la contrasena"
              />
              {error && <p className="mb-2 text-xs text-rose">{error}</p>}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setPassword(''); setError(''); }}
                  className="rounded-lg border border-night-lighter px-4 py-2 text-sm text-gray-300 hover:bg-night"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-night hover:bg-gold-dark disabled:opacity-50"
                >
                  {loading ? 'Validando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
