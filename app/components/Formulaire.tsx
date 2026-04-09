import React, { useState } from "react";

interface FormulaireProps {
  closeModal: () => void;
  onSubmit: (data: { title: string; gitHubLink: string }) => void;
}

const Formulaire = ({ closeModal, onSubmit }: FormulaireProps) => {
  const [title, setTitle] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !gitHubLink) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    onSubmit({ title, gitHubLink });

    setTitle("");
    setGitHubLink("");
    setError(null);
    closeModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      <button
        className="text-red-500 absolute top-2 right-2"
        onClick={closeModal}
      >
        X
      </button>
      <h2 className="text-xl mb-4">Proposer un projet</h2>

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

        <label className="block mbe-2">Lien Github</label>
        <input
          type="url"
          value={gitHubLink}
          onChange={(e) => setGitHubLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="https://github.com/..."
        />

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
};

export default Formulaire;
