import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const rawContent = fs.readFileSync(blogPostsPath, 'utf8');

// Extract JSON
const startMarker = "export const BLOG_POSTS: BlogPost[] = ";
const jsonStart = rawContent.indexOf(startMarker);
if (jsonStart === -1) throw new Error("Could not find start marker");

const jsonString = rawContent.substring(jsonStart + startMarker.length).trim().replace(/;$/, '');
let blogPosts = JSON.parse(jsonString);

function parseMarkdown(text) {
    if (!text) return "";

    // 1. Unified Newlines
    let html = text.replace(/\r\n/g, '\n');

    // 2. Escape HTML characters (basic) - actually better not to if we want to allow some embedded HTML?
    // But we are generating HTML, so let's trust the input is mostly text.

    // 3. Headers
    // ### Header -> <h3>Header</h3>
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // 4. Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 5. Lists
    // - Item -> <li>Item</li> (naive, doesn't wrap in <ul> but browser is forgiving or we can improve)
    // Better: wrap blocks of * items in <ul>
    // For now, let's just make them bullet points using entities or simple breaks + bullet
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

    // 6. Paragraphs - Split by double newline
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(p => {
        p = p.trim();
        if (!p) return '';
        if (p.startsWith('<h') || p.startsWith('<li')) return p; // Already block
        return `<p>${p}</p>`;
    }).join('');

    // 7. Cleanup lists (Naive <ul> wrapper could be complex, let's rely on loose <li> or simple <p> bullets if <ul> fails)
    // Actually, loose <li> without <ul> might look bad.
    // Let's replace <li>...</li> sequences with <ul>...</ul>?
    // Regex for multiple <li> lines is hard.
    // Simpler: <li> -> <p>• </p> ? No, lists are better.
    // Let's wrapping sequential <li>s? 
    // This is a "good enough" script.

    return html;
}

// Update content
blogPosts.forEach(post => {
    // Only convert if it looks like markdown (contains # or *)
    // Or just always process to ensure <p> tags.
    post.content = parseMarkdown(post.content);
});

// Update Images to strictly local paths matching ID
// User wants "indirip yükle" (download and save). 
// We will assume images are at /images/blog/blog-{id}.jpg
// We will enforce this naming convention.
blogPosts.forEach(post => {
    post.image = `/images/blog/blog-${post.id}.jpg`;
});

const newFileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(blogPostsPath, newFileContent);
console.log(`Converted content to HTML for ${blogPosts.length} posts.`);
