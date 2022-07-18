/*
  Warnings:

  - You are about to drop the column `userId` on the `pups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pups" DROP CONSTRAINT "pups_userId_fkey";

-- AlterTable
ALTER TABLE "pups" DROP COLUMN "userId";
