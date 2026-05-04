import React from "react";
import Link from "next/link";

interface HeaderProps {
openModal: () => void;
openModalRegister: () => void;
openModalSignIn: () => void;
}

export default function Header({ openModal, openModalRegister, openModalSignIn }: HeaderProps) {
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
      <button className="bg-blue-400 text-black px-4 py-2 rounded" onClick={openModalRegister}>S'inscrire</button>
      <button className="bg-blue-400 text-black px-4 py-2 rounded" onClick={openModalSignIn}>Se connecter</button>
    </header>
  );
}
