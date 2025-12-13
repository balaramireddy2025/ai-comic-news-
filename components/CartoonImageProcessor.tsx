import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CartoonImageProcessorProps {
  originalUrl: string;
  alt: string;
  width: number;
  height: number;
}

export default function CartoonImageProcessor({
  originalUrl,
  alt,
  width,
  height,
}: CartoonImageProcessorProps) {
  const [cartoonUrl, setCartoonUrl] = useState<string>(originalUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useCartoon, setUseCartoon] = useState(true);

  useEffect(() => {
    if (useCartoon && originalUrl) {
      convertToCartoon();
    }
  }, [originalUrl, useCartoon]);

  const convertToCartoon = async () => {
    setLoading(true);
    setError(null);
    try {
      // Method 1: Try Hugging Face Cartoon GAN
      const hfToken = process.env.NEXT_PUBLIC_HF_API_KEY;
      
      if (hfToken) {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/ogkalu/Cartoon-Gan',
          {
            headers: { Authorization: `Bearer ${hfToken}` },
            method: 'POST',
            body: JSON.stringify({ inputs: originalUrl }),
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const cartoonImageUrl = URL.createObjectURL(blob);
          setCartoonUrl(cartoonImageUrl);
          setLoading(false);
          return;
        }
      }

      // Fallback: Canvas-based cartoon effect (no API needed)
      await applyCanvasCartoonEffect();
    } catch (err) {
      console.error('Cartoon conversion error:', err);
      setError('Could not convert to cartoon style');
      setLoading(false);
    }
  };

  const applyCanvasCartoonEffect = async () => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setError('Canvas context error');
          setLoading(false);
          resolve();
          return;
        }

        // Apply color filters for cartoon effect
        ctx.filter =
          'contrast(1.6) saturate(1.9) brightness(1.1) hue-rotate(-5deg)';
        ctx.drawImage(img, 0, 0);

        // Get image data for posterization
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Reduce color palette (posterize effect)
        for (let i = 0; i < data.length; i += 4) {
          const levels = 6; // Reduce to 6 color levels per channel
          data[i] = Math.round(data[i] / (256 / levels)) * (256 / levels); // R
          data[i + 1] =
            Math.round(data[i + 1] / (256 / levels)) * (256 / levels); // G
          data[i + 2] =
            Math.round(data[i + 2] / (256 / levels)) * (256 / levels); // B
        }

        ctx.putImageData(imageData, 0, 0);

        // Add black outlines for cartoon effect
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.3;

        // Draw edges
        for (let y = 0; y < canvas.height; y += 3) {
          for (let x = 0; x < canvas.width; x += 3) {
            ctx.strokeRect(x, y, 3, 3);
          }
        }

        ctx.globalAlpha = 1;

        const cartoonImage = canvas.toDataURL('image/png');
        setCartoonUrl(cartoonImage);
        setLoading(false);
        resolve();
      };

      img.onerror = () => {
        setError('Could not load image');
        setLoading(false);
        resolve();
      };

      img.src = originalUrl;
    });
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
          <span className="text-white font-bold text-sm">Converting...</span>
        </div>
      )}

      <img
        src={cartoonUrl}
        alt={alt}
        className="w-full h-full object-cover rounded border-2 border-black"
      />

      {error && (
        <p className="text-xs text-red-600 mt-1">
          ⚠️ {error} - Using original image
        </p>
      )}
    </div>
  );
}