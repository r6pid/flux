/*
  Warnings:

  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropIndex
DROP INDEX "Link_userId_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
