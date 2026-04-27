import * as dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";



const db = drizzle (process.env.DATABASE_URL!);//instance de Drizzle pour interagir avec la base de données

async function seed() {
  try {
    console.log("🌱 Exécution des seeds SQL...\n");

    const seedFiles = [
      "promotions.sql",
      "programmes.sql",
      "projects.sql",
    ]; //Liste des fichiers SQL à exécuter dans l'ordre

    for (const file of seedFiles) {
      const filePath = path.join(__dirname, "seeds", file);//Construit chemin absolu vers le fichier SQL
      const sqlContent = fs.readFileSync(filePath, "utf-8");//Lit le contenu du fichier SQL

      console.log(`📄 Exécution de ${file}...`);
      await db.execute(sql.raw(sqlContent));// Exécute le contenu SQL dans la base de données
      console.log(`✅ ${file} terminé\n`);
    }

    console.log("🎉 Seeding terminé !");
  } catch (error) {
    console.error("❌ Erreur:", error);
    throw error; // 👈 laisse Node gérer proprement
  }
}


seed();