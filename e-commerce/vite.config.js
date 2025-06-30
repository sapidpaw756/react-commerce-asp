import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-commerce-asp/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    rollupOptions: {
      output: {

        chunkFileNames: 'assets/js/[name]-[hash].js',

        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({ name }) => {

          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/imgs/[name][extname]';
          }

          if (/\/src\/assets\/locales\/.*\.jpg$/.test(name ?? '')) {
            return 'assets/imgs/[name][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
})
