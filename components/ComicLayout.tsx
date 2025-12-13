'use client';

import React from 'react';
import { NewsArticle } from '@/types/news';
import NewsPanel from './NewsPanel';

interface ComicLayoutProps {
  articles: NewsArticle[];
}

export default function ComicLayout({ articles }: ComicLayoutProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block bg-comic-yellow border-4 border-black p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-comic text-2xl text-black">No news found!</p>
          <p className="font-comicBody text-lg text-gray-800 mt-2">
            Check back later for updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {articles.map((article, index) => (
        <NewsPanel key={article.url || index} article={article} index={index} />
      ))}
    </div>
  );
}

