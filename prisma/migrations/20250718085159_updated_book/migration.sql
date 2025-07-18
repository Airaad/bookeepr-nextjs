/*
  Warnings:

  - You are about to drop the column `isbn` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookKey` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "isbn",
ADD COLUMN     "bookKey" TEXT NOT NULL,
ADD COLUMN     "coverId" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
