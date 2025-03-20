"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CompletionChoiceHesitantProps {
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

export default function CompletionChoiceHesitant({
  onCompleted,
}: CompletionChoiceHesitantProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-center"
    >
      <motion.div variants={item} className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          You&apos;re All Set!
        </h1>
        <p className="text-muted-foreground">
          You&apos;ve filled in all the mandatory fields. You can start using
          the app now or answer more questions for a better-personalized
          experience.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-col gap-4 md:flex-row justify-center"
      >
        <Button
          onClick={() => onCompleted("false")}
          className="px-6 py-3 text-lg"
          variant="default"
        >
          Jump into the app
        </Button>
        <Button
          onClick={() => onCompleted("true")}
          className="px-6 py-3 text-lg"
          variant="outline"
        >
          Answer more questions
        </Button>
      </motion.div>
    </motion.div>
  );
}
