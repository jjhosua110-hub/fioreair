/**
 * Page Generator — Reads data files, assembles pages using components,
 * writes HTML to src/pages/. Run before Vite build via "npm run prebuild".
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPage } from '../src/lib/render.js';
import {
  Header, Footer, Hero, BrandGrid, TypeCard, TypeHero,
  BrandRow, ProductCard, FeaturedProducts, StatsBar,
  CTABanner, UseCaseCard, Section
} from '../src/components/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PAGES_DIR = path.join(SRC, 'pages');
const DATA_DIR = path.join(SRC, 'data');

// Ensure pages directories exist
fs.mkdirSync(PAGES_DIR, { recursive: true });
fs.mkdirSync(path.join(PAGES_DIR, 'products'), { recursive: true });

// ─── Load Data ──────────────────────────────────────────
const site = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site.json'), 'utf-8'));
const nav = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'nav.json'), 'utf-8'));
const brands = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'aircon/brands.json'), 'utf-8'));
const types = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'aircon/types.json'), 'utf-8'));
const useCases = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'aircon/use-cases.json'), 'utf-8'));
const models = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'aircon/models/catalog.json'), 'utf-8'));

const brandMap = Object.fromEntries(brands.map(b => [b.id, b]));
const typeMap = Object.fromEntries(types.map(t => [t.id, t]));

// ─── Shared Components ──────────────────────────────────
function baseComponents(currentPath) {
  return {
    header: Header({ navItems: nav, site, currentPath }),
    footer: Footer({ site }),
  };
}

// ─── Helper: write page ─────────────────────────────────
function writePage(relativePath, html) {
  const fullPath = path.join(PAGES_DIR, relativePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, html);
  console.log(`  ✓ ${path.relative(PAGES_DIR, fullPath)}`);
}

// ══════════════════════════════════════════════════════════
//  HOME PAGE
// ══════════════════════════════════════════════════════════
{
  const featuredModels = models.filter(m => m.featured);
  const comps = baseComponents('/');

  const content = `
    ${Hero({
      title: 'Expert Cooling, Trusted Brands',
      subtitle: 'FioreAir brings you the finest air conditioning solutions from the world\'s leading brands. Serving Metro Manila and Cavite.',
      ctaText: 'Browse Products',
      ctaLink: '/products',
      backgroundClass: 'hero--home',
    })}

    ${Section({
      title: 'Aircon Types',
      subtitle: 'Find the perfect cooling solution for your space',
      children: `<div class="type-grid">${types.map(t => TypeCard({ type: t })).join('')}</div>`,
    })}

    ${BrandGrid({ brands: brands.filter(b => b.featured) })}

    ${Section({
      title: 'Find Your Solution',
      subtitle: 'Not sure what you need? Browse by your space type.',
      className: 'section--featured',
      children: `<div class="use-case-grid">${useCases.map(uc => UseCaseCard({ useCase: uc })).join('')}</div>`,
    })}

    ${FeaturedProducts({ models, brands })}

    ${StatsBar({
      stats: [
        { value: brands.length.toString(), label: 'Partner Brands' },
        { value: models.length.toString(), label: 'Product Models' },
        { value: types.length.toString(), label: 'Aircon Types' },
        { value: useCases.length.toString(), label: 'Use Cases Covered' },
      ],
    })}

    ${CTABanner({
      text: 'Ready to find the perfect aircon for your space?',
    })}
  `;

  writePage('index.html', renderPage({
    site, nav, content, components: comps,
    pageTitle: site.title,
    description: site.description,
  }));
}

// ══════════════════════════════════════════════════════════
//  PRODUCTS OVERVIEW (all types)
// ══════════════════════════════════════════════════════════
{
  const comps = baseComponents('/products');
  const content = `
    <section class="page-header">
      <div class="container">
        <h1 class="page-header__title">All Aircon Types</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="type-grid">
          ${types.map(t => TypeCard({ type: t })).join('')}
        </div>
      </div>
    </section>
  `;

  writePage('products/index.html', renderPage({
    site, nav, content, components: comps,
    pageTitle: 'Products',
    description: 'Browse our complete range of air conditioning types — split-type, window-type, cassette, floor-mounted, and ducted systems.',
  }));
}

// ══════════════════════════════════════════════════════════
//  PRODUCT TYPE PAGES (e.g., /products/split-type)
// ══════════════════════════════════════════════════════════
for (const type of types) {
  const typeModels = models.filter(m => m.typeId === type.id);
  const comps = baseComponents(`/products/${type.id}`);

  // Group models by brand, preserving brand order
  const brandIds = brands.map(b => b.id);
  const modelsByBrand = {};
  for (const m of typeModels) {
    if (!modelsByBrand[m.brandId]) modelsByBrand[m.brandId] = [];
    modelsByBrand[m.brandId].push(m);
  }

  // Ordered brand rows
  const brandRows = brandIds
    .filter(bid => modelsByBrand[bid])
    .map(bid => BrandRow({
      brand: brandMap[bid],
      models: modelsByBrand[bid],
      typeName: type.name,
    }));

  const content = `
    ${TypeHero({ type, modelCount: typeModels.length })}
    <div class="container">
      ${brandRows.join('')}
    </div>
  `;

  writePage(`products/${type.id}.html`, renderPage({
    site, nav, content, components: comps,
    pageTitle: type.name,
    description: `${type.name} — ${type.description.substring(0, 150)}`,
  }));
}

// ══════════════════════════════════════════════════════════
//  BY USE CASE PAGES
// ══════════════════════════════════════════════════════════
// (Generate under /by-use-case/ for reference)
fs.mkdirSync(path.join(PAGES_DIR, 'by-use-case'), { recursive: true });
for (const uc of useCases) {
  const comps = baseComponents(`/by-use-case/${uc.id}`);

  const recommendations = uc.types.map(t => {
    const type = typeMap[t.typeId];
    if (!type) return '';
    return `
      <div class="rec-card">
        <div class="rec-card__icon">
          <img src="${type.icon}" alt="${type.name}">
        </div>
        <h3 class="rec-card__title">${type.name}</h3>
        <p class="rec-card__rec">${t.recommendation}</p>
        <p class="rec-card__capacity">Capacity: ${t.capacityRange}</p>
      </div>`;
  }).join('');

  const content = `
    <section class="page-header">
      <div class="container">
        <h1 class="page-header__title">${uc.name}</h1>
        <p style="color: var(--color-text-light); margin-top: 0.5rem;">${uc.summary}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="section__title" style="text-align: left; margin-bottom: 1.5rem;">Recommended Aircon Types</h2>
        <div class="use-case-recommendations">
          ${recommendations}
        </div>
      </div>
    </section>
  `;

  writePage(`by-use-case/${uc.id}.html`, renderPage({
    site, nav, content, components: comps,
    pageTitle: uc.name,
    description: `Air conditioning solutions for ${uc.name.toLowerCase()} — ${uc.summary}`,
  }));
}

// ══════════════════════════════════════════════════════════
//  ABOUT PAGE
// ══════════════════════════════════════════════════════════
{
  const comps = baseComponents('/about');
  const content = `
    <section class="about-content">
      <div class="container">
        <div class="about__inner">
          <h1 class="about__title">About FioreAir</h1>
          <div class="about__body">
            <p><strong>FioreAir</strong> is a trusted provider of premium air conditioning solutions based in Naic, Cavite, serving Metro Manila and the surrounding areas.</p>
            <p>We partner with the world's leading air conditioning brands — including <strong>Gree, AUX, Daikin, Midea, and Haier</strong> — to bring you a comprehensive selection of cooling systems for every application.</p>
            <p>Whether you need a compact window-type for a small bedroom, a whisper-quiet split-type for your office, a ceiling cassette for a retail space, or a full ducted system for a commercial building, FioreAir has the expertise and product range to deliver the perfect solution.</p>
            <p>Our team understands the Philippine climate and building conditions. We help you choose the right capacity, type, and brand for your specific needs — ensuring you get efficient, reliable cooling that lasts.</p>
            <p><strong>Expert Cooling, Trusted Brands.</strong> That's the FioreAir promise.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  writePage('about.html', renderPage({
    site, nav, content, components: comps,
    pageTitle: 'About Us',
    description: 'Learn about FioreAir — your trusted partner for quality air conditioning solutions in Metro Manila and Cavite.',
  }));
}

// ══════════════════════════════════════════════════════════
//  CONTACT PAGE
// ══════════════════════════════════════════════════════════
{
  const comps = baseComponents('/contact');
  const content = `
    <section class="contact-page">
      <div class="container">
        <div class="contact__grid">
          <div>
            <h1 class="contact__title">Get in Touch</h1>
            <p class="contact__subtitle">Have a question about our products? Need help choosing the right aircon for your space? Reach out to us — we're happy to help.</p>
            <div class="contact__info">
              <div class="contact__card">
                <p class="contact__card-label">Phone</p>
                <p class="contact__card-value"><a href="tel:${site.company.phone}">${site.company.phone}</a></p>
              </div>
              <div class="contact__card">
                <p class="contact__card-label">Email</p>
                <p class="contact__card-value"><a href="mailto:${site.company.email}">${site.company.email}</a></p>
              </div>
              <div class="contact__card">
                <p class="contact__card-label">Location</p>
                <p class="contact__card-value">${site.company.address}</p>
              </div>
              <div class="contact__card">
                <p class="contact__card-label">Service Area</p>
                <p class="contact__card-value">${site.company.serviceArea}</p>
              </div>
            </div>
          </div>
          <div>
            <div class="contact__map-note">
              <h3>📍 Visit or Contact Us</h3>
              <p>FioreAir is based in <strong>Naic, Cavite</strong> and serves clients throughout Metro Manila and Cavite province.</p>
              <p style="margin-top: 1rem;">Call or text us at <strong>${site.company.phone}</strong> to discuss your air conditioning needs. We'll help you find the perfect solution from our range of partner brands.</p>
              <p style="margin-top: 1rem;">We also accept inquiries via email at <strong>${site.company.email}</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  writePage('contact.html', renderPage({
    site, nav, content, components: comps,
    pageTitle: 'Contact Us',
    description: 'Contact FioreAir for air conditioning solutions. Reach us by phone or email. Serving Metro Manila and Cavite.',
  }));
}

console.log('\n✨ All pages generated successfully!');
