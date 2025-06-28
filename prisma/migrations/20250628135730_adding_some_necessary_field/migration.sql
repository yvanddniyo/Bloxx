/*
  Warnings:

  - Added the required column `image` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('TUTORIAL', 'TECH_NEWS', 'FINANCE');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "categories" "Categories"[],
ADD COLUMN     "image" TEXT NOT NULL;
