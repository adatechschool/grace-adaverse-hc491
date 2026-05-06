import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/src";
import { projectsTable, user } from "@/src/db/schema";
import { eq, isNull } from "drizzle-orm";
import BouttonPublier from "../components/module/buttonPublier";
import Link from "next/link";

export default async function Admin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userSession = session?.session.userId as string;
  const adminStatus = await db.select().from(user).where(eq(user.id, userSession));

  if (!session?.user || !adminStatus[0].admin) {
    redirect("/");
  }

  const projetsNonPublies = await db
    .select()
    .from(projectsTable)
    .where(isNull(projectsTable.publicationDate));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-2">
            Espace administration
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
            Projets <span className="text-blue-900">à publier</span>
          </h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projetsNonPublies.length === 0 ? (
          /* État vide */
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <p className="text-slate-400 font-mono text-sm">
              Aucun projet en attente de publication.
            </p>
            <Link
              href="/"
              className="text-xs font-mono text-blue-400 hover:underline"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        ) : (
          <>
            {/* En-tête de section */}
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                En attente
              </h2>
              <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
                {projetsNonPublies.length} projet
                {projetsNonPublies.length > 1 ? "s" : ""}
              </span>
              <div className="flex-1 h-px bg-blue-100" />
            </div>

            {/* Liste des projets */}
            <div className="flex flex-col gap-4">
              {projetsNonPublies.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden
                             flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6"
                >
                  {/* Infos */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-slate-800">
                      {project.title}
                    </h3>
                    
                      <a href={project.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-blue-400 hover:underline truncate max-w-xs"
                    >
                      {project.gitHubLink}
                    </a>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    <BouttonPublier project={project} />
                  </div>
                </div>
              ))}
            </div>

            {/* Retour */}
            <div className="mt-10">
              <Link
                href="/"
                className="text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors duration-150"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}