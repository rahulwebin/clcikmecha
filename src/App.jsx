import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Service from './pages/Service/Service'
import Contact from './pages/Contact/Contact'
import Blog from './pages/Blog/Blog'
import BlogPost from './pages/BlogPost/BlogPost'
import Clientele from './pages/Clientele/Clientele'
import Career from './pages/Career/Career'
import CareerDetail from './pages/CareerDetail/CareerDetail'
import PoSH from './pages/PoSH/PoSH'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import LandingPage from './pages/LandingPage/LandingPage'
import SubServiceDetail from './pages/SubServiceDetail/SubServiceDetail'
import NotFound from './pages/NotFound/NotFound'
import { ContactModalProvider } from './context/ContactModalContext'
import { CITY_LOCATIONS, getCityPagePath, US_CITY_LOCATIONS } from './data/cities'

import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import { applySeoMetadata, BASE_URL } from './utils/seo'

const cityPagePaths = new Set([
  ...CITY_LOCATIONS.map((loc) => getCityPagePath(loc)),
  ...US_CITY_LOCATIONS.map((loc) => getCityPagePath(loc))
]);

function SiteSeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const pageUrl = cityPagePaths.has(normalizedPath)
      ? `${BASE_URL}${normalizedPath}`
      : `${BASE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;
    const isBlogArticle = normalizedPath.startsWith('/blog/');

    applySeoMetadata({
      canonicalUrl: pageUrl,
      ogUrl: pageUrl,
      ogType: isBlogArticle ? 'article' : 'website',
      articleModifiedTime: document.lastModified,
    });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/growthlanding';

  useEffect(() => {
    let rawPath = location.pathname;
    let decodedPath = rawPath;
    try {
      decodedPath = decodeURIComponent(rawPath);
    } catch (e) {
      // In case of URI malformed error
    }

    // Redirect malformed Jaipur URL variations with quotes, brackets, or HTML fragments
    if (
      decodedPath.includes('digital-marketing-services-in-jaipur') &&
      (decodedPath.includes('"') || decodedPath.includes('>') || decodedPath.includes('<') || rawPath.includes('%22') || rawPath.includes('%3E'))
    ) {
      navigate('/in/digital-marketing-services-in-jaipur', { replace: true });
      return;
    }

    if (location.pathname === '/service-detail' || location.pathname === '/service-detail/') {
      navigate('/digital-marketing-agency-in-dubai', { replace: true });
      return;
    }

    // Global rule: automatically redirect any URL with trailing slash to clean non-trailing slash version
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      const cleanPath = location.pathname.replace(/\/+$/, '');
      navigate(`${cleanPath}${location.search}${location.hash}`, { replace: true });
      return;
    }
  }, [location, navigate]);

  return (
    <ContactModalProvider>
      <SmoothScroll>
        <SiteSeoManager />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/clientele" element={<Clientele />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:slug" element={<CareerDetail />} />
          <Route path="/growthlanding" element={<LandingPage />} />

          {CITY_LOCATIONS.map((loc, index) => {
            return <Route key={index} path={getCityPagePath(loc)} element={<ServiceDetail locationLabel={loc} />} />;
          })}

          {US_CITY_LOCATIONS.map((loc, index) => {
            return <Route key={index} path={getCityPagePath(loc)} element={<ServiceDetail locationLabel={loc} />} />;
          })}

          <Route path="/posh-policy" element={<PoSH />} />

          <Route path="/in/:serviceCitySlug" element={<SubServiceDetail />} />
          <Route path="/us/:serviceCitySlug" element={<SubServiceDetail />} />
          <Route path="/ae/:serviceCitySlug" element={<SubServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isLandingPage && <Footer />}
        {!isLandingPage && <WhatsAppButton />}
      </SmoothScroll>
    </ContactModalProvider >
  )
}

export default App;
