"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, TrendingUp } from "lucide-react";
import { biggestChallengeAction } from "./questions-actions";

interface BiggestChallengeQuestionProps {
  onCompleted: (answer: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const options = [
  {
    type: "STABILITY",
    label: "Stability",
    description: "We focus on maintaining steady operations.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    type: "BEING_AHEAD",
    label: "Being Ahead",
    description: "We aim to stay competitive and innovate.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

export default function BiggestChallengeQuestion({
  onCompleted,
}: BiggestChallengeQuestionProps) {
  const handleSubmit = async (challenge: string) => {
    await biggestChallengeAction({ challenge });
    onCompleted(challenge);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      <motion.div variants={item} className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Biggest challenge for your company?
        </h1>
        <p className="text-muted-foreground">
          Choose the option that best describes your current focus.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="grid gap-3 md:grid-cols-2 md:gap-4 mt-4"
      >
        {options.map((option) => (
          <Button
            key={option.type}
            onClick={() => handleSubmit(option.type)}
            className="group relative h-auto p-4 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-200"
            variant="outline"
          >
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              {option.icon}
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold">{option.label}</h3>
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-colors duration-200" />
          </Button>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="text-center text-xs text-muted-foreground mt-4"
      >
        <p>Don&apos;t worry, you can always change this later</p>
      </motion.div>
    </motion.div>
  );
}
