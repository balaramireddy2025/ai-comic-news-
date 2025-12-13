'use client';

import React from 'react';
import Image from 'next/image';
import { NewsArticle } from '@/types/news';
import { formatDate, truncateText, getComicColor } from '@/lib/utils';
import SpeechBubble from './SpeechBubble';

interface NewsPanelProps {
  article: NewsArticle;
  index: number;
}

export default function NewsPanel({ article, index }: NewsPanelProps) {
  const comicColor = getComicColor(index);
  const hasImage = article.urlToImage;

  return (
    <div
      className={`
        relative
        bg-white
        border-4
        border-black
        rounded-lg
        overflow-hidden
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        transform
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        hover:-rotate-1
        animate-fadeIn
        comic-panel-hover
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* AI Badge */}
      <div className="absolute top-2 left-2 z-10 bg-comic-red border-3 border-black px-3 py-1 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <span className="font-comic text-sm text-white">🤖 AI</span>
      </div>

      {/* Comic Panel Number Badge */}
      <div
        className={`
          absolute
          top-2
          right-2
          z-10
          border-3
          border-black
          rounded-full
          w-12
          h-12
          flex
          items-center
          justify-center
          font-comic
          font-bold
          text-black
          text-xl
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          transform
          hover:scale-110
          transition-transform
          ${
            comicColor === 'comic-yellow' ? 'bg-comic-yellow' :
            comicColor === 'comic-red' ? 'bg-comic-red' :
            comicColor === 'comic-blue' ? 'bg-comic-blue' :
            comicColor === 'comic-green' ? 'bg-comic-green' :
            comicColor === 'comic-orange' ? 'bg-comic-orange' :
            'bg-comic-purple'
          }
        `}
      >
        {index + 1}
      </div>

      {/* Image Section with Comic Style */}
      {hasImage && (
        <div className="relative w-full h-56 bg-gray-200 border-b-4 border-black">
          <Image
            src={article.urlToImage!}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Comic style overlay with halftone effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, transparent 1px, rgba(0,0,0,0.1) 1px)',
            backgroundSize: '8px 8px'
          }} />
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        {/* Speech Bubble for Title */}
        <SpeechBubble
          className={`
            mb-3
            min-h-[80px]
            ${
              comicColor === 'comic-yellow' ? 'bg-comic-yellow' :
              comicColor === 'comic-red' ? 'bg-comic-red' :
              comicColor === 'comic-blue' ? 'bg-comic-blue' :
              comicColor === 'comic-green' ? 'bg-comic-green' :
              comicColor === 'comic-orange' ? 'bg-comic-orange' :
              'bg-comic-purple'
            }
          `}
          tailPosition={index % 2 === 0 ? 'left' : 'right'}
        >
          <h3
            className={`
              font-comic
              text-lg
              font-bold
              text-black
              leading-tight
            `}
          >
            {truncateText(article.title, 100)}
          </h3>
        </SpeechBubble>

        {/* Description */}
        {article.description && (
          <p
            className={`
              font-comicBody
              text-sm
              text-gray-800
              mb-3
              leading-relaxed
            `}
          >
            {truncateText(article.description, 150)}
          </p>
        )}

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-black border-dashed">
          <div className="flex items-center gap-2">
            <span
              className={`
                border-2
                border-black
                px-2
                py-1
                rounded
                font-comicBody
                text-xs
                font-bold
                text-black
                ${
                  comicColor === 'comic-yellow' ? 'bg-comic-yellow' :
                  comicColor === 'comic-red' ? 'bg-comic-red' :
                  comicColor === 'comic-blue' ? 'bg-comic-blue' :
                  comicColor === 'comic-green' ? 'bg-comic-green' :
                  comicColor === 'comic-orange' ? 'bg-comic-orange' :
                  'bg-comic-purple'
                }
              `}
            >
              {article.source.name}
            </span>
          </div>
          <span className="font-comicBody text-xs text-gray-600 font-bold">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Read More Button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            block
            mt-3
            w-full
            border-2
            border-black
            text-black
            font-comic
            font-bold
            py-2
            px-4
            rounded
            text-center
            hover:opacity-80
            transition-opacity
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
            transform
            hover:translate-x-0.5
            hover:translate-y-0.5
            ${
              comicColor === 'comic-yellow' ? 'bg-comic-yellow' :
              comicColor === 'comic-red' ? 'bg-comic-red' :
              comicColor === 'comic-blue' ? 'bg-comic-blue' :
              comicColor === 'comic-green' ? 'bg-comic-green' :
              comicColor === 'comic-orange' ? 'bg-comic-orange' :
              'bg-comic-purple'
            }
          `}
        >
          READ MORE →
        </a>
      </div>
    </div>
  );
}

