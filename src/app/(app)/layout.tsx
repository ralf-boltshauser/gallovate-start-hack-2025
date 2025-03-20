"use client";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import BottomNav from "../features/app/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  console.log("user", user);
  console.log("tried / page");
  console.log("user?.onboarded", user?.onboarded);
  console.log("user", user);
  // TODO enable this auth check
  // if (!user?.onboarded) {
  //   redirect("/onboarding");
  // }
  if (user?.type === UserType.NONE) {
    redirect("/onboarding");
  }
  return (
    <div className="min-h-screen pb-[72px]">
      {children}
      <BottomNav />
    </div>
  );
}
