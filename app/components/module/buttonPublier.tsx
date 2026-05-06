'use client'

import { Project } from "@/src/db/types"
import { publier } from "@/src/db/lib/actions"

interface ProjectProp {
  project: Project;
}

export default function BouttonPublier({ project }: ProjectProp) {
  return (
    <button
      onClick={() => publier(project)}
      className="text-xs font-mono text-white bg-blue-400 border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-150"
    >
      Publier ↗
    </button>
  );
}