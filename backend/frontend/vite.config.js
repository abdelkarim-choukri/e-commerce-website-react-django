// vite.config.js

import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'
import reactRefresh from "@vitejs/plugin-react-refresh";
import { splitVendorChunk } from 'vite';


export default defineConfig({
    build: {
        manifest: true, // adds a manifest.json
        rollupOptions: {
            input: [
              resolve(__dirname, './src/main.jsx'),
            ]
        },
        outDir:  'static', // puts the manifest.json in PROJECT_ROOT/theme/static/
        assetsDir:  'frontend', // puts asset files in in PROJECT_ROOT/theme/static/theme
    },
    plugins: [reactRefresh(), react()],
    base: process.env.NODE_ENV === "production" ? "/static/" : "/",
    server: {
        port: 5173,
        open: false,
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
          },
          '/images': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
          },
        },}
});