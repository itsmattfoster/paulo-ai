# 📋 Content AI - Quick Reference Cheatsheet

## 🚀 Commands

```powershell
# Setup (first time only)
npm install              # Install dependencies

# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check for code issues

# Windows Quick Scripts
setup.bat                # Auto setup
run.bat                  # Auto run
```

---

## 🎯 Content Modes

| Mode | Icon | Best For |
|------|------|----------|
| **General** | 💬 | All-purpose assistant |
| **Ads** | 📢 | Facebook, Google, TikTok ads |
| **VSL** | 🎬 | Video Sales Letter scripts |
| **Emails** | 📧 | Email campaigns, sequences |
| **Webinar** | 🎤 | Webinar content, presentations |
| **Short-form** | ⚡ | TikTok, Reels, Shorts |
| **Long-form** | 📝 | Blog posts, articles, guides |
| **Social** | 📱 | Social media posts, captions |

---

## 💡 Prompt Templates

### Ads Mode
```
"Create [number] [platform] ad variations for [product/service] 
targeting [audience], each under [length] words"

"Write a direct response ad for [product] that focuses on [benefit]"

"Generate A/B test ad variations for [campaign], one focusing on 
[angle 1] and another on [angle 2]"
```

### VSL Mode
```
"Write a [duration]-minute VSL script for [product] targeting [audience]"

"Create a compelling hook for my VSL about [topic]"

"Generate a VSL outline with hook, story, pitch, and close for [product]"
```

### Email Mode
```
"Write a [number]-email launch sequence for [product/service]"

"Create a welcome email for new subscribers interested in [topic]"

"Generate a re-engagement email for inactive subscribers"
```

### Webinar Mode
```
"Create a webinar outline for [topic] lasting [duration] minutes"

"Write an intro script for a webinar about [topic]"

"Generate Q&A responses for common questions about [topic]"
```

### Short-form Mode
```
"Create [number] TikTok script ideas about [topic], each 30 seconds"

"Write an Instagram Reel script showcasing [product/benefit]"

"Generate [number] YouTube Shorts hooks about [topic]"
```

### Long-form Mode
```
"Write a comprehensive blog post about [topic] (2000 words)"

"Create an ultimate guide to [topic] with sections and examples"

"Generate an in-depth article comparing [A] vs [B]"
```

### Social Mode
```
"Create [number] Instagram captions for [type of post]"

"Write a Twitter thread about [topic] with [number] tweets"

"Generate [number] LinkedIn posts about [professional topic]"
```

---

## 🎨 Prompt Enhancers

Add these to any prompt for better results:

**Tone:**
- "in a casual/professional/humorous tone"
- "conversational and friendly"
- "authoritative and expert"

**Style:**
- "using storytelling"
- "with emotional hooks"
- "data-driven and factual"

**Format:**
- "with bullet points"
- "using short paragraphs"
- "with a strong CTA"

**Specifics:**
- "targeting [specific audience]"
- "focusing on [specific benefit]"
- "addressing [specific pain point]"

---

## 🔧 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Send message | `Enter` |
| New line in message | `Shift + Enter` |
| Refresh page | `Ctrl + R` or `F5` |
| Open DevTools | `F12` |
| Focus input | Click text area |

---

## 📁 File Locations

| File/Folder | Purpose |
|-------------|---------|
| `.env` | Your API keys (YOU CREATE THIS) |
| `.env.example` | Example format for .env |
| `app/` | Frontend pages and components |
| `app/api/` | Backend API routes |
| `components/` | React UI components |
| `store/` | State management |
| `lib/` | Utility functions |
| `public/` | Static assets |

---

## 🐛 Debugging

### Check Browser Console
```
F12 → Console tab
Look for red errors
```

### Check Terminal/PowerShell
```
Look at server logs
Error messages show here
```

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| "Failed to fetch" | API call failed | Check internet, API key |
| "Invalid API key" | OpenAI key wrong | Check .env file |
| "Port in use" | 3000 taken | Close other apps or change port |
| "Module not found" | Missing package | Run `npm install` |
| "Transcript not found" | No captions | Use video with captions |

---

## 🎯 Best Practices

### ✅ DO:
- Be specific in prompts
- Mention target audience
- Specify desired length
- Ask for multiple variations
- Use the right mode for content type
- Save good outputs externally

