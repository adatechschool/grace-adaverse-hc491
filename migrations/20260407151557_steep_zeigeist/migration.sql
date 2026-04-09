CREATE TABLE "programmes" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"thumbnail" text,
	"gitHub_link" text NOT NULL,
	"demo_link" text NOT NULL,
	"creation_date" timestamp DEFAULT now() NOT NULL,
	"publication_date" timestamp DEFAULT now() NOT NULL,
	"programme_id" integer,
	"promotion_id" integer
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_programme_id_programmes_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "programmes"("id");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_promotion_id_promotions_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id");