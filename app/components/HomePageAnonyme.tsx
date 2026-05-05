"use client";

import { useState } from "react";
import { Programme, Promotion, Project } from "@/src/db/types";
import ImageProjet from "./ImageProjet";
import ModalRegister from "./ModalRegister";
import ModalSignIn from "./ModalSignIn";
import ModalProjetConnexion from "./ModalProjetConnexion";
import HeaderAnonyme from "./HeaderAnonyme";
import Link from "next/link";

type Props = {
  programmes: Programme[];
  promotions: Promotion[];
  projects: Project[];
};

export default function HomePageAnonyme({
  programmes,
  promotions,
  projects,
}: Props) {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalProjetConnexionOpen, setIsModalProjetConnexionOpen] =
    useState(false);

  const handleSubmit = async (data: {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }): Promise<boolean> => {
    return true;
  };

  // Génère l'URL de l'image du projet à partir du lien GitHub
  function getGithubImage(url: string): string | null {
    const parts = url.split("/");
    const user = parts[3];
    const repo = parts[4];
    if (!user || !repo) return null;

    return `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;
  }

  return (
    <div>
      <HeaderAnonyme
        openModalRegister={() => setIsModalRegisterOpen(true)}
        openModalSignIn={() => setIsModalSignInOpen(true)}
        openModalProjetConnexion={() => setIsModalProjetConnexionOpen(true)}
      />

      {isModalRegisterOpen && (
        <ModalRegister onClose={() => setIsModalRegisterOpen(false)} />
      )}

      {isModalSignInOpen && (
        <ModalSignIn onClose={() => setIsModalSignInOpen(false)} />
      )}

      {isModalProjetConnexionOpen && (
        <ModalProjetConnexion
          onClose={() => setIsModalProjetConnexionOpen(false)}
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
                <Link href={`/${project.adresseweb}`}>
                <h2>{project.title}</h2>
                <p>
                  {promotions.find((p) => p.id === project.promotionId)?.name}
                </p>
                <div>
                  <ImageProjet
                    src={getGithubImage(project.gitHubLink) ?? ""}
                    alt={project.title}
                  />
                </div>
                </Link>
              </div>
            ))}
          </div>
          
        );
      })}
    </div>
  );
}
