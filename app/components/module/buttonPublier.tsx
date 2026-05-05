'use client'
import { Project } from "@/src/db/types"
import { publier } from "@/src/db/lib/actions"

interface ProjectProp {
    project : Project;
}

export default function BouttonPublier({project} : ProjectProp) {
    return (
        <button onClick={() => publier(project)}>Publier</button>
    )
}