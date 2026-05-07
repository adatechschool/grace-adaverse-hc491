"use client";

import { useState } from "react";
import { Programme, Promotion, Project } from "@/src/db/types";
import ImageProjet from "../module/ImageProjet";
import ModalRegister from "../modals/ModalRegister";
import ModalSignIn from "../modals/ModalSignIn";
import ModalProjetConnexion from "../modals/ModalProjetConnexion";
import HeaderAnonyme from "./HeaderAnonyme";
import Link from "next/link";
import { getGithubImage, getFallback } from "../module/getImages";
import { ChangeEvent } from "react";

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
  const [programmeFiltre, setProgrammeFiltre] = useState(programmes);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
  const selectedId = e.target.value;

  if (!selectedId) {
    setProgrammeFiltre(programmes); // ← affiche tout si aucun filtre
    return;
  }

  setProgrammeFiltre(
    programmes.filter((programme) => programme.id === Number(selectedId))
  );
}

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <HeaderAnonyme
        openModalRegister={() => setIsModalRegisterOpen(true)}
        openModalSignIn={() => setIsModalSignInOpen(true)}
        openModalProjetConnexion={() => setIsModalProjetConnexionOpen(true)}
      />

      {/* Modals */}
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

      {/* Hero strip */}
      <div className="bg-blue-400 px-6 py-10 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-2">
            Vitrine étudiante
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
            Projets <span className="text-blue-900">Fullstack</span>
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtre par programme */}
        <div className="mb-10">
          <select
            onChange={(e) => handleChange(e)}
            className="text-xs font-mono text-slate-600 border border-slate-200 bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          >
            <option value="">Tous les programmes</option>
            {programmes.map((programme) => (
              <option key={programme.id} value={programme.id}>
                {programme.name}
              </option>
            ))}
          </select>
        </div>
        {programmeFiltre.map((programme) => {
          let localIndex = 0;
          const projectfilter = projects.filter(
            (p) => p.programmeId === programme.id,
          );

          if (projectfilter.length === 0) return null;

          return (
            <section key={programme.id} className="mb-16">
              {/* En-tête de programme */}
              <div className="flex items-baseline gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  {programme.name}
                </h2>
                <span className="text-xs font-mono text-blue-400 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
                  {projectfilter.length} projet
                  {projectfilter.length > 1 ? "s" : ""}
                </span>
                <div className="flex-1 h-px bg-blue-100" />
              </div>

              {/* Grille des projets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projectfilter.map((project) => {
                  const promotionName = promotions.find(
                    (p) => p.id === project.promotionId,
                  )?.name;

                  localIndex++;
                  const localIndexLabel = String(localIndex);
                  const fallback = getFallback(project.gitHubLink);

                  return (
                    <Link
                      key={project.id}
                      href={`/${project.adresseweb}`}
                      className="group block bg-white rounded-xl border border-slate-200 overflow-hidden
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
                        {/* Numéro décoratif */}
                        <span
                          className="absolute top-3 left-3 font-mono text-xs font-medium
                                         bg-white/80 backdrop-blur-sm text-blue-400
                                         px-2 py-0.5 rounded border border-blue-100"
                        >
                          #{localIndexLabel}
                        </span>
                      </div>

                      {/* Corps */}
                      <div className="p-5">
                        <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1.5">
                          {promotionName ?? "Promotion inconnue"}
                        </p>
                        <h3
                          className="text-base font-bold text-slate-800 leading-snug
                                        group-hover:text-blue-600 transition-colors duration-150"
                        >
                          {project.title}
                        </h3>

                        {/* Flèche d'action */}
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
