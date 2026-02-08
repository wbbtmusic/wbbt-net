import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const rawContent = fs.readFileSync(blogPostsPath, 'utf8');

// Regex to find objects in the array
// This is a rough parser, assuming standard formatting from my previous script
const reportPath = path.join(__dirname, 'title_analysis_report.txt');

// We can just iterate over "id": ... "content": ... blocks
// The file format is predictable since I generated it.

const posts = [];
const lines = rawContent.split('\n');
let currentPost = {};
let inContent = false;

for (let line of lines) {
    line = line.trim();
    if (line.startsWith('"id":')) {
        currentPost = { id: line.split(':')[1].replace(',', '').trim() };
    } else if (line.startsWith('"title":')) {
        currentPost.title = line.substring(9).replace(/^"|",?$/g, '');
    } else if (line.startsWith('"content":')) {
        currentPost.content = line.substring(11).replace(/^"|"?$/g, '');
        // Content might be multi-line in source string? No, JSON stringify escapes newlines.
        // But my previous script used `content: content || ...` in the object literal found in the array?
        // Wait, the previous script wrote: `export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`
        // So content is on one line (escaped \n) inside the JSON string.
        posts.push(currentPost);
    }
}

let report = "";
posts.forEach(p => {
    let snippet = (p.content || "").substring(0, 100).replace(/\\n/g, ' ');
    report += `ID: ${p.id}\nTITLE: ${p.title}\nSNIPPET: ${snippet}\n-----------------------------------\n`;
});

fs.writeFileSync(reportPath, report);
console.log(`Analyzed ${posts.length} posts.`);
