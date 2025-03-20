import { getRelevantNews } from "@/features/app/chat/chat-actions";

const CategoryBadge = ({ category }: { category: string }) => (
  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
    {category}
  </span>
);

const TimeAgo = ({ time }: { time: Date }) => {
  // Convert the date to a relative time string
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  const timeAgo = hours > 0 ? `${hours} hours` : `${minutes} minutes`;

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      • {timeAgo} ago
    </span>
  );
};

export default async function News() {
  const news = await getRelevantNews(10);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Your News Feed
      </h1>
      <div className="space-y-8">
        {news.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <a href={`/news/${item.id}`} className="group block">
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
                <div className="flex items-center gap-2 mb-3">
                  <CategoryBadge category={item.job} />
                  <TimeAgo time={item.publishedAt} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h2>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
