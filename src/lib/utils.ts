import { User, UserType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getUserBucket({
  biggestChallengeQuestion,
  technologyApproachQuestion,
  innovationOpinionQuestion,
}: Pick<
  User,
  | "biggestChallengeQuestion"
  | "technologyApproachQuestion"
  | "innovationOpinionQuestion"
>): UserType {
  if (biggestChallengeQuestion === "STABILITY") {
    if (technologyApproachQuestion === "Only if necessary")
      return UserType.CLUELESS;
    if (technologyApproachQuestion === "Interesting but cautious")
      return UserType.HESITANT;
  } else {
    if (innovationOpinionQuestion === "Necessary but risky")
      return UserType.HESITANT;
    if (innovationOpinionQuestion === "Essential for growth")
      return UserType.MOTIVATED;
  }

  return UserType.CLUELESS;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
