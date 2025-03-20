"use client";

import { getOrCreateAnonymousUser, type AnonymousUser } from "@/app/actions";
import { UserType } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getUserTypeBgColor, getUserTypeOutlineColor } from "../user-type";

interface UserContextType {
  user: AnonymousUser | null;
  isLoading: boolean;
  error: Error | null;
  bgColor: string;
  outLineColor: string;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AnonymousUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const bgColor = getUserTypeBgColor(user?.type || UserType.NONE);
  const outLineColor = getUserTypeOutlineColor(user?.type || UserType.NONE);
  // function updateTheme(primaryColor: string, backgroundColor: string) {
  //   document.documentElement.style.setProperty("--primary", primaryColor);
  //   document.documentElement.style.setProperty("--background", backgroundColor);
  // }

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await getOrCreateAnonymousUser();
      setUser(newUser);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to fetch user"));
    } finally {
      setIsLoading(false);
    }
  };

  // TODO dynamically set theme
  // useEffect(() => {
  //   updateTheme(
  //     getUserTypePrimaryColor(user?.type || UserType.NONE),
  //     getUserTypePrimaryColor(user?.type || UserType.NONE)
  //   );
  // }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    bgColor,
    outLineColor,
    isLoading,
    error,
    refetch: fetchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
