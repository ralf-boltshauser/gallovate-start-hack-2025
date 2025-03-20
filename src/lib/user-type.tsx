import { UserType } from "@prisma/client";

export function getUserTypeBgColor(userType: UserType) {
  switch (userType) {
    case UserType.CLUELESS:
      return "bg-blue-200";
    case UserType.MOTIVATED:
      return "bg-yellow-200";
    case UserType.HESITANT:
      return "bg-green-200";
    case UserType.NONE:
      return "bg-gray-400";
    default:
      return "bg-gray-200";
  }
}

export function getUserTypePrimaryColor(userType: UserType) {
  switch (userType) {
    case UserType.CLUELESS:
      return "bg-blue-600";
    case UserType.MOTIVATED:
      return "bg-yellow-600";
    case UserType.HESITANT:
      return "bg-green-600";
    case UserType.NONE:
      return "bg-gray-700";
  }
}
