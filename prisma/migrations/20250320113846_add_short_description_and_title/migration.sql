/*
  Warnings:

  - Added the required column `shortDescription` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortTitle` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "shortTitle" TEXT NOT NULL;
