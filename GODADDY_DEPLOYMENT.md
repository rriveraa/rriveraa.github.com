# Deploying to GoDaddy Hosting

## Overview

Your site is currently hosted on GoDaddy. To deploy the modernized version, you'll need to:

1. Build the site locally
2. Upload the built files to GoDaddy via FTP/SFTP or File Manager

## Step-by-Step Deployment

### Option 1: Using GoDaddy File Manager (Easiest)

1. **Build the site locally:**
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist/` folder with all the files.

2. **Access GoDaddy File Manager:**
   - Log into your GoDaddy account
   - Go to "My Products" → "Web Hosting" → "Manage"
   - Click on "File Manager" or "cPanel File Manager"

3. **Navigate to your site's root directory:**
   - Usually `public_html/` or `httpdocs/` or `www/`
   - Check where your current `index.html` is located

4. **Backup current site (IMPORTANT!):**
   - Create a backup folder: `backup_old_site/`
   - Copy all current files there

5. **Upload new files:**
   - Upload ALL contents from the `dist/` folder
   - Make sure `index.html` is in the root directory
   - Upload `images/` folder (should already be there from `public/images/`)

6. **Verify:**
   - Visit your site URL
   - Check that everything loads correctly

### Option 2: Using FTP/SFTP (Recommended for larger sites)

1. **Get FTP credentials from GoDaddy:**
   - Go to "My Products" → "Web Hosting" → "Manage"
   - Look for "FTP" or "File Manager" section
   - Note down: FTP host, username, password

2. **Use an FTP client:**
   - **macOS**: Use FileZilla (free), Cyberduck, or Transmit
   - **Windows**: Use FileZilla, WinSCP
   - Or use VS Code extensions like "SFTP" or "FTP-Sync"

3. **Connect to GoDaddy:**
   - Host: `ftp.yourdomain.com` or IP provided by GoDaddy
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

4. **Backup current site:**
   - Download all files from `public_html/` to a local backup folder

5. **Upload new files:**
   - Build the site: `npm run build`
   - Upload all contents from `dist/` folder to `public_html/`
   - Make sure to maintain folder structure

### Option 3: Using VS Code SFTP Extension

1. **Install SFTP extension in VS Code:**
   - Search for "SFTP" by Natizyskunk
   - Install it

2. **Create `.vscode/sftp.json`:**
   ```json
   {
     "name": "GoDaddy",
     "host": "ftp.yourdomain.com",
     "protocol": "ftp",
     "port": 21,
     "username": "YOUR_FTP_USERNAME",
     "password": "YOUR_FTP_PASSWORD",
     "remotePath": "/public_html",
     "uploadOnSave": false,
     "ignore": [
       "node_modules/**",
       "src/**",
       ".git/**",
       "dist/**"
     ]
   }
   ```

3. **Build and upload:**
   - Run `npm run build`
   - Right-click `dist/` folder → "Upload Folder"

## Important Files to Upload

From `dist/` folder, upload:
- ✅ `index.html` (main page)
- ✅ `assets/` folder (CSS, JS - automatically generated)
- ✅ `images/` folder (from `public/images/`)

## Keeping GitHub Pages Too (Optional)

You can keep both:
- **GoDaddy**: Production site (richrd.com)
- **GitHub Pages**: Backup or staging

Just deploy to both locations when you make updates.

## Troubleshooting

### Images not loading?
- Make sure `images/` folder is in the root directory
- Check image paths in HTML are `/images/filename.ext`

### CSS/JS not loading?
- Check that `assets/` folder uploaded correctly
- Verify file paths in browser console (F12)
- Make sure `index.html` references correct paths

### Site looks broken?
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for errors (F12)
- Verify all files uploaded completely

### Permission errors?
- Make sure files have correct permissions (644 for files, 755 for folders)
- In File Manager, right-click → Change Permissions

## After Deployment Checklist

- [ ] Site loads at your domain
- [ ] Logo displays correctly
- [ ] Fonts load (check Network tab)
- [ ] Animations work
- [ ] Links work
- [ ] Mobile responsive
- [ ] No console errors (F12)

## Quick Deploy Script (Optional)

Create a script to automate building and remind you to upload:

```bash
#!/bin/bash
# deploy.sh

echo "Building site..."
npm run build

echo "✅ Build complete!"
echo "📁 Files are in the 'dist/' folder"
echo "📤 Now upload dist/* contents to GoDaddy via FTP or File Manager"
echo ""
echo "GoDaddy File Manager:"
echo "  - Go to cPanel → File Manager"
echo "  - Navigate to public_html/"
echo "  - Upload all files from dist/"
```

Save as `deploy.sh`, make executable: `chmod +x deploy.sh`, run: `./deploy.sh`

## Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify all files uploaded
3. Check file permissions
4. Compare file sizes (might indicate incomplete upload)

---

**Remember:** Always backup your current site before deploying! 🛡️

