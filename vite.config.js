import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const root = resolve(__dirname, 'src');

function findHtmlFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let pages = {};
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = findHtmlFiles(fullPath, `${base}${entry.name}/`);
      pages = { ...pages, ...nested };
    } else if (entry.name.endsWith('.html')) {
      const name = `${base}${entry.name.replace('.html', '')}`;
      pages[name] = fullPath;
    }
  }
  return pages;
}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...findHtmlFiles(resolve(root, 'pages')),
        main: resolve(__dirname, 'src/assets/styles/main.css'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
