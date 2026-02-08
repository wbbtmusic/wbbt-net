import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

const stockImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253440-b393452e8d2e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop"
];

function slugify(text) {
    if (!text) return 'unknown';
    return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

const rawContent = fs.readFileSync(blogsPath, 'utf8');
const chunks = rawContent.split('Writer: Burak');

const blogPosts = [];

const junkPhrases = [
    'All Posts', 'Log In', 'Submit', 'Blog', 'Artists', 'About Us', 'WBBT', 'Releases', 'VEVO',
    'Producers wanted', 'Details here', 'Make Money', 'Music Distribution', 'Social Media Marketing',
    'Streaming & Playlists', 'Music Business', 'Music Technology', 'Music News', 'Burak Can ÖĞÜT',
    'Skip to Main Content', 'Orbis AI', 'Loading...', 'Comments', 'Post not marked as liked',
    'min read', 'views', 'Admin', 'Site Contents', '© 2035', 'likes.',
    'Recent Posts', 'See All', 'Illustration of', 'Write a comment', 'Smartphone with',
    'Crowd enjoying', 'Abstract'
];

const isJunk = (line) => {
    if (!line || line.trim().length === 0) return true;
    const l = line.trim().toLowerCase();
    if (l.length < 2) return true;
    if (/^\d+$/.test(l)) return true;
    // Case insensitive check
    if (junkPhrases.some(phrase => l.includes(phrase.toLowerCase()))) return true;
    if (l.includes('**')) return true;
    return false;
};

// Initial Title
let nextTitle = "The Streaming Shake-Up of 2025";
const c0Lines = chunks[0].split('\n').map(l => l.trim());
for (let i = c0Lines.length - 1; i >= 0; i--) {
    const line = c0Lines[i];
    if (!isJunk(line)) {
        nextTitle = line;
        break;
    }
}

for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const lines = chunk.split('\n').map(l => l.trim());

    // 1. FIND START
    let contentStart = 0;
    while (contentStart < lines.length) {
        if (lines[contentStart] === 'Burak') { contentStart++; continue; }
        if (lines[contentStart].match(/\w{3} \d{1,2}, \d{4}/) || lines[contentStart].includes('read')) { contentStart++; continue; }
        if (!lines[contentStart]) { contentStart++; continue; }
        break;
    }

    // 2. FIND END & NEXT TITLE
    let contentEnd = lines.length;
    let foundNextTitle = null;
    let hitRecentPosts = false;

    for (let j = lines.length - 1; j >= contentStart; j--) {
        const line = lines[j];

        // Explicit Footer Markers
        if (['See All', 'Recent Posts'].includes(line) || line.includes('©') || line.includes('Post not marked')) {
            contentEnd = j;
            hitRecentPosts = true;
            continue;
        }

        if (foundNextTitle) {
            // Already found title. 
            // We assume titles are single line. 
            // Does this line look like Junk or Footer residue?
            if (isJunk(line) || hitRecentPosts) {
                contentEnd = j;
                if (line === 'Recent Posts') hitRecentPosts = true;
                continue;
            }

            // It's probably CONTENT. 
            // Stop scanning.
            contentEnd = j + 1;
            break;
        }

        // Looking for Title
        if (!isJunk(line)) {
            // Found it.
            foundNextTitle = line;
            contentEnd = j;
        } else {
            contentEnd = j;
            if (line === 'Recent Posts') hitRecentPosts = true;
        }
    }

    const contentLines = lines.slice(contentStart, contentEnd).filter(l => !isJunk(l));
    let content = contentLines.join('\n\n');

    const imgUrl = stockImages[(blogPosts.length) % stockImages.length];

    let category = "Music Business";
    const tLower = nextTitle.toLowerCase();
    if (tLower.includes('spotify') || tLower.includes('stream')) category = "Streaming & Playlists";
    else if (tLower.includes('ai ') || tLower.includes('tech')) category = "Music Technology";
    else if (tLower.includes('market') || tLower.includes('social')) category = "Music Marketing";

    let date = "February 5, 2026";
    const dateLine = lines.find(l => l.match(/\w{3} \d{1,2}, \d{4}/));
    if (dateLine) date = dateLine;

    // Filter Bad Titles
    if (nextTitle && nextTitle !== "Unknown Title" && nextTitle.length < 200 && !isJunk(nextTitle)) {
        blogPosts.push({
            id: blogPosts.length + 1,
            title: nextTitle,
            slug: slugify(nextTitle),
            category: category,
            date: date,
            author: "Burak",
            image: imgUrl,
            content: content || "<p>Restored content.</p>"
        });
    }

    if (foundNextTitle && !isJunk(foundNextTitle)) {
        nextTitle = foundNextTitle;
    } else {
        // Try falling back to last line if parsing failed?
        // No, stick to "Unknown" to identify errors.
        nextTitle = "Unknown Title";
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
