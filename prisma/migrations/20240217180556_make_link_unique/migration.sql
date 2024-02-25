/*
  Warnings:

  - A unique constraint covering the columns `[shortened]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_shortened_key" ON "Link"("shortened");
