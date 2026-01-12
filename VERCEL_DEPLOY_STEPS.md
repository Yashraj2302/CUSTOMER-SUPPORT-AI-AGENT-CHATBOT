# Deploy to Vercel - Quick Steps

Your code is now on GitHub! Follow these steps to deploy to Vercel:

## Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign up or log in (you can use your GitHub account)

## Step 2: Import Your Repository
1. Click "Add New..." → "Project"
2. You'll see your GitHub repositories
3. Find and select: **CUSTOMER-SUPPORT-AI-AGENT-CHATBOT**
4. Click "Import"

## Step 3: Configure Project
Vercel will auto-detect:
- Framework: Other (Python)
- Build Command: (auto-detected)
- Output Directory: (auto-detected)

**You don't need to change anything!** The `vercel.json` file handles everything.

## Step 4: Add Environment Variables
**IMPORTANT:** Before deploying, add your OpenAI API key:

1. In the project configuration, scroll to "Environment Variables"
2. Click "Add" and add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here`
   - Click "Save"
3. (Optional) Add:
   - **Name:** `OPENAI_MODEL`
   - **Value:** `gpt-3.5-turbo`
   - Click "Save"

## Step 5: Deploy
1. Click "Deploy" button
2. Wait 2-3 minutes for the build
3. Your app will be live! 🎉

## Step 6: Access Your App
After deployment, Vercel will show you:
- **Production URL:** `https://your-project-name.vercel.app`
- Click the URL to open your chatbot!

## Get Your OpenAI API Key
If you don't have one yet:
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key and add it to Vercel environment variables

## Troubleshooting

### Build Fails?
- Check the build logs in Vercel dashboard
- Make sure `requirements.txt` is correct
- Verify all files are in the repository

### API Not Working?
- Verify `OPENAI_API_KEY` is set in environment variables
- Check Vercel function logs for errors
- Make sure your OpenAI account has credits

### Need to Update?
Just push to GitHub - Vercel will auto-deploy:
```bash
git add .
git commit -m "Update"
git push
```
