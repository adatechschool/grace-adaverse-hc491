import * as z from "zod";

export const Form = z.object({
    title: z.string("Titre du projet manquant").trim().min(3, {error : "Trop court !"}),
    gitHubLink: z.url("URL github invalide").includes("https://github.com/", {error : "Ce n'est pas une adresse GitHub"}),
    demoLink: z
      .url({error : "Ce n'est pas une URL"})
      .optional()
      .or(z.literal("").transform(() => undefined)),
    programmeId: z.coerce.number({error : "Le projet n'est pas correct"}),
    promotionId: z.coerce.number({error : "La promotion n'est pas correcte"}),
  });