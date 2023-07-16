// import { defineConfig } from 'vite';
// import { createProxyMiddleware } from 'http-proxy';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:8000',
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//         logLevel: 'debug',
//       },
//       '/images': {
//         target: 'http://127.0.0.1:8000',
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//         logLevel: 'debug',
//       },
//     },
//   },
// });

const { createProxyMiddleware } = require('http-proxy');

import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';


// Existing configuration
const existingConfig = {
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        logLevel: 'debug',
      },
      '/images': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        logLevel: 'debug',
      },
    },
  },
  plugins: [], // Initialize plugins as an empty array
};

// Merged configuration
export default defineConfig({
  ...existingConfig, // Merge existing configuration

  plugins: [
    ...existingConfig.plugins, // Merge existing plugins
    react(),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
  ],
  build: { manifest: true },
  base: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  root: './src',
});
