import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const feedUrl = searchParams.get('url'); // Extract feed URL from query

    // Validate the URL
    if (!feedUrl) {
      return new Response(
        JSON.stringify({ message: 'Feed URL is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation to ensure it's a valid URL format
    try {
      new URL(feedUrl);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Invalid URL format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the RSS feed using the parser
    const rss = await parser.parseURL(feedUrl);

    // Transform the feed into an array of posts
    const posts = rss.items.map(item => ({
      title: item.title || 'No title available', // Fallback if no title
      link: item.link || '#',                   // Fallback to hash if no link
      pubDate: item.pubDate || 'Unknown',       // Fallback if no publication date
      // description: item.contentSnippet || 'No description available', // Fallback description
      // author: item.creator || 'Unknown author', // Fallback if no author provided
    }));

    // Return the response with CORS and caching headers
    return new Response(
      JSON.stringify({ posts }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
        }
      }
    );
  } catch (error) {
    console.error('Error fetching RSS feed:', error);

    // Return a more detailed error message
    return new Response(
      JSON.stringify({ message: 'Error fetching or parsing the RSS feed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
