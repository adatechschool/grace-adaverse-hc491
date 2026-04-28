"use client";

import { useState } from "react";
import { Programme, Promotion } from "@/src/db/types";
import Formulaire from "./Formulaire";

type SubmitData = {
    title: string;
    gitHubLink: string;
    demoLink?: string;
    promoAda: string;
    projetAda: string;
  }


type Props = {
  programme: Programme[];
  promotion: Promotion[];
  onClose: () => void;
  onSubmit: (data: SubmitData) => Promise<boolean>;
};




export default function Modal({ programme, promotion, onClose, onSubmit }: Props) {
  return (
    <dialog open>
      <div>
        <h2>Proposer un projet</h2>
        <Formulaire closeModal={onClose} onSubmit={onSubmit} />
        <button onClick={onClose}>Fermer</button>
      </div>
    </dialog>
  );
}


