"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
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

  return (
    <div className="flex flex-col h-screen bg-white w-full">
      {/* Header */}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-4">
          {messages.filter((message) => message.role !== "system").length ===
            0 && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="rounded-full bg-emerald-50 p-4">
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
                  className="text-emerald-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Hi there! Glad you&apos;re here.
              </h2>
              <p className="text-gray-600 text-center max-w-sm">
                What innovation challenge or idea are you currently exploring?
              </p>
            </div>
          )}

          {messages
            .filter((message) => message.role !== "system")
            .map((message) => (
              <div
                key={message.id}
                className={`mb-6 gap-2 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role != "user" && (
                  <Avatar
                    className={cn(
                      "mb-2 w-12 h-12 transition-colors duration-300"
                    )}
                  >
                    <AvatarImage src="simon.png" />
                  </Avatar>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                    message.role === "user"
                      ? "bg-emerald-100 text-gray-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div
                    className={`prose max-w-none ${
                      message.role === "user" ? "" : "dark:prose-invert"
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
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                  <p className="text-sm text-gray-500 mb-2">
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
                                        className="mb-2 block last:mb-0 p-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
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
                                            className="text-gray-400"
                                          >
                                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                          </svg>
                                          {news.title}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                          {news.text.length > 120
                                            ? news.text.slice(0, 120) + "..."
                                            : news.text}
                                        </p>
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                            {part.toolInvocation.toolName === "findEmail" &&
                              part.toolInvocation.state == "result" && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                  <p className="text-sm text-gray-500 mb-2">
                                    Sources & References:
                                  </p>
                                  {(() => {
                                    const email = part.toolInvocation.result;
                                    const companyName = email
                                      .split("@")[1]
                                      .split(".")[0];
                                    return (
                                      <div
                                        key={email}
                                        className="mb-2 block last:mb-0"
                                      >
                                        <Link
                                          href={`mailto:${email}`}
                                          className="p-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors block"
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
                                              className="text-gray-400"
                                            >
                                              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                            </svg>
                                            {email}
                                          </p>
                                        </Link>
                                        <p className="text-xs text-gray-500 mt-1 pl-3">
                                          Source:{" "}
                                          <a
                                            href={`https://${companyName}.org/about`}
                                            className="underline hover:text-gray-700"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {companyName}.com/about
                                          </a>
                                        </p>
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}
                          </React.Fragment>
                        ))}
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 z-10"
      >
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            className="flex-1 bg-gray-100 text-gray-900 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
