import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

const stockImages = [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253440-b393452e8d2e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-90148454dcf9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
];

function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

function normalizeTitle(title) {
    return title.replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i');
}

const rawContent = fs.readFileSync(blogsPath, 'utf8');

// Split by consistent delimiter
const chunks = rawContent.split('Writer: Burak');

console.log(`Found ${chunks.length} chunks (so likely ${chunks.length} posts or ${chunks.length - 1} posts?)`);

const blogPosts = [];
let nextTitle = chunks[0].trim(); // Data before the first "Writer: Burak" is the first title.

// Iterate chunks starting from 1
for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const lines = chunk.split('\n').map(l => l.trim());

    // Structure of chunk:
    // 0: Burak (optional usually empty or just Burak)
    // 1: Date
    // 2: Read Time
    // ... Content ...
    // Last few lines: Title of NEXT post (except for last chunk)

    let contentStart = 0;
    // Skip empty start lines
    while (contentStart < lines.length && (lines[contentStart] === 'Burak' || lines[contentStart] === '')) {
        contentStart++;
    }

    // Now we should be at Date?
    // "Dec 19, 2025" or similar.
    let date = "February 5, 2026";
    if (lines[contentStart] && lines[contentStart].match(/\w{3} \d{1,2}, \d{4}/)) {
        date = lines[contentStart];
        contentStart++;
    }

    // Skip Read Time
    if (lines[contentStart] && lines[contentStart].includes('read')) {
        contentStart++;
    }

    // Determine where content ends and Next Title begins.
    // Heuristic: Look for "See All" or "Recent Posts" or "© 2035"
    // Everything BEFORE that is content.
    // Everything AFTER that is Next Title.

    let separatorIndex = -1;
    for (let j = lines.length - 1; j >= contentStart; j--) {
        if (lines[j] === 'See All' || lines[j] === 'Recent Posts' || lines[j].includes('© 2035')) {
            separatorIndex = j;
            break;
        }
    }

    let currentContentLines = [];
    let nextTitleLines = [];

    if (separatorIndex !== -1) {
        // Content is up to separatorIndex (exclusive of separator lines?)
        // Actually usually "See All" allows us to find the "Title" after it.
        // Let's analyze buffer around separator.

        // Lines after separator are Next Title.
        nextTitleLines = lines.slice(separatorIndex + 1).filter(x => x);

        // Lines before separator are Content.
        // But we need to trim trailing noise (Recent Posts, etc)
        // Usually separatorIndex points to "Recent Posts" or "See All".
        // Start checking backtrack from separatorIndex.

        let contentEnd = separatorIndex;
        // Trim common keywords
        while (contentEnd > contentStart) {
            const t = lines[contentEnd - 1];
            if (t === 'Recent Posts' || t === 'See All' || t.includes('Post not marked')) {
                contentEnd--;
            } else {
                break;
            }
        }
        currentContentLines = lines.slice(contentStart, separatorIndex); // safe bet?
    } else {
        // Last chunk?
        if (i === chunks.length - 1) {
            currentContentLines = lines.slice(contentStart);
            nextTitleLines = [];
        } else {
            // No separator found, fallback: take last non-empty line as next title?
            // Or assume everything is content.
            currentContentLines = lines.slice(contentStart);
        }
    }

    // Clean Content
    const content = currentContentLines.join('\n').trim();

    // Build Post
    const post = {
        id: blogPosts.length + 1,
        title: nextTitle.replace(/\n/g, ' ').trim(),
        slug: slugify(normalizeTitle(nextTitle)),
        category: "Music Business", // default
        date: date,
        author: "Burak",
        image: stockImages[(blogPosts.length) % stockImages.length],
        content: content
    };

    // Refine Category
    const t = post.title.toLowerCase();
    if (t.includes('spotify') || t.includes('streaming')) post.category = "Streaming & Playlists";
    else if (t.includes('ai') || t.includes('technology')) post.category = "Music Technology";
    else if (t.includes('marketing') || t.includes('social')) post.category = "Music Marketing";
    else if (t.includes('distribution')) post.category = "Music Distribution";

    blogPosts.push(post);

    // Set Next Title
    if (nextTitleLines.length > 0) {
        // Usually Next Title is just 1-2 lines.
        nextTitle = nextTitleLines.join(' ');
    } else {
        nextTitle = "Unknown Title";
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
