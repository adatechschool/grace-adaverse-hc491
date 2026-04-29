"use client";

import { Programme, Promotion } from "@/src/db/types";
import Formulaire from "./Formulaire";

type SubmitData = {
  title: string;
  gitHubLink: string;
  demoLink?: string;
  promoAda: string;
  projetAda: string;
};

type Props = {
  programme: Programme[];
  promotion: Promotion[];
  onClose: () => void;
  onSubmit: (data: SubmitData) => Promise<boolean>;
};

export default function Modal({ programme, promotion, onClose, onSubmit }: Props) {
  return (
    <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Proposer un projet</h2>
        <Formulaire
          closeModal={onClose}
          onSubmit={onSubmit}
          programmes={programme}
          promotions={promotion}
        />
      </div>
    </dialog>
  );
}


