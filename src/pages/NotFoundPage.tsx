import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night text-center">
      <div className="text-6xl mb-4">&#9733;</div>
      <h1 className="mb-2 text-4xl font-bold text-gold">404</h1>
      <p className="mb-6 text-lg text-gray-400">
        Este planeta no existe en nuestro universo
      </p>
      <Link
        to="/"
        className="rounded-lg bg-gold px-6 py-3 font-medium text-night hover:bg-gold-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
