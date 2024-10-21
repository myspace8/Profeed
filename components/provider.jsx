'use client';

import { useState } from 'react';

export default function Provider({ posts, nameOfProvider }) {
  const [visiblePosts, setVisiblePosts] = useState(3); // Initially show 3 posts

  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3); // Load 3 more posts
  };

  return (
    <section className="mb-12">
      <div className="mb-4 border py-2 px-4 rounded-md">
        <h2 className="text-base font-medium text-gray-800">{nameOfProvider}</h2>
      </div>

      <ul className="space-y-2 px-2">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <li key={index}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#0060a0] hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="mt-4 px-2 text-sm text-gray-600 hover:underline focus:outline-none focus:underline underline-offset-4"
        >
          Load more stories
        </button>
      )}
    </section>
  );
}
