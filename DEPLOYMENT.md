# GitHub Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `ai-comic-news` (or any name you prefer)
4. Description: "Comic Style AI News Website"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal (in the project directory):

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ai-comic-news.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Alternative: Using GitHub CLI**
```bash
# If you have GitHub CLI installed
gh repo create ai-comic-news --public --source=. --remote=origin --push
```

## Step 3: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your repository: `YOUR_USERNAME/ai-comic-news`
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. **Environment Variables**:
   - Click **"Environment Variables"**
   - Add: `NEWS_API_KEY` = `your_newsapi_key_here`
6. Click **"Deploy"**

Your site will be live at `https://your-project-name.vercel.app`!

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: ai-comic-news
# - Directory: ./
# - Override settings? No
# - Add environment variable NEWS_API_KEY
```

## Step 4: Set Up Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments

Every time you run:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically build and deploy your changes!

## Step 5: Get Your NewsAPI.org Key

1. Visit [newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to Vercel environment variables (Step 3, Option A)

## Alternative Deployment Options

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variable: `NEWS_API_KEY`
6. Deploy!

### GitHub Pages (Static Export)

For GitHub Pages, you'll need to configure Next.js for static export:

1. Update `next.config.mjs`:
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
};
```

2. Build and deploy:
```bash
npm run build
# Then use GitHub Actions or manual deployment
```

## Troubleshooting

### Build Fails
- Check that `NEWS_API_KEY` is set in environment variables
- Verify Node.js version (18+) in Vercel settings

### API Not Working
- Ensure `NEWS_API_KEY` is correctly set
- Check NewsAPI.org dashboard for rate limits
- App will use mock data if API key is missing

### Deployment Not Updating
- Clear Vercel cache: Project Settings → Clear Build Cache
- Force redeploy: Deployments → Redeploy

## Continuous Deployment

Once set up, your workflow is simple:

1. Make changes locally
2. Commit: `git add . && git commit -m "Update"`
3. Push: `git push`
4. Vercel automatically deploys!

Your comic-style news website is now live! 🎨📰

