import { getRelevantNews, searchNews } from "@/features/app/chat/chat-actions";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      getNews: {
        description: "Get the latest news",
        parameters: z.object({
          amount: z.number().min(1).max(10),
        }),
        execute: async ({ amount }) => {
          const news = await getRelevantNews(amount);
          return news;
        },
      },
      searchNews: {
        description: "Search for news",
        parameters: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          const news = await searchNews(query);
          return news;
        },
      },
      findEmail: {
        description: "Find the email of a person",
        parameters: z.object({
          firstName: z.string(),
          companyName: z.string(),
        }),
        execute: async ({ firstName, companyName }) => {
          return `${firstName.replace(/\s+/g, "-")}@${companyName.replace(
            /\s+/g,
            "-"
          )}.com`.toLowerCase();
        },
      },
    },
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
