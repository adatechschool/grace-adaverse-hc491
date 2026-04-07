import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm"

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
  gitHubLink: text("gitHub_link").notNull(),
  demoLink: text("demo_link").notNull(),
  creationDate: timestamp("creation_date").defaultNow().notNull(),
  publicationDate: timestamp("publication_date").defaultNow().notNull(),
  programmeId: integer("programme_id").references(() => programmesTable.id),
  promotionId: integer("promotion_id").references(() => promotionsTable.id),
});

export const relations = defineRelations(
  { programmesTable, promotionsTable, projectsTable }, (r) => ({
    programmesTable: {
      projects: r.many.projectsTable(),
    },
    promotionsTable: {
      projects: r.many.projectsTable(),
    },
    projectsTable: {
      programme: r.one.programmesTable({
        from: r.projectsTable.programmeId,
        to: r.programmesTable.id,
      }),
      promotion: r.one.promotionsTable({
        from: r.projectsTable.promotionId,
        to: r.promotionsTable.id,
      }),
    },
  }),
);
