import fs from 'fs';
import path from 'path';
import { CITY_LOCATIONS, US_CITY_LOCATIONS, getCitySlug } from './src/data/cities.js';
import { SPECIALIZED_SERVICES } from './src/data/services.js';

const APP_JSX_PATH = path.join(process.cwd(), 'src', 'App.jsx');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const BASE_URL = 'https://clickmecha.com';

async function generateSitemap() {
  try {
    const appFile = fs.readFileSync(APP_JSX_PATH, 'utf-8');

    // Regex to match path="..." in <Route> tags
    const routeRegex = /<Route\s+(?:[^>]*?\s+)?path=["']([^"']+)["']/g;
    let match;
    const routes = new Set();

    const addRoute = (r) => {
      if (r === undefined || r === null) return;
      const clean = r.replace(/^\/+|\/+$/g, '');
      routes.add(clean);
    };

    while ((match = routeRegex.exec(appFile)) !== null) {
      let routePath = match[1];

      // Add static routes. Ignore dynamic routes (like /blog/:slug) for the automatic static sitemap.
      if (!routePath.includes(':') && routePath !== '*') {
        addRoute(routePath);
      }
    }

    // City Pages (India & US)
    CITY_LOCATIONS.forEach(loc => {
      const slug = getCitySlug(loc);
      addRoute(`digital-marketing-agency-in-${slug}`);
    });

    US_CITY_LOCATIONS.forEach(loc => {
      const slug = getCitySlug(loc);
      addRoute(`us/digital-marketing-agency-in-${slug}`);
    });

    // Specialized SubService Pages
    SPECIALIZED_SERVICES.forEach(service => {
      addRoute(`in/${service.slug}-in-delhi`);
    });

    // Fetch dynamic blog routes from API
    console.log('Fetching blogs from API for sitemap...');
    let currentPage = 1;
    let totalPages = 1;

    do {
      try {
        const res = await fetch(`https://cms.clickmecha.com/api/blogs?page=${currentPage}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (data.status && data.data) {
          const paginationData = data.data;
          const blogs = paginationData.data || [];

          // Add each blog slug to the routes set
          blogs.forEach(blog => {
            if (blog.slug) {
              addRoute(`blog/${blog.slug}`);
            }
          });

          const total = paginationData.total || 0;
          const perPage = paginationData.per_page || 10;
          totalPages = Math.ceil(total / perPage);
        } else {
          break;
        }
      } catch (err) {
        console.error(`Failed to fetch blogs page ${currentPage} for sitemap:`, err.message);
        break;
      }
      currentPage++;
    } while (currentPage <= totalPages);

    // Fetch any extra custom page meta from CMS
    try {
      const pageMetaRes = await fetch('https://cms.clickmecha.com/api/page-meta');
      if (pageMetaRes.ok) {
        const json = await pageMetaRes.json();
        if (json.status && Array.isArray(json.data)) {
          json.data.forEach(item => {
            if (item.slug && item.slug !== 'home') {
              addRoute(item.slug);
            }
          });
        }
      }
    } catch (err) {
      console.warn('Could not fetch CMS page-meta for sitemap:', err.message);
    }

    function getPriorityForRoute(route) {
      if (route === '' || route === '/') {
        return '1.0';
      }
      if (route.startsWith('blog/') || route.startsWith('career/')) {
        return '0.7';
      }
      if (
        route.startsWith('digital-marketing-agency-in-') ||
        route.startsWith('us/digital-marketing-agency-in-') ||
        route.startsWith('in/') ||
        route.startsWith('us/') ||
        route.startsWith('ae/')
      ) {
        return '0.7';
      }
      return '0.8';
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(routes).map(route => {
      const locUrl = route ? `${BASE_URL}/${route}` : `${BASE_URL}/`;
      return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${getPriorityForRoute(route)}</priority>
  </url>`;
    }).join('\n')}
</urlset>`;

    // Ensure public directory exists
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    console.log('✅ sitemap.xml generated successfully automatically!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
  }
}

generateSitemap();
