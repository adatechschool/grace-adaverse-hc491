"use client";

import React, { useState } from "react";
import type { Programme, Promotion } from "@/src/db/types";
import { addProject } from "@/src/db/lib/actions";

interface FormulaireProps {
  closeModal: () => void;
  onSubmit: (data: {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }) => Promise<boolean>;
  programmes: Programme[];
  promotions: Promotion[];
}

export default function Formulaire({
  closeModal,
  onSubmit,
  programmes,
  promotions,
}: FormulaireProps) {
  const [title, setTitle] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [promoAda, setPromoAda] = useState("");
  const [projetAda, setProjetAda] = useState("");
  const [error, setError] = useState<string | null>(null);

   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    closeModal()

  //   e.preventDefault();
    // console.log("click ok");
    

    // if (!title || !gitHubLink || !promoAda || !projetAda) {
    //   setError("Tous les champs obligatoires doivent être remplis !");
    //   return;
    // }

    // setError(null);

    // const success = await onSubmit({
    //   title,
    //   gitHubLink,
    //   demoLink: demoLink || undefined,
    //   promoAda,
    //   projetAda,
    // });

    // if (success) {
    //   closeModal();
    // }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={()=>closeModal()} action={addProject}>
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
          {promotions.map((p) => (
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
          {programmes.map((pr) => (
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
