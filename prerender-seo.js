import fs from 'fs';
import path from 'path';
import { CITY_LOCATIONS, US_CITY_LOCATIONS, getCitySlug } from './src/data/cities.js';
import { SPECIALIZED_SERVICES } from './src/data/services.js';
import { fetchCmsSeoData, resolveSeoForRoute, injectSeoIntoHtml } from './scripts/seo-meta-resolver.js';

const DIST_DIR = path.join(process.cwd(), 'dist');
const DIST_INDEX = path.join(DIST_DIR, 'index.html');

async function runPrerenderSeo() {
  console.log('🚀 Starting SEO HTML pre-rendering for all routes...');

  if (!fs.existsSync(DIST_INDEX)) {
    console.error('❌ dist/index.html not found! Run `vite build` first.');
    return;
  }

  const baseHtmlTemplate = fs.readFileSync(DIST_INDEX, 'utf-8');
  const cmsMap = await fetchCmsSeoData();
  console.log(`📦 Loaded ${cmsMap.size} custom page meta entries from CMS.`);

  // Collect all site routes
  const routes = new Set();

  // 1. Static Routes
  const staticRoutes = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/career',
    '/clientele',
    '/posh-policy',
    '/growthlanding',
  ];
  staticRoutes.forEach(r => routes.add(r));

  // 2. City Pages (India & US)
  CITY_LOCATIONS.forEach(city => {
    const slug = getCitySlug(city);
    routes.add(`/digital-marketing-agency-in-${slug}`);
  });

  US_CITY_LOCATIONS.forEach(city => {
    const slug = getCitySlug(city);
    routes.add(`/us/digital-marketing-agency-in-${slug}`);
  });

  // 3. Specialized SubServices
  SPECIALIZED_SERVICES.forEach(service => {
    routes.add(`/in/${service.slug}-in-delhi`);
  });

  // 4. Dynamic Blogs from CMS API
  try {
    let currentPage = 1;
    let totalPages = 1;
    do {
      const res = await fetch(`https://cms.clickmecha.com/api/blogs?page=${currentPage}`);
      if (res.ok) {
        const json = await res.json();
        if (json.status && json.data) {
          const blogs = json.data.data || [];
          blogs.forEach(b => {
            if (b.slug) routes.add(`/blog/${b.slug}`);
          });
          totalPages = Math.ceil((json.data.total || 0) / (json.data.per_page || 10)) || 1;
        } else {
          break;
        }
      } else {
        break;
      }
      currentPage++;
    } while (currentPage <= totalPages);
  } catch (err) {
    console.warn('Could not fetch dynamic blog routes:', err.message);
  }

  // 5. Any extra slugs from CMS page-meta
  for (const slug of cmsMap.keys()) {
    if (slug === 'home') continue;
    routes.add(`/${slug}`);
  }

  console.log(`📄 Generating static HTML with dedicated SEO meta tags for ${routes.size} routes...`);

  let generatedCount = 0;

  for (const route of routes) {
    const seo = resolveSeoForRoute(route, cmsMap);
    const customizedHtml = injectSeoIntoHtml(baseHtmlTemplate, seo);

    if (route === '/' || route === '') {
      // Overwrite dist/index.html with home page SEO
      fs.writeFileSync(DIST_INDEX, customizedHtml, 'utf-8');
      generatedCount++;
      continue;
    }

    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    const routeHtmlFile = path.join(DIST_DIR, `${cleanRoute}.html`);
    const parentDir = path.dirname(routeHtmlFile);
    fs.mkdirSync(parentDir, { recursive: true });

    fs.writeFileSync(routeHtmlFile, customizedHtml, 'utf-8');
    generatedCount++;
  }

  console.log(`✅ Successfully generated ${generatedCount} clean static HTML SEO pages in dist/!`);
}

runPrerenderSeo().catch(err => {
  console.error('❌ Error during pre-rendering SEO pages:', err);
});
