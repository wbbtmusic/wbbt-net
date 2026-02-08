import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

// Replaced the bad URL (b39345...) with a safe one
const stockImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop",
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
    'Crowd enjoying', 'Abstract', 'AI robotic hands', '0 comments', 'More info', 'Read more'
];

const isJunk = (line) => {
    if (!line || line.trim().length === 0) return true;
    const l = line.trim().toLowerCase();
    if (l.length < 2) return true;
    if (/^\d+$/.test(l)) return true;
    if (junkPhrases.some(phrase => l.includes(phrase.toLowerCase()))) return true;
    if (l.includes('**') && l.length < 20) return true;
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
        if (lines[contentStart].startsWith('Introduction')) { contentStart++; continue; }
        if (!lines[contentStart]) { contentStart++; continue; }
        break;
    }

    // 2. FIND END & NEXT TITLE
    // Find Next Title (Last non-junk line)
    let foundNextTitle = null;
    let endScanLimit = lines.length;

    for (let j = lines.length - 1; j >= contentStart; j--) {
        const line = lines[j];
        if (!isJunk(line)) {
            foundNextTitle = line;
            endScanLimit = j; // Title is at j
            break;
        }
    }

    // Determine Content End using Anchor Heuristic
    // Start scanning UP from endScanLimit.
    // If we meet Junk, update 'footerBoundary'.
    // If we meet Long Line (>150), LOCK contentEnd.

    let contentEnd = endScanLimit;

    // Heuristic: Initially assume everything above Title is content, 
    // but update assumption as we find Junk.

    for (let j = endScanLimit - 1; j >= contentStart; j--) {
        const line = lines[j];

        // Is it Junk?
        if (isJunk(line)) {
            contentEnd = j; // Everything below J is junk/footer
        } else {
            // Is it Long? (Anchor)
            if (line.length > 150) {
                // Confirm Content!
                contentEnd = j + 1; // Content includes J
                break; // Stop scanning, we found the content block.
            }
            // If it's short clean line...
            // It could be Footer Title (discard) or Short Paragraph (keep).
            // We differentiate by context.
            // If we haven't hit the Anchor yet, we assume it *might* be footer
            // UNLESS we are very high up? 
            // Better to be safe: If we are 'floating' in short lines near the bottom, 
            // and we have seen junk below, we treat it as footer.
            // So we do NOT update contentEnd (keep it cropped).
            // ONLY long lines snap the crop boundary down to include them.
        }
    }

    // Fallback: If no long lines found (very short post?)
    // contentEnd will be the index of the highest Junk line found.
    // If no Junk found, it will be endScanLimit.
    // This looks robust.

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
        nextTitle = "Unknown Title";
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
