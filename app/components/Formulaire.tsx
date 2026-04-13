"use client";

import React, { useEffect, useState } from "react";
import { getProgrammesPromotions } from "../actions/projectsActions";
import type { Programme, Promotion } from "@/src/db/types";

interface FormulaireProps {
  closeModal: () => void;
  onSubmit: (data: {
    title: string;
    gitHubLink: string;
    demoLink: string;
    promoAda: string;
    projetAda: string;
  }) => void;
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
      if (!title || !gitHubLink || !demoLink) {
        setError("Tous les champs sont obligatoires !");
      } else {
        setError(null);
      }
    }
  }, [title, gitHubLink, demoLink, formSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!title || !gitHubLink || !demoLink || !promoAda || !projetAda) {
      setError("Tous les champs sont obligatoires!");
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          gitHubLink,
          demoLink,
          promoAda,
          projetAda,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        onSubmit({ title, gitHubLink, demoLink, promoAda, projetAda });

        setTitle("");
        setGitHubLink("");
        setDemoLink("");
        setPromoAda("");
        setProjetAda("");
        setError(null);
        closeModal();
      } else {
        setError(result.message || "Erreur lors de la soumission du projet");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur est survenue lors de la soumission");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Titre du projet</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Titre du projet"
        />

        <label className="block mb-2">Lien Github</label>
        <input
          type="url"
          value={gitHubLink}
          onChange={(e) => setGitHubLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="https://github.com/..."
        />

        <label className="block mb-2">Lien de démo</label>
        <input
          type="url"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="https://..."
        />

        <label className="block mb-2">Promotion</label>
        <select
          value={promoAda}
          onChange={(e) => setPromoAda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
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
          value={projetAda}
          onChange={(e) => setProjetAda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
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
