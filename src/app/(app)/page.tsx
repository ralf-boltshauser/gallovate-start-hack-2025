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
      className="relative min-h-[calc(100vh-72px)] "
    >
      {/* Fading gradient overlay */}

      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Hello, {user?.name || "Innovator"}!
              </h1>
            </motion.div>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your journey to innovation starts here
          </motion.p>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          variants={item}
          className="p-8 rounded-xl bg-primary/5 border border-primary/10 space-y-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              className="p-3 rounded-full bg-primary/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lightbulb className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Innovation Made Simple
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We&apos;re here to transform your innovative ideas into reality.
            Whether you&apos;re just starting out or leading the charge, our
            platform provides the tools, guidance, and community you need to
            succeed.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div variants={item} className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Rocket className="w-6 h-6 text-primary" />
            </motion.div>
            What&apos;s in store for you
          </h3>
          <div className="grid gap-6">
            {[
              {
                title: "Latest Innovation News",
                description:
                  "Stay updated with cutting-edge developments and trends",
                href: "/news",
                icon: "📰",
              },
              {
                title: "Expert Guidance",
                description: "Step-by-step guides to bring your ideas to life",
                href: "/guides",
                icon: "🎯",
              },
              {
                title: "AI-Powered Chat",
                description: "Get instant answers to your innovation questions",
                href: "/chat",
                icon: "💬",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group relative p-6 rounded-xl border bg-card hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={feature.href}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-medium text-lg">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
