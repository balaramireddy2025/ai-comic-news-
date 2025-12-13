import { NewsResponse, NewsCategory } from '@/types/news';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheEntry {
  data: NewsResponse;
  timestamp: number;
}

// In-memory cache (in production, consider using Redis or similar)
const cache: Map<string, CacheEntry> = new Map();

export async function fetchNews(
  category: NewsCategory = 'general',
  apiKey?: string
): Promise<NewsResponse> {
  const cacheKey = `news-${category}`;
  const cached = cache.get(cacheKey);

  // Return cached data if it's still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // If no API key, return mock data for development
  if (!apiKey) {
    return getMockNews();
  }

  try {
    const url = `${NEWS_API_BASE_URL}/top-headlines?category=${category}&country=us&pageSize=20&apiKey=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`News API error: ${response.statusText}`);
    }

    const data: NewsResponse = await response.json();

    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return cached data if available, otherwise mock data
    if (cached) {
      return cached.data;
    }
    return getMockNews();
  }
}

function getMockNews(): NewsResponse {
  return {
    status: 'ok',
    totalResults: 5,
    articles: [
      {
        source: { id: null, name: 'Tech News' },
        author: 'AI Reporter',
        title: 'AI Revolutionizes Comic News Delivery',
        description: 'New AI technology transforms how news is presented in comic book style, making information more engaging and accessible.',
        url: 'https://example.com/news1',
        urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Artificial intelligence is changing the way we consume news...',
      },
      {
        source: { id: null, name: 'Business Daily' },
        author: 'Business Reporter',
        title: 'Comic Style News Gains Popularity',
        description: 'News websites adopting comic book aesthetics see increased engagement and reader retention.',
        url: 'https://example.com/news2',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        publishedAt: new Date().toISOString(),
        content: 'The trend of presenting news in comic book format...',
      },
      {
        source: { id: null, name: 'Entertainment Weekly' },
        author: 'Entertainment Reporter',
        title: 'Superheroes Meet Journalism',
        description: 'Comic book style news brings superhero aesthetics to daily journalism.',
        url: 'https://example.com/news3',
        urlToImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Journalism meets comic book art in this innovative approach...',
      },
      {
        source: { id: null, name: 'Science Today' },
        author: 'Science Reporter',
        title: 'Breaking: New Discovery in Space',
        description: 'Scientists discover new exoplanet with potential for life.',
        url: 'https://example.com/news4',
        urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        publishedAt: new Date().toISOString(),
        content: 'A team of astronomers has discovered a new exoplanet...',
      },
      {
        source: { id: null, name: 'Health News' },
        author: 'Health Reporter',
        title: 'Wellness Trends for 2024',
        description: 'Top health and wellness trends shaping the new year.',
        url: 'https://example.com/news5',
        urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Health experts predict several key wellness trends...',
      },
    ],
  };
}

export function clearCache() {
  cache.clear();
}

