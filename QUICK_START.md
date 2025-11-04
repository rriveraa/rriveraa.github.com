# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install
```bash
npm install
```

### 2. Develop
```bash
npm run dev
```
Opens at `http://localhost:3000` with hot reload ✨

### 3. Build & Deploy
```bash
npm run build
# Copy dist/* to root
git add .
git commit -m "Deploy modern site"
git push
```

## 📝 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🎨 Customize Colors

Edit `src/scss/main.scss`:
```scss
:root {
  --color-primary: #241C29;    // Change this
  --color-accent: #01FF89;     // Change this
}
```

## 📁 Key Files

- `src/index.html` - Main HTML
- `src/scss/main.scss` - All styles
- `src/js/main.js` - JavaScript
- `public/images/` - Static images

## 🆘 Troubleshooting

**Port 3000 in use?**
- Vite will automatically try the next port

**Build fails?**
- Make sure Node.js 18+ is installed
- Run `npm install` again

**Images not loading?**
- Put images in `public/images/`
- Reference as `/images/filename.ext`

---

**That's it!** Your site is ready to go. 🎉

