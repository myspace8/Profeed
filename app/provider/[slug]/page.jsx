'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { rssFeeds } from '../../rssFeeds';  // Import the centralized list

export default function ProviderPosts() {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();  // Get the provider slug from the URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Find the feed URL based on the slug
        const feed = rssFeeds.find(f => f.slug === slug);
        if (!feed) {
          setLoading(false);
          return;
        }

        // Fetch posts from the server-side API
        const res = await fetch(`/api/getPosts?url=${encodeURIComponent(feed.url)}`);
        const data = await res.json();

        // Check if data.posts exists and is an array
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]); // Set to an empty array if not valid
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Set to an empty array on error
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">{slug.replace('-', ' ')}</h1>
        <p className="mt-4 text-gray-500 text-lg">Latest posts from {slug.replace('-', ' ')}</p>
      </header>

      <main>
        {posts.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No posts available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xl font-semibold text-blue-500 hover:underline"
                >
                  {post.title}
                </a>
                <p className="text-gray-400 mt-2">
                  Published on {new Date(post.pubDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
