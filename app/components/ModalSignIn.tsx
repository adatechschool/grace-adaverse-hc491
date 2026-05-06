import SignIn from "./SignIn";

interface ModalProps {
  onClose: () => void;
}

export default function ModalSignIn({ onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Fenêtre */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-blue-400 px-6 py-5">
            <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-1">
              Bon retour
            </p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Me connecter
            </h2>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <SignIn closeModal={onClose} />
          </div>

        </div>
      </div>
    </div>
  );
}