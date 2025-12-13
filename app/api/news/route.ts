import { NextRequest, NextResponse } from 'next/server';
import { fetchNews } from '@/lib/newsApi';
import { NewsCategory } from '@/types/news';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Only fetch AI news - ignore category parameter
    const apiKey = process.env.NEWS_API_KEY;

    const newsData = await fetchNews('technology', apiKey);

    return NextResponse.json(newsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

