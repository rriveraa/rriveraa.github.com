# Deployment Guide

## GitHub Pages Deployment

### Option 1: Deploy from `dist/` folder (Recommended)

1. **Build the project:**
```bash
npm run build
```

2. **Copy build output to root:**
```bash
# On macOS/Linux
cp -r dist/* .

# Or manually copy the contents of dist/ to your repository root
```

3. **Commit and push:**
```bash
git add .
git commit -m "Deploy modernized site"
git push
```

### Option 2: Use GitHub Actions (Automatic)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This will automatically deploy when you push to master.

### Option 3: Use `gh-pages` branch

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## Important Notes

- **CNAME file**: If you're using a custom domain (richrd.com), make sure the `CNAME` file is in the `public/` folder so it gets copied to `dist/` during build.

- **Base path**: If your site is at `username.github.io/repo-name`, update `base: '/repo-name/'` in `vite.config.js`

- **Images**: All images should be in the `public/images/` folder. They'll be copied to `dist/images/` during build.

## Testing Before Deployment

1. Build locally:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

3. Test that all assets load correctly (images, fonts, etc.)

## Rollback

If something goes wrong, you can:
1. Revert the commit
2. Or manually restore files from git history

