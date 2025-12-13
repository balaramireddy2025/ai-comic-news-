import React from 'react';

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  tailPosition?: 'left' | 'right' | 'bottom';
}

export default function SpeechBubble({
  children,
  className = '',
  tailPosition = 'left',
}: SpeechBubbleProps) {
  const tailClasses = {
    left: 'before:left-4',
    right: 'before:right-4',
    bottom: 'before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2',
  };

  return (
    <div
      className={`
        relative
        bg-white
        border-4
        border-black
        rounded-2xl
        p-4
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        before:content-['']
        before:absolute
        before:w-0
        before:h-0
        before:border-l-[15px]
        before:border-l-transparent
        before:border-r-[15px]
        before:border-r-transparent
        before:border-t-[15px]
        before:border-t-black
        ${tailClasses[tailPosition]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

