import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Meneruskan API KEY dari environment variable server ke client saat build
    // Pastikan Anda mengatur Environment Variable 'API_KEY' di dashboard Vercel
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || "")
  }
});