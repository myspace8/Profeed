import Link from 'next/link';
import { rssFeeds } from './rssFeeds';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">RSS Feed Providers</h1>
        <p className="mt-4 text-gray-500 text-lg">
          Select a provider to view their latest posts
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rssFeeds.map((feed, index) => (
            <Link
              key={index}
              href={`/provider/${feed.slug}`}
              className="block bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-500 hover:underline">
                {feed.name}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}