import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Comic News - The ONLY Comic-Style AI News Source",
  description: "100% AI News in 100% Comic Style! The unique news source for AI tech enthusiasts. No sports, no politics - just AI news in beautiful comic book format.",
  keywords: ["AI news", "artificial intelligence", "comic style news", "AI technology", "machine learning", "comic book style", "tech news", "AI updates"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

