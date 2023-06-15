import { defineConfig } from 'vite';
import { createProxyMiddleware } from 'http-proxy';

export default defineConfig({
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
});
