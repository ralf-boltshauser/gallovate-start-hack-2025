"use client";

import { useUser } from "@/lib/context/user-context";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function App() {
  const { user } = useUser();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[calc(100vh-72px)] p-6 bg-gradient-to-b from-background via-background/95 to-primary/5"
    >
      {/* Header */}
      <motion.div variants={item} className="space-y-2">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            Hello, {user?.name || "Innovator"}!
          </h1>
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <p className="text-muted-foreground">
          Your journey to innovation starts here
        </p>
      </motion.div>

      {/* Welcome Card */}
      <motion.div
        variants={item}
        className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10 space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Innovation Made Simple</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          We&apos;re here to transform your innovative ideas into reality.
          Whether you&apos;re just starting out or leading the charge, our
          platform provides the tools, guidance, and community you need to
          succeed.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div variants={item} className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          What&apos;s in store for you
        </h3>
        <div className="grid gap-4">
          {[
            {
              title: "Latest Innovation News",
              description:
                "Stay updated with cutting-edge developments and trends",
              href: "/news",
            },
            {
              title: "Expert Guidance",
              description: "Step-by-step guides to bring your ideas to life",
              href: "/guides",
            },
            {
              title: "AI-Powered Chat",
              description: "Get instant answers to your innovation questions",
              href: "/chat",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <Link
                href={feature.href}
                className="flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
