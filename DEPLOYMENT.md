# Vercel Deployment Guide

This guide will help you deploy your Customer Support AI Agent Chatbot to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works)
2. A [GitHub](https://github.com), [GitLab](https://gitlab.com), or [Bitbucket](https://bitbucket.org) account
3. An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will automatically detect the Python project

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     - `OPENAI_API_KEY` = `your_openai_api_key_here`
     - `OPENAI_MODEL` = `gpt-3.5-turbo` (optional, defaults to gpt-3.5-turbo)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add OPENAI_MODEL
   ```

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

## Project Structure for Vercel

```
.
├── api/
│   ├── index.py      # Main page handler
│   ├── chat.py       # Chat API endpoint
│   └── config.py     # Config API endpoint
├── public/
│   ├── style.css     # Styles (served automatically)
│   └── script.js     # JavaScript (served automatically)
├── templates/
│   └── index.html    # HTML template
├── config.json       # Agent configuration
├── vercel.json       # Vercel configuration
└── requirements.txt  # Python dependencies
```

## Configuration

### Customizing Your Agent

Edit `config.json` before deploying:

```json
{
  "brand_name": "Your Company",
  "agent_name": "Alex",
  "industry": "Customer Support",
  "tone": "friendly",
  "company_name": "Your Company Name",
  "products": ["Product A", "Product B"],
  "policies": ["Returns", "Shipping", "Warranty"],
  "common_issues": ["Order status", "Technical support", "Billing questions"]
}
```

### Environment Variables

Required:
- `OPENAI_API_KEY`: Your OpenAI API key

Optional:
- `OPENAI_MODEL`: Model to use (default: `gpt-3.5-turbo`, can use `gpt-4` for better quality)

## Troubleshooting

### Build Fails

- **Issue**: Python version mismatch
  - **Solution**: Vercel uses Python 3.9 by default. If you need a different version, update `vercel.json`:
    ```json
    "env": {
      "PYTHON_VERSION": "3.11"
    }
    ```

### Static Files Not Loading

- **Issue**: CSS/JS files return 404
  - **Solution**: Ensure files are in the `public/` directory. Vercel serves these automatically from the root path.

### API Endpoints Not Working

- **Issue**: `/api/chat` returns 500 error
  - **Solution**: 
    1. Check that `OPENAI_API_KEY` is set in Vercel environment variables
    2. Check Vercel function logs for error details
    3. Verify `requirements.txt` includes all dependencies

### CORS Errors

- **Issue**: CORS errors in browser console
  - **Solution**: The API handlers already include CORS headers. If issues persist, check that the domain is correct.

## Updating Your Deployment

1. **Make changes locally**
2. **Commit and push to Git**
   ```bash
   git add .
   git commit -m "Update configuration"
   git push
   ```
3. **Vercel will automatically redeploy** (if connected to Git)
   - Or manually trigger: `vercel --prod`

## Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring

- View deployment logs in Vercel dashboard
- Check function logs for API errors
- Monitor usage in Vercel analytics

## Cost Considerations

- **Vercel Free Tier**: 
  - 100GB bandwidth/month
  - Serverless function execution time limits
  - Sufficient for small to medium traffic

- **OpenAI API Costs**:
  - GPT-3.5-turbo: ~$0.002 per 1K tokens
  - GPT-4: ~$0.03 per 1K tokens
  - Monitor usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Support](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [OpenAI API Documentation](https://platform.openai.com/docs)
