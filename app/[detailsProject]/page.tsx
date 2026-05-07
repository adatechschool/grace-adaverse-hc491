import Link from "next/link";
import { db } from "@/src";
import ImageProjet from "../components/ImageProjet";
import { projectsTable, promotionsTable, programmesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export default async function DetailsProject(props: {
  params: Promise<{ detailsProject: string }>;
}) {
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

  function getGithubImage(url: string): string | null {
    try {
      const parts = url.split("/");
      const user = parts[3];
      const repo = parts[4];
      if (!user || !repo) return null;
      return `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;
    } catch {
      return null;
    }
  }

  function getFallback(url : string) : string {
    const parts = url.split("/");
    const user = parts[3];
    const repo = parts[4];

    return `https://opengraph.githubassets.com/1/${user}/${repo}`
  }

  const fallback = getFallback(project.gitHubLink);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 font-mono">Projet introuvable.</p>
        <Link
          href="/"
          className="text-sm text-blue-400 hover:underline font-mono"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

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
              fallback = {fallback}
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
                className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors duration-150"
              >
                <span>↗</span> Voir le GitHub
              </a>

              {project.demoLink && (
                
                  <a href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors duration-150"
                >
                  <span>↗</span> Voir la démo
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}