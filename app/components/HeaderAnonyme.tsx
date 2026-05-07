import Link from "next/link";

interface HeaderProps {
  openModalRegister: () => void;
  openModalSignIn: () => void;
  openModalProjetConnexion: () => void;
}

export default function HeaderAnonyme({
  openModalRegister,
  openModalSignIn,
  openModalProjetConnexion,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-blue-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo / marque */}
          <Link href="/">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-blue-400 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white"
              >
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337A49.95 49.95 0 0 0 12 10.333a49.95 49.95 0 0 0-10.6-2.276.75.75 0 0 1-.23-1.337A60.65 60.65 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134.769.217 1.554.247 2.354a.75.75 0 0 1-.497.736 48.53 48.53 0 0 0-8.26 3.84.75.75 0 0 1-.771 0 48.53 48.53 0 0 0-8.26-3.84.75.75 0 0 1-.497-.736c.03-.8.113-1.585.247-2.354A48.45 48.45 0 0 1 10.94 15.473a2.25 2.25 0 0 0 2.12 0Z" />
              </svg>
            </span>
            <span className="text-sm font-bold text-slate-800 tracking-tight font-mono">
              Projets Ada
            </span>
          </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Proposer un projet — bouton principal */}
            <button
              onClick={openModalProjetConnexion}
              className="flex items-center gap-1.5 bg-blue-400 hover:bg-blue-500
                         text-white text-sm font-medium px-3.5 py-2 rounded-lg
                         transition-colors duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="hidden sm:inline">Proposer un projet</span>
              <span className="sm:hidden">Proposer</span>
            </button>

            {/* Séparateur */}
            <div className="w-px h-5 bg-blue-100" />

            {/* S'inscrire — outline */}
            <button
              onClick={openModalRegister}
              className="text-sm font-medium text-blue-600 hover:text-blue-700
                         border border-blue-200 hover:border-blue-300 hover:bg-blue-50
                         px-3.5 py-2 rounded-lg transition-all duration-150"
            >
              S'inscrire
            </button>

            {/* Se connecter — ghost */}
            <button
              onClick={openModalSignIn}
              className="text-sm font-medium text-slate-600 hover:text-slate-800
                         hover:bg-slate-100 px-3.5 py-2 rounded-lg
                         transition-colors duration-150"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
