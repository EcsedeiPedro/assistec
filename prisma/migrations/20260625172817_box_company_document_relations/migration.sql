/*
  Warnings:

  - You are about to drop the column `companyId` on the `Box` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Box" DROP CONSTRAINT "Box_companyId_fkey";

-- DropIndex
DROP INDEX "Box_companyId_number_key";

-- AlterTable
ALTER TABLE "Box" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_BoxToCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BoxToCompany_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BoxToCompany_B_index" ON "_BoxToCompany"("B");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToCompany" ADD CONSTRAINT "_BoxToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToCompany" ADD CONSTRAINT "_BoxToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
