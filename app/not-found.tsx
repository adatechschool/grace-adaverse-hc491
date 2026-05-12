import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-2">
            Erreur 404
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
            Page <span className="text-blue-900">introuvable</span>
          </h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-6">
        <p className="text-slate-400 font-mono text-sm text-center">
          La page que vous cherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-150"
        >
          ← Retour à l'accueil
        </Link>
      </main>
    </div>
  );
}