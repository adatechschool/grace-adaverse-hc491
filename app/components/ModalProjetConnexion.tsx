interface modalProps {
  onClose: () => void;
}

export default function ModalProjetConnexion({ onClose }: modalProps) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2>Pour proposer un projet, veuillez vous connecter!</h2>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Fermer
        </button>
      </div>
    </dialog>
  );
}