### ❌ DON'T:
- Use vague prompts like "write content"
- Forget to specify audience
- Ignore context profile results
- Use videos without captions
- Share your API key
- Commit .env to git

---

## 📊 API Usage & Costs

### Typical Costs (OpenAI):
- **Analysis**: $0.01-0.05 per brand
- **Chat message**: $0.001-0.01 each
- **Long content**: $0.02-0.10 per piece

### Models Used:
- **gpt-4o-mini**: Analysis and chat
- **Input**: ~$0.15 per 1M tokens
- **Output**: ~$0.60 per 1M tokens

### Monitor Usage:
https://platform.openai.com/usage

---

## 🔄 Workflow Examples

### Launch Campaign
```
1. Analyze brand (once)
2. Switch to Ads mode
3. "Create 5 launch ad variations for [product]"
4. Switch to Email mode
5. "Create 5-email launch sequence"
6. Switch to Social mode
7. "Generate 10 launch posts for Instagram"
```

### Content Series
```
1. Analyze brand (once)
2. Switch to Long-form mode
3. "Create blog post outline about [topic]"
4. "Write full blog post from outline"
5. Switch to Social mode
6. "Create 5 social posts promoting this blog"
7. Switch to Short-form mode
8. "Generate 3 TikTok scripts from blog key points"
```

### Sales Funnel
```
1. Analyze brand (once)
2. Ads mode: "Create lead generation ads"
3. Email mode: "Write welcome sequence"
4. Webinar mode: "Create webinar script"
5. VSL mode: "Write VSL for buyers"
6. Email mode: "Generate sales email sequence"
```

---

## 🚨 Emergency Fixes

### App Won't Start
```powershell
# Delete and reinstall
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
npm run dev
```

### Weird Behavior
```
1. Clear browser cache (Ctrl + Shift + Delete)
2. Reset app (click Reset button)
3. Restart dev server (Ctrl + C, then npm run dev)
```

### Lost Context
```
Context is saved in browser localStorage
- Check if you're in same browser
- Try Reset and re-analyze
- Check browser storage isn't full
```

---

## 📞 Quick Links

| Resource | URL |
|----------|-----|
| OpenAI Platform | https://platform.openai.com |
| OpenAI API Keys | https://platform.openai.com/api-keys |
| OpenAI Usage | https://platform.openai.com/usage |
| Node.js Download | https://nodejs.org |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind Docs | https://tailwindcss.com |

---

## 💾 Data & Storage

### What's Stored:
- ✅ Context profile (localStorage)
- ✅ Chat messages (localStorage)
- ✅ Current mode (localStorage)

### What's NOT Stored:
- ❌ API keys (only in .env)
- ❌ Passwords (none needed)
- ❌ Payment info (none needed)

### Clear Data:
```
Method 1: Click "Reset" button in app
Method 2: Browser settings → Clear site data
Method 3: Delete localStorage in DevTools
```

---

## 🎓 Learning Resources

### Beginner:
1. START_HERE.md
2. QUICKSTART.md
3. Try example prompts
4. Experiment with modes

### Intermediate:
5. SETUP.md
6. Try advanced prompts
7. Analyze multiple brands
8. Create templates

### Advanced:
9. PROJECT_SUMMARY.md
10. Modify code
11. Add features
12. Deploy production

---

## ✅ Daily Checklist

### Starting Up:
- [ ] Run `npm run dev` or `run.bat`
- [ ] Open http://localhost:3000
- [ ] Check context profile loaded
- [ ] Select appropriate mode

### Using:
- [ ] Write specific prompts
- [ ] Mention target audience
- [ ] Specify content length
- [ ] Review and refine output
- [ ] Save good outputs

### Shutting Down:
- [ ] Save any important outputs externally
- [ ] Stop server (Ctrl + C)
- [ ] (Optional) Clear chat for privacy

---

## 🎉 Quick Wins

Try these for immediate results:

```
1. "Create 3 ad headlines for [your product]"
2. "Write an email subject line that gets opens"
3. "Generate 5 social post ideas about [your topic]"
4. "Create a hook for my next video"
5. "Write a product description in 50 words"
```

---

**Keep this cheatsheet handy while using the app! 🚀**

**Print it out or keep it open in a second window.**

