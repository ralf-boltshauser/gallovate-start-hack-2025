"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CallDialog from "@/features/onboarding/call-dialog";
import BiggestChallengeQuestion from "@/features/onboarding/questions/biggest-challenge-question";
import CompagnyQuestion from "@/features/onboarding/questions/company-question";
import CompletionChoiceClueless from "@/features/onboarding/questions/completion-choice-clueless";
import CompletionChoiceHesitant from "@/features/onboarding/questions/completion-choice-hesitant";
import DecisionMakingQuestion from "@/features/onboarding/questions/decision-making-question";
import InnovationBarrierQuestion from "@/features/onboarding/questions/innovation-barrier-question";
import InnovationOpinionQuestion from "@/features/onboarding/questions/innovation-opinion-question";
import InnovationSupportQuestion from "@/features/onboarding/questions/innovation-support-question";
import InnovationTopicsQuestion from "@/features/onboarding/questions/innovation-topics-question";
import MainChallengeQuestion from "@/features/onboarding/questions/main-challenge-question";
import TechnologyApproachQuestion from "@/features/onboarding/questions/technology-approach-question";
import { useUser } from "@/lib/context/user-context";
import { User, UserType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { onboardUser } from "../actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questionFlow: Record<string, any> = {
  BiggestChallenge: {
    component: BiggestChallengeQuestion,
    next: (user: User, answer: string) => {
      if (answer === "STABILITY") return "TechnologyApproachQuestion";
      if (answer === "BEING_AHEAD") return "InnovationOpinionQuestion";
      return null;
    },
  },
  TechnologyApproachQuestion: {
    component: TechnologyApproachQuestion,
    next: () => "CompagnyQuestion",
  },
  InnovationOpinionQuestion: {
    component: InnovationOpinionQuestion,
    next: () => "CompagnyQuestion",
  },
  CompagnyQuestion: {
    component: CompagnyQuestion,
    next: (user: User) => {
      if (user.type === UserType.CLUELESS) return "CompletionChoiceClueless";
      return "MainChallengeQuestion";
    },
  },
  CompletionChoiceClueless: {
    component: CompletionChoiceClueless,
    next: (user: User, answer: string) => {
      if (answer === "true") return "MainChallengeQuestion";
      return "completed";
    },
  },
  MainChallengeQuestion: {
    component: MainChallengeQuestion,
    next: () => "DecisionMakingQuestion",
  },
  DecisionMakingQuestion: {
    component: DecisionMakingQuestion,
    next: () => "InnovationTopicsQuestion",
  },
  InnovationTopicsQuestion: {
    component: InnovationTopicsQuestion,
    next: () => "CompletionChoiceHesitant",
  },
  CompletionChoiceHesitant: {
    component: CompletionChoiceHesitant,
    next: (user: User, answer: string) => {
      if (answer === "true") return "InnovationBarrierQuestion";
      return "completed";
    },
  },
  InnovationBarrierQuestion: {
    component: InnovationBarrierQuestion,
    next: () => "InnovationSupportQuestion",
  },
  InnovationSupportQuestion: {
    component: InnovationSupportQuestion,
    next: () => "completed",
  },
};

export function InteractiveForm() {
  const { user, refetch } = useUser(); // Access user data including previous answers
  const [currentQuestionKey, setCurrentQuestionKey] = useQueryState(
    "questionKey",
    { defaultValue: "BiggestChallenge" }
  );

  // Start with the first question if not set
  const currentQuestion =
    questionFlow[currentQuestionKey ?? "BiggestChallenge"];

  const handleComplete = (answer: string) => {
    refetch(); // Update user data
    const nextQuestionKey = currentQuestion.next(user, answer);
    setCurrentQuestionKey(nextQuestionKey ?? "completed"); // Set next question or mark as completed
  };

  const handleOnboarded = async () => {
    await onboardUser();
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="fixed top-4 left-4">
        <CallDialog />
      </div>
      <div className="max-w-xl w-full space-y-8 animate-fade-in">
        {/* Avatar and greeting */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20 animate-bounce-slow">
            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Hey there! 👋
            </h2>
            <p className="text-muted-foreground">
              Let&apos;s get to know you better
            </p>
          </div>
        </div>

        {/* Current question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionKey}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            {currentQuestion?.component && (
              <currentQuestion.component onCompleted={handleComplete} />
            )}
          </motion.div>
        </AnimatePresence>

        <Button onClick={handleOnboarded}>Onboard</Button>
      </div>
    </main>
  );
}
