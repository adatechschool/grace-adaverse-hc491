"use client";

import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import { Programme, Promotion, Project } from "@/src/db/types";
import ImageProjet from "./ImageProjet";

type Props = {
  programmes: Programme[];
  promotions: Promotion[];
  projects: Project[];
};

export default function HomePageClient({
  programmes,
  promotions,
  projects,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }): Promise<boolean> => {
    // ta logique de soumission ici
    return true;
  };

  // Génère l'URL de l'image du projet à partir du lien GitHub
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

  return (
    <div>
      <Header openModal={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <Modal
          programme={programmes}
          promotion={promotions}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {programmes.map((programme) => {
        const projectfilter = projects.filter(
          (p) => p.programmeId === programme.id,
        );

        return (
          <div key={programme.id}>
            <h1>{programme.name}</h1>
            {projectfilter.map((project) => (
              <div key={project.id}>
                <h2>{project.title}</h2>
                <p>
                  {promotions.find((p) => p.id === project.promotionId)?.name}
                </p>
                <div key={project.id}>
                  <ImageProjet
                    src={getGithubImage(project.gitHubLink) ?? ""}
                    alt={project.title}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
