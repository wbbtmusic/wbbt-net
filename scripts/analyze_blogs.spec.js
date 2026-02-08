import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog data directly to know what to look for
// We need to read the TS file as text or use a require if we compiled it. 
// For simplicity in a test script, we'll read the file and extract JSON-like objects or just nav to known URLs.
// Actually, reading the blogs from the UI is safer to test the actual rendering.

test.describe('Blog Analysis', () => {
    const reportPath = path.join(__dirname, '../reports/blog_analysis.json');
    const problems = [];

    test('Analyze all blogs', async ({ page }) => {
        // 1. Navigate to Blog List
        await page.goto('http://localhost:5173/blog');

        // Wait for blog cards to load
        await page.waitForSelector('article, .blog-card, a[href^="/blog/"]');

        // Get all blog links
        const blogLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a[href^="/blog/"]'));
            return links.map(link => link.getAttribute('href')).filter(href => href && href.length > 6);
        });

        // Remove duplicates
        const uniqueLinks = [...new Set(blogLinks)];
        console.log(`Found ${uniqueLinks.length} blogs to analyze.`);

        for (const link of uniqueLinks) {
            const fullUrl = `http://localhost:5173${link}`;
            try {
                await page.goto(fullUrl);
                await page.waitForLoadState('networkidle');

                // 2. Check for Broken Images
                const images = await page.getByRole('img').all();
                const brokenImages = [];

                for (const img of images) {
                    const src = await img.getAttribute('src');
                    if (!src) continue;

                    // Check if naturalWidth is 0 (broken image in browser)
                    const isBroken = await img.evaluate(node => {
                        return node.naturalWidth === 0 || node.naturalHeight === 0;
                    });

                    if (isBroken) {
                        brokenImages.push(src);
                    }
                }

                // 3. Check Content Length
                const content = await page.evaluate(() => {
                    // Try to find the main content container. 
                    // Adjust selector based on actual app structure (e.g., article, main, .prose)
                    const container = document.querySelector('article') || document.querySelector('main') || document.body;
                    return container.innerText;
                });

                const contentLength = content.length;
                const isShort = contentLength < 1000; // Define "short" threshold

                // 4. Check Malformed HTML (Basic)
                // This is hard to check perfectly via Playwright, but we can check if critical elements are missing
                const hasTitle = await page.title().then(t => t.length > 0);

                if (brokenImages.length > 0 || isShort || !hasTitle) {
                    problems.push({
                        url: fullUrl,
                        brokenImages,
                        contentLength,
                        isShort,
                        hasTitle
                    });
                }

            } catch (error) {
                console.error(`Failed to analyze ${fullUrl}:`, error);
                problems.push({
                    url: fullUrl,
                    error: error.message
                });
            }
        }

        // Write Report
        const reportDir = path.dirname(reportPath);
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        fs.writeFileSync(reportPath, JSON.stringify(problems, null, 2));
        console.log(`Analysis complete. Report saved to ${reportPath}`);
    });
});
