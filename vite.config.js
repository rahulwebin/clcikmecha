import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchCmsSeoData, resolveSeoForRoute, injectSeoIntoHtml } from './scripts/seo-meta-resolver.js'

function devSeoPlugin() {
  let cmsMap = new Map()
  let fetchPromise = null

  return {
    name: 'dev-seo-plugin',
    async configureServer() {
      if (!fetchPromise) {
        fetchPromise = fetchCmsSeoData().then(data => {
          cmsMap = data
        }).catch(() => {})
      }
    },
    async transformIndexHtml(html, ctx) {
      if (fetchPromise) {
        await fetchPromise
      }
      const rawUrl = ctx.originalUrl || ctx.path || '/'
      const pathname = rawUrl.split('?')[0].split('#')[0]
      const seo = resolveSeoForRoute(pathname, cmsMap)
      return injectSeoIntoHtml(html, seo)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devSeoPlugin()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://cms.clickmecha.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
