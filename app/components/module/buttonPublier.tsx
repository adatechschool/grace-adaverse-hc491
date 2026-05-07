'use client'

import { publier } from "@/src/db/lib/adminActions"

export interface ProjectProp {
  id: number;
  username: string;
  userId: string;
  title: string;
  thumbnail: string | null;
  gitHubLink: string;
  demoLink: string | null;
  promotionName: string;
  programmeName: string;
}

type ProjectPubProp = {
  project: ProjectProp;
};

export default function BouttonPublier({ project }: ProjectPubProp) {
  return (
    <button
      onClick={() => publier(project)}
      className="flex items-center gap-1.5 text-xs font-mono text-white bg-blue-400 border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-150"
    >
      Publier
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </button>
  );
}