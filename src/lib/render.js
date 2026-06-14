import { url } from './base.js';

export function renderPage({ site, nav, content, components, pageTitle, description }) {
  const title = pageTitle ? `${pageTitle} — ${site.title}` : `${site.tagline} — ${site.title}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description || site.description}">
  <link rel="stylesheet" href="${url('/assets/styles/main.css')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/jpeg" href="${url('/images/fioreair-logo.jpg')}">
</head>
<body>
  ${components.header}
  <main>
    ${content}
  </main>
  ${components.footer}
  <script type="module" src="${url('/lib/main.js')}"></script>
</body>
</html>`;
}
