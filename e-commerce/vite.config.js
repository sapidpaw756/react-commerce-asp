import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-commerce-asp/",
  link: "http://localhost:3000/api/",
  build: {
    rollupOptions: {
      output: {

        chunkFileNames: 'assets/js/[name]-[hash].js',

        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({ name }) => {

          console.log(name);
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/imgs/[name]-[hash][extname]';
          }

          if (/\/src\/assets\/locales\/.*\.jpg$/.test(name ?? '')) {
            return 'assets/imgs/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
