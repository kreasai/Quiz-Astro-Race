import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Definisi ini mencegah crash jika kode (atau library) mengakses process.env secara langsung
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || "")
    }
  }
});