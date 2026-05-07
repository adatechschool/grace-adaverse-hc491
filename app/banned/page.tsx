    import { auth } from "@/auth";
    import { headers } from "next/headers";
    import { db } from "@/src";
    import { user } from "@/src/db/schema";
    import { eq } from "drizzle-orm";
    import { redirect } from "next/navigation";
    
  const session = await auth.api.getSession({headers: await headers()});
  const userSession = session?.session.userId as string;
  const banStatus = await db.select().from(user).where(eq(user.id, userSession));

export default function banned() {
    if (!session?.user || !banStatus[0].banned) redirect("/");
    return (
        <h1>Vous avez été banni ! Bravo champion !</h1>
    )
}