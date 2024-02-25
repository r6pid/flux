/*
  Warnings:

  - The primary key for the `Bio` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Bio" DROP CONSTRAINT "Bio_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bio_pkey" PRIMARY KEY ("id");
