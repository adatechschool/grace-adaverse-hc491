"use server";
import { db } from "@/src";
import { projectsTable } from "../schema";

export async function addProject(formData: FormData) {
  const demo = formData.get("demo")?.toString();

    const promoIdNum = Number(formData.get("promoId"));
    const projetIdNum = Number(formData.get("progId"));
    const title = formData.get("title")?.toString() as string;
    const github = formData.get("github")?.toString() as string;

    const project = {
      title: title,
      gitHubLink: github,
      demoLink:demo,
      programmeId: projetIdNum,
      promotionId: promoIdNum,
    };
    await db.insert(projectsTable).values(project);
 }
