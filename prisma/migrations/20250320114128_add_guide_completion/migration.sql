-- CreateEnum
CREATE TYPE "GuideCompletionType" AS ENUM ('LOCKED', 'AVAILABLE', 'COMPLETED');

-- CreateTable
CREATE TABLE "GuideCompletion" (
    "id" TEXT NOT NULL,
    "state" "GuideCompletionType" NOT NULL,
    "guideId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GuideCompletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuideCompletion" ADD CONSTRAINT "GuideCompletion_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideCompletion" ADD CONSTRAINT "GuideCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
