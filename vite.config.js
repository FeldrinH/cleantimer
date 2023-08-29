import { resolve } from 'path';
import { defineConfig } from 'vite';

/** @type {import('vite').Plugin} */
const sitemapPlugin = {
    name: 'sitemap',
    async generateBundle() {
        this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
    <loc>${process.env.PUBLIC_URL || 'http://localhost:5173/'}</loc>
    <lastmod>2023-08-29T20:26:43+00:00</lastmod>
</url>

</urlset>
`
        })
    }
}

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    assetsInclude: ['**/sitemap.xml'],
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                countdown: resolve(__dirname, 'src/countdown/index.html'),
            },
            plugins: [
                sitemapPlugin,
            ],
        }
    }
})