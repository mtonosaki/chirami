import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      chirami: path.resolve(__dirname, '../chirami/src/index.ts'),
    },
  },
});
