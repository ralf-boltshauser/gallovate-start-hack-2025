import { getOrCreateAnonymousUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { UserType } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { Lightbulb, MessageCircle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const JobBadge = ({ job }: { job: string }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
    {job}
  </span>
);

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const user = await getOrCreateAnonymousUser();
  const { newsId } = await params;
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
  });
  console.log(news);

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          News not found
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="space-y-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <JobBadge job={news.job} />
            <span className="text-gray-600 dark:text-gray-400">
              {news.publisher}
            </span>
          </div>
          {user.type != UserType.CLUELESS && (
            <Link href={`/chat?newsTitle=${encodeURIComponent(news.title)}`}>
              <Button size="icon" variant="ghost" className="rounded-full">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Chat about this news</span>
              </Button>
            </Link>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {news.title}
        </h1>
      </header>

      {news.imageUrl && (
        <div className="w-full mb-8 rounded-lg overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{news.text}</ReactMarkdown>
        </div>

        <Separator className="my-8" />
        {news.personalizedRecommendation}

        {news.personalizedRecommendation && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-primary">
                Personalized Insight
              </h2>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert bg-primary/5 p-6 rounded-lg">
              <ReactMarkdown>{news.personalizedRecommendation}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
