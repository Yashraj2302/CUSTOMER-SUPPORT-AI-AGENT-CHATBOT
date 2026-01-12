# 🚀 Deploy to Vercel - Step by Step Guide

## Quick Deployment Steps

### Step 1: Go to Vercel
1. Open your browser
2. Visit: **https://vercel.com**
3. Click **"Sign Up"** or **"Log In"**
   - **Recommended:** Sign in with your GitHub account (same account as your repo)

### Step 2: Import Your Project
1. After logging in, click **"Add New..."** button (top right corner)
2. Click **"Project"** from the dropdown
3. You'll see a list of your GitHub repositories
4. Find and click on: **`CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`**
5. Click **"Import"** button

### Step 3: Project Configuration
Vercel will automatically detect:
- ✅ **Framework:** Python
- ✅ **Build Settings:** From `vercel.json`
- ✅ **All configuration is ready!**

**You don't need to change anything!** The `vercel.json` file handles all the configuration.

### Step 4: Add Environment Variables ⚠️ CRITICAL
**BEFORE clicking Deploy, you MUST add your OpenAI API key:**

1. Scroll down to the **"Environment Variables"** section
2. Click the **"Add"** button
3. Fill in the first variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here` (paste your actual API key)
   - **Environment:** Select ALL three checkboxes:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
4. Click **"Save"**

5. (Optional but recommended) Add model setting:
   - Click **"Add"** button again
   - **Key:** `OPENAI_MODEL`
   - **Value:** `gpt-3.5-turbo`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

### Step 5: Deploy! 🎉
1. Scroll to the bottom
2. Click the big **"Deploy"** button
3. Watch the build progress in real-time
4. Wait 2-3 minutes for the deployment to complete

### Step 6: Your App is Live! 🌐
After deployment:
- You'll see: **"Congratulations! Your project has been deployed"**
- Click on the deployment URL (e.g., `https://customer-support-ai-agent-chatbot.vercel.app`)
- **Your chatbot is now live and ready to use!**

## What Happens Next?

✅ **Automatic Deployments:** Every time you push to GitHub, Vercel will automatically redeploy your app

✅ **Custom Domain:** You can add your own domain in Vercel project settings

✅ **Analytics:** View traffic and performance metrics in the Vercel dashboard

✅ **Logs:** Monitor your app's logs and function execution in real-time

## Troubleshooting

### Build Fails?
- Check the build logs in Vercel dashboard
- Make sure `requirements.txt` has all dependencies
- Verify `vercel.json` is correct

### API Not Working?
- Verify `OPENAI_API_KEY` is set correctly in environment variables
- Check Vercel function logs for errors
- Make sure your OpenAI account has credits

### Need to Update?
Just push to GitHub - Vercel will auto-deploy:
```bash
git add .
git commit -m "Update"
git push
```

## Your Repository
🔗 **GitHub:** https://github.com/Yashraj2302/CUSTOMER-SUPPORT-AI-AGENT-CHATBOT

---

**Ready to deploy? Follow the steps above!** 🚀
