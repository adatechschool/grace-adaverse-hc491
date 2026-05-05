import { auth } from "@/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/src";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";


export default async function Admin() {

    const session = await auth.api.getSession({headers: await headers()});
    const userSession = session?.session.userId as string;
    
    const adminStatus = await db.select().from(user).where(eq(user.id, userSession))

    if (!session?.user || !adminStatus[0].admin) {
        redirect("/")
    }

}