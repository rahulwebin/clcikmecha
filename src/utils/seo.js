export const BASE_URL = 'https://clickmecha.com';
export const DEFAULT_SITE_NAME = 'Click Mecha';
export const DEFAULT_TITLE = 'Click Mecha | Digital Marketing & Growth Agency';
export const DEFAULT_DESCRIPTION =
  'Click Mecha helps brands grow with digital marketing, SEO, social media, web development, ecommerce, and creative strategy.';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.png`;
export const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const DEFAULT_LOCALE = 'en_IN';

function ensureMetaTag(selector, attributes) {
  let metaTag = document.head.querySelector(selector);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      metaTag.setAttribute(key, value);
    });
    document.head.appendChild(metaTag);
  }

  return metaTag;
}

function setMetaByName(name, content) {
  if (content === undefined || content === null) return;

  const metaTag = ensureMetaTag(`meta[name="${name}"]`, { name });
  metaTag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  if (content === undefined || content === null) return;

  const metaTag = ensureMetaTag(`meta[property="${property}"]`, { property });
  metaTag.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;

  let linkTag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.setAttribute('rel', rel);
    document.head.appendChild(linkTag);
  }

  linkTag.setAttribute('href', href);
}

export function stripHtml(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toAbsoluteUrl(value, fallback = BASE_URL) {
  if (!value) return fallback;

  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    return fallback;
  }
}

export function formatSeoDate(value) {
  if (!value) return null;

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toISOString();
}

export function applySeoMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl,
  robots = DEFAULT_ROBOTS,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl,
  ogType = 'website',
  ogSiteName = DEFAULT_SITE_NAME,
  ogLocale = DEFAULT_LOCALE,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  articleModifiedTime,
  msTileImage = DEFAULT_OG_IMAGE,
} = {}) {
  const safeTitle = title || DEFAULT_TITLE;
  const safeDescription = description || DEFAULT_DESCRIPTION;
  const resolvedCanonicalUrl = canonicalUrl ? toAbsoluteUrl(canonicalUrl) : null;
  const resolvedOgImage = toAbsoluteUrl(ogImage, DEFAULT_OG_IMAGE);
  const resolvedOgUrl = toAbsoluteUrl(ogUrl || resolvedCanonicalUrl || window.location.href);
  const resolvedTwitterImage = toAbsoluteUrl(twitterImage || resolvedOgImage, resolvedOgImage);
  const resolvedMsTileImage = toAbsoluteUrl(msTileImage, DEFAULT_OG_IMAGE);
  const resolvedModifiedTime = formatSeoDate(articleModifiedTime);

  document.title = safeTitle;

  setMetaByName('description', safeDescription);
  setMetaByName('robots', robots);

  if (keywords !== undefined) {
    setMetaByName('keywords', keywords);
  }

  setMetaByName('twitter:card', twitterCard);
  setMetaByName('twitter:title', twitterTitle || ogTitle || safeTitle);
  setMetaByName('twitter:description', twitterDescription || ogDescription || safeDescription);
  setMetaByName('twitter:image', resolvedTwitterImage);
  setMetaByName('msapplication-TileImage', resolvedMsTileImage);

  setMetaByProperty('og:title', ogTitle || safeTitle);
  setMetaByProperty('og:description', ogDescription || safeDescription);
  setMetaByProperty('og:image', resolvedOgImage);
  setMetaByProperty('og:url', resolvedOgUrl);
  setMetaByProperty('og:type', ogType);
  setMetaByProperty('og:site_name', ogSiteName);
  setMetaByProperty('og:locale', ogLocale);

  if (resolvedModifiedTime) {
    setMetaByProperty('article:modified_time', resolvedModifiedTime);
  }

  if (resolvedCanonicalUrl) {
    setLink('canonical', resolvedCanonicalUrl);
  }
}

export function applyJsonLdSchema(schema, schemaId = 'dynamic-jsonld-schema') {
  if (!schema || typeof document === 'undefined') return;

  let schemaScript = document.getElementById(schemaId);
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = schemaId;
    document.head.appendChild(schemaScript);
  }

  schemaScript.textContent = typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2);
}

export function removeJsonLdSchema(schemaId = 'dynamic-jsonld-schema') {
  if (typeof document === 'undefined') return;
  const schemaScript = document.getElementById(schemaId);
  if (schemaScript) {
    schemaScript.remove();
  }
}

export function generateFaqSchema(faqs = []) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question || '',
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || ''
      }
    }))
  };
}

export function generateReviewSchema({
  name = 'Click Mecha',
  description = 'Click Mecha is a leading digital marketing agency providing SEO, PPC, Social Media, and Web Development services.',
  url = 'https://clickmecha.com/',
  image = 'https://clickmecha.com/favicon.png',
  ratingValue = '4.9',
  bestRating = '5',
  worstRating = '1',
  ratingCount = 50,
  reviews = [],
  locationName = 'Delhi',
  telephone = '+919999008998',
  address = {
    streetAddress: '4, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi',
    addressLocality: 'Delhi',
    postalCode: '110026',
    addressCountry: 'IN'
  }
} = {}) {
  const schemaReviews = Array.isArray(reviews) && reviews.length > 0
    ? reviews.map(r => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": r.name || r.author || 'Verified Client'
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": String(r.rating || 5),
          "bestRating": "5",
          "worstRating": "1"
        },
        "reviewBody": r.content || r.review || r.message || r.text || '',
        "publisher": {
          "@type": "Organization",
          "name": "Google"
        }
      }))
    : [];

  const effectiveCount = Math.max(schemaReviews.length, Number(ratingCount) || 50);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "telephone": telephone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress || '4, N W Ave Rd, North Ave, West Punjabi Bagh, Delhi',
      "addressLocality": address.addressLocality || locationName || 'Delhi',
      "postalCode": address.postalCode || '110026',
      "addressCountry": address.addressCountry || 'IN'
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(ratingValue),
      "bestRating": String(bestRating),
      "worstRating": String(worstRating),
      "ratingCount": String(effectiveCount),
      "reviewCount": String(effectiveCount)
    },
    ...(schemaReviews.length > 0 ? { "review": schemaReviews } : {})
  };
}


