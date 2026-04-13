import { NextResponse } from "next/server";
import { projectsTable } from "@/src/db/schema";
import { db } from "@/src";
import { integer } from "drizzle-orm/pg-core";

export async function POST(request: Request) {
  try {
    const { title, gitHubLink, demoLink, programmeId, promotionId } =
      await request.json();

    if (!title || !gitHubLink || !demoLink || !programmeId || !promotionId) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires !" },
        { status: 400 },
      );
    }

    const result = await db
      .insert(projectsTable)
      .values({
        title,
        gitHubLink,
        demoLink,
        programmeId,
        creationDate: new Date(),
        publicationDate: new Date(),
      })
      .returning();

    if (!result || result.length === 0) {
      return NextResponse.json(
        { message: " Erreur lors de la création du projet" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Projet crée avec succès",
      project: result[0],
    });
  } catch (error) {
    console.error("Erreur lors de la création du projet:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du projet" },
      { status: 500 },
    );
  }
}
