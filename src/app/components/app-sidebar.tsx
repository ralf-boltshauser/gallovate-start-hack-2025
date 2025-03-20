"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: Record<UserType, NavItem[]> = {
  NONE: [],
  CLUELESS: [
    { href: "/news", icon: <Newspaper className="w-6 h-6" />, label: "News" },
  ],
  MOTIVATED: [
    { href: "/news", icon: <Newspaper className="w-6 h-6" />, label: "News" },
    {
      href: "/chat",
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Chat",
    },
    {
      href: "/guides",
      icon: <BookOpen className="w-6 h-6" />,
      label: "Guides",
    },
  ],
  HESITANT: [
    { href: "/news", icon: <Newspaper className="w-6 h-6" />, label: "News" },
    {
      href: "/chat",
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Chat",
    },
  ],
};

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  const items = navItems[user.type];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40">
        <div className="flex items-center gap-2 px-4 py-3">
          <h2 className="text-lg font-semibold">Navigation</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 h-full w-1 bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
