import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'

if (import.meta.env.DEV) {
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === 'string' && input.startsWith('https://cms.clickmecha.com')) {
      input = input.replace('https://cms.clickmecha.com', '');
    } else if (input && typeof input === 'object' && typeof input.url === 'string' && input.url.startsWith('https://cms.clickmecha.com')) {
      try {
        const newUrl = input.url.replace('https://cms.clickmecha.com', '');
        input = new Request(newUrl, input);
      } catch (e) {
        console.error('Failed to rewrite Request URL in fetch proxy', e);
      }
    }
    return originalFetch(input, init);
  };
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
