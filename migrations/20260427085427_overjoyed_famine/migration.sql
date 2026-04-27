ALTER TABLE "projects" ALTER COLUMN "creation_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "publication_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "programme_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "promotion_id" SET NOT NULL;