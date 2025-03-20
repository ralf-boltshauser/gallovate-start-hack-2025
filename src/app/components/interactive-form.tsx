"use client";

import { parseAsInteger, useQueryState } from "nuqs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import InnovationKnowledgeQuestion from "@/features/onboarding/questions/innovation-knowledge-question";
import { useUser } from "@/lib/context/user-context";
import { AnimatePresence, motion } from "framer-motion";
import { onboardUser } from "../actions";

export function InteractiveForm() {
  const questions = [InnovationKnowledgeQuestion];
  const { refetch } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useQueryState(
    "questionIndex",
    parseAsInteger
  );

  const handleComplete = () => {
    refetch();
    setCurrentQuestionIndex(currentQuestionIndex ?? 0 + 1);
  };

  const handleOnboarded = async () => {
    await onboardUser();
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
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

        {/* Answered questions */}
        {/* <div className="space-y-4">
          <AnimatePresence>
            {Object.entries(answers).map(([questionId, answer]) => {
              const question = questions.find((q) => q.id === questionId);
              const option = question?.options?.find(
                (opt) => opt.value === answer
              );

              return (
                <motion.div
                  key={questionId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-secondary/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {question?.text}
                        </p>
                        <p className="font-medium">
                          {option ? (
                            <span className="flex items-center space-x-2">
                              {option.icon}
                              <span>{option.label}</span>
                            </span>
                          ) : (
                            answer
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div> */}

        {/* Current question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="space-y-8"
          >
            {questions[currentQuestionIndex ?? 0]?.({
              onCompleted: handleComplete,
            })}
          </motion.div>
        </AnimatePresence>
        <Button onClick={handleOnboarded}>Onboard</Button>
      </div>
    </main>
  );
}
