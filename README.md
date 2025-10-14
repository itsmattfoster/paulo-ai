# Content AI App

An intelligent AI-powered content creation platform that analyzes your website and YouTube content to generate personalized marketing materials.

## Features

- **Context Analysis**: Analyzes your website and YouTube channel transcripts to create a detailed context profile
- **Multiple Content Modes**: Generate different types of content:
  - Ads
  - VSL (Video Sales Letters)
  - Emails
  - Webinars
  - Short-form Scripts
  - Long-form Scripts
  - And more!
- **AI-Powered Chat**: ChatGPT-like interface with your brand context
- **Beautiful Modern UI**: Clean, responsive design with smooth animations

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Enter Your URLs**: Paste your website URL and YouTube channel/video URL
2. **Analysis**: The app will analyze your content (takes about 1 minute)
3. **Chat**: Use the AI chat interface with different content modes to generate tailored content

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API
- YouTube Transcript API
- Cheerio (Web Scraping)

## License

MIT

