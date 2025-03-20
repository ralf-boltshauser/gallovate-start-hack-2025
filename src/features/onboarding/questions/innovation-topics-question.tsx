"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings, MonitorSmartphone, Leaf, Sliders } from "lucide-react";
import { innovationTopicsAction } from "./questions-actions";

interface InnovationTopicsQuestionProps {
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
    type: "AUTOMATION",
    label: "Automation",
    description: "Streamlining operations with automated solutions.",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    type: "DIGITALIZATION",
    label: "Digitalization",
    description: "Leveraging technology to transform business processes.",
    icon: <MonitorSmartphone className="w-6 h-6" />,
  },
  {
    type: "SUSTAINABILITY",
    label: "Sustainability",
    description: "Focusing on eco-friendly and sustainable practices.",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    type: "PROCESS_OPTIMIZATION",
    label: "Process Optimization",
    description: "Enhancing efficiency and effectiveness.",
    icon: <Sliders className="w-6 h-6" />,
  },
];

export default function InnovationTopicsQuestion({
  onCompleted,
}: InnovationTopicsQuestionProps) {
  const handleSubmit = async (topic: string) => {
    await innovationTopicsAction({ topic });
    onCompleted(topic);
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
          What innovation topics are you most interested in?
        </h1>
        <p className="text-muted-foreground">
          Choose the option that best matches your interest.
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
