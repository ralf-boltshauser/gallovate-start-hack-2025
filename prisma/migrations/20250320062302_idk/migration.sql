-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('NONE', 'CLUELESS', 'MOTIVATED', 'HESITANT');

-- CreateEnum
CREATE TYPE "Job" AS ENUM ('MANUFACTURING', 'MECHANICAL_ENGINEER', 'CONSTRUCTION', 'ENERGY', 'AEROSPACE', 'PHARMACEUTICAL', 'LOGISTICS', 'SOFTWARE', 'FINTECH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "type" "UserType" NOT NULL DEFAULT 'NONE',
    "job" "Job",
    "numberOfEmployees" INTEGER,
    "biggestChallengeQuestion" TEXT,
    "mainChallengeQuestion" TEXT,
    "decisionMakingQuestion" TEXT,
    "innovationTopicsQuestion" TEXT,
    "innovationBarrierQuestion" TEXT,
    "innovationSupportQuestion" TEXT,
    "technologyApproachQuestion" TEXT,
    "innovationOpinionQuestion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publisher" TEXT NOT NULL,
    "job" "Job" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
