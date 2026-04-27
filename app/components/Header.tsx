import React from "react";

export default function Header({ openModal }: { openModal: () => boolean }) {
  return (
    <header className="bg-blue-200">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-xl mb-4">Projets Ada</h1>
        <button
          className="bg-blue-400 text-black px-4 py-2 rounded"
          onClick={openModal}
        >
          Proposer un projet
        </button>
      </div>
    </header>
  );
}


