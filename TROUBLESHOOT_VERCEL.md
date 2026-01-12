# 🔧 Troubleshooting Vercel Deployment

## If Your App is Not Visible on Vercel

### Step 1: Check Deployment Status

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your project: `CUSTOMER-SUPPORT-AI-AGENT-CHATBOT`
3. Check the deployment status:
   - ✅ **Ready** = Deployment successful
   - ⏳ **Building** = Still deploying
   - ❌ **Error** = Build failed

### Step 2: Check Build Logs

If deployment failed:
1. Click on the failed deployment
2. Check the "Build Logs" tab
3. Look for error messages
4. Common issues:
   - Missing dependencies in `requirements.txt`
   - Python version mismatch
   - Missing files

### Step 3: Verify Environment Variables

1. Go to Project Settings → Environment Variables
2. Make sure `OPENAI_API_KEY` is set
3. Check that it's enabled for all environments (Production, Preview, Development)

### Step 4: Check Function Logs

1. Go to your project in Vercel
2. Click "Functions" tab
3. Check for any errors in the logs
4. Test the API endpoints:
   - `/api/config` should return JSON
   - `/api/chat` should handle POST requests

### Step 5: Verify Static Files

1. Check if CSS/JS files are accessible:
   - Visit: `https://your-project.vercel.app/style.css`
   - Visit: `https://your-project.vercel.app/script.js`
2. If they return 404, the files might not be in the `public/` folder

### Step 6: Common Issues & Fixes

#### Issue: Blank Page / No Styles
**Solution:**
- Verify `public/style.css` and `public/script.js` exist
- Check browser console for 404 errors
- Make sure `vercel.json` routes static files correctly

#### Issue: API Not Working
**Solution:**
- Check `OPENAI_API_KEY` is set in environment variables
- Verify function logs for errors
- Test API endpoint directly: `curl https://your-project.vercel.app/api/config`

#### Issue: Build Fails
**Solution:**
- Check `requirements.txt` has all dependencies
- Verify Python version in `vercel.json`
- Check build logs for specific errors

#### Issue: Template Not Found
**Solution:**
- Verify `templates/index.html` exists
- Check file paths in `api/index.py`

### Step 7: Redeploy

After fixing issues:
1. Make sure changes are pushed to GitHub
2. Go to Vercel dashboard
3. Click "Redeploy" on the latest deployment
4. Or push a new commit to trigger auto-deployment

### Step 8: Test Your Deployment

1. Visit your Vercel URL
2. Open browser DevTools (F12)
3. Check Console for errors
4. Check Network tab for failed requests
5. Test sending a message

## Quick Checklist

- [ ] Project is imported in Vercel
- [ ] Deployment completed successfully
- [ ] Environment variables are set
- [ ] Static files are in `public/` folder
- [ ] `vercel.json` is configured correctly
- [ ] All files are pushed to GitHub
- [ ] No errors in build logs
- [ ] No errors in function logs

## Still Not Working?

1. **Check Vercel Status**: https://www.vercel-status.com
2. **Review Documentation**: https://vercel.com/docs
3. **Check GitHub Issues**: Look for similar problems
4. **Vercel Support**: Contact Vercel support if needed

## Your Repository
🔗 https://github.com/Yashraj2302/CUSTOMER-SUPPORT-AI-AGENT-CHATBOT
