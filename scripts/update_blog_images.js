import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../src/data/blogPosts.ts');
let content = fs.readFileSync(blogsPath, 'utf8');

// Replace image URLs with local paths based on ID
// Pattern: "id": 1, ... "image": "..."
// or id: 1 ... image: "..." depending on format.
// restore_blogs_v2.js output: "id": 1, ... "image": "..." (JSON.stringify)

content = content.replace(/"id":\s*(\d+),[\s\S]*?"image":\s*"(https?:\/\/[^"]+)"/g, (match, id, url) => {
    // We want to keep the match but replace the image part.
    // Reconstruct the match? No, replace uses the whole match.
    // Regex is greedy/complex.
    // Better: parse JSON, modify, write back.
    // Since the file is `export const BLOG_POSTS: BlogPost[] = JSON_ARRAY;`
    // I can strip the prefix/suffix, parse JSON, modify, stringify, wrap.
    return match.replace(url, `/images/blog/blog-${id}.jpg`);
});

fs.writeFileSync(blogsPath, content);
console.log('Updated blog paths.');
