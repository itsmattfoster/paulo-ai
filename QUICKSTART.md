# 🚀 Quick Start Guide

Get your Content AI app running in 3 simple steps!

## ⚡ Quick Setup (5 minutes)

### Option 1: Using Batch Files (Easiest - Windows)

1. **Double-click `setup.bat`** to install dependencies
2. **Edit `.env`** file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. **Double-click `run.bat`** to start the app
4. **Open browser** to http://localhost:3000

### Option 2: Using Command Line

```powershell
# 1. Install dependencies
npm install

# 2. Create .env file and add your OpenAI API key
Copy-Item .env.example .env
# Edit .env file with your API key

# 3. Start the app
npm run dev

# 4. Open http://localhost:3000
```

## 🔑 Get Your OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys
4. Click "Create new secret key"
5. Copy the key and paste it in your `.env` file

## 📝 How to Use

### Step 1: Enter Your URLs
- Website URL: Your main website (e.g., https://yoursite.com)
- YouTube URL: A video with captions enabled (e.g., https://youtube.com/watch?v=xxx)

### Step 2: Wait for Analysis (~1 minute)
The app will:
- ✅ Analyze your website content
- ✅ Extract YouTube transcripts
- ✅ Build your brand context profile

### Step 3: Create Content!
- Choose a mode (Ads, VSL, Emails, etc.)
- Type your request
- Get AI-generated content that matches your brand!

## 🎯 Example Prompts

**Ads Mode:**
- "Create a Facebook ad for my coaching program"
- "Write 5 ad variations for my product launch"

**VSL Mode:**
- "Write a 3-minute VSL script for my course"
- "Create a compelling hook for my VSL"

**Email Mode:**
- "Write a welcome email for new subscribers"
- "Create a 5-email launch sequence"

**Short-form Mode:**
- "Create a 30-second TikTok script"
- "Write 10 Instagram Reels ideas"

## ⚠️ Troubleshooting

**Problem:** "npm is not recognized"
- **Solution:** Install Node.js from https://nodejs.org/

**Problem:** "Failed to analyze YouTube content"
- **Solution:** Ensure the video has captions/subtitles enabled

**Problem:** API errors
- **Solution:** Check your OpenAI API key in `.env` file

**Problem:** Website blocked
- **Solution:** Some sites block scraping; try a different page

## 💡 Pro Tips

1. Use your homepage or about page for best website analysis
2. Choose a YouTube video that represents your typical content
3. The more detailed your prompts, the better the results
4. Try different modes to see which works best for your needs
5. You can reset the conversation to start fresh anytime

## 🎨 Features

✨ Multiple content modes (8 types!)
✨ Real-time streaming responses
✨ Brand-aware content generation
✨ Beautiful, modern UI
✨ Persistent context profile
✨ Easy mode switching

## 📚 Need More Help?

Check out `SETUP.md` for detailed setup instructions and troubleshooting.

---

**Ready to create amazing content? Let's go! 🎉**

