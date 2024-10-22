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
    <div className="max-w-5xl mx-auto">
      <div className='bg-gray-00 flex justify-between items-center mb-10 border'>
        <h1 className="text-sm font- uppercase px-3 py-2 text-center">News Aggregated</h1>
      </div>

      {rssFeeds.map((feed) => (
        <Provider
          key={feed.slug}
          posts={postsData[feed.slug] || []} // Pass posts for the provider
          nameOfProvider={feed.name} // Pass the provider name
        />
      ))}
      <div className='text-sm flex justify-center text-gray-600 p-2'>
        <p>End</p>
      </div>
      <div className='text-xs flex justify-center text-gray-600 p-2 border-t'>
        <p>All rights reserved | News Aggregate</p>
      </div>
    </div>
  );
}
