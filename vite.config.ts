/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    coverage: {
      reporter: ['html', 'lcov', 'text'],
    },
  },
});
