import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: false, // Extract all CSS into a single file for better loading
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Ensure CSS is loaded early
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Allow network access (accessible from phone on same WiFi)
    // Or use specific host: '0.0.0.0' for all interfaces
  }
});

