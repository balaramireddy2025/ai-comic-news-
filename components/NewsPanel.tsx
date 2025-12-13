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
      className={`rounded-3xl border-4 border-black ${accentColor} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col`}
    >
      {/* Badge */}
      <div className="relative">
        <div
          className={`absolute top-3 right-3 w-12 h-12 ${accentColor} rounded-full border-4 border-black flex items-center justify-center font-black text-xl shadow-lg z-10`}
        >
          {number}
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
      <div className="p-5 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full border-2 border-black font-black text-xs ${accentColor} uppercase`}
          >
            {category}
          </span>
        </div>

        {/* Comic Speech Bubble Title */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 mb-3 relative">
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-4 border-black border-t-0 border-l-0 rounded-full"></div>
          <h3 className="font-black text-sm md:text-base leading-tight uppercase text-black">
            {title.toUpperCase()}
          </h3>
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
        <div className="flex justify-between items-center text-xs font-bold mb-3">
          <span className="bg-yellow-300 px-2 py-1 border-2 border-black rounded">
            {source}
          </span>
          <span className="text-gray-700">{timestamp}</span>
        </div>

        {/* Read More Button */}
        <button
          className={`w-full ${accentColor} border-4 border-black rounded-xl py-2 font-black text-black uppercase hover:shadow-lg transition-all transform hover:scale-105 active:scale-95`}
        >
          READ MORE →
        </button>
      </div>
    </div>
  );
}