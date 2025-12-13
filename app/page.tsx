'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsCategory } from '@/types/news';
import ComicLayout from '@/components/ComicLayout';
import SpeechBubble from '@/components/SpeechBubble';

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/news');
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
              <h1 className="font-comic text-4xl md:text-6xl text-black mb-2 transform hover:scale-105 transition-transform">
                🤖 AI COMIC NEWS
              </h1>
              <p className="font-comicBody text-xl text-gray-800 font-bold">
                The ONLY Comic-Style AI News Source for Tech Enthusiasts!
              </p>
              <p className="font-comicBody text-sm text-gray-600 mt-1">
                100% AI News • 100% Comic Style • 100% Unique
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

      {/* AI News Only Badge & Refresh */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <div className="bg-comic-blue border-4 border-black px-6 py-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform">
            <p className="font-comic text-2xl text-white">
              ⚡ AI NEWS ONLY ⚡
            </p>
            <p className="font-comicBody text-sm text-white mt-1">
              No Sports • No Politics • Just AI!
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`
              px-6
              py-3
              border-4
              border-black
              rounded-lg
              font-comic
              font-bold
              text-xl
              bg-comic-green
              text-black
              transition-all
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              transform
              hover:translate-x-1
              hover:translate-y-1
              disabled:opacity-50
              disabled:cursor-not-allowed
            `}
          >
            {loading ? '⚡ LOADING...' : '🔄 REFRESH AI NEWS'}
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
        <div className="bg-comic-yellow border-4 border-black rounded-lg p-6 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-comic text-xl text-black mb-2">
            🤖 THE AI NEWS SOURCE FOR TECH PEOPLE 🤖
          </p>
          <p className="font-comicBody text-sm text-gray-800">
            Powered by NewsAPI.org | Fresh AI News Every Morning | Comic Style Only
          </p>
        </div>
      </footer>
    </main>
  );
}

