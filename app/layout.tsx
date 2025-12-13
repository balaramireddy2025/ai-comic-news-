import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comic Style AI News",
  description: "Get your daily news in a vibrant comic book style! Fresh updates every morning.",
  keywords: ["news", "comic", "AI", "daily news", "comic book style"],
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

