import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/data/blog');
const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const domain = 'https://www.wbbt.net';

// Base static pages
const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/spotify-gelir-hesaplama', priority: '0.9', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/artists', priority: '0.8', changefreq: 'weekly' },
    { path: '/services', priority: '0.7', changefreq: 'monthly' },
    { path: '/submit', priority: '0.5', changefreq: 'never' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/releases', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

let urls = staticPages.map(page => `
    <url>
        <loc>${domain}${page.path}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`);

// Dynamic Blog Pages
const files = fs.readdirSync(postsDir);
files.forEach(file => {
    if (file.endsWith('.ts')) {
        const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
        const slugMatch = content.match(/"slug"\s*:\s*["']([^"']+)["']/);
        if (slugMatch && slugMatch[1]) {
            const slug = slugMatch[1];
            urls.push(`
    <url>
        <loc>${domain}/blog/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`);
        }
    }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemap);
console.log('✅ sitemap.xml generated successfully with ' + urls.length + ' URLs!');
