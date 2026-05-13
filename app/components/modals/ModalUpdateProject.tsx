"use client";
import { modifier } from "@/src/db/lib/adminActions";
import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  id: number;
  title: string;
  gitHubLink: string;
  demoLink?: string;
}

export default function ModalUpdateProject({
  onClose,
  id,
  title,
  gitHubLink,
  demoLink,
}: ModalProps) {
  const inputClass =
    "w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg outline-none " +
    "placeholder:text-slate-400 " +
    "focus:border-blue-400 focus:ring-2 focus:ring-blue-100 " +
    "transition-all duration-150";

  const labelClass =
    "block text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5";

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
              Modifier
            </p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Mettre à jour le projet
            </h2>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <form
              action={async (formData: FormData) => {
                await modifier(formData);
                onClose();
              }}
              className="space-y-4"
            >
              {/* ID caché */}
              <input type="hidden" name="id" value={id} />

              {/* Titre */}
              <div>
                <label className={labelClass}>Titre du projet</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={title}
                  className={inputClass}
                  placeholder="Titre du projet"
                  required
                />
              </div>

              {/* GitHub */}
              <div>
                <label className={labelClass}>Lien GitHub</label>
                <input
                  type="url"
                  name="gitHubLink"
                  defaultValue={gitHubLink}
                  className={inputClass}
                  placeholder="https://github.com/…"
                  required
                />
              </div>

              {/* Démo */}
              <div>
                <label className={labelClass}>
                  Démo{" "}
                  <span className="normal-case text-slate-400 tracking-normal">
                    (optionnel)
                  </span>
                </label>
                <input
                  type="url"
                  name="demoLink"
                  defaultValue={demoLink ?? ""}
                  className={inputClass}
                  placeholder="https://…"
                />
              </div>

              {/* Séparateur */}
              <div className="h-px bg-slate-100" />

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
