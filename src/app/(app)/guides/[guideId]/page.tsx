import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrCreateAnonymousUser } from "@/app/actions";
import { prisma } from "@/lib/client";
import { GuideCompletion } from "@/app/components/GuideCompletion";
import { GuideCompletionType } from "@prisma/client";
// import { useRouter } from "next/router";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ guideId: string }>;
}) {
  const user = await getOrCreateAnonymousUser();
  const { guideId } = await params;
  const guide = await prisma.guide.findUnique({
    where: {
      id: guideId,
    },
  });

  if (!guide) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Guide not found
        </p>
      </div>
    );
  }

  // Check if the user has already completed this guide
  const completion = await prisma.guideCompletion.findFirst({
    where: {
      guideId,
      userId: user.id,
    },
  });

  const isCompleted = completion?.state === GuideCompletionType.COMPLETED;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero section with image and title */}
      <div className="relative w-full h-[40vh] min-h-[250px]">
        <Image
          src={guide.imageUrl || "/placeholder.svg"}
          alt="Guide hero image"
          fill
          priority
          className="object-cover brightness-[0.5]"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h1 className="text-3xl font-bold text-center text-white drop-shadow-md">
            {guide.title}
          </h1>
        </div>
      </div>

      {/* Guide content */}
      <div className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
        <Card className="p-5 shadow-md">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{guide.text}</ReactMarkdown>
          </div>

          <Separator className="my-8" />

          {/* AI Recommendation section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-primary">
                AI Recommendations
              </h2>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert bg-primary/5 p-4 rounded-lg">
              <ReactMarkdown>{guide.aiRecommendation}</ReactMarkdown>
            </div>
          </div>

          {/* Guide Completion Section */}
          <GuideCompletion
            guideId={guideId}
            userId={user.id}
            isCompleted={isCompleted}
          />
        </Card>
      </div>
    </div>
  );
}
