"use client";

import { Programme, Project } from "@/src/db/types";
import { ChangeEvent } from "react";
import { useState, Dispatch, SetStateAction } from "react";

type Props = {
  programmes: Programme[];
  projects: Project[];
  setProjetFiltre: Dispatch<SetStateAction<Project[]>>;
  projetFiltre: Project[];
};

export default function Filter({
  programmes,
  projects,
  setProjetFiltre,
  projetFiltre,
}: Props) {
  const [programmeIdFiltre, setProgrammeIdFiltre] = useState("");


  


  return (
    <div>
      <select onChange={(e) => setProgrammeIdFiltre(e.target.value)}>
        <option>Choisissez un projet</option>
        {programmes.map((programme, index) => {
          return (
            <option key={index} value={programme.id}>
              {programme.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
