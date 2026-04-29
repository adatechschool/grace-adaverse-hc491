
import HomePageClient from "./components/HomePageClient";
import { db } from "@/src";
import { programmesTable, projectsTable, promotionsTable } from "@/src/db/schema";
import { desc, isNotNull } from "drizzle-orm";

export default async function Home() {
  const programmes = await db.select().from(programmesTable);
  const promotions = await db.select().from(promotionsTable);
  const projects = await db
    .select()
    .from(projectsTable)
    .where(isNotNull(projectsTable.publicationDate))
    .orderBy(desc(projectsTable.publicationDate));

  return (
    <HomePageClient
      programmes={programmes}
      promotions={promotions}
      projects={projects}
    />
  );
}
