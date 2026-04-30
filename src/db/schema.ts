import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
