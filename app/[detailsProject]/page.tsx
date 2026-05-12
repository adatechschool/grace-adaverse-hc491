import Link from "next/link";
import { db } from "@/src";
import ImageProjet from "../components/module/ImageProjet";
import { projectsTable, promotionsTable, programmesTable, user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getGithubImage, getFallback } from "../components/module/getImages";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export default async function DetailsProject(props: {
  params: Promise<{ detailsProject: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userSession = session?.session.userId as string;
  const banStatus = await db.select().from(user).where(eq(user.id, userSession));
  if (banStatus[0]?.banned) redirect("/banned");

  const { detailsProject } = await props.params;

  const result = await db
    .select({
      id: projectsTable.id,
      title: projectsTable.title,
      thumbnail: projectsTable.thumbnail,
      adresseweb: projectsTable.adresseweb,
      gitHubLink: projectsTable.gitHubLink,
      demoLink: projectsTable.demoLink,
      publicationDate: projectsTable.publicationDate,
      promotionId: promotionsTable.name,
      programmeId: programmesTable.name,
    })
    .from(projectsTable)
    .innerJoin(promotionsTable, eq(projectsTable.promotionId, promotionsTable.id))
    .innerJoin(programmesTable, eq(projectsTable.programmeId, programmesTable.id))
    .where(eq(projectsTable.adresseweb, detailsProject));

  const project = result[0];

  // ← ICI, avant tout usage de project
  if (!project) {
    notFound();
  }

  const fallback = getFallback(project.gitHubLink);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-blue-900 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors duration-150"
          >
            ← Retour à la vitrine
          </Link>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mt-3">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">

          {/* Image */}
          <div className="relative w-full h-64 bg-blue-50">
            <ImageProjet
              src={getGithubImage(project.gitHubLink) ?? fallback}
              fallback={fallback}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Infos */}
          <div className="p-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
                {project.programmeId}
              </span>
              <span className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                {project.promotionId}
              </span>
              {project.publicationDate && (
                <span className="text-xs font-mono text-slate-400 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                  Publié le{" "}
                  {new Date(project.publicationDate).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>

            {/* Titre */}
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              {project.title}
            </h2>

            {/* Boutons */}
            <div className="flex flex-wrap gap-3">
              
                <a href={project.gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
                Voir le GitHub
              </a>

              {project.demoLink && (
                
                  <a href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                  </svg>
                  Voir la démo
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}