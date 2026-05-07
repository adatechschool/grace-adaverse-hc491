import { signin } from "@/src/db/lib/actions";

interface SigninProps {
  closeModal: () => void;
}

export default function SignIn({ closeModal }: SigninProps) {
  return (
    <form onSubmit={() => closeModal()} action={signin} className="flex flex-col gap-4">
      <input
        name="email"
        type="email"
        required
        placeholder="Votre email"
        className="w-full p-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Votre mot de passe"
        className="w-full p-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={closeModal}
          className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-150"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="text-xs font-mono text-white bg-blue-400 border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-150"
        >
          Me connecter
        </button>
      </div>
    </form>
  );
}