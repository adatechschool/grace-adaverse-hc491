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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Fenêtre */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-blue-400 px-6 py-5">
            <p className="text-blue-900 text-xs font-mono tracking-widest uppercase mb-1">
              Nouvelle soumission
            </p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Proposer un projet
            </h2>
          </div>

          {/* Formulaire */}
          <div className="p-6">
            <Formulaire
              closeModal={onClose}
              onSubmit={onSubmit}
              programmes={programme}
              promotions={promotion}
            />
          </div>

        </div>
      </div>
    </div>
  );
}