/*
  Warnings:

  - Added the required column `updatedAt` to the `Bio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bio" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "background" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "rareUsername" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "bio" DROP NOT NULL;
