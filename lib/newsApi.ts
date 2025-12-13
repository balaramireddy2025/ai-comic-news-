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
    // Only fetch AI/Technology news - use search query for AI-related news
    const url = `${NEWS_API_BASE_URL}/everything?q=artificial intelligence OR AI OR machine learning OR deep learning OR neural network OR GPT OR OpenAI OR ChatGPT&sortBy=publishedAt&pageSize=20&language=en&apiKey=${apiKey}`;
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
    totalResults: 8,
    articles: [
      {
        source: { id: null, name: 'AI Tech Daily' },
        author: 'AI Reporter',
        title: 'OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities',
        description: 'OpenAI announces GPT-5 with breakthrough improvements in logical reasoning, multimodal understanding, and real-world problem solving.',
        url: 'https://example.com/news1',
        urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        publishedAt: new Date().toISOString(),
        content: 'OpenAI has unveiled GPT-5, showcasing unprecedented capabilities in AI reasoning...',
      },
      {
        source: { id: null, name: 'AI Innovation Hub' },
        author: 'Tech Analyst',
        title: 'Google DeepMind Creates AI That Can Learn Like Humans',
        description: 'DeepMind researchers develop neural networks that mimic human learning patterns, achieving faster adaptation and better generalization.',
        url: 'https://example.com/news2',
        urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Google DeepMind announces breakthrough in AI learning algorithms...',
      },
      {
        source: { id: null, name: 'AI Weekly' },
        author: 'AI Journalist',
        title: 'Microsoft Copilot AI Now Powers 100 Million Users Daily',
        description: 'Microsoft reports massive adoption of AI-powered Copilot, transforming how people work with AI assistants in productivity tools.',
        url: 'https://example.com/news3',
        urlToImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Microsoft reveals staggering growth in AI assistant usage...',
      },
      {
        source: { id: null, name: 'AI Research Lab' },
        author: 'Science Writer',
        title: 'Breakthrough: AI Discovers New Antibiotic Using Machine Learning',
        description: 'MIT researchers use AI to identify a powerful new antibiotic compound, demonstrating AI\'s potential in drug discovery.',
        url: 'https://example.com/news4',
        urlToImage: 'https://images.unsplash.com/photo-1559757148-5c0d4206c58b?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Artificial intelligence helps discover life-saving antibiotic...',
      },
      {
        source: { id: null, name: 'AI Business News' },
        author: 'Business Reporter',
        title: 'NVIDIA Stock Soars as AI Chip Demand Reaches All-Time High',
        description: 'NVIDIA reports record-breaking revenue driven by unprecedented demand for AI chips from tech giants and startups.',
        url: 'https://example.com/news5',
        urlToImage: 'https://images.unsplash.com/photo-1591488320449-11f0d6c60f12?w=800',
        publishedAt: new Date().toISOString(),
        content: 'NVIDIA dominates AI chip market with revolutionary hardware...',
      },
      {
        source: { id: null, name: 'AI Future' },
        author: 'Tech Futurist',
        title: 'Tesla FSD v12: Full Self-Driving AI Reaches New Milestone',
        description: 'Tesla\'s Full Self-Driving technology achieves major breakthrough using end-to-end neural networks, bringing us closer to autonomous driving.',
        url: 'https://example.com/news6',
        urlToImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Tesla announces major advancement in autonomous vehicle AI...',
      },
      {
        source: { id: null, name: 'AI Ethics Watch' },
        author: 'AI Ethicist',
        title: 'EU AI Act: New Regulations Shape Global AI Development',
        description: 'European Union implements comprehensive AI regulations, setting new standards for ethical AI development and deployment worldwide.',
        url: 'https://example.com/news7',
        urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        publishedAt: new Date().toISOString(),
        content: 'EU AI Act establishes framework for responsible AI innovation...',
      },
      {
        source: { id: null, name: 'AI Startup News' },
        author: 'Venture Reporter',
        title: 'Anthropic Raises $4B for Next-Gen AI Safety Research',
        description: 'Anthropic secures massive funding round to advance AI safety research and develop more reliable, trustworthy AI systems.',
        url: 'https://example.com/news8',
        urlToImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        publishedAt: new Date().toISOString(),
        content: 'Anthropic leads charge in AI safety with record funding...',
      },
    ],
  };
}

export function clearCache() {
  cache.clear();
}

