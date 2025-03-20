"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import { AppSidebar } from "../components/app-sidebar";
import { TopNav } from "../features/top-nav";

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
    <div className="w-full h-full flex flex-col justify-stretch">
      <SidebarProvider className="flex-1 w-full">
        <AppSidebar />
        <main className="w-full">
          <TopNav>
            <SidebarTrigger />
          </TopNav>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
