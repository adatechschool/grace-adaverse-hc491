"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Formulaire from "./components/Formulaire";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (): boolean => {
    try {
      setIsModalOpen(true);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ouverture du modal", error);
      return false;
    }
  };

  const handleCloseModal = (): boolean => {
    try {
      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la fermeture du modal", error);
      return false;
    }
  };

  const handleFormSubmit = async (data: {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }): Promise<boolean> => {
    try {
      console.log("Projet soumis : ", data);

      return true;
    } catch (error) {
      console.error("Erreur lors du traitement du formulaire :", error);
      return false;
    }
  };

  return (
    <div>
      <Header openModal={handleOpenModal} />
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Formulaire
            closeModal={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
}
