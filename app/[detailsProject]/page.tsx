import Image from "next/image";
import Link from "next/link";
import { db } from "@/src";
import ImageProjet from "../components/ImageProjet";
import {
  projectsTable,
  promotionsTable,
  programmesTable,
} from "@/src/db/schema";

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
    .innerJoin(
      promotionsTable,
      eq(projectsTable.promotionId, promotionsTable.id),
    )
    .innerJoin(
      programmesTable,
      eq(projectsTable.programmeId, programmesTable.id),
    )
    .where(eq(projectsTable.adresseweb, detailsProject));

  const project = result[0];

  if (!project) {
    return (
      <main className="p-8 flex flex-col gap-6 bg-zinc-50 min-h-screen">
        <p className="text-center text-zinc-500">Projet introuvable.</p>
        <Link
          href="/"
          className="text-sm text-pink-600 hover:underline text-center"
        >
          ← Retour à l'accueil
        </Link>
      </main>
    );
  }

  // Construit l'URL du thumbnail GitHub à partir du lien du repo
  // Format : https://github.com/<user>/<repo>/blob/main/thumbnail.png?raw=true
  function getGithubImage(url: string): string {
    try {
      const [, , , user, repo] = url.split("/");
      return `https://github.com/${user}/${repo}/blob/main/thumbnail.png?raw=true`;
    } catch {
      return ""; // Si l'URL est invalide, le composant ImageProjet affichera l'image par défaut
    }
  }

  return (
    <div>
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold text-[#e74c34] mb-8">Adaverse</h1>
        </Link>
      </div>
      <div>
        {/* Image du projet : thumbnail GitHub ou image par défaut Ada */}
        <ImageProjet
          src={getGithubImage(project.gitHubLink) ?? ""}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h2>{project.title}</h2>
        <p>Projet Ada:{project.programmeId}</p>
        <p>Promotion: {project.promotionId}</p>
        <p>
          {project.publicationDate
            ? new Date(project.publicationDate).toLocaleDateString("fr-FR")
            : "Non publié"}
        </p>

        {/* Lien vers le repo GitHub du projet  */}
        <a
          href={project.gitHubLink}
          target="_blank"
          className="bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Voir le GitHub
        </a>

        {/* Lien vers la démo : affiché uniquement si lienDemo existe */}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            className="bg-[#e74c34] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Voir la démo
          </a>
        )}
      </div>
    </div>
  );
}
