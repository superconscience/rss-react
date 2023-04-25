import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    istanbul({
      cypress: true,
      requireEnv: false,
    })
  ],
  build: {
    outDir: './dist',
    sourcemap: 'hidden'
  },
});
