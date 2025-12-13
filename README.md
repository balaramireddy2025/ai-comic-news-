# Comic Style AI News Website

A vibrant, comic book-style news website that fetches and displays news from multiple sources in an engaging comic panel format.

## Features

- 🎨 **Comic Book Aesthetic**: Bold colors, speech bubbles, and panel-based layout
- 📰 **Multiple News Sources**: Fetches news from NewsAPI.org (free tier)
- 🔄 **Daily Updates**: Automatic caching with manual refresh option
- 📱 **Responsive Design**: Works beautifully on all devices
- 🎯 **Category Filtering**: Filter news by category (tech, business, sports, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- NewsAPI.org API key (free tier available at [newsapi.org](https://newsapi.org))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEWS_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Without API Key

The app will work with mock data if no API key is provided, perfect for development and testing.

## Project Structure

```
/
├── app/
│   ├── api/news/route.ts    # News API endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Comic styling
├── components/
│   ├── ComicLayout.tsx       # Grid layout component
│   ├── NewsPanel.tsx         # Individual news panel
│   └── SpeechBubble.tsx      # Speech bubble component
├── lib/
│   ├── newsApi.ts            # NewsAPI integration
│   └── utils.ts              # Utility functions
└── types/
    └── news.ts               # TypeScript types
```

## Deployment

### Quick Deploy via GitHub

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.**

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-comic-news.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" → Import your repository
   - Add environment variable: `NEWS_API_KEY`
   - Click "Deploy"

Your site will be live automatically! Every push to GitHub triggers a new deployment.

### Daily Updates

For automatic daily updates, you can:
- Set up a Vercel Cron Job to hit `/api/news` endpoint
- Use a service like EasyCron to ping your API endpoint
- Manually refresh using the refresh button

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **NewsAPI.org** - News data source

## License

MIT

