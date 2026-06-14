/**
 * Post-build script — Move all files from dist/pages/ up to dist/ root
 * preserving subdirectory structure, then remove the empty pages/ dir.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '..', 'dist');
const pagesDir = path.join(dist, 'pages');

if (!fs.existsSync(pagesDir)) {
  console.log('✓ No pages/ dir to move (already flat)');
  process.exit(0);
}

// Collect all files recursively
function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = collectFiles(pagesDir);

for (const filePath of allFiles) {
  const relPath = path.relative(pagesDir, filePath);
  const destPath = path.join(dist, relPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.renameSync(filePath, destPath);
}

// Remove the now-empty pages dir tree
fs.rmSync(pagesDir, { recursive: true, force: true });

console.log(`✓ Moved ${allFiles.length} files from pages/ to dist/ root`);
