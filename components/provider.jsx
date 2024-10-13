'use client';

import { useState } from 'react';

export default function Provider({ posts, nameOfProvider }) {
  const [visiblePosts, setVisiblePosts] = useState(3); // Initially show 3 posts

  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3); // Load 3 more posts
  };

  return (
    <section className="mb-12">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{nameOfProvider}</h2>
      </header>

      <ul className="space-y-2">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <li key={index}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Read more about ${post.title}`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      {posts.length > visiblePosts && (
        <button
          onClick={loadMore}
          className="mt-4 text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Load more
        </button>
      )}
    </section>
  );
}
