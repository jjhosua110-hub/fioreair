import { url } from '../lib/base.js';

/**
 * Header — Site navigation component
 * Props: { navItems, site, currentPath }
 */
export function Header({ navItems, site, currentPath = '/' }) {
  function renderNavItem(item) {
    const isActive = currentPath === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const activeClass = isActive ? 'nav__link--active' : '';

    if (hasChildren) {
      return `
        <li class="nav__item nav__item--has-children">
          <a href="${url(item.path)}" class="nav__link ${activeClass}">${item.title}
            <svg class="nav__arrow" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <ul class="nav__dropdown">
            ${item.children.map(child => {
              return `<li><a href="${url(child.path)}" class="nav__dropdown-link ${currentPath === child.path ? 'nav__dropdown-link--active' : ''}">${child.title}</a></li>`;
            }).join('')}
          </ul>
        </li>`;
    }

    return `
      <li class="nav__item">
        <a href="${url(item.path)}" class="nav__link ${activeClass}">${item.title}</a>
      </li>`;
  }

  return `
    <header class="header">
      <div class="header__inner container">
        <a href="${url('/')}" class="header__logo">
          <img src="${url('/images/fioreair-logo.jpg')}" alt="${site.title}" class="header__logo-img" width="40" height="40">
          <span class="header__logo-text">${site.title}</span>
        </a>
        <nav class="nav" role="navigation" aria-label="Main navigation">
          <button class="nav__toggle" data-toggle="mobile-menu" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav__list" data-menu>
            ${navItems.map(renderNavItem).join('')}
          </ul>
        </nav>
      </div>
    </header>`;
}

/**
 * Footer — Site footer component
 */
export function Footer({ site, year = new Date().getFullYear() }) {
  return `
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="${url('/images/fioreair-logo.jpg')}" alt="${site.title}" class="footer__logo" width="50" height="50">
            <h3 class="footer__title">${site.title}</h3>
            <p class="footer__tagline">${site.tagline}</p>
          </div>
          <div class="footer__contact">
            <h4 class="footer__heading">Contact Us</h4>
            <ul class="footer__list">
              <li><a href="tel:${site.company.phone}">${site.company.phone}</a></li>
              <li><a href="mailto:${site.company.email}">${site.company.email}</a></li>
              <li>${site.company.address}</li>
              <li>Service Area: ${site.company.serviceArea}</li>
            </ul>
          </div>
          <div class="footer__links">
            <h4 class="footer__heading">Quick Links</h4>
            <ul class="footer__list">
              <li><a href="${url('/')}">Home</a></li>
              <li><a href="${url('/about.html')}">About Us</a></li>
              <li><a href="${url('/contact.html')}">Contact</a></li>
            </ul>
          </div>
          <div class="footer__products">
            <h4 class="footer__heading">Products</h4>
            <ul class="footer__list">
              <li><a href="${url('/products/split-type.html')}">Split-Type</a></li>
              <li><a href="${url('/products/window-type.html')}">Window-Type</a></li>
              <li><a href="${url('/products/cassette.html')}">Cassette</a></li>
              <li><a href="${url('/products/floor-mounted.html')}">Floor-Mounted</a></li>
              <li><a href="${url('/products/ducted.html')}">Ducted</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${year} ${site.company.name}. All rights reserved. | Naic, Cavite, Philippines</p>
        </div>
      </div>
    </footer>`;
}

/**
 * Hero — Flexible hero section component
 */
export function Hero({
  title,
  subtitle = '',
  eyebrow = '',
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  trustItems = [],
  backgroundClass = ''
}) {
  return `
    <section class="hero ${backgroundClass}">
      <div class="hero__inner container">
        ${eyebrow ? `<p class="hero__eyebrow">${eyebrow}</p>` : ''}
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
        ${(ctaText && ctaLink) || (secondaryCtaText && secondaryCtaLink) ? `
          <div class="hero__actions">
            ${ctaText && ctaLink ? `<a href="${url(ctaLink)}" class="btn btn--primary btn--lg">${ctaText}</a>` : ''}
            ${secondaryCtaText && secondaryCtaLink ? `<a href="${url(secondaryCtaLink)}" class="btn btn--ghost btn--lg">${secondaryCtaText}</a>` : ''}
          </div>` : ''}
        ${trustItems.length ? `
          <div class="hero__trust" aria-label="FioreAir trust highlights">
            ${trustItems.map(item => `<span>${item}</span>`).join('')}
          </div>` : ''}
      </div>
    </section>`;
}

/**
 * BrandCard — Single brand card
 */
