/*
  Warnings:

  - You are about to drop the column `dateFrom` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `dateTo` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN "date" TEXT;

UPDATE "Document"
SET "date" = CASE
  WHEN "dateFrom" IS NOT NULL AND "dateTo" IS NOT NULL THEN to_char("dateFrom", 'YYYY-MM-DD') || ' a ' || to_char("dateTo", 'YYYY-MM-DD')
  WHEN "dateFrom" IS NOT NULL THEN to_char("dateFrom", 'YYYY-MM-DD')
  WHEN "dateTo" IS NOT NULL THEN to_char("dateTo", 'YYYY-MM-DD')
  WHEN "year" IS NOT NULL THEN "year"::text
  ELSE NULL
END;

ALTER TABLE "Document" DROP COLUMN "dateFrom",
  DROP COLUMN "dateTo",
  DROP COLUMN "year";
