"use client";

import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  // read query param newsTitle
  const searchParams = useSearchParams();
  const newsTitle = searchParams.get("newsTitle");
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    initialMessages,
  });

  const hasAppendedRef = useRef(false);

  useEffect(() => {
    if (newsTitle && !hasAppendedRef.current) {
      append({
        role: "user",
        content: `Search for news with title: ${newsTitle} and explain what it means for me.`,
      });
      hasAppendedRef.current = true;
    }
  }, [newsTitle, append]);
  console.log(messages);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.filter((message) => message.role !== "system").length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4 py-12 mx-4">
          <div className="rounded-full bg-primary/10 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome to Innovation Chat
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm">
            Ask me anything about the latest news and I&apos;ll help you
            understand what&apos;s happening in the world.
          </p>
          <button
            type="button"
            onClick={() => {
              append({
                role: "user",
                content: "tell me the latest relevant news",
              });
              handleSubmit();
            }}
            className="mb-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M18 18h-8" />
              <path d="M18 10h-8" />
            </svg>
            Show me the news
          </button>
        </div>
      )}
      {messages
        .filter((message) => message.role !== "system")
        .map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-4 rounded-lg max-w-[85%] ${
              message.role === "user"
                ? "bg-primary text-white self-end mr-4"
                : "bg-gray-100 dark:bg-zinc-800 ml-4"
            }`}
          >
            <div className="font-semibold mb-1">
              {message.role === "user" ? "You" : "AI Assistant"}
            </div>
            <div
              className={`prose ${
                message.role === "user" ? "prose-invert" : "dark:prose-invert"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            {message.parts.length > 0 && (
              <>
                {message.parts
                  .filter((part) => part.type === "tool-invocation")
                  .map((part, index) => (
                    <React.Fragment key={`tool-${index}`}>
                      {part.toolInvocation.toolName === "getNews" &&
                        part.toolInvocation.state == "result" && (
                          <div className="mt-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                              Sources & References:
                            </p>
                            {part.toolInvocation.result.map(
                              (news: {
                                id: string;
                                title: string;
                                text: string;
                              }) => (
                                <Link
                                  key={news.id}
                                  href={`/news/${news.id}`}
                                  className="mb-2 block last:mb-0 p-3 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                                >
                                  <p className="text-sm font-medium flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="text-zinc-400"
                                    >
                                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    </svg>
                                    {news.title}
                                  </p>
                                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                    {news.text.length > 120
                                      ? news.text.slice(0, 120) + "..."
                                      : news.text}
                                  </p>
                                </Link>
                              )
                            )}
                          </div>
                        )}
                    </React.Fragment>
                  ))}
              </>
            )}
          </div>
        ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-15 left-0 right-0 p-4  dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-10"
      >
        <div className="max-w-md mx-auto">
          <input
            className="w-full bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
