/*
  Warnings:

  - Changed the type of `specie` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetSpecie" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "specie",
ADD COLUMN     "specie" "PetSpecie" NOT NULL;
