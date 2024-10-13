import Parser from 'rss-parser';

const parser = new Parser();

// Server-side function to fetch posts
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const feedUrl = searchParams.get('url'); // Extract feed URL from the request

    if (!feedUrl) {
      return new Response(JSON.stringify({ message: 'Feed URL is required' }), { status: 400 });
    }

    // Fetch the RSS feed on the server
    const rss = await parser.parseURL(feedUrl);
    const posts = rss.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));

    return new Response(JSON.stringify({ posts }), { status: 200 });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return new Response(JSON.stringify({ message: 'Error fetching RSS feed' }), { status: 500 });
  }
}