export function BrandCard({ brand }) {
  return `
    <div class="brand-card">
      <div class="brand-card__logo">
        <img src="${url(brand.logo)}" alt="${brand.name}" loading="lazy">
      </div>
      <h3 class="brand-card__name">${brand.name}</h3>
      <p class="brand-card__desc">${brand.description}</p>
      <div class="brand-card__types">
        ${brand.types.map(t => `<span class="badge">${t.replace('-', ' ')}</span>`).join('')}
      </div>
      <a href="${brand.website}" class="btn btn--outline btn--sm" target="_blank" rel="noopener">Visit Website →</a>
    </div>`;
}

/**
 * BrandGrid — Grid of brand cards
 */
export function BrandGrid({ brands }) {
  return `
    <section class="section section--brands">
      <div class="container">
        <div class="section-split-header">
          <div>
            <p class="section-kicker">Authorized options</p>
            <h2 class="section__title section__title--left">Partner brands for every budget</h2>
          </div>
          <p class="section__subtitle section__subtitle--left">We help customers compare trusted aircon brands based on room size, comfort needs, budget, and after-sales support.</p>
        </div>
        <div class="brand-strip">
          ${brands.map(b => `
            <a href="${b.website}" class="brand-pill" target="_blank" rel="noopener">
              <img src="${url(b.logo)}" alt="${b.name}" loading="lazy">
              <span>${b.name}</span>
            </a>`).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * BrandRow — Horizontal brand section within a type page
 */
export function BrandRow({ brand, models, typeName }) {
  return `
    <section class="brand-row">
      <div class="container">
        <div class="brand-row__header">
          <img src="${url(brand.logo)}" alt="${brand.name}" class="brand-row__logo" height="40">
          <h3 class="brand-row__title">${brand.name} ${typeName}</h3>
        </div>
        ${models.length > 0 ? `
        <div class="product-grid">
          ${models.map(m => ProductCard({ model: m, brand })).join('')}
        </div>` : `
        <p class="brand-row__empty">Contact us for available ${typeName.toLowerCase()} models from ${brand.name}.</p>`}
      </div>
    </section>`;
}

/**
 * TypeCard — Aircon type overview card
 */
export function TypeCard({ type }) {
  return `
    <a href="${url(`/products/${type.id}.html`)}" class="type-card">
      <div class="type-card__icon">
        <img src="${url(type.icon)}" alt="${type.name}" loading="lazy">
      </div>
      <h3 class="type-card__title">${type.name}</h3>
      <p class="type-card__desc">${type.description.substring(0, 120)}...</p>
      <div class="type-card__meta">
        <span class="badge badge--pros">${type.pros}</span>
        <span class="badge badge--cons">${type.cons}</span>
      </div>
    </a>`;
}

/**
 * TypeHero — Hero for a specific aircon type page
 */
export function TypeHero({ type, modelCount }) {
  return `
    <section class="type-hero">
      <div class="container">
        <div class="type-hero__content">
          <div class="type-hero__icon">
            <img src="${url(type.icon)}" alt="${type.name}">
          </div>
          <div>
            <h1 class="type-hero__title">${type.name}</h1>
            <p class="type-hero__desc">${type.description}</p>
            <div class="type-hero__features">
              ${type.features.map(f => `<span class="type-hero__feature">✓ ${f}</span>`).join('')}
            </div>
            <p class="type-hero__count">${modelCount} model${modelCount !== 1 ? 's' : ''} available</p>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * ProductCard — Single product model card
 */
export function ProductCard({ model, brand }) {
  return `
    <div class="product-card">
      <div class="product-card__image">
        <img src="${url(model.images.main)}" alt="${model.model}" loading="lazy">
      </div>
      <div class="product-card__body">
        <div class="product-card__header">
          <span class="product-card__brand">${brand ? brand.name : ''}</span>
          <span class="product-card__capacity">${model.capacity}</span>
        </div>
        <h3 class="product-card__title">${model.model}</h3>
        <p class="product-card__desc">${model.description}</p>
        <div class="product-card__specs">
          <span class="product-card__spec"><strong>BTU:</strong> ${model.coolingCapacity}</span>
          <span class="product-card__spec"><strong>Area:</strong> ${model.coolingArea}</span>
          <span class="product-card__spec"><strong>Rating:</strong> ${model.energyRating}</span>
        </div>
        <ul class="product-card__features">
          ${model.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="product-card__footer">
          <span class="product-card__pricing">Call for Pricing</span>
          <span class="product-card__warranty">${model.warranty}</span>
        </div>
      </div>
    </div>`;
}

/**
 * UseCaseCard — Use case card for homepage
 */
export function UseCaseCard({ useCase, featuredTypeName = '' }) {
  return `
    <a href="${url(`/by-use-case/${useCase.id}.html`)}" class="use-case-card">
      <span class="use-case-card__label">${featuredTypeName || 'Recommended options'}</span>
      <h3 class="use-case-card__title">${useCase.name}</h3>
      <p class="use-case-card__desc">${useCase.summary}</p>
      <div class="use-case-card__types">
        ${useCase.types.map(t => `<span class="badge">${t.typeId.replace('-', ' ')}</span>`).join('')}
      </div>
      <span class="use-case-card__link">View recommendation →</span>
    </a>`;
}

/**
 * Section — Generic section wrapper
 */
export function Section({ title, subtitle = '', children, className = '' }) {
  return `
    <section class="section ${className}">
      <div class="container">
        ${title ? `<h2 class="section__title">${title}</h2>` : ''}
        ${subtitle ? `<p class="section__subtitle">${subtitle}</p>` : ''}
        ${children}
      </div>
    </section>`;
}

/**
 * FeaturedProducts — Featured models row
 */
export function FeaturedProducts({ models, brands }) {
  const brandMap = Object.fromEntries(brands.map(b => [b.id, b]));
  return `
    <section class="section section--featured">
      <div class="container">
        <h2 class="section__title">Featured Products</h2>
        <p class="section__subtitle">Our most popular air conditioning models</p>
        <div class="product-grid">
          ${models.filter(m => m.featured).map(m => ProductCard({ model: m, brand: brandMap[m.brandId] })).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * StatsBar — Stats section
 */
export function StatsBar({ stats }) {
  return `
    <section class="stats-bar">
      <div class="container">
        <div class="stats-bar__grid">
          ${stats.map(s => `
            <div class="stat">
              <span class="stat__value">${s.value}</span>
              <span class="stat__label">${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * CTABanner — Call to action banner
 */
export function CTABanner({ text, buttonText = 'Contact Us', buttonLink = '/contact.html' }) {
  return `
    <section class="cta-banner">
      <div class="container">
        <div class="cta-banner__inner">
          <p class="cta-banner__eyebrow">Need help choosing?</p>
          <h2 class="cta-banner__text">${text}</h2>
          <a href="${url(buttonLink)}" class="btn btn--primary btn--lg">${buttonText}</a>
        </div>
      </div>
    </section>`;
}

/**
 * BuyerGuide — Guided buyer block for homepage; avoids another plain card grid.
 */
export function BuyerGuide({ useCases, typeMap }) {
  return `
    <section class="buyer-guide">
      <div class="container buyer-guide__grid">
        <div class="buyer-guide__intro">
          <p class="section-kicker">Start with your space</p>
          <h2>Find the right aircon before comparing brands</h2>
          <p>Most buyers do not need every model first. They need the correct aircon type for the room, ceiling, noise level, and budget.</p>
          <a href="${url('/contact.html')}" class="btn btn--outline">Ask for sizing help</a>
        </div>
        <div class="buyer-guide__cards">
          ${useCases.map(uc => {
            const firstType = typeMap[uc.types[0]?.typeId];
            return UseCaseCard({ useCase: uc, featuredTypeName: firstType ? `Best start: ${firstType.name.replace(' Aircon', '')}` : '' });
          }).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * TypeComparison — Compact comparison table for product overview pages.
 */
export function TypeComparison({ types }) {
  return `
    <section class="section section--comparison">
      <div class="container">
        <div class="section-split-header">
          <div>
            <p class="section-kicker">Quick comparison</p>
            <h2 class="section__title section__title--left">Compare aircon types</h2>
          </div>
          <p class="section__subtitle section__subtitle--left">Use this as a short guide before opening each product category.</p>
        </div>
        <div class="comparison-table" role="table" aria-label="Aircon type comparison">
          ${types.map(type => `
            <a href="${url(`/products/${type.id}.html`)}" class="comparison-row" role="row">
              <span class="comparison-row__type"><img src="${url(type.icon)}" alt="" loading="lazy"> ${type.name}</span>
              <span><strong>Best for:</strong> ${type.usecases.slice(0, 3).join(', ')}</span>
              <span><strong>Strength:</strong> ${type.pros.split(',')[0]}</span>
              <span class="comparison-row__link">View models →</span>
            </a>`).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * TrustStrip — Small proof section to break repeated card sections.
 */
export function TrustStrip({ stats }) {
  return `
    <section class="trust-strip">
      <div class="container trust-strip__inner">
        <div>
          <p class="section-kicker">Why FioreAir</p>
          <h2>Clean recommendations, trusted brands, local support.</h2>
        </div>
        <div class="trust-strip__stats">
          ${stats.map(s => `<div><strong>${s.value}</strong><span>${s.label}</span></div>`).join('')}
        </div>
      </div>
    </section>`;
}
