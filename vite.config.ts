import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Marcador_Flag/', // Exactamente como sale en tu captura de GitHub
});