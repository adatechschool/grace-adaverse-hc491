import { headers } from "next/headers";
import { db } from "@/src";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  projectsTable,
  user,
  promotionsTable,
  programmesTable,
} from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import ImageProjet from "@/app/components/module/ImageProjet";
import { getGithubImage, getFallback } from "@/app/components/module/getImages";
import BouttonSupprimer from "@/app/components/module/buttonSupprimer";
import BoutonModifier from "@/app/components/module/buttonModifier";

export default async function detailsProfil(props: {
  params: Promise<{ detailsProfil: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userSession = session?.session.userId as string;

  const banStatus = await db
    .select()
    .from(user)
    .where(eq(user.id, userSession));
  if (banStatus[0]?.banned) redirect("/banned");

  const { detailsProfil: rawParam } = await props.params;
  const detailsProfil = decodeURIComponent(rawParam);

  const userResult = await db
    .select({ id: user.id, name: user.name, admin: user.admin })
    .from(user)
    .where(eq(user.name, detailsProfil));

  const profil = userResult[0];
  if (!profil) notFound();

  const projets = await db
    .select({
      id: projectsTable.id,
      title: projectsTable.title,
      gitHubLink: projectsTable.gitHubLink,
      demoLink: projectsTable.demoLink,
      adresseweb: projectsTable.adresseweb,
      publicationDate: projectsTable.publicationDate,
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
    .where(eq(projectsTable.userId, profil.id));

  // Vérifie si l'utilisateur connecté est le propriétaire du profil
  const isOwner = userSession === profil.id;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-blue-900 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors duration-150"
          >
            ← Retour à la vitrine
          </Link>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-14 h-14 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-bold font-mono">
                {profil.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-1">
                Profil étudiant
              </p>
              <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
                {profil.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête section projets */}
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Projets</h2>
          <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
            {projets.length} projet{projets.length > 1 ? "s" : ""}
          </span>
          <div className="flex-1 h-px bg-blue-100" />
        </div>

        {projets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-slate-400 font-mono text-sm">
              Aucun projet pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projets.map((project) => {
              const fallback = getFallback(project.gitHubLink);
              return (
                <div key={project.id} className="flex flex-col">
                  {/* Carte projet */}
                  <Link
                    href={`/${project.adresseweb}`}
                    className="group flex-1 block bg-white rounded-xl border border-slate-200 overflow-hidden
                               transition-all duration-200
                               hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100
                               hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative w-full h-44 bg-blue-50 overflow-hidden">
                      <ImageProjet
                        src={getGithubImage(project.gitHubLink) ?? fallback}
                        fallback={fallback}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Corps */}
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                          {project.promotionName}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          · {project.programmeName}
                        </span>
                      </div>
                      <h3
                        className="text-base font-bold text-slate-800 leading-snug
                                      group-hover:text-blue-600 transition-colors duration-150"
                      >
                        {project.title}
                      </h3>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-mono">
                          Voir le projet
                        </span>
                        <span
                          className="w-7 h-7 rounded-full border border-blue-200 bg-blue-50
                                           flex items-center justify-center text-blue-400 text-sm
                                           group-hover:bg-blue-400 group-hover:text-white group-hover:border-blue-400
                                           transition-all duration-150"
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Boutons d'action — visibles uniquement pour le propriétaire */}
                  {isOwner && (
                    <div className="flex items-center gap-2 mt-2 px-1">
                      <BoutonModifier
                        id={project.id}
                        title={project.title}
                        gitHubLink={project.gitHubLink}
                        demoLink={project.demoLink ?? undefined}
                      />
                      <BouttonSupprimer id={project.id} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
