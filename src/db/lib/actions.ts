"use server";
import { db } from "@/src";
import { projectsTable } from "../schema";
import * as z from "zod";

export async function addProject(formData: FormData) {
  const demo = formData.get("demo")?.toString();

  const promoIdNum = Number(formData.get("promoId"));
  const projetIdNum = Number(formData.get("progId"));
  const title = formData.get("title")?.toString() as string;
  const github = formData.get("github")?.toString() as string;

  const project = {
    title: title,
    gitHubLink: github,
    demoLink: demo,
    programmeId: projetIdNum,
    promotionId: promoIdNum,
  };
//   await db.insert(projectsTable).values(project);

  const Form = z.object({
    title: z.string("Titre du projet requis").min(1),
    gitHubLink: z.url("URL github invalide"),
    demoLink: z.httpUrl().optional(),
    programmeId: z.coerce.number("Sélectionner un projet"),
    promotionId: z.coerce.number("Sélectionner une promotion"),
  });
  const dataToValidate = Object.fromEntries(formData.entries());
  const result = Form.safeParse(dataToValidate);
  console.log(dataToValidate);
  
  if (!result.success) {
    result.error;
    console.log(result.error);
    
  }
  if (result.success) {
    await db.insert(projectsTable).values(result.data);
    console.log("infos envoyées");
    
  }
  
 }
