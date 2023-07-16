// vite.config.js

const { resolve } = require('path');

export default {
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
    plugins: [],
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
};