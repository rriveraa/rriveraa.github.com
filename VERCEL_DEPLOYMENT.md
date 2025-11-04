# Deploying to Vercel + Custom Domain Setup

## Why Vercel?

✅ **Free tier** - Perfect for personal portfolios  
✅ **Automatic deployments** - Push to GitHub, auto-deploy  
✅ **Fast global CDN** - Your site loads fast worldwide  
✅ **HTTPS included** - SSL certificate automatic  
✅ **Easy domain setup** - Point richrd.com in minutes  
✅ **Preview deployments** - Test before going live  

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Modernize site for Vercel"
git push origin master
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (easiest!)

2. **Import your repository:**
   - Click "Add New Project"
   - Select your `rriveraa.github.com` repository
   - Vercel will auto-detect Vite settings ✅

3. **Configure build settings:**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)
   - **Click "Deploy"**

4. **Wait for deployment:**
   - First build takes ~1-2 minutes
   - You'll get a URL like: `your-project.vercel.app`

5. **Test your site:**
   - Visit the Vercel URL
   - Everything should work! 🎉

### Option B: Via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts
   - First time: link to project
   - Subsequent: just `vercel --prod`

## Step 3: Add Your Custom Domain (richrd.com)

### In Vercel Dashboard:

1. **Go to your project:**
   - Click on your project name
   - Go to **Settings** → **Domains**

2. **Add domain:**
   - Enter: `richrd.com`
   - Click "Add"
   - Vercel will show you DNS records needed

3. **Configure DNS at GoDaddy:**

   You'll need to add these DNS records in GoDaddy:

   **Option 1: CNAME (Easiest - for www subdomain)**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

   **Option 2: A Record (For root domain)**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel will provide exact IPs)
   TTL: 3600
   ```

   **Option 3: Both (Recommended)**
   - Add CNAME for `www.richrd.com`
   - Add A records for `richrd.com` (root domain)

4. **Wait for DNS propagation:**
   - Usually takes 5-60 minutes
   - Vercel will show "Valid Configuration" when ready

5. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - HTTPS will work automatically! 🔒

### Detailed DNS Setup at GoDaddy:

1. **Log into GoDaddy:**
   - Go to [godaddy.com](https://godaddy.com)
   - My Products → DNS Management

2. **Find your domain:**
   - Click "DNS" next to richrd.com

3. **Add records:**

   **For root domain (richrd.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (or IPs Vercel provides)
   TTL: 1 Hour
   ```

   **For www subdomain (www.richrd.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 Hour
   ```

4. **Remove old records:**
   - Delete any old A/CNAME records pointing to GoDaddy hosting
   - Keep MX records (email) if you use email on domain

5. **Save and wait:**
   - Changes save automatically
   - Wait 5-60 minutes for DNS to propagate
   - Check status in Vercel dashboard

## Step 4: Verify Everything Works

✅ Visit `richrd.com` - should load your site  
✅ Visit `www.richrd.com` - should redirect or load  
✅ Check HTTPS - should show green lock  
✅ Test all pages/links  
✅ Check mobile responsiveness  

## Automatic Deployments

Once set up, every push to GitHub automatically deploys:

```bash
git push origin master
# → Vercel automatically builds and deploys! 🚀
```

## Preview Deployments

- Every pull request gets a preview URL
- Test changes before merging
- Perfect for collaboration!

## Environment Variables (If Needed)

If you add any API keys later:
- Settings → Environment Variables
- Add variables
- They're available in builds

## Troubleshooting

### Domain not working?
- Check DNS records match exactly what Vercel shows
- Wait longer (DNS can take up to 24 hours, usually much faster)
- Use `dig richrd.com` or [dnschecker.org](https://dnschecker.org) to verify

### Build fails?
- Check build logs in Vercel dashboard
- Make sure `package.json` has all dependencies
- Verify Node.js version (Vercel uses 18.x by default)

### HTTPS not working?
- Wait for DNS to fully propagate
- Vercel provisions SSL automatically (can take a few minutes)

### Images not loading?
- Check paths in HTML use `/images/...`
- Verify images are in `public/images/` folder

## Vercel vs GoDaddy Hosting

| Feature | GoDaddy | Vercel |
|---------|---------|--------|
| Speed | Slow | Fast (Global CDN) |
| Deployments | Manual FTP | Automatic from Git |
| HTTPS | Manual setup | Automatic |
| Cost | Paid | Free tier |
| Build tools | None | Built-in |
| Performance | Basic | Optimized |

## Migration Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Tested on Vercel URL
- [ ] Added domain in Vercel
- [ ] Updated DNS at GoDaddy
- [ ] Waited for DNS propagation
- [ ] Verified HTTPS works
- [ ] Tested all functionality
- [ ] Updated any external links
- [ ] Cancelled GoDaddy hosting (optional, save money!)

## Keeping Email on GoDaddy

If you use email with your domain:
- **Keep email DNS records** (MX records)
- Only change A/CNAME records for web
- Email will continue working!

## Cost

- **Vercel**: Free for personal projects ✅
- **GoDaddy DNS**: Usually free with domain
- **Total**: $0/month for hosting!

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: Very responsive via dashboard
- Check deployment logs in Vercel dashboard

---

**Ready to migrate?** Follow the steps above and you'll have a modern, fast site in minutes! 🚀

