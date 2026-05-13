"use client";
import { useState } from "react";
import ModalUpdateProject from "@/app/components/modals/ModalUpdateProject";

interface BoutonModifierProps {
  id: number;
  title: string;
  gitHubLink: string;
  demoLink?: string;
}

export default function BoutonModifier({
  id,
  title,
  gitHubLink,
  demoLink,
}: BoutonModifierProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500
                   border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                   px-3 py-1.5 rounded-lg transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
        Modifier
      </button>

      {isOpen && (
        <ModalUpdateProject
          onClose={() => setIsOpen(false)}
          id={id}
          title={title}
          gitHubLink={gitHubLink}
          demoLink={demoLink}
        />
      )}
    </>
  );
}
