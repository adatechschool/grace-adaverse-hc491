import { signout } from "@/src/db/lib/actions";

interface ModalProps {
  onClose: () => void;
}

export default function ModalSignOut({ onClose }: ModalProps) {
  function onSignOut() {
    signout();
    onClose();
  }

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
              Confirmation
            </p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Se déconnecter
            </h2>
          </div>

          {/* Contenu */}
          <div className="p-6 flex flex-col gap-6">
            <p className="text-slate-600 text-sm">
              Voulez-vous vraiment vous déconnecter ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-150"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={onSignOut}
                className="text-xs font-mono text-white bg-blue-400 border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-150"
              >
                Oui, me déconnecter
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}