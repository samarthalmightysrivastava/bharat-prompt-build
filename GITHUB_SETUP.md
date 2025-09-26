# GitHub Repository Setup Commands

## After creating your GitHub repository, run these commands:

```bash
# Navigate to your project directory
cd /home/user/webapp

# Add your GitHub repository as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bharat-prompt.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## If you encounter authentication issues:

### Option 1: Use Personal Access Token
1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token with 'repo' permissions
3. Use the token as your password when prompted

### Option 2: Use SSH (if you have SSH keys set up)
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/bharat-prompt.git
git push -u origin main
```

## Verify Your Push

After pushing, your repository should be available at:
`https://github.com/YOUR_USERNAME/bharat-prompt`

## Next: Deploy to Netlify

1. Go to https://netlify.com and sign up/login
2. Click "New site from Git"
3. Connect to GitHub and select your `bharat-prompt` repository
4. Netlify should auto-detect settings from netlify.toml:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Add environment variables (see DEPLOYMENT.md)
6. Deploy!

## Repository Contents Ready for Deployment:

✅ Next.js app configured for static export
✅ Supabase authentication integrated  
✅ netlify.toml configuration file
✅ Environment variables template (.env.example)
✅ Complete deployment documentation (DEPLOYMENT.md)
✅ Production build tested locally
✅ All SSR issues resolved
✅ Auth callback handling for static hosting