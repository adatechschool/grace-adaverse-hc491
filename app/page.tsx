
import HomePageClient from "./components/user/HomePageClient";
import { db } from "@/src";
import { programmesTable, projectsTable, promotionsTable, user } from "@/src/db/schema";
import { eq, desc, isNotNull } from "drizzle-orm";
import { auth } from "@/auth";
import { headers } from "next/headers";
import HomePageAnonyme from "./components/anonyme/HomePageAnonyme";
import { redirect } from "next/navigation";

export default async function Home() {
  const programmes = await db.select().from(programmesTable);
  const promotions = await db.select().from(promotionsTable);
  const projects = await db
    .select()
    .from(projectsTable)
    .where(isNotNull(projectsTable.publicationDate))
    .orderBy(desc(projectsTable.publicationDate));

  const session = await auth.api.getSession({headers: await headers()});
  const userSession = session?.session.userId as string;
  const banStatus = await db.select().from(user).where(eq(user.id, userSession));
  if (banStatus[0]?.banned) redirect("/banned");

 
  if(!session?.user) {
    return (
      <HomePageAnonyme
        programmes={programmes}
        promotions={promotions}
        projects={projects}
      />
    )
  } 

   return (
      <HomePageClient
        programmes={programmes}
        promotions={promotions}
        projects={projects}
      />
  );

}
