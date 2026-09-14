import { CITY_LOCATIONS, US_CITY_LOCATIONS, getCitySlug } from '../src/data/cities.js';
import { SPECIALIZED_SERVICES, getCityNameFromSlug } from '../src/data/services.js';

export const BASE_URL = 'https://clickmecha.com';

export function stripHtml(str = '') {
  return String(str)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeAttribute(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, ' ');
}

// Fetch all page metas and blogs from CMS API (with in-memory cache)
let cachedCmsData = null;

export async function fetchCmsSeoData() {
  if (cachedCmsData) return cachedCmsData;

  const cmsMap = new Map();

  try {
    const res = await fetch('https://cms.clickmecha.com/api/page-meta');
    if (res.ok) {
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        json.data.forEach(item => {
          if (item.slug) {
            const cleanSlug = item.slug.replace(/^\/+|\/+$/g, '');
            cmsMap.set(cleanSlug, item);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Could not fetch CMS page-meta (using built-in SEO defaults):', err.message);
  }

  cachedCmsData = cmsMap;
  return cmsMap;
}

export function resolveSeoForRoute(pathname, cmsMap = new Map()) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/^\/+|\/+$/g, '');
  const canonicalUrl = `${BASE_URL}${pathname === '/' ? '' : `/${normalizedPath}`}`;

  // Check CMS map first
  const cmsItem = cmsMap.get(normalizedPath) || cmsMap.get(normalizedPath === '/' ? 'home' : normalizedPath);

  if (cmsItem) {
    const title = cmsItem.metaTitle || cmsItem.title || 'Click Mecha | Digital Marketing & Growth Agency';
    const description = stripHtml(cmsItem.metaDesc || cmsItem.description || 'Click Mecha helps brands grow with digital marketing, SEO, social media, web development, and creative strategy.');
    const keywords = cmsItem.metaKeyword || cmsItem.keywords || '';

    return {
      title,
      description,
      keywords,
      canonicalUrl,
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonicalUrl,
      twitterTitle: title,
      twitterDescription: description,
    };
  }

  // 1. Static Pages Fallback
  if (normalizedPath === '' || normalizedPath === '/') {
    const title = 'Best Digital Marketing Company in Delhi NCR | Click Mecha';
    const description = 'ClickMecha is a top digital marketing agency in Delhi NCR helping 230+ businesses grow with SEO, Google Ads, social media & web development. Rated 4.9 by 450+ clients. Book a free call today!';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'about') {
    const title = 'About Us | Click Mecha';
    const description = 'Learn more about Click Mecha, our performance marketing team, mission, and the innovative digital marketing strategies that drive growth for businesses.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'services') {
    const title = 'Our Digital Marketing Services | Click Mecha';
    const description = 'Explore our full suite of digital marketing services including SEO, Google Ads, social media marketing, content creation, and web development.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'contact') {
    const title = 'Contact Click Mecha | Digital Marketing Agency';
    const description = 'Get expert help with SEO, social media, PPC, website development & many more. Reach out to Click Mecha today.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'blog') {
    const title = 'Click Mecha | Blog';
    const description = 'Want to learn more about Advertising, PPC, Email Marketing, SEO, advanced SEO, SMO, digital marketing, conversion optimization, ecommerce? Check out Click Mecha Blog.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'career') {
    const title = 'Work With Us | Click Mecha';
    const description = "Build your future at Click Mecha. We're hiring talented developers, designers, marketers, data analysts & more.";
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'clientele') {
    const title = 'Our Clientele & Success Stories | Click Mecha';
    const description = 'Discover the global clients and innovative brands that trust Click Mecha for performance-driven digital marketing and growth solutions.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'posh-policy') {
    const title = 'PoSH Policy | Click Mecha';
    const description = 'Prevention of Sexual Harassment (PoSH) Policy at Click Mecha.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath === 'growthlanding') {
    const title = 'Accelerate Your Business Growth | Click Mecha';
    const description = 'Partner with Click Mecha to scale your business with performance marketing, high-converting funnels, and data-driven campaigns.';
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  // 2. City Agency Pages: digital-marketing-agency-in-${citySlug} or us/digital-marketing-agency-in-${citySlug}
  if (normalizedPath.startsWith('digital-marketing-agency-in-')) {
    const citySlug = normalizedPath.replace('digital-marketing-agency-in-', '');
    const cityName = getCityNameFromSlug(citySlug) || citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = `#1 Best Digital Marketing Agency In ${cityName} | Click Mecha`;
    const description = `ClickMecha, the best digital marketing agency in ${cityName} does SEO, paid ads, social media, and content for businesses in ${cityName}. Call Now - +91 9999008998`;
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  if (normalizedPath.startsWith('us/digital-marketing-agency-in-')) {
    const citySlug = normalizedPath.replace('us/digital-marketing-agency-in-', '');
    const cityName = getCityNameFromSlug(citySlug) || citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = `#1 Digital Marketing Agency In ${cityName} | Digital Marketing Services In ${cityName}`;
    const description = `ClickMecha, the best digital marketing agency in ${cityName} does SEO, paid ads, social media, and content for businesses in ${cityName}. Call Now - +91 9999008998`;
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  // 3. SubService Pages: in/${serviceSlug}-in-${citySlug}, us/..., ae/...
  const subServiceMatch = normalizedPath.match(/^(in|us|ae)\/([a-z0-9-]+)-in-([a-z0-9-]+)$/);
  if (subServiceMatch) {
    const [_, prefix, serviceSlug, citySlug] = subServiceMatch;
    const serviceObj = SPECIALIZED_SERVICES.find(s => s.slug === serviceSlug);
    const serviceTitle = serviceObj ? serviceObj.title : serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const cityName = getCityNameFromSlug(citySlug) || citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = `${serviceTitle} in ${cityName} | ClickMecha`;
    const description = `Looking for the best ${serviceTitle} in ${cityName}? ClickMecha is a performance-driven agency. Contact us for a free call.`;
    return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
  }

  // 4. Default Fallback
  const title = 'Click Mecha | Digital Marketing & Growth Agency';
  const description = 'Click Mecha helps brands grow with digital marketing, SEO, social media, web development, and creative strategy.';
  return { title, description, canonicalUrl, ogTitle: title, ogDescription: description, ogUrl: canonicalUrl, twitterTitle: title, twitterDescription: description };
}

export function injectSeoIntoHtml(html, seo) {
  const safeTitle = escapeHtml(seo.title);
  const safeDescription = escapeAttribute(seo.description);
  const safeCanonical = escapeAttribute(seo.canonicalUrl);
  const safeOgTitle = escapeAttribute(seo.ogTitle || seo.title);
  const safeOgDesc = escapeAttribute(seo.ogDescription || seo.description);
  const safeOgUrl = escapeAttribute(seo.ogUrl || seo.canonicalUrl);
  const safeTwitterTitle = escapeAttribute(seo.twitterTitle || seo.title);
  const safeTwitterDesc = escapeAttribute(seo.twitterDescription || seo.description);

  let output = html;

  // Replace <title>
  if (output.includes('<title>')) {
    output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  } else {
    output = output.replace('</head>', `  <title>${safeTitle}</title>\n</head>`);
  }

  // Replace <meta name="description">
  if (output.includes('name="description"')) {
    output = output.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${safeDescription}" />`);
  } else {
    output = output.replace('</head>', `  <meta name="description" content="${safeDescription}" />\n</head>`);
  }

  // Replace <link rel="canonical">
  if (output.includes('rel="canonical"')) {
    output = output.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${safeCanonical}" />`);
  } else {
    output = output.replace('</head>', `  <link rel="canonical" href="${safeCanonical}" />\n</head>`);
  }

  // Replace <meta property="og:title">
  if (output.includes('property="og:title"')) {
    output = output.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${safeOgTitle}" />`);
  }

  // Replace <meta property="og:description">
  if (output.includes('property="og:description"')) {
    output = output.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${safeOgDesc}" />`);
  }

  // Replace <meta property="og:url">
  if (output.includes('property="og:url"')) {
    output = output.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${safeOgUrl}" />`);
  }

  // Replace <meta name="twitter:title">
  if (output.includes('name="twitter:title"')) {
    output = output.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${safeTwitterTitle}" />`);
  }

  // Replace <meta name="twitter:description">
  if (output.includes('name="twitter:description"')) {
    output = output.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${safeTwitterDesc}" />`);
  }

  return output;
}
