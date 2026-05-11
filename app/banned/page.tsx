import { auth } from "@/auth";
import { headers } from "next/headers";
import { db } from "@/src";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import SignOut from "./SignOut";


const session = await auth.api.getSession({ headers: await headers() });
const userSession = session?.session.userId as string;
const banStatus = await db.select().from(user).where(eq(user.id, userSession));

export default function Banned() {
  if (!session?.user || banStatus[0].banned === false) redirect("/");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-xl p-10 max-w-md w-full text-center">
        {/* Icône */}
        <div className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        {/* Texte */}
        <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
          Accès refusé
        </p>
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Compte banni</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Votre compte a été suspendu par un administrateur. Si vous pensez
          qu'il s'agit d'une erreur, contactez l'équipe admins.
        </p>

        {/* Séparateur */}
        <div className="h-px bg-slate-100 my-6" />

        {/* Retour */}
        <SignOut />
      </div>
    </div>
  );
}
