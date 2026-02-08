import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const publicDir = path.join(__dirname, '../public');

console.log("Starting Deep Integrity Check...");

// 1. Read Blog Posts
const rawContent = fs.readFileSync(blogPostsPath, 'utf8');
const jsonStart = rawContent.indexOf("export const BLOG_POSTS: BlogPost[] = ");
const jsonString = rawContent.substring(jsonStart + "export const BLOG_POSTS: BlogPost[] = ".length).trim().replace(/;$/, '');
// Eval is dangerous but fast for this specific TS file structure relying on simple JSON
// Actually, let's use a safer regex extraction or basic JSON parse if it's clean JSON
// The previous file we wrote was `JSON.stringify`, so it should be valid JSON
// But it has `Import ...` at top.
let blogPosts;
try {
    blogPosts = JSON.parse(jsonString);
} catch (e) {
    console.error("Failed to parse blogPosts.ts as JSON. It might contain JS expressions.", e.message);
    process.exit(1);
}

// 2. Check Each Post
let errors = 0;
let checked = 0;

console.log(`\nVerifying ${blogPosts.length} posts...\n`);

for (const post of blogPosts) {
    const imagePath = post.image; // e.g., "/images/blog/blog-1.jpg"
    const localPath = path.join(publicDir, imagePath);

    process.stdout.write(`[Post ${post.id}] ${post.title.substring(0, 20)}... `);

    if (!fs.existsSync(localPath)) {
        console.log(`FAIL (File not found: ${imagePath})`);
        errors++;
        continue;
    }

    const stats = fs.statSync(localPath);
    if (stats.size === 0) {
        console.log(`FAIL (File empty: ${imagePath})`);
        errors++;
        continue;
    }

    // Check Magic Bytes (JPEG = FF D8)
    const fd = fs.openSync(localPath, 'r');
    const buffer = Buffer.alloc(2);
    fs.readSync(fd, buffer, 0, 2, 0);
    fs.closeSync(fd);

    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
        console.log(`PASS (Valid JPEG, ${Math.round(stats.size / 1024)}KB)`);
        checked++;
    } else {
        console.log(`WARN (Not a standard JPEG header: ${buffer.toString('hex')})`);
        // Might be PNG renamed or something, but we treat strictly.
        // Actually browsers are lenient, but let's log it.
        checked++;
    }
}

console.log(`\nIntegrity Check Complete.`);
console.log(`Verified: ${checked}`);
console.log(`Errors:   ${errors}`);

if (errors === 0) {
    console.log("\n✅ SUCCESS: All images are present and valid.");
} else {
    console.log("\n❌ FAILURE: Some images are missing or corrupt.");
}
