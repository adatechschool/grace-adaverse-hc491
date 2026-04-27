import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/_relations";

export const programmesTable = pgTable("programmes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const promotionsTable = pgTable("promotions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail"),
  adresseweb: varchar("adresse_web", { length: 150 }),
  gitHubLink: text("github_link").notNull(),
  demoLink: text("demo_link"),
  creationDate: timestamp("creation_date").defaultNow(),
  publicationDate: timestamp("publication_date").defaultNow(),
  promotionId: integer("promotion_id")
    .references(() => promotionsTable.id)
    .notNull(),
  programmeId: integer("programme_id")
    .references(() => programmesTable.id)
    .notNull(),
});

//Relations one to one (du point de vue de projetEtudiant)
export const projetEtudiantToAdaRelations = relations(
  projectsTable,
  ({ one }) => ({
    // relation 1 projetEtudiant a 1 promoAda
    promo: one(promotionsTable, {
      fields: [projectsTable.promotionId],
      references: [promotionsTable.id],
    }),
    // relation 1 projetEtudiant a 1 projetAda
    projet: one(programmesTable, {
      fields: [projectsTable.programmeId],
      references: [programmesTable.id],
    }),
  }),
);

//Relations many to one
// relation 1 projetAda a many projetEtudiant
export const projetAdaRelations = relations(programmesTable, ({ many }) => ({
  projetsEtudiants: many(projectsTable),
}));
// relation 1 promoAda a many projetEtudiant
export const promoAdaRelations = relations(promotionsTable, ({ many }) => ({
  projetsEtudiants: many(projectsTable),
}));
