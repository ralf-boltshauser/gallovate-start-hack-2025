import { getOrCreateAnonymousUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { getRelevantNews } from "@/features/app/chat/chat-actions";
import { UserType } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const JobBadge = ({ job }: { job: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
    {job}
  </span>
);

export default async function News() {
  const user = await getOrCreateAnonymousUser();
  const news = await getRelevantNews(10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Latest News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <Link href={`/news/${item.id}`} className="group block">
              {item.imageUrl && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <JobBadge job={item.job} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.publisher}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                  {item.text}
                </p>
              </div>
            </Link>
            <div className="px-6 pb-6 flex justify-end">
              {user.type != UserType.CLUELESS && (
                <Link
                  href={`/chat?newsTitle=${encodeURIComponent(item.title)}`}
                >
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">Chat about this news</span>
                  </Button>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
