import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1ESEdQ4tKCjlfVrYTBlAe-8AI5jDZwKYt0RqBmjdwMPQ/edit?usp=sharing';
const GOOGLE_DOC_EMBED_URL =
  'https://docs.google.com/document/d/1ESEdQ4tKCjlfVrYTBlAe-8AI5jDZwKYt0RqBmjdwMPQ/preview';

export function LibretoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver
          </Link>
          <a
            href={GOOGLE_DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-gold-dark hover:bg-gold/20"
          >
            Abrir en Google Docs
          </a>
        </div>
      </div>

      {/* Embedded document */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6">
        <div className="flex flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <iframe
            src={GOOGLE_DOC_EMBED_URL}
            className="h-full min-h-[75vh] w-full"
            title="Libreto - Lo esencial es invisible a los ojos"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
