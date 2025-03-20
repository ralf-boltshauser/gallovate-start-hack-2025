import { getOrCreateAnonymousUser } from "@/app/actions";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/lib/client";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default async function GuidesPage() {
  const user = await getOrCreateAnonymousUser();

  const guides = await prisma.guide.findMany({
    orderBy: { order: "asc" },
  });

  const guideCompletions = await prisma.guideCompletion.findMany({
    where: { userId: user.id },
  });

  const getGuideState = (guideId: string) => {
    const completion = guideCompletions.find((gc) => gc.guideId === guideId);
    return completion ? completion.state : "LOCKED";
  };

  const completedGuidesCount = guideCompletions.filter(
    (gc) => gc.state === "COMPLETED"
  ).length;
  const totalGuidesCount = guides.length;
  const completionPercentage = (completedGuidesCount / totalGuidesCount) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] text-slate-800">
      <main className="flex-1 overflow-auto pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>Guides</span>
              <span className="font-medium">
                {completedGuidesCount}/{totalGuidesCount} complete
              </span>
            </div>
            <Progress
              value={completionPercentage}
              className="h-2.5 bg-gray-200"
            />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#e5e5e5] -translate-x-1/2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center gap-4">
              {guides.map((guide, index) => {
                const state = getGuideState(guide.id);
                const isLocked = state === "LOCKED";
                const isAvailable = state === "AVAILABLE";
                const isCompleted = state === "COMPLETED";

                const guideButton = (
                  <button
                    className={`w-full bg-white border-2 ${
                      isLocked
                        ? "border-[#e5e5e5] opacity-80"
                        : "border-[#58CC02]"
                    } rounded-xl p-4 flex items-center gap-3 shadow-sm ${
                      isAvailable ? "hover:shadow-md" : ""
                    } transition-shadow`}
                    disabled={isLocked}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isLocked
                          ? "bg-[#e5e5e5] text-gray-400"
                          : isCompleted
                          ? "bg-[#58CC02] text-white"
                          : "bg-[#fff4d4] text-[#ffb020]"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isAvailable ? (
                        <span className="font-bold text-lg">{index + 1}</span>
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold">{guide.title}</h3>
                      <p className="text-sm text-gray-500">
                        {guide.shortDescription}
                      </p>
                    </div>
                  </button>
                );

                return (
                  <div key={guide.id} className="w-full relative">
                    {isLocked ? (
                      guideButton
                    ) : (
                      <Link href={`/guides/${guide.id}`}>{guideButton}</Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {completionPercentage === 100 && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-bold">Congratulations!</h2>
              <p className="text-sm text-gray-500">
                More guides coming to help you embrace innovation. 🚀
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
