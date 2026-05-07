"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import { db } from "@/src";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function isAdmin() {
      const session = await auth.api.getSession({ headers: await headers() });
      const userSession = session?.session.userId as string;
      const adminStatus = await db.select().from(user).where(eq(user.id, userSession));
    
      if (!session?.user || !adminStatus[0].admin) {
        return false
      } else {
        return true
      }
      
}