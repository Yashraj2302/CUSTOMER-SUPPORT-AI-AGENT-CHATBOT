# Quick Deploy Guide - Vercel Web Interface

Since Git and Node.js are not installed, follow these steps to deploy via Vercel's web interface:

## Step 1: Prepare Your Files

All files are ready! Your project structure is correct for Vercel deployment.

## Step 2: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com) and sign up
2. Create a new repository (name it something like "customer-support-chatbot")
3. **Don't initialize with README** - we'll upload files directly

## Step 3: Upload Files to GitHub

### Option A: Using GitHub Web Interface

1. Go to your new repository on GitHub
2. Click "uploading an existing file"
3. Upload these files/folders:
   - `api/` (entire folder)
   - `public/` (entire folder)
   - `templates/` (entire folder)
   - `config.json`
   - `requirements.txt`
   - `vercel.json`
   - `README.md`
   - `.vercelignore`
   - `DEPLOYMENT.md`

4. Click "Commit changes"

### Option B: Install Git (Recommended)

Download Git from: https://git-scm.com/download/win

After installing, run:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration
5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your_openai_api_key_here`
   - Add (optional): `OPENAI_MODEL` = `gpt-3.5-turbo`
6. Click "Deploy"
7. Wait 2-3 minutes for deployment
8. Your app will be live at `https://your-project.vercel.app`

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. The chatbot should load
3. Try sending a message
4. If you see the API key error message, make sure `OPENAI_API_KEY` is set correctly in Vercel

## Troubleshooting

- **Build fails?** Check Vercel build logs for errors
- **API not working?** Verify `OPENAI_API_KEY` is set in environment variables
- **Static files not loading?** Ensure files are in `public/` directory

## Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting and advanced configuration.
