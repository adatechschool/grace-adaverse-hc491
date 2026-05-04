"use client";

import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import { Programme, Promotion, Project } from "@/src/db/types";
import ImageProjet from "./ImageProjet";
import ModalRegister from "./ModalRegister";
import ModalSignIn from "./ModalSignIn";
import ModalSignOut from "./ModalSignOut";

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
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalSignOutOpen, setIsModalSignOutOpen] = useState(false);

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
  
    const parts = url.split("/");
    const user = parts[3];
    const repo = parts[4];
    if (!user || !repo) return null;

    return `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;
  
}


  return (
    <div>
      <Header 
      openModal={() => setIsModalOpen(true)}
      openModalRegister={() => setIsModalRegisterOpen(true)}
      openModalSignIn={() => setIsModalSignInOpen(true)}
      openModalSignOut={() => setIsModalSignOutOpen(true)}
       />

       {isModalRegisterOpen && (
        <ModalRegister
          onClose={() => setIsModalRegisterOpen(false)}
        />
      )}

      
       {isModalSignInOpen && (
        <ModalSignIn
          onClose={() => setIsModalSignInOpen(false)}
        />
      )}

      {isModalSignOutOpen && (
        <ModalSignOut
          onClose={() => setIsModalSignOutOpen(false)}
        />
      )}

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
                <div>
                  <ImageProjet
                    src={getGithubImage(project.gitHubLink)??""}
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
