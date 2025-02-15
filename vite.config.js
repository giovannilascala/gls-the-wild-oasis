import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),  // Aggiungi un alias per 'ui'
    },
  },
});

