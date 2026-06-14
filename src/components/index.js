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
          <a href="${item.path}" class="nav__link ${activeClass}">${item.title}
            <svg class="nav__arrow" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <ul class="nav__dropdown">
            ${item.children.map(child => {
              const isChildActive = currentPath === child.path;
              return `<li><a href="${child.path}" class="nav__dropdown-link ${currentPath === child.path ? 'nav__dropdown-link--active' : ''}">${child.title}</a></li>`;
            }).join('')}
          </ul>
        </li>`;
    }

    return `
      <li class="nav__item">
        <a href="${item.path}" class="nav__link ${activeClass}">${item.title}</a>
      </li>`;
  }

  return `
    <header class="header">
      <div class="header__inner container">
        <a href="/" class="header__logo">
          <img src="/images/fioreair-logo.jpg" alt="${site.title}" class="header__logo-img" width="40" height="40">
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
 * Props: { site, year }
 */
export function Footer({ site, year = new Date().getFullYear() }) {
  return `
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="/images/fioreair-logo.jpg" alt="${site.title}" class="footer__logo" width="50" height="50">
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
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer__products">
            <h4 class="footer__heading">Products</h4>
            <ul class="footer__list">
              <li><a href="/products/split-type">Split-Type</a></li>
              <li><a href="/products/window-type">Window-Type</a></li>
              <li><a href="/products/cassette">Cassette</a></li>
              <li><a href="/products/floor-mounted">Floor-Mounted</a></li>
              <li><a href="/products/ducted">Ducted</a></li>
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
 * Hero — Hero section component
 * Props: { title, subtitle, ctaText, ctaLink, backgroundClass }
 */
export function Hero({ title, subtitle = '', ctaText, ctaLink, backgroundClass = '' }) {
  return `
    <section class="hero ${backgroundClass}">
      <div class="hero__inner container">
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
        ${ctaText && ctaLink ? `<a href="${ctaLink}" class="btn btn--primary btn--lg">${ctaText}</a>` : ''}
      </div>
    </section>`;
}

/**
 * BrandCard — Single brand card
 * Props: { brand }
 */
export function BrandCard({ brand }) {
  return `
    <div class="brand-card">
      <div class="brand-card__logo">
        <img src="${brand.logo}" alt="${brand.name}" loading="lazy">
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
 * Props: { brands }
 */
export function BrandGrid({ brands }) {
  return `
    <section class="section">
      <div class="container">
        <h2 class="section__title">Our Partner Brands</h2>
        <p class="section__subtitle">We proudly carry the finest air conditioning brands in the industry</p>
        <div class="brand-grid">
          ${brands.map(b => BrandCard({ brand: b })).join('')}
        </div>
      </div>
    </section>`;
}

/**
 * BrandRow — Horizontal brand section within a type page
 * Props: { brand, models, typeName }
 */
export function BrandRow({ brand, models, typeName }) {
  return `
    <section class="brand-row">
      <div class="container">
        <div class="brand-row__header">
          <img src="${brand.logo}" alt="${brand.name}" class="brand-row__logo" height="40">
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
 * Props: { type }
 */
export function TypeCard({ type }) {
  return `
    <a href="/products/${type.id}.html" class="type-card">
      <div class="type-card__icon">
        <img src="${type.icon}" alt="${type.name}" loading="lazy">
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
 * Props: { type, modelCount }
 */
export function TypeHero({ type, modelCount }) {
  return `
    <section class="type-hero">
      <div class="container">
        <div class="type-hero__content">
          <div class="type-hero__icon">
            <img src="${type.icon}" alt="${type.name}">
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
 * Props: { model, brand }
 */
export function ProductCard({ model, brand }) {
  return `
    <div class="product-card">
      <div class="product-card__image">
        <img src="${model.images.main}" alt="${model.model}" loading="lazy">
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
 * Props: { useCase }
 */
export function UseCaseCard({ useCase }) {
  return `
    <div class="use-case-card">
      <div class="use-case-card__icon">
        <img src="${useCase.icon}" alt="${useCase.name}" loading="lazy">
      </div>
      <h3 class="use-case-card__title">${useCase.name}</h3>
      <p class="use-case-card__desc">${useCase.summary}</p>
      <div class="use-case-card__types">
        ${useCase.types.map(t => `<span class="badge">${t.typeId.replace('-', ' ')}</span>`).join('')}
      </div>
    </div>`;
}

/**
 * Section — Generic section wrapper
 * Props: { title, subtitle, children, className }
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
 * Props: { models, brands }
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
 * Props: { stats }
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
 * Props: { text, buttonText, buttonLink }
 */
export function CTABanner({ text, buttonText = 'Contact Us', buttonLink = '/contact' }) {
  return `
    <section class="cta-banner">
      <div class="container">
        <div class="cta-banner__inner">
          <h2 class="cta-banner__text">${text}</h2>
          <a href="${buttonLink}" class="btn btn--primary btn--lg">${buttonText}</a>
        </div>
      </div>
    </section>`;
}
