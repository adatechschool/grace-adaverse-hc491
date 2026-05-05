"use server";
import { db } from "@/src";
import { programmesTable, projectsTable, promotionsTable } from "../schema";
import * as z from "zod";
import { eq } from "drizzle-orm";
import { Project } from "../types";
import { Form } from "./zod-schema";

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

  const adresseLink = (promoNameClear + "-" + projetNameClear + "-" + title).toLowerCase();

  
  const dataToValidate = Object.fromEntries(formData.entries());
  const result = Form.safeParse(dataToValidate);

  const session = await auth.api.getSession({headers: await headers()});
  const userIdSession = session?.session.userId as string;

  if (result.success) {
    const {
      title,
      gitHubLink,
      demoLink,
      programmeId,
      promotionId,
      adresseweb,
      userId
    } = { ...result.data, adresseweb: adresseLink, userId: userIdSession };

    await db
      .insert(projectsTable)
      .values({
        title,
        gitHubLink,
        demoLink,
        programmeId,
        promotionId,
        adresseweb,
        userId
      });
    console.log("infos envoyées");
  }

  if (!result.success) {
    const error = z.flattenError(result.error);
    console.log(error);
  }
}

import { auth } from "@/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import { refresh } from "next/cache";

export const signup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name && !email && !password) {
        throw Error("Name, email and password are required");
    }
    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signup?error=true");
    }

    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email && !password) {
        throw Error("email and password are required");
    }
    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signin?error=true");
    }

    if (response.ok) {
      console.log("C'est bon on est connecté")
    }
    redirect("/"); // on redirige vers la home page une fois connecté
};

export const signout = async () => {
  await auth.api.signOut({headers: await headers()}); // attention à bien passer les headers !
};

export async function publier(project : Project) {
  await db.update(projectsTable).set({publicationDate : new Date}).where(eq(projectsTable.id, project.id));
  refresh();
    }