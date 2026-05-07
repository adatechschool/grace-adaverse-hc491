"use client";

import { useState } from "react";
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

const inputClass =
  "w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none " +
  "placeholder:text-slate-400 " +
  "focus:border-blue-400 focus:ring-2 focus:ring-blue-100 " +
  "transition-all duration-150";

const labelClass =
  "block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5";

export default function Formulaire({
  closeModal,
  programmes,
  promotions,
}: FormulaireProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md p-6">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-0.5">
            Nouveau projet
          </p>
          <h2 className="text-lg font-bold text-slate-800">
            Proposer un projet
          </h2>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="w-7 h-7 flex items-center justify-center rounded-md
                     text-slate-400 hover:text-slate-600 hover:bg-slate-100
                     transition-colors duration-150 text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Erreur globale */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <form
        onSubmit={() => closeModal()}
        action={addProject}
        className="space-y-4"
      >
        {/* Titre */}
        <div>
          <label className={labelClass}>Titre du projet</label>
          <input
            name="title"
            type="text"
            className={inputClass}
            placeholder="Ex : Plateforme collaborative temps réel"
            required
          />
        </div>

        {/* Liens côte à côte */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>GitHub</label>
            <input
              name="gitHubLink"
              type="url"
              className={inputClass}
              placeholder="https://github.com/…"
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Démo{" "}
              <span className="normal-case text-slate-400 tracking-normal">
                (optionnel)
              </span>
            </label>
            <input
              name="demoLink"
              type="url"
              className={inputClass}
              placeholder="https://…"
            />
          </div>
        </div>

        {/* Promotion */}
        <div>
          <label className={labelClass}>Promotion</label>
          <div className="relative">
            <select
              name="promotionId"
              className={inputClass + " appearance-none pr-8"}
              required
            >
              <option value="">Sélectionnez une promotion</option>
              {promotions.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 8"
              className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            >
              <path d="M1 1l5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* Programme */}
        <div>
          <label className={labelClass}>Programme</label>
          <div className="relative">
            <select
              name="programmeId"
              className={inputClass + " appearance-none pr-8"}
              required
            >
              <option value="">Sélectionnez un programme</option>
              {programmes.map((pr) => (
                <option key={pr.id} value={String(pr.id)}>
                  {pr.name}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 8"
              className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            >
              <path d="M1 1l5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-slate-100" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={closeModal}
            className="text-sm font-medium text-slate-500 hover:text-slate-700
                       hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-blue-400 hover:bg-blue-500
                       text-white text-sm font-medium px-4 py-2 rounded-lg
                       transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
