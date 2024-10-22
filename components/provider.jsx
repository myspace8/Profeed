'use client';

import { useState } from 'react';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, parseISO } from 'date-fns';

export default function Provider({ posts, nameOfProvider }) {
  const [visiblePosts, setVisiblePosts] = useState(3); // Initially show 3 posts

  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3); // Load 3 more posts
  };

  // Custom function to format relative time in short format
  const getRelativeTime = (dateString) => {
    const date = (dateString);
    const now = new Date();
    
    const minutesAgo = differenceInMinutes(now, date);
    if (minutesAgo < 60) return `${minutesAgo}m`;

    const hoursAgo = differenceInHours(now, date);
    if (hoursAgo < 24) return `${hoursAgo}h`;

    const daysAgo = differenceInDays(now, date);
    if (daysAgo < 7) return `${daysAgo}d`;

    const weeksAgo = differenceInWeeks(now, date);
    return `${weeksAgo}w`;
  };

  return (
    <section className="mb-4 px-3">
      <div className="mb-4 border-t-slate-200 border- border- py-2 px-4 rounded-t-md bg-slate-100">
        <h2 className="text-base font-medium text-gray-800">{nameOfProvider}</h2>
      </div>

      <ul className="space-y-2 px-2">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <li key={index}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#0060a0] hover:underline focus:outline-none focus:underline underline-offset-4"
              aria-label={`Read more about ${post.title}`}
            >
              {post.title}
            </a>
            <p className="text-gray-600 text-sm">
              {/* Use custom relative time format */}
              {getRelativeTime(post.pubDate)}
            </p>
          </li>
        ))}
      </ul>

      {posts.length > visiblePosts && (
        <button
          onClick={loadMore}
          className="mt-2 px-2 text-sm text-gray-600 hover:underline focus:outline-none focus:underline underline-offset-4"
        >
          Load more stories
        </button>
      )}
    </section>
  );
}



// 'use client';

// import { useState } from 'react';
// import { formatDistanceToNow, parseISO } from 'date-fns';

// export default function Provider({ posts, nameOfProvider }) {
//   const [visiblePosts, setVisiblePosts] = useState(3); // Initially show 3 posts

//   const loadMore = () => {
//     setVisiblePosts((prevVisible) => prevVisible + 3); // Load 3 more posts
//   };

//   return (
//     <section className="mb-4">
//       <div className="mb-4 border py-2 px-4 rounded-md">
//         <h2 className="text-base font-medium text-gray-800">{nameOfProvider}</h2>
//       </div>

//       <ul className="space-y-2 px-2">
//         {posts.slice(0, visiblePosts).map((post, index) => (
//           <li key={index}>
//             <a
//               href={post.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block text-sm text-[#0060a0] hover:underline focus:outline-none focus:underline underline-offset-4"
//               aria-label={`Read more about ${post.title}`}
//             >
//               {post.title}
//             </a>
//             <p className="text-gray-600 text-sm">
//               {/* Convert pubDate to relative time */}
//               {formatDistanceToNow((post.pubDate), { addSuffix: true })}
//             </p>
//           </li>
//         ))}
//       </ul>

//       {posts.length > visiblePosts && (
//         <button
//           onClick={loadMore}
//           className="mt-2 px-2 text-sm text-gray-600 hover:underline focus:outline-none focus:underline underline-offset-4"
//         >
//           Load more stories
//         </button>
//       )}
//     </section>
//   );
// }
