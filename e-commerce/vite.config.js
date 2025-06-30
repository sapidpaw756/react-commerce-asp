import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-commerce-asp/",
  link: "http://localhost:3000/api/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        globSync(['src/**/*.jpg','src/assets/imgs/products/*.webp']).map(file => [
          // This removes `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          path.relative(
            'src',
            file.slice(0, file.length - path.extname(file).length)
          ),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js

          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
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
