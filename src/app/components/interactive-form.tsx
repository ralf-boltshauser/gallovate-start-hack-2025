"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CallDialog from "@/features/onboarding/call-dialog";
import { CompanyQuestion } from "@/features/onboarding/questions/company-question";
import {
  biggestChallengeAction,
  companyInformationAction,
  decisionMakingAction,
  innovationBarrierAction,
  innovationOpinionAction,
  innovationSupportAction,
  innovationTopicsAction,
  mainChallengeAction,
  technologyApproachAction,
} from "@/features/onboarding/questions/questions-actions";
import { RenderQuestion } from "@/features/onboarding/questions/render-question";
import { useUser } from "@/lib/context/user-context";
import { cn } from "@/lib/utils";
import { User, UserType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { onboardUser } from "../actions";

type ButtonQuestion = {
  type: "button";
  text: string;
  answers: { label: string; value: string }[];
  next: (user: User, answer: string) => string | null;
  action?: (answer: string) => Promise<void>;
};

type ComponentQuestion = {
  type: "component";
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
  next: (user: User) => string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (data: any) => Promise<void>;
};

export type Question = (ButtonQuestion | ComponentQuestion) & {
  canCluelessSkip?: boolean;
  canHesitantSkip?: boolean;
  endOnboarding?: boolean;
};

const questionFlow: Record<string, Question> = {
  BiggestChallenge: {
    type: "button",
    text: "What's the biggest challenge for your company?",
    answers: [
      { label: "Stability", value: "STABILITY" },
      { label: "Being ahead", value: "BEING_AHEAD" },
    ],
    next: (user: User, answer: string) => {
      if (answer === "STABILITY") return "TechnologyApproachQuestion";
      if (answer === "BEING_AHEAD") return "InnovationOpinionQuestion";
      return null;
    },
    action: async (answer: string) => {
      await biggestChallengeAction({ challenge: answer });
    },
  },
  TechnologyApproachQuestion: {
    type: "button",
    text: "How do you approach new technologies?",
    answers: [
      {
        label: "Only if necessary",
        value: "ONLY_IF_NECESSARY",
      },
      {
        label: "Interesting but cautious",
        value: "INTERESTING_BUT_CAUTIOUS",
      },
    ],
    next: () => "CompagnyQuestion",
    action: async (answer: string) => {
      await technologyApproachAction({ approach: answer });
    },
  },
  InnovationOpinionQuestion: {
    type: "button",
    text: "How do you feel about innovation?",
    answers: [
      {
        label: "Necessary but risky",
        value: "NECESSARY_BUT_RISKY",
      },
      {
        label: "Essential for growth",
        value: "ESSENTIAL_FOR_GROWTH",
      },
    ],
    next: () => "CompagnyQuestion",
    action: async (answer: string) => {
      await innovationOpinionAction({ opinion: answer });
    },
  },
  CompagnyQuestion: {
    type: "component",
    component: CompanyQuestion,
    text: "What's the name of your company?",
    next: () => {
      return "MainChallengeQuestion";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: async (data: any) => {
      await companyInformationAction(data);
    },
  },
  MainChallengeQuestion: {
    type: "button",
    text: "What's the main challenge for your company?",
    answers: [
      {
        label: "Cost Pressure",
        value: "COST_PRESSURE",
      },
      {
        label: "Efficiency",
        value: "EFFICIENCY",
      },
      {
        label: "Workforce",
        value: "WORKFORCE",
      },
      {
        label: "Innovation",
        value: "INNOVATION",
      },
    ],
    next: () => "DecisionMakingQuestion",
    action: async (answer: string) => {
      await mainChallengeAction({ challenge: answer });
    },
    canCluelessSkip: true,
  },
  DecisionMakingQuestion: {
    type: "button",
    text: "How do you make major business decisions?",
    answers: [
      {
        label: "Suppliers",
        value: "SUPPLIERS",
      },
      {
        label: "Internal Team",
        value: "INTERNAL_TEAM",
      },
      {
        label: "Industry Trends",
        value: "INDUSTRY_TRENDS",
      },
    ],
    next: () => "InnovationTopicsQuestion",
    action: async (answer: string) => {
      await decisionMakingAction({ decisionMethod: answer });
    },
    canCluelessSkip: true,
  },
  InnovationTopicsQuestion: {
    type: "button",
    text: "What innovation topics are you most interested in?",
    answers: [
      {
        label: "Automation",
        value: "AUTOMATION",
      },
      {
        label: "Digitalization",
        value: "DIGITALIZATION",
      },
      {
        label: "Sustainability",
        value: "SUSTAINABILITY",
      },
      {
        label: "Process Optimization",
        value: "PROCESS_OPTIMIZATION",
      },
    ],
    next: () => {
      return "InnovationBarrierQuestion";
    },
    action: async (answer: string) => {
      await innovationTopicsAction({ topic: answer });
    },
    canCluelessSkip: true,
  },
  InnovationBarrierQuestion: {
    type: "button",
    text: "What's your biggest barrier to innovation?",
    answers: [
      {
        label: "Cost",
        value: "COST",
      },
      {
        label: "Expertise",
        value: "EXPERTISE",
      },
      {
        label: "Risk",
        value: "RISK",
      },
    ],
    next: () => "InnovationSupportQuestion",
    action: async (answer: string) => {
      await innovationBarrierAction({ barrier: answer });
    },
    canCluelessSkip: true,
    canHesitantSkip: true,
  },
  InnovationSupportQuestion: {
    type: "button",
    text: "What innovation-related support are you looking for?",
    answers: [
      {
        label: "Funding Opportunities",
        value: "FUNDING_OPPORTUNITIES",
      },
      {
        label: "Technology Trends",
        value: "TECHNOLOGY_TRENDS",
      },
      {
        label: "Strategic Guidance",
        value: "STRATEGIC_GUIDANCE",
      },
      {
        label: "Networking",
        value: "NETWORKING",
      },
    ],
    next: () => "completed",
    action: async (answer: string) => {
      await innovationSupportAction({ support: answer });
    },
    canCluelessSkip: true,
    canHesitantSkip: true,
    endOnboarding: true,
  },
};

type QuestionHistoryItem = {
  question: Question;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: string | any;
};

export default function ChatOnboarding() {
  const [currentKey, setCurrentKey] = useState("BiggestChallenge");
  const [history, setHistory] = useState<QuestionHistoryItem[]>([]);
  const { user, outLineColor, refetch } = useUser();
  const [showGreeting, setShowGreeting] = useState(true);

  const currentQuestion = questionFlow[currentKey];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAnswer = async (answer: string | any) => {
    // Perform any action associated with the current question.
    if (currentQuestion.action) {
      await currentQuestion.action(answer);
    }

    // refetch user
    refetch();

    if (!user) return;

    // Add the current question (with the chosen answer) to the history.
    setHistory((prev) => [
      ...prev,
      {
        question: currentQuestion,
        answer,
      },
    ]);

    if (currentQuestion.endOnboarding) {
      onboardUser();
    }

    // Load the next question.
    const nextKey = currentQuestion.next(user, answer);
    if (nextKey) {
      setCurrentKey(nextKey);
    } else {
      setCurrentKey("");
    }
  };

  // Calculate progress
  const progress =
    (history.length / (Object.keys(questionFlow).length - 1)) * 100;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gray-50">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 z-[1000]">
        <motion.div
          className="h-full bg-[#009639] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Leave bottom for clueless */}
      {user?.type === UserType.CLUELESS && (
        <div className="absolute top-5 left-5 z-[1000]">
          <CallDialog />
        </div>
      )}

      {/* Fading gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-50" />

      {/* History container: occupies top half; messages are anchored to its bottom */}
      <div className="absolute top-0 left-0 right-0 bottom-1/2 pointer-events-none">
        <div className="absolute bottom-3/5 left-0 right-0 flex flex-col items-center space-y-12">
          <AnimatePresence>
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.2 }}
                className="w-10/12"
              >
                <div>
                  <RenderQuestion
                    question={item.question}
                    answer={item.answer}
                    myKey={`${item.question.type}-${item.question.text}`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Current question container: always centered */}
      <div className="absolute inset-0 flex items-center justify-center ">
        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-10/12 mt-20"
          >
            <motion.div layout>
              <Avatar
                className={cn(
                  "mb-2 w-16 h-16 transition-colors duration-300",
                  outLineColor
                )}
              >
                <AvatarImage src="simon.png" />
              </Avatar>
            </motion.div>
            <div>
              {currentQuestion.text ===
                "What's the biggest challenge for your company?" && (
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">Hey! I&apos;m Simon</h1>
                  <p className="text-lg">
                    Your personal innovation guide. Let&apos;s start shaping
                    your unique path to innovation.
                  </p>
                </div>
              )}
              {!showGreeting && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                >
                  <RenderQuestion
                    myKey={currentKey}
                    question={currentQuestion}
                    handleAnswer={handleAnswer}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
