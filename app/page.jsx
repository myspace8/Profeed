'use client';

import { useEffect, useState } from 'react';
import { rssFeeds } from './rssFeeds';  // Import the centralized list
import Provider from '../components/provider'; // Import the Provider component

export default function HomePage() {
  const [postsData, setPostsData] = useState({}); // Store posts for each provider

  useEffect(() => {
    const fetchAllPosts = async () => {
      const newPostsData = {};

      for (const feed of rssFeeds) {
        try {
          const res = await fetch(`/api/getPosts?url=${encodeURIComponent(feed.url)}`);
          console.log(res);
          
          const data = await res.json();
          newPostsData[feed.slug] = data.posts || [];
        } catch (error) {
          console.error(`Error fetching posts for ${feed.name}:`, error);
          newPostsData[feed.slug] = [];
        }
      }

      setPostsData(newPostsData);
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Tech News</h1>

      {rssFeeds.map((feed) => (
        <Provider
          key={feed.slug}
          posts={postsData[feed.slug] || []} // Pass posts for the provider
          nameOfProvider={feed.name} // Pass the provider name
        />
      ))}
    </div>
  );
}
