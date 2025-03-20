"use client";

import { useState } from "react";
import { Check, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markGuideAsFinished } from "@/app/actions";
import { cn } from "@/lib/utils";

interface GuideCompletionProps {
  guideId: string;
  userId: string;
  isCompleted?: boolean;
}

export function GuideCompletion({
  guideId,
  userId,
  isCompleted = false,
}: GuideCompletionProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleMarkAsFinished = async () => {
    if (completed || isLoading) return;

    setIsLoading(true);

    try {
      const result = await markGuideAsFinished(guideId, userId);

      if (result.success) {
        setCompleted(true);
        setShowAnimation(true);

        // Hide animation after 4 seconds
        setTimeout(() => {
          setShowAnimation(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error marking guide as finished:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 relative">
      {/* Celebration animation */}
      {showAnimation && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-ping opacity-75 h-full w-full rounded-full bg-primary/20"></div>
          </div>

          {/* Multiple celebration icons with different animations */}
          <div className="absolute top-0 left-1/4 animate-float-left">
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="absolute top-0 right-1/4 animate-float-right">
            <Trophy className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="absolute top-10 left-1/3 animate-float-up-slow">
            <Check className="h-7 w-7 text-green-500 bg-white rounded-full p-1" />
          </div>
          <div className="absolute top-5 right-1/3 animate-float-up-fast">
            <span className="text-2xl">🎉</span>
          </div>
          <div className="absolute top-0 left-2/3 animate-float-diagonal">
            <span className="text-2xl">🏆</span>
          </div>
          <div className="absolute top-10 right-2/3 animate-float-zigzag">
            <span className="text-2xl">⭐</span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "border rounded-lg p-6 text-center transition-all duration-300",
          completed
            ? "bg-primary/10 border-primary"
            : "bg-background border-muted hover:border-primary/50"
        )}
      >
        <h3 className="text-xl font-semibold mb-3">
          {completed ? "Guide Completed! 🎉" : "Ready to complete this guide?"}
        </h3>

        <p className="text-muted-foreground mb-6">
          {completed
            ? "Great job! You've marked this guide as complete."
            : "Mark this guide as finished when you've completed all the steps."}
        </p>

        <Button
          onClick={handleMarkAsFinished}
          disabled={completed || isLoading}
          size="lg"
          className={cn(
            "transition-all duration-300",
            completed ? "bg-green-600 hover:bg-green-700" : ""
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : completed ? (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Completed
            </span>
          ) : (
            "Mark as Finished"
          )}
        </Button>
      </div>
    </div>
  );
}
