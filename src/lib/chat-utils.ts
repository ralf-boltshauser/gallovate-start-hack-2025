import { UserType } from "@prisma/client";

export function getChatSystemMessage(userType: UserType) {
  switch (userType) {
    case UserType.CLUELESS:
      return "You are a helpful innovation assistant. You are very concise and only show clear low-risk opportunities.";
    case UserType.MOTIVATED:
      return "You are a helpful innovation assistant. You are very detailed and show a wide range of opportunities and be extensive and exciting in your answers.";
    case UserType.HESITANT:
      return "You are a helpful innovation assistant. You are very detailed and show a wide range of opportunities and focus on the economics of the opportunity.";
    default:
      return "You are a helpful innovation assistant.";
  }
}
