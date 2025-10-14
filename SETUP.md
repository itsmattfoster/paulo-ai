# Content AI App - Setup Guide

## Prerequisites

Before you can run this app, you need to have the following installed:

### 1. Node.js and npm
- Download and install Node.js from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- This will also install npm (Node Package Manager)
- After installation, verify by opening a new PowerShell window and running:
  ```powershell
  node --version
  npm --version
  ```

### 2. OpenAI API Key
- Sign up or log in to OpenAI: https://platform.openai.com/
- Go to API Keys section
- Create a new API key and save it securely

## Installation Steps

### Step 1: Install Dependencies
Open PowerShell in the project directory and run:
```powershell
npm install
```

This will install all required packages (may take a few minutes).

### Step 2: Configure Environment Variables
1. Copy the `.env.example` file to create a new `.env` file:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open the `.env` file in a text editor and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Step 3: Run the Development Server
```powershell
npm run dev
```

The app will start on http://localhost:3000

Open your browser and navigate to http://localhost:3000

## How to Use the App

### Step 1: Enter Your URLs
On the landing page, enter:
- Your website URL (e.g., https://yourwebsite.com)
- Your YouTube channel or video URL (e.g., https://youtube.com/watch?v=...)

**Note:** At least one URL is required. The YouTube video must have captions/subtitles enabled.

### Step 2: Analysis (takes ~1 minute)
The app will:
1. Scrape and analyze your website content
2. Extract transcripts from your YouTube videos
3. Use AI to create a detailed brand context profile

### Step 3: Create Content
Once analysis is complete, you can:
- Select different content modes (Ads, VSL, Emails, etc.)
- Chat with the AI to generate content
- The AI uses your brand context to create personalized content

## Content Modes

- **General**: General-purpose AI assistant
- **Ads**: Create compelling advertisements
- **VSL**: Video Sales Letter scripts
- **Emails**: Email marketing copy
- **Webinar**: Webinar scripts and content
- **Short-form**: Short scripts for TikTok, Reels, etc.
- **Long-form**: Detailed long-form content
- **Social**: Social media posts

## Troubleshooting

### "npm is not recognized"
- Make sure Node.js is installed
- Restart your computer after installing Node.js
- Verify installation with `node --version`

### "Failed to analyze YouTube content"
- Ensure the video has captions/subtitles enabled
- Try using a different video from the same channel
- Make sure the URL is correct

### "Failed to analyze website"
- Verify the website URL is correct and accessible
- Some websites block automated scraping
- Try a different page from the same website

### API Errors
- Check that your OpenAI API key is correct in the `.env` file
- Ensure you have credits in your OpenAI account
- Check the console for detailed error messages

## Project Structure

```
content-ai-app/
├── app/
│   ├── api/          # API routes
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── components/       # React components
├── lib/             # Utility functions
├── store/           # State management (Zustand)
├── public/          # Static assets
├── .env             # Environment variables (create this)
├── .env.example     # Example environment variables
└── package.json     # Dependencies
```

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all setup steps are completed
3. Ensure API keys are valid
4. Check that Node.js and npm are properly installed

## Tips for Best Results

1. **Website URL**: Use your main landing page or about page for best brand analysis
2. **YouTube**: Provide a video that represents your typical content style
3. **Multiple Videos**: For now, use one representative video; future versions may support channel-wide analysis
4. **Context Profile**: The more content you provide, the better the AI understands your brand

## Building for Production

To build for production:
```powershell
npm run build
npm start
```

The production build will be optimized for performance.

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI API**: GPT-4 for content generation
- **Zustand**: State management
- **Cheerio**: Web scraping
- **YouTube Transcript API**: Extract video transcripts

Enjoy creating amazing content with AI! 🚀

