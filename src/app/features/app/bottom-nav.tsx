"use client";

import { useUser } from "@/lib/context/user-context";
import { cn } from "@/lib/utils";
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

export default function BottomNav() {
  const { user, bgColor } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  const items = navItems[user.type];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg ${bgColor}`}
    >
      <nav className="max-w-md mx-auto px-8 py-2">
        <ul className="flex justify-around items-center">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 text-sm transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.icon}
                  <span className="mt-1 text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
