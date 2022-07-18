/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pups" (
    "pup_id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "pup_image" VARCHAR NOT NULL,
    "breed" VARCHAR(50) NOT NULL,
    "sex" BOOLEAN NOT NULL,
    "pup_status" BOOLEAN NOT NULL,
    "age" VARCHAR(20) NOT NULL,
    "price" DECIMAL NOT NULL,
    "numreviews" DECIMAL,
    "createdat" TIMESTAMP(6),

    CONSTRAINT "Pups_pkey" PRIMARY KEY ("pup_id")
);

-- AddForeignKey
ALTER TABLE "Pups" ADD CONSTRAINT "Pups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
