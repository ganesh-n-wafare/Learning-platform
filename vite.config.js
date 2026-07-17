import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Explicit root and server options help Vite find `index.html` correctly
export default defineConfig({
  root: '.',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
