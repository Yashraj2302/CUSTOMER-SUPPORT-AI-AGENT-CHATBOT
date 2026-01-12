# 🔗 Connect Git to Vercel - Action Steps

## Quick Connection Guide

Follow these exact steps to connect your GitHub repository to Vercel:

## Step 1: Go to Vercel
1. Open your browser
2. Visit: **https://vercel.com**
3. If not logged in, click **"Log In"**

## Step 2: Sign In with GitHub (If Not Already)
1. Click **"Continue with GitHub"** button
2. Authorize Vercel to access your GitHub account
3. Grant permissions to access your repositories

## Step 3: Import Your Repository
1. After logging in, you'll see the Vercel Dashboard
2. Click the **"Add New..."** button (top right)
3. Click **"Project"** from the dropdown menu
4. You'll see a list of your GitHub repositories
5. **Find:** `CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`
6. Click the **"Import"** button next to it

## Step 4: Configure Project Settings
Vercel will show you project configuration:

**Framework Preset:** Python (auto-detected) ✅
**Root Directory:** ./ (default) ✅
**Build Command:** (auto-detected from vercel.json) ✅
**Output Directory:** (auto-detected) ✅

**You don't need to change anything!** The `vercel.json` file handles everything.

## Step 5: Add Environment Variables
**IMPORTANT:** Before deploying, add your OpenAI API key:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** button
3. Enter:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here` (paste your actual API key)
   - **Environment:** Select ALL three:
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

## Step 6: Deploy
1. Scroll to the bottom of the page
2. Click the big **"Deploy"** button
3. Watch the build progress
4. Wait 2-3 minutes

## Step 7: Verify Auto-Deployment is Enabled
After deployment:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Git"** in the left sidebar
4. You should see:
   - ✅ **Production Branch:** `main`
   - ✅ **Auto-deploy from Git:** Enabled
   - ✅ **Git Repository:** Connected

## Step 8: Test Auto-Deployment
1. Make a small change to any file (e.g., README.md)
2. In your terminal, run:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push
   ```
3. Go to Vercel dashboard
4. You should see a new deployment starting automatically! 🎉

## What Happens After Connection?

✅ **Automatic Deployments:**
- Every `git push` to `main` branch = Production deployment
- Every pull request = Preview deployment
- Every branch push = Preview deployment

✅ **GitHub Integration:**
- Deployment status shows in GitHub
- Preview URLs in pull request comments
- Easy to see what's deployed

✅ **No Manual Steps:**
- Just push to GitHub
- Vercel handles the rest automatically

## Troubleshooting

### Can't See Your Repository?
- Make sure you're signed in with the correct GitHub account
- Check GitHub permissions in Vercel settings
- Try disconnecting and reconnecting GitHub

### Auto-Deployments Not Working?
- Check project settings → Git
- Verify branch name is `main` or `master`
- Make sure you're pushing to the correct branch

### Need to Reconnect?
1. Go to Vercel project settings
2. Click "Git" → "Disconnect"
3. Click "Connect Git Repository"
4. Select your repository again

## Your Repository Info
- **GitHub URL:** https://github.com/Yashraj2302/CUSTOMER-SUPPORT-AI-AGENT-CHATBOT
- **Branch:** `main`
- **Status:** Ready to connect

---

**Once connected, every `git push` will automatically deploy!** 🚀
