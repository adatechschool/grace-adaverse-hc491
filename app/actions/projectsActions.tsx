"use server";

import { db } from "@/src";
import { programmesTable, promotionsTable } from "@/src/db/schema";
import type { Programme, Promotion } from "@/src/db/types";

export async function getProgrammesPromotions(): Promise<{
    programmes: Programme[];
    promotions: Promotion[];
}> {
    try {
        const programmes = await db.select().from(programmesTable);
        const promotions = await db.select().from(promotionsTable);

        return { programmes, promotions } as { programmes: Programme[]; promotions: Promotion[] };
    } catch (error) {
        console.error("Erreur", error);
        // retourner un fallback vide pour éviter undefined côté client
        return { programmes: [], promotions: [] };
    }
}
