import * as z from "zod";

export const Form = z.object({
    title: z.string("Titre du projet manquant").trim().min(3, {error : "Trop court !"}),
    gitHubLink: z.url("URL github invalide").includes("github"),
    demoLink: z
      .url()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    programmeId: z.coerce.number("Sélectionner un projet"),
    promotionId: z.coerce.number("Sélectionner une promotion"),
  });