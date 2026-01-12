# 🚀 Deploy to Vercel - Step by Step

## Quick Deployment Guide

### Step 1: Go to Vercel
1. Open your browser
2. Go to: **https://vercel.com**
3. Click **"Sign Up"** or **"Log In"**
   - You can sign in with your GitHub account (recommended)

### Step 2: Import Your Project
1. After logging in, click **"Add New..."** button (top right)
2. Click **"Project"**
3. You'll see a list of your GitHub repositories
4. Find: **`CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`**
5. Click **"Import"** next to it

### Step 3: Configure (Auto-Detected)
Vercel will automatically detect:
- ✅ Framework: Python
- ✅ Build settings from `vercel.json`
- ✅ All configuration is ready!

**You don't need to change anything!** Just proceed.

### Step 4: Add Environment Variables ⚠️ IMPORTANT
**Before clicking Deploy, add your API key:**

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** button
3. Fill in:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here` (paste your actual API key)
   - **Environment:** Select all three:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
4. Click **"Save"**

5. (Optional) Add model setting:
   - Click **"Add"** again
   - **Key:** `OPENAI_MODEL`
   - **Value:** `gpt-3.5-turbo`
   - **Environment:** Select all
   - Click **"Save"**

### Step 5: Deploy! 🎉
1. Click the big **"Deploy"** button
2. Wait 2-3 minutes while Vercel builds your app
3. You'll see build progress in real-time

### Step 6: Your App is Live! 🌐
After deployment completes:
- You'll see: **"Congratulations! Your project has been deployed"**
- Click on the deployment URL (e.g., `https://customer-support-ai-agent-chatbot.vercel.app`)
- Your chatbot is now live!

## What Happens Next?

✅ **Automatic Deployments**: Every time you push to GitHub, Vercel will automatically redeploy
✅ **Custom Domain**: You can add your own domain in Vercel settings
✅ **Analytics**: View traffic and performance in Vercel dashboard

## Need Help?

- **Build fails?** Check the build logs in Vercel dashboard
- **API not working?** Verify `OPENAI_API_KEY` is set correctly
- **Questions?** Check Vercel docs: https://vercel.com/docs

---

**Your Repository:** https://github.com/Yashraj2302/CUSTOMER-SUPPORT-AI-AGENT-CHATBOT
