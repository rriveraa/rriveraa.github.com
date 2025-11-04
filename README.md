# Ricardo Rivera Portfolio

Modern, fast portfolio site built with Vite and vanilla JavaScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The site will open at `http://localhost:3000` with hot module replacement.

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory, ready for GitHub Pages.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
/
├── src/
│   ├── index.html          # Main HTML file
│   ├── main.js             # Entry point (imports SCSS)
│   ├── scss/
│   │   └── main.scss       # All styles with CSS variables
│   ├── js/
│   │   └── main.js        # Vanilla JavaScript (no jQuery!)
│   └── assets/             # Images and other assets
├── dist/                   # Build output (gitignored)
├── package.json
├── vite.config.js          # Vite configuration
└── postcss.config.js       # Autoprefixer config
```

## 🎨 Modern Features

- ✅ **No jQuery** - Pure vanilla JavaScript (ES6+)
- ✅ **Modern CSS** - SCSS with CSS custom properties
- ✅ **Fast Build** - Vite for instant development
- ✅ **Optimized** - Automatic code splitting and minification
- ✅ **Accessible** - Semantic HTML and ARIA labels
- ✅ **Responsive** - Mobile-first design

## 📦 Dependencies

### Development
- **Vite** - Fast build tool
- **Sass** - CSS preprocessor
- **Autoprefixer** - Automatic vendor prefixes

### Runtime
- None! All dependencies are build-time only.

## 🚢 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Copy the `dist/` folder contents to your repository root (or configure GitHub Pages to serve from `/dist`)

3. Or use GitHub Actions for automatic deployment (recommended)

### Manual Deployment

The `dist/` folder contains all static files ready to deploy to any static hosting service.

## 🛠️ Development

### What Changed from Old Version?

- **jQuery removed** - All functionality rewritten in vanilla JS
- **Bootstrap removed** - Custom CSS only (not needed for simple layout)
- **Font Awesome removed** - Not used (only emoji CSS for envelope icon)
- **LESS → SCSS** - Modern CSS preprocessor
- **Build system added** - Vite for modern development experience
- **CSS Variables** - Easy theming system
- **Modern JavaScript** - ES6+ modules, async/await ready

### Key Improvements

1. **Performance**: Smaller bundle, faster load times
2. **Security**: No vulnerable dependencies
3. **Maintainability**: Modern code structure
4. **Developer Experience**: Hot reload, fast builds

## 📝 Notes

- Images are served from `/images/` directory
- Google Fonts are loaded via CDN
- Emoji CSS is loaded from CDN (for the envelope icon)
- All animations are CSS-based (no JavaScript libraries)

## 🔧 Customization

### Colors
Edit CSS variables in `src/scss/main.scss`:
```scss
:root {
  --color-primary: #241C29;
  --color-accent: #01FF89;
  // ... more variables
}
```

### Typography
Font families and sizes are also defined as CSS variables.

## 📄 License

MIT

