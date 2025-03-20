import { onboardUser } from "@/app/actions";
import { Question } from "@/app/components/interactive-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function RenderQuestion({
  handleAnswer,
  question,
  answer,
  myKey: key,
}: {
  handleAnswer?: (data: any) => void;
  question: Question;
  answer?: string;
  myKey: string;
}) {
  const { user } = useUser();

  const canSkip =
    (question.canCluelessSkip && user?.type === UserType.CLUELESS) ||
    (question.canHesitantSkip && user?.type === UserType.HESITANT);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      layout
      key={key}
    >
      <motion.p
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {question.text}
      </motion.p>
      <motion.div
        className="flex flex-col space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {question.type === "button" &&
          question.answers.map((ans) => {
            const isChosen = answer && ans.value === answer;
            return (
              <Button
                key={ans.value}
                variant={isChosen ? "secondary" : "outline"}
                onClick={() => handleAnswer && handleAnswer(ans.value)}
                className="h-12 text-left justify-start font-normal shadow-md w-fit min-w-8/12"
                disabled={!!answer}
              >
                {ans.label}
              </Button>
            );
          })}
        {question.type === "component" && question.component && (
          <question.component onCompleted={handleAnswer} data={answer} />
        )}
      </motion.div>
      {!answer && (
        <motion.p
          className="text-sm text-gray-500 mt-4 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Why is this important to us?
        </motion.p>
      )}
      {canSkip && !answer && (
        <Button
          variant="link"
          onClick={onboardUser}
          className="underline text-gray-500 font-light w-full justify-end gap-1"
        >
          Skip to app <ArrowRight className="h-2 w-2 underline" />
        </Button>
      )}
    </motion.div>
  );
}
