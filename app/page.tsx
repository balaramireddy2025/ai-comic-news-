'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsCategory } from '@/types/news';
import ComicLayout from '@/components/ComicLayout';
import SpeechBubble from '@/components/SpeechBubble';

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory>('general');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const categories: NewsCategory[] = [
    'general',
    'technology',
    'business',
    'entertainment',
    'sports',
    'science',
    'health',
  ];

  const fetchNews = async (selectedCategory: NewsCategory = category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/news?category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(data.articles || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (newCategory: NewsCategory) => {
    setCategory(newCategory);
    fetchNews(newCategory);
  };

  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <main className="min-h-screen pb-8">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="font-comic text-4xl md:text-5xl text-black mb-2">
                COMIC STYLE AI NEWS
              </h1>
              <p className="font-comicBody text-lg text-gray-700">
                Your Daily News in Comic Book Style!
              </p>
            </div>
            <SpeechBubble className="bg-comic-yellow">
              <p className="font-comicBody font-bold text-black">
                {lastUpdate
                  ? `Updated: ${lastUpdate.toLocaleTimeString()}`
                  : 'Ready to load news!'}
              </p>
            </SpeechBubble>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                px-4
                py-2
                border-2
                border-black
                rounded-lg
                font-comicBody
                font-bold
                transition-all
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transform
                hover:translate-x-0.5
                hover:translate-y-0.5
                ${
                  category === cat
                    ? 'bg-comic-yellow text-black'
                    : 'bg-white text-black hover:bg-comic-blue hover:text-white'
                }
              `}
            >
              {cat.toUpperCase()}
            </button>
          ))}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`
              px-4
              py-2
              border-2
              border-black
              rounded-lg
              font-comicBody
              font-bold
              bg-comic-green
              text-black
              transition-all
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
              transform
              hover:translate-x-0.5
              hover:translate-y-0.5
              disabled:opacity-50
              disabled:cursor-not-allowed
            `}
          >
            {loading ? 'LOADING...' : '🔄 REFRESH'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block bg-comic-blue border-4 border-black p-8 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-comic text-3xl text-white mb-2">LOADING...</p>
              <div className="flex gap-2 justify-center">
                <div className="w-4 h-4 bg-white border-2 border-black rounded-full animate-bounce" />
                <div
                  className="w-4 h-4 bg-white border-2 border-black rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-4 h-4 bg-white border-2 border-black rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block bg-comic-red border-4 border-black p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-comic text-2xl text-white mb-2">OOPS!</p>
              <p className="font-comicBody text-lg text-white">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-white border-2 border-black rounded font-comicBody font-bold text-black hover:bg-comic-yellow"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      {!loading && !error && <ComicLayout articles={articles} />}

      {/* Footer */}
      <footer className="mt-12 container mx-auto px-4 text-center">
        <div className="bg-white border-4 border-black rounded-lg p-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-comicBody text-sm text-gray-700">
            Powered by NewsAPI.org | Updates every morning
          </p>
        </div>
      </footer>
    </main>
  );
}

