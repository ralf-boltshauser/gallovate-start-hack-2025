"use client";
import { Button } from "@/components/ui/button";
import { UserType } from "@prisma/client";
import { innovationKnowledgeAction } from "./questions-actions";

interface InnovationKnowledgeQuestionProps {
  onCompleted: () => void;
}

export default function InnovationKnowledgeQuestion({
  onCompleted,
}: InnovationKnowledgeQuestionProps) {
  const handleSubmit = async (userType: UserType) => {
    await innovationKnowledgeAction({ userType });
    onCompleted();
  };
  return (
    <div>
      <h1>Innovation Knowledge</h1>
      <Button onClick={() => handleSubmit(UserType.CLUELESS)}>Clueless</Button>
      <Button onClick={() => handleSubmit(UserType.HESITANT)}>Hesitant</Button>
      <Button onClick={() => handleSubmit(UserType.MOTIVATED)}>
        Motivated
      </Button>
    </div>
  );
}
