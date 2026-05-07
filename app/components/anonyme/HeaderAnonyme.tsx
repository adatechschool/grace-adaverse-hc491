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
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
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
