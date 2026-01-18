import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Hanya ganti string spesifik ini, JANGAN ganti seluruh object process.env
    // karena akan merusak library lain (seperti React) yang butuh process.env.NODE_ENV
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || "")
  }
});