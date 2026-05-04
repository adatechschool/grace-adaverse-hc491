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
    <header className="bg-blue-200">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-xl mb-4">Projets Ada</h1>

        <div className="flex flex-row gap-2">
          <button
            className="bg-blue-400 text-black px-4 py-2 rounded"
            onClick={openModalProjetConnexion}
          >
            Proposer un projet
          </button>
          <button
            className="bg-blue-400 text-black px-4 py-2 rounded"
            onClick={openModalRegister}
          >
            S'inscrire
          </button>
          <button
            className="bg-blue-400 text-black px-4 py-2 rounded"
            onClick={openModalSignIn}
          >
            Se connecter
          </button>
        </div>
      </div>
    </header>
  );
}
