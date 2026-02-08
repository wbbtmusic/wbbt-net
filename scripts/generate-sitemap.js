import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to import data. using dynamic import or reading files directly 
// Since we are in a script, let's read the source files carefully or use a hardcoded strategy if imports are tricky in this environment depending on ts-node/node setup.
// To avoid TS compilation issues in a simple script, we'll read the JSON/TS files as text and extract needed IDs, or just rely on the 'seo_summary.json' which seems to have most URLs.

// Strategy: Read seo_summary.json for base structure, and then manually add dynamic routes if they are missing
const SEO_SUMMARY_PATH = path.join(__dirname, '../seo_summary.json');
const BLOG_DATA_PATH = path.join(__dirname, '../src/data/blog/blogs.txt'); // Assuming this exists or we use siteData.ts
// actually, let's just stick to a robust static list + reading the directory for blogs

// Base URL
const BASE_URL = 'https://www.wbbt.net';

const staticRoutes = [
    '/',
    '/artists',
    '/releases',
    '/submit',
    '/blog',
    '/about',
    '/services',
    '/privacy',
    '/terms'
];

async function generateSitemap() {
    console.log('Generating sitemap...');

    let urls = [...staticRoutes];

    // 1. Add Artists (We can read from src/data/siteData.ts... or just regex it out)
    const siteDataPath = path.join(__dirname, '../src/data/siteData.ts');
    if (fs.existsSync(siteDataPath)) {
        const siteDataContent = fs.readFileSync(siteDataPath, 'utf-8');
        // Extract Artist IDs
        const artistMatches = siteDataContent.matchAll(/id:\s*"([^"]+)"/g);
        for (const match of artistMatches) {
            // Filter out numeric IDs which are likely releases if any (though regex shows strings)
            // Artist IDs are usually strings like "wbbt", "oyku"
            // Release IDs are numbers but in TS they might be number type, regex looks for string quotes.
            // Let's assume if it matches "id": "something" it's an artist ID based on the file structure.
            if (isNaN(Number(match[1]))) {
                urls.push(`/artists/${match[1]}`);
            }
        }
    }

    // 2. Add Blog Posts
    // We need to read the blog post files to get both SLUG and CATEGORY
    const blogDir = path.join(__dirname, '../src/data/blog');
    if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir);
        console.log(`Found ${files.length} blog files.`);

        files.forEach(file => {
            if (file.endsWith('.ts')) {
                const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');

                // Relaxed regex to capture slug and category
                // Looks for: "slug": "value" OR slug: "value"
                const slugMatch = content.match(/(?:["']?slug["']?|slug)\s*:\s*["']([^"']+)["']/);
                const categoryMatch = content.match(/(?:["']?category["']?|category)\s*:\s*["']([^"']+)["']/);

                if (slugMatch && categoryMatch) {
                    const slug = slugMatch[1];
                    // Convert category "Music Industry" -> "music-industry"
                    const category = categoryMatch[1].toLowerCase().replace(/\s+/g, '-');

                    // Construct URL: /blog/:category/:slug
                    urls.push(`/blog/${category}/${slug}`);
                } else {
                    console.warn(`Could not extract slug/category from ${file}`);
                }
            }
        });
    }

    // Remove duplicates
    urls = [...new Set(urls)];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
        <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemapContent);
    console.log(`Sitemap generated with ${urls.length} URLs at ${outputPath}`);
}

generateSitemap().catch(console.error);
