'use client'

import { publier } from "@/src/db/lib/adminActions"

export interface ProjectProp {
    id: number,
    username: string,
    title: string,
    thumbnail: string | null,
    gitHubLink: string,
    demoLink: string | null,
    promotionName: string,
    programmeName: string,
}

type ProjectPubProp = {
  project : ProjectProp
}

export default function BouttonPublier({ project }: ProjectPubProp) {
  return (
    <button
      onClick={() => publier(project)}
      className="text-xs font-mono text-white bg-blue-400 border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-150"
    >
      Publier ↗
    </button>
  );
}