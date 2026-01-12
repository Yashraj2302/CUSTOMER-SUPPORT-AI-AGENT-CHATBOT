# 🔗 Connect Vercel to GitHub - Complete Guide

## Step 1: Connect Vercel to GitHub

### Option A: First Time Setup (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click **"Sign Up"** or **"Log In"**

2. **Sign in with GitHub**
   - Click **"Continue with GitHub"** button
   - This will connect your Vercel account to GitHub
   - Authorize Vercel to access your repositories

3. **Import Your Repository**
   - After logging in, click **"Add New..."** → **"Project"**
   - You'll see your GitHub repositories listed
   - Find: **`CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`**
   - Click **"Import"**

4. **Configure Project**
   - Vercel will auto-detect Python
   - No changes needed - `vercel.json` handles everything

5. **Add Environment Variables**
   - Scroll to **"Environment Variables"**
   - Add: `OPENAI_API_KEY` = `your_api_key_here`
   - Add: `OPENAI_MODEL` = `gpt-3.5-turbo` (optional)
   - Select all environments (Production, Preview, Development)

6. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes

### Option B: Connect Existing GitHub Repo

If you're already logged into Vercel:

1. Go to **Dashboard** → **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select **GitHub** as your Git provider
4. Authorize if needed
5. Find and select: **`CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`**
6. Click **"Import"**
7. Follow steps 4-6 from Option A

## Step 2: Enable Auto-Deployments

Once connected, Vercel will automatically:
- ✅ Deploy when you push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Show deployment status in GitHub

### Verify Auto-Deployment

1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push
   ```
3. Go to Vercel dashboard
4. You should see a new deployment starting automatically!

## Step 3: Git Configuration in Cursor/VS Code

### Verify Git is Working

Run these commands in your terminal:

```bash
# Check Git version
git --version

# Check remote repository
git remote -v

# Check Git configuration
git config --list
```

### Configure Git (if needed)

```bash
# Set your name (if not set)
git config --global user.name "Your Name"

# Set your email (if not set)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Git Workflow in Cursor

1. **Make Changes**
   - Edit files in Cursor
   - Files will show as modified in Source Control panel

2. **Stage Changes**
   - Click Source Control icon (left sidebar)
   - Click "+" next to files to stage
   - Or use: `git add .`

3. **Commit**
   - Enter commit message
   - Click "Commit" button
   - Or use: `git commit -m "Your message"`

4. **Push**
   - Click "Sync Changes" or "Push"
   - Or use: `git push`

5. **Vercel Auto-Deploys**
   - Vercel detects the push
   - Automatically starts deployment
   - You'll see status in Vercel dashboard

## Step 4: Vercel GitHub Integration Features

Once connected, you get:

### Automatic Deployments
- Every push to `main` = Production deployment
- Pull requests = Preview deployments
- Branch pushes = Preview deployments

### Deployment Status
- Vercel adds status checks to GitHub PRs
- See deployment status directly in GitHub

### Deployment Comments
- Vercel comments on PRs with preview URLs
- Easy to test changes before merging

## Step 5: Verify Everything is Connected

### Check Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. You should see your project: `CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`
3. Click on it to see deployments

### Check GitHub Integration
1. Go to your GitHub repo
2. Click **"Settings"** → **"Integrations"**
3. You should see Vercel listed (if enabled)

### Test Auto-Deployment
1. Make a small change (e.g., update README)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push
   ```
3. Check Vercel dashboard - new deployment should start!

## Troubleshooting

### Vercel Not Showing GitHub Repos?
- Make sure you're signed in with GitHub
- Check GitHub permissions in Vercel settings
- Re-authorize GitHub connection

### Auto-Deployments Not Working?
- Verify repository is connected in Vercel
- Check branch name (should be `main` or `master`)
- Check Vercel project settings → Git

### Git Not Working in Cursor?
- Make sure Git is installed: `git --version`
- Check Git is in PATH
- Restart Cursor after Git installation

## Your Repository
🔗 **GitHub:** https://github.com/Yashraj2302/CUSTOMER-SUPPORT-AI-AGENT-CHATBOT

## Quick Commands Reference

```bash
# Check Git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub (triggers Vercel deployment)
git push

# Check remote
git remote -v

# View commit history
git log --oneline
```

---

**Once connected, every `git push` will automatically deploy to Vercel!** 🚀
