"use client";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";

export function TopNav() {
  const { user } = useUser();
  return (
    <div className="h-20 px-8 bg-white flex items-center justify-between shadow-md z-[1000] relative w-full">
      <Image
        src="gallovate-innovation-coatch.svg"
        alt="Gallovate Innovation Coach"
        width={180}
        height={180}
      />
      {user && user?.type !== UserType.NONE && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Badge variant={user?.type}>{user?.type}</Badge>
        </motion.div>
      )}
    </div>
  );
}
