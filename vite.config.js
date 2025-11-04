import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
});

