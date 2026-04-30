"use server";
import { db } from "@/src";
import { programmesTable, projectsTable, promotionsTable } from "../schema";
import * as z from "zod";
import { eq, InferInsertModel } from "drizzle-orm";

export async function addProject(formData: FormData) {
  const promoIdNum = Number(formData.get("promotionId"));
  const promoName = await db
    .select()
    .from(promotionsTable)
    .where(eq(promotionsTable.id, promoIdNum));

  const promoNameClear = (promoName[0].name.split(" "))[0];

  const projetIdNum = Number(formData.get("programmeId"));
  const projetName = await db
    .select()
    .from(programmesTable)
    .where(eq(programmesTable.id, projetIdNum));

  const projetNameClear = (projetName[0].name.split(" "))[0];
  const title = (formData.get("title") as string).trim().split(" ")[0];

  const adresseLink = (
    promoNameClear +
    "-" +
    projetNameClear +
    "-" +
    title
  ).toLowerCase();

  const Form = z.object({
    title: z.string("Titre du projet requis").min(1),
    gitHubLink: z.url("URL github invalide"),
    demoLink: z
      .url()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    programmeId: z.coerce.number("Sélectionner un projet"),
    promotionId: z.coerce.number("Sélectionner une promotion"),
  });
  const dataToValidate = Object.fromEntries(formData.entries());
  const result = Form.safeParse(dataToValidate);
  console.log(dataToValidate);
  console.log(result.data);

  if (result.success) {
    const {
      title,
      gitHubLink,
      demoLink,
      programmeId,
      promotionId,
      adresseweb,
    } = { ...result.data, adresseweb: adresseLink };

    await db
      .insert(projectsTable)
      .values({
        title,
        gitHubLink,
        demoLink,
        programmeId,
        promotionId,
        adresseweb,
      });
    console.log("infos envoyées");
  }

  if (!result.success) {
    const error = z.flattenError(result.error);
    console.log(error);
  }
}
