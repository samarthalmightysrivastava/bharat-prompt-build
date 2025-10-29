# Netlify Deployment Guide for Bharat Prompt

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Netlify Account** - Sign up at https://netlify.com
3. **Supabase Project** - Your authentication backend (already configured)

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Setup GitHub (if not done already)
git remote add origin https://github.com/YOUR_USERNAME/bharat-prompt.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. **Log into Netlify**: https://app.netlify.com
2. **Click "New site from Git"**
3. **Connect your GitHub account**
4. **Select your `bharat-prompt` repository**

### Step 3: Build Configuration

Netlify should auto-detect the settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node.js version**: `18`

### Step 4: Environment Variables

In Netlify dashboard > Site settings > Environment variables, add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tpecqsdueachehjlagbw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZWNxc2R1ZWFjaGVoamxhZ2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2Nzk1OTIsImV4cCI6MjA3NDI1NTU5Mn0.Z9s8TqqPH-WPFn-cxcpKPn0N5nlGrQShpxvXwVTGtN4
OPENAI_API_KEY=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
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_OUTPUT_TOKENS=2000
APP_BASE_URL=https://YOUR-SITE-NAME.netlify.app
```

### Step 5: Supabase Configuration

Update your Supabase project settings:

1. **Go to Supabase Dashboard** > Authentication > Settings
2. **Add your Netlify URL** to "Site URL": `https://YOUR-SITE-NAME.netlify.app`
3. **Add to "Redirect URLs"**:
   - `https://YOUR-SITE-NAME.netlify.app/auth/callback`
   - `https://YOUR-SITE-NAME.netlify.app`

### Step 6: Deploy

1. **Click "Deploy site"** in Netlify
2. **Wait for build to complete** (usually 2-3 minutes)
3. **Your site will be available** at `https://YOUR-SITE-NAME.netlify.app`

## 🔧 Build Configuration Details

The project includes:

- **`netlify.toml`**: Automatic build configuration
- **Static export**: All pages pre-rendered for fast loading
- **Client-side routing**: SPA-style navigation
- **Environment variables**: Secure API key management

## 🧪 Testing Your Deployment

After deployment, test:

1. **Homepage loads** correctly
2. **Navigation works** (Generate, Pricing)
3. **Authentication flows**:
   - Click "Login / Sign up"
   - Try Magic Link authentication
   - Check email for login link
   - Verify successful login redirect

## 🔍 Troubleshooting

### Build Fails
- Check Node.js version is 18
- Verify all dependencies in `package.json`
- Check build logs for specific errors

### Authentication Issues
- Verify Supabase URLs in environment variables
- Check Supabase redirect URLs include your Netlify domain
- Test locally first with `npm run build && npm start`

### API Routes Not Working
- This is a static export - API routes don't work
- Use external APIs (already configured for Supabase and OpenAI)

## 📝 Custom Domain (Optional)

1. **Go to Netlify dashboard** > Domain settings
2. **Add custom domain**
3. **Update DNS records** as instructed
4. **Update Supabase URLs** to match your custom domain

## 🔄 Automatic Deployments

- **Push to main branch** → Automatic deployment
- **Pull request previews** → Available for testing
- **Branch deployments** → Create staging environments

Your Bharat Prompt application is now ready for production use on Netlify!