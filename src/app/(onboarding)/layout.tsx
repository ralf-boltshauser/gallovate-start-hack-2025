"use client";
import { useUser } from "@/lib/context/user-context";
import { redirect } from "next/navigation";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  console.log("user", user);
  if (user?.onboarded) {
    redirect("/");
  }
  return <div>{children}</div>;
}
