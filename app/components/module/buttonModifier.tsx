"use client";

import { modifier } from "@/src/db/lib/adminActions";
import { ProjectProp } from "./buttonPublier";
import { useState } from "react";

type modifProp = {
  title: string;
  gitHubLink: string;
  demoLink?: string;
  id: number;
};

export default function BoutonModifier({
  title,
  gitHubLink,
  demoLink,
  id,
}: modifProp) {
  const [newTitle, setNewTitle] = useState(title);
  const [newGH, setNewGH] = useState(gitHubLink);
  const [newDL, setNewDL] = useState(demoLink);

  return (
    <div>
      <form action={modifier}>
        <input
          type="text"
          name="title"
          /* value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} */
          placeholder={title}
        />
        <input
          type="url"
          name="gitHubLink"
          /* value={newGH}
          onChange={(e) => setNewGH(e.target.value)} */
          placeholder={gitHubLink}
        />
        <input
          type="url"
          name="demoLink"
          /* value={newDL}
          onChange={(e) => setNewDL(e.target.value)} */
          placeholder={demoLink}
        />
        <input type="text" hidden placeholder={id.toString()} name="id" />
      </form>
    </div>
  );
}
