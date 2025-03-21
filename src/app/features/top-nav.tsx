"use client";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/lib/context/user-context";
import { UserType } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";

export function TopNav({ children }: { children?: React.ReactNode }) {
  const { user } = useUser();
  return (
    <div className="h-20 px-4 bg-white flex items-center justify-between shadow-md z-[5] relative w-full gap-4">
      {children}
      <div className="flex items-center justify-between gap-2 w-full flex-1">
        <Image
          src="/gallovate-innovation-coatch.svg"
          alt="Gallovate Innovation Coach"
          width={180}
          height={180}
        />
        {children || user?.type !== UserType.NONE ? (
          <>
            {user && user?.type !== UserType.NONE ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Badge variant={user?.type}>{user?.type}</Badge>
              </motion.div>
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            )}
          </>
        ) : null}
        {/* <Button
          onClick={() => {
            alert("calling!");
            callAction();
          }}
        >
          Call
        </Button> */}
      </div>
    </div>
  );
}
