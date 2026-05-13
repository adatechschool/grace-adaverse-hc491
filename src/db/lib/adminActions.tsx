"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
import { db } from "@/src";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { ProjectProp } from "@/app/components/module/buttonPublier";
import { projectsTable } from "@/src/db/schema";
import { refresh } from "next/cache";

export async function isAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userSession = session?.session.userId as string;
  const adminStatus = await db
    .select()
    .from(user)
    .where(eq(user.id, userSession));

  if (!session?.user || !adminStatus[0].admin) {
    return false;
  } else {
    return true;
  }
}

export async function publier(project: ProjectProp) {
  await db
    .update(projectsTable)
    .set({ publicationDate: new Date() })
    .where(eq(projectsTable.id, project.id));
  refresh();
}

export async function atomiser(id: number) {
  await db.delete(projectsTable).where(eq(projectsTable.id, id));
  refresh();
}

export async function bannir(id: string) {
  await db.update(user).set({ banned: true }).where(eq(user.id, id));
  refresh();
}

export async function debannir(id: string) {
  await db.update(user).set({ banned: false }).where(eq(user.id, id));
  refresh();
}

export async function modifier(formData: FormData) {
  const id = Number(formData.get("id"));
  if (formData.get("demoLink")) {
    await db
      .update(projectsTable)
      .set({
        title: formData.get("title") as string,
        gitHubLink: formData.get("gitHubLink") as string,
        demoLink: formData.get("demoLink") as string,
      })
      .where(eq(projectsTable.id, id));
  } else {
    await db
      .update(projectsTable)
      .set({
        title: formData.get("title") as string,
        gitHubLink: formData.get("gitHubLink") as string,
      })
      .where(eq(projectsTable.id, id));
  }
}
