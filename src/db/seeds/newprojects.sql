UPDATE "projects"
SET publication_date = NOW()
WHERE id = $1; // parametre dynamique qui change