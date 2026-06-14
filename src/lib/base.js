/**
 * Shared BASE path — prepended to all URLs for GitHub Pages subfolder deployment.
 * Set via VITE_BASE env var (e.g., '/fioreair/') by the build script.
 * Defaults to '' for local dev where Vite's base is '/'.
 */
export const BASE = process.env.VITE_BASE || '';

/** Prepend the base path to a URL */
export function url(path) {
  if (path.startsWith('http')) return path;
  return `${BASE}${path}`;
}
