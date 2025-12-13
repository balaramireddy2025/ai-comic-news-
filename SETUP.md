# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Get NewsAPI.org API Key (Free)
1. Visit [https://newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier: 100 requests/day

## Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEWS_API_KEY=your_api_key_here
```

**Note:** The app will work with mock data if no API key is provided, perfect for testing!

## Step 4: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variable:
   - Name: `NEWS_API_KEY`
   - Value: Your NewsAPI.org API key
5. Click "Deploy"

Your site will be live at `your-project.vercel.app`!

## Daily Updates

The app includes:
- **24-hour caching** to respect API rate limits
- **Manual refresh button** to update news anytime
- **Automatic updates** when you visit the site (if cache expired)

For automated daily updates, you can set up a Vercel Cron Job or use a service like EasyCron to ping your `/api/news` endpoint.

## Features

✅ Comic book style panels with speech bubbles  
✅ Multiple news categories (tech, business, sports, etc.)  
✅ Responsive design for all devices  
✅ Free tier API integration  
✅ Daily news updates  
✅ Beautiful animations and effects  

Enjoy your comic-style news website! 🎨📰

