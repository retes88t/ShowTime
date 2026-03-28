import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import castImg from '../assets/cast.jpeg';

export function CastPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver
          </Link>
        </div>
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Cast
        </h1>
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <img
              src={castImg}
              alt="Cast de la obra"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
