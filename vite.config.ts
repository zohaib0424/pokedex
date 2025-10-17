/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      'components': path.resolve(dirname, './src/components'),
      'pages': path.resolve(dirname, './src/pages'),
      'types': path.resolve(dirname, './src/types'),
      'api': path.resolve(dirname, './src/services'),
      'assets': path.resolve(dirname, './src/assets'),
      'constants': path.resolve(dirname, './src/constants'),
      'utils': path.resolve(dirname, './src/utils'),
    },
  },
  server: {
    open: '/',
    port: 3000,
    host: 'localhost',
    strictPort: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});

