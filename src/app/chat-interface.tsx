"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/context/user-context";
import { submitAnswer } from "./actions";

export function ChatInterface() {
  const { user, isLoading, error } = useUser();
  console.log("user", user);
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <div className="animate-pulse">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <div className="text-red-500">Error: {error.message}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-12 animate-fade-in">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20 animate-bounce-slow">
            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Hey there! 👋
            </h2>
            <p className="text-muted-foreground">
              I&apos;m your friendly AI assistant
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl animate-fade-in-up">
              What brings you here today?
            </h1>
            <p className="text-muted-foreground animate-fade-in-up delay-100">
              Share your thoughts, and let&apos;s create something amazing
              together.
            </p>
          </div>

          <form
            action={async (formData: FormData) => {
              try {
                await submitAnswer(formData);
              } catch (error) {
                console.error("Error submitting message:", error);
              }
            }}
            className="flex space-x-2 animate-fade-in-up delay-200"
          >
            <Input
              name="message"
              placeholder="Type your answer here..."
              className="text-lg py-6"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="px-8 hover:scale-105 transition-transform"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
