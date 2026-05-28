/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Box` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Box_number_key" ON "Box"("number");
