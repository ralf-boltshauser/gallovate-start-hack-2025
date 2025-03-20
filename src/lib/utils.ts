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
    if (technologyApproachQuestion === "ONLY_IF_NECESSARY")
      return UserType.CLUELESS;
    if (technologyApproachQuestion === "INTERESTING_BUT_CAUTIOUS")
      return UserType.HESITANT;
  } else {
    if (innovationOpinionQuestion === "NECESSARY_BUT_RISKY")
      return UserType.HESITANT;
    if (innovationOpinionQuestion === "ESSENTIAL_FOR_GROWTH")
      return UserType.MOTIVATED;
  }

  return UserType.CLUELESS;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
