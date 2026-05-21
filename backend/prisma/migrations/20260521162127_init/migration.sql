-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CITY', 'COMMUNITY_EVENTS', 'CRIME_AND_SAFETY', 'CULTURE', 'DISCOUNTS_AND_BENEFITS', 'EMERGENCIES', 'FOR_SENIORS', 'HEALTH', 'KIDS_AND_FAMILY');

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "categories" "Category"[],
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
