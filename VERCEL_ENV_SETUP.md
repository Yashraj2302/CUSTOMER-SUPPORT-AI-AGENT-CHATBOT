# Add API Key to Vercel - Quick Guide

## Your OpenAI API Key is Ready!

I've set up your API key locally in a `.env` file (which is NOT committed to GitHub for security).

## Now Add It to Vercel:

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your Vercel project**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project: `CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`

2. **Navigate to Settings**
   - Click "Settings" in the top menu
   - Click "Environment Variables" in the left sidebar

3. **Add the API Key**
   - Click "Add New"
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here` (paste your actual key)
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

4. **Add Optional Model Setting**
   - Click "Add New" again
   - **Key:** `OPENAI_MODEL`
   - **Value:** `gpt-3.5-turbo`
   - **Environment:** Select all
   - Click "Save"

5. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"
   - Or push a new commit to trigger auto-deployment

### Method 2: Via Vercel CLI

If you have Vercel CLI installed:

```bash
vercel env add OPENAI_API_KEY
# Paste your key when prompted

vercel env add OPENAI_MODEL
# Enter: gpt-3.5-turbo

vercel --prod
```

## Security Notes

✅ **DO:**
- Keep your API key in Vercel environment variables
- Use different keys for development/production
- Rotate keys if exposed

❌ **DON'T:**
- Commit API keys to Git (already protected by .gitignore)
- Share your API key publicly
- Hardcode keys in your code

## Test Your Deployment

After adding the environment variable and redeploying:

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Try sending a message to the chatbot
3. It should now work with AI responses!

## Troubleshooting

**Still seeing API key error?**
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding the variable
- Check Vercel function logs for errors

**Need to update the key?**
- Go to Environment Variables in Vercel
- Click the key → Edit → Update value
- Redeploy
