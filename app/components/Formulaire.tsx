"use client";

import React, { useEffect, useState } from "react";
import { getProgrammesPromotions } from "../actions/projectsActions";
import type { Programme, Promotion } from "@/src/db/types";
import { addProject } from "@/src/db/lib/actions";

interface FormulaireProps {
  closeModal: () => boolean;
  onSubmit: (data: {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }) => Promise<boolean>;
}

export default function Formulaire({ closeModal, onSubmit }: FormulaireProps) {
  const [title, setTitle] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [promoAda, setPromoAda] = useState("");
  const [projetAda, setProjetAda] = useState("");
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchProgrammesPromotions = async () => {
      try {
        const { programmes, promotions } = await getProgrammesPromotions();
        setProgrammes(programmes);
        setPromotions(promotions);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    fetchProgrammesPromotions();
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      if (!title || !gitHubLink) {
        setError("Tous les champs sont obligatoires !");
      } else {
        setError(null);
      }
    }
  }, [title, gitHubLink, demoLink, formSubmitted]);

  
  // On n'utilise plus handleSubmit pour l'instant
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form action={addProject}>
        <label className="block mb-2">Titre du projet</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Titre du projet"
          required
        />

        <label className="block mb-2">Lien Github</label>
        <input
          name="github"
          type="url"
          value={gitHubLink}
          onChange={(e) => setGitHubLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="https://github.com/..."
          required
        />

        <label className="block mb-2">Lien de démo</label>
        <input
          name="demo"
          type="url"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="https://..."
        />

        <label className="block mb-2">Promotion</label>
        <select
          name="promoId"
          value={promoAda}
          onChange={(e) => setPromoAda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="">Sélectionnez une promotion</option>
          {promotions.map((p: Promotion) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Programme</label>
        <select
          name="progId"
          value={projetAda}
          onChange={(e) => setProjetAda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="">Sélectionnez un programme</option>
          {programmes.map((pr: Programme) => (
            <option key={pr.id} value={String(pr.id)}>
              {pr.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Envoyer
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Fermer
        </button>
      </form>
    </div>
  );
}
