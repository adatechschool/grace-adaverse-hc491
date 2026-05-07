import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/src";
import {
  projectsTable,
  user,
  programmesTable,
  promotionsTable,
} from "@/src/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import BouttonPublier from "../components/module/buttonPublier";
import BouttonSupprimer from "../components/module/buttonSupprimer";
import BouttonBannir from "../components/module/buttonBannir";
import Link from "next/link";
import BanUsers from "../components/banUsers";

export default async function Admin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userSession = session?.session.userId as string;
  const adminStatus = await db
    .select()
    .from(user)
    .where(eq(user.id, userSession));

  if (!session?.user || !adminStatus[0].admin) {
    redirect("/");
  }

  const projetsNonPublies = await db
    .select({
      id: projectsTable.id,
      username: user.name,
      userId: user.id,
      title: projectsTable.title,
      thumbnail: projectsTable.thumbnail,
      gitHubLink: projectsTable.gitHubLink,
      demoLink: projectsTable.demoLink,
      promotionName: promotionsTable.name,
      programmeName: programmesTable.name,
    })
    .from(projectsTable)
    .innerJoin(
      promotionsTable,
      eq(projectsTable.promotionId, promotionsTable.id),
    )
    .innerJoin(
      programmesTable,
      eq(projectsTable.programmeId, programmesTable.id),
    )
    .innerJoin(user, eq(projectsTable.userId, user.id))
    .where(
      and(
        eq(projectsTable.userId, user.id),
        isNull(projectsTable.publicationDate),
      ),
    );

  const users = await db.select().from(user);
  const usersPasBannis = users.filter((u) => !u.banned);
  const usersBannis = users.filter((u) => u.banned);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-2">
            Espace admin
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
            Projets <span className="text-blue-900">à publier</span>
          </h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
        {/* Section projets en attente */}
        <section>
          {projetsNonPublies.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24">
              <p className="text-slate-400 font-mono text-sm">
                Aucun projet en attente de publication.
              </p>
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
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6
                               flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                  >
                    {/* Infos projet */}
                    <div className="flex flex-col gap-2 min-w-0">
                      <h3 className="text-base font-bold text-slate-800">
                        {project.title}
                      </h3>

                      <a
                        href={project.gitHubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-blue-400 hover:underline truncate max-w-xs"
                      >
                        {project.gitHubLink}
                      </a>
                      {/* Badges meta */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                          👤 {project.username}
                        </span>
                        <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
                          {project.programmeName}
                        </span>
                        <span className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                          {project.promotionName}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <BouttonPublier project={project} />
                      <BouttonSupprimer id={project.id} />
                      <BouttonBannir userId={project.userId} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Section gestion des utilisateurs */}
        <section>
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Utilisateurs</h2>
            <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
              {usersPasBannis.length} actif
              {usersPasBannis.length > 1 ? "s" : ""}
            </span>
            {usersBannis.length > 0 && (
              <span className="text-xs font-mono text-red-400 border border-red-200 bg-red-50 px-2 py-0.5 rounded">
                {usersBannis.length} banni{usersBannis.length > 1 ? "s" : ""}
              </span>
            )}
            <div className="flex-1 h-px bg-blue-100" />
          </div>
          <BanUsers usersBannis={usersBannis} usersPasBannis={usersPasBannis} />
        </section>

        {/* Retour */}
        <Link
          href="/"
          className="text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors duration-150 w-fit"
        >
          ← Retour à l'accueil
        </Link>
      </main>
    </div>
  );
}
