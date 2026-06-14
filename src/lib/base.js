/**
 * Shared BASE path — prepended to all image/link URLs for GitHub Pages subfolder deployment.
 * Set via VITE_BASE env var (e.g., '/fioreair/'). Defaults to '' for local dev.
 */
export const BASE = (process.env.VITE_BASE || '').replace(/\/+$/, '');

/** Prepend the base path to a URL, avoiding double slashes */
export function url(path) {
  if (path.startsWith('http')) return path;
  return `${BASE}${path}`;
}
