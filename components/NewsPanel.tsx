'use client';

import CartoonImageProcessor from './CartoonImageProcessor';

interface NewsPanelProps {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  source: string;
  accentColor: string;
}

export default function NewsPanel({
  number,
  title,
  description,
  imageUrl,
  category,
  timestamp,
  source,
  accentColor,
}: NewsPanelProps) {
  return (
    <div 
      className={`relative rounded-3xl border-4 border-black ${accentColor} overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:scale-[1.02] flex flex-col group`}
    >
      {/* Comic panel border details */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-2 h-full bg-black/10"></div>
      <div className="absolute top-0 right-0 w-2 h-full bg-black/10"></div>
      {/* Comic Panel Header */}
      <div className="relative bg-black/5 border-b-4 border-black p-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-comic-red border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-comic-yellow border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-comic-green border-2 border-black"></div>
          </div>
          <div 
            className={`w-12 h-12 ${accentColor} rounded-full border-4 border-black flex items-center justify-center font-black text-2xl shadow-lg z-10 transform group-hover:rotate-12 transition-transform`}
          >
            {number}
          </div>
        </div>

        {/* Comic Panel Image with Cartoon Effect */}
        <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
          {imageUrl ? (
            <CartoonImageProcessor
              originalUrl={imageUrl}
              alt={title}
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 font-bold">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col bg-white/90 relative">
        <div className="absolute inset-0 bg-comic-dots opacity-5"></div>
        <div className="relative z-10">
        {/* Category Badge */}
        <div className="flex gap-2 mb-4">
          <span
            className={`px-4 py-2 rounded-full border-2 border-black font-black text-xs ${accentColor} uppercase transform -rotate-2 inline-block hover:rotate-0 transition-transform`}
          >
            {category}
          </span>
          <div className="absolute top-0 right-0 w-16 h-16 bg-comic-yellow rounded-full -mr-6 -mt-6 border-4 border-black"></div>
        </div>

        {/* Comic Speech Bubble Title */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 mb-4 relative transform hover:rotate-1 transition-transform">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border-t-4 border-l-4 border-r-0 border-b-0 border-black transform rotate-45"></div>
          <h3 className="font-black text-sm md:text-base leading-tight text-black relative z-10">
            {title}
          </h3>
          <div className="absolute -bottom-4 right-4 w-8 h-8 bg-comic-blue rounded-full border-2 border-black"></div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm leading-relaxed text-gray-800 mb-3 flex-1">
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-black my-2"></div>

        {/* Metadata */}
        <div className="flex justify-between items-center text-xs font-bold mb-4 mt-auto">
          <span className="bg-comic-yellow px-3 py-1 border-2 border-black rounded-full transform hover:scale-110 transition-transform">
            📰 {source}
          </span>
          <span className="bg-white px-3 py-1 border-2 border-black rounded-full">
            🕒 {timestamp}
          </span>
        </div>

        {/* Read More Button */}
        <div className="relative group/button">
          <div className="absolute inset-0 bg-black rounded-xl transform translate-x-1 translate-y-1 group-hover/button:translate-x-2 group-hover/button:translate-y-2 transition-transform"></div>
          <button
            className={`relative w-full ${accentColor} border-4 border-black rounded-xl py-3 font-black text-black uppercase hover:shadow-lg transition-all transform group-hover/button:-translate-x-1 group-hover/button:-translate-y-1 active:translate-x-0 active:translate-y-0`}
          >
            <span className="group-hover/button:animate-pulse">READ THE CARTOON →</span>
          </button>
        </div>
        </div>
      </div>
      {/* Comic panel bottom decoration */}
      <div className="h-2 bg-black/10"></div>
      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-comic-red rounded-full border-2 border-black transform group-hover:scale-150 transition-transform"></div>
    </div>
  );
}