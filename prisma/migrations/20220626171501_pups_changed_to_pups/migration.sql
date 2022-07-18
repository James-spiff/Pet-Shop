/*
  Warnings:

  - You are about to drop the `Pups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pups" DROP CONSTRAINT "Pups_userId_fkey";

-- DropTable
DROP TABLE "Pups";

-- CreateTable
CREATE TABLE "pups" (
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

    CONSTRAINT "pups_pkey" PRIMARY KEY ("pup_id")
);

-- AddForeignKey
ALTER TABLE "pups" ADD CONSTRAINT "pups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
