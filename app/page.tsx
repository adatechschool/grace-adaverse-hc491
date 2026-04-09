"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Formulaire from "./components/Formulaire";

const home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (data: { title: string; gitHubLink: string }) => {
    console.log("Projet soumis : ", data);
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
};
export default home;
