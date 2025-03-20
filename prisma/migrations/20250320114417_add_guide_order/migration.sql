/*
  Warnings:

  - Added the required column `order` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "order" INTEGER NOT NULL;
