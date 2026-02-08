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
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
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
    'min read', 'views', 'Admin', 'Site Contents', '© 2035', 'Orbis AI ile Sohbet Edin', 'likes.'
];

const isJunk = (line) => {
    if (!line || line.trim().length === 0) return true;
    const l = line.trim();
    if (l.length < 2) return true; // Single chars
    if (/^\d+$/.test(l)) return true; // Just numbers
    if (junkPhrases.some(phrase => l.includes(phrase))) return true;
    return false;
};

// Initial Title extraction from Chunk 0
let nextTitle = "The Streaming Shake-Up of 2025";
const c0Lines = chunks[0].split('\n').map(l => l.trim());
// Scan backwards from end of Chunk 0
for (let i = c0Lines.length - 1; i >= 0; i--) {
    const line = c0Lines[i];
    // The Title is the last non-junk line
    if (!isJunk(line)) {
        nextTitle = line;
        break;
    }
}

for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const lines = chunk.split('\n').map(l => l.trim());

    // --- 1. FIND START OF CONTENT ---
    let contentStart = 0;
    while (contentStart < lines.length) {
        // Skip "Burak" line if it's strictly just "Burak"
        if (lines[contentStart] === 'Burak') {
            contentStart++;
            continue;
        }
        // Skip Date / Read Time lines
        if (lines[contentStart].match(/\w{3} \d{1,2}, \d{4}/) || lines[contentStart].includes('read')) {
            contentStart++;
            continue;
        }
        // If it's empty, skip
        if (!lines[contentStart]) {
            contentStart++;
            continue;
        }
        break;
    }

    // --- 2. FIND END OF CONTENT (and NEXT Title) ---
    // Content ends when we hit the "Footer" / "Nav" block at the bottom of the chunk.
    // The "Next Title" is at the very bottom of the chunk, AFTER the Nav block?
    // Based on user feedback, Titles were "restored".
    // Let's assume the Title is the *last meaningful line* of the chunk.

    let contentEnd = lines.length;
    let foundNextTitle = null;

    // Scan backwards for Next Title
    for (let j = lines.length - 1; j >= contentStart; j--) {
        const line = lines[j];
        if (isJunk(line)) {
            contentEnd = j; // This line is junk, so content must end before it
            continue;
        }
        // Found a non-junk line at the bottom. This must be the Title of the next post.
        if (!foundNextTitle) {
            foundNextTitle = line;
            contentEnd = j; // Title is not content
            // Is it a Category? categories are filtered by Junk list (e.g. 'Music Business')
            // So if it survived isJunk, it's likely a Title.
        } else {
            // We already found a title. Is this line *part* of the title (multi-line)?
            // Or is it the end of valid content?
            // Let's assume titles are 1 line for safety, or strict separation.
            // If this line looks like a paragraph (long), it's probably content.
            if (line.length > 100) {
                // It's content.
                break;
            }
            // If short, maybe part of title? Or just end of content.
            // Let's assume it is content and stop.
            break;
        }
    }

    // Extract Content
    const contentLines = lines.slice(contentStart, contentEnd).filter(l => !isJunk(l));
    const content = contentLines.join('\n\n'); // Add spacing for readability

    // Determine Date
    let date = "February 5, 2026";
    const dateLine = lines.find(l => l.match(/\w{3} \d{1,2}, \d{4}/));
    if (dateLine) date = dateLine;

    // Determine Category from Title or Content keywords
    let category = "Music Business";
    const tLower = nextTitle.toLowerCase();
    if (tLower.includes('spotify') || tLower.includes('play')) category = "Streaming & Playlists";
    else if (tLower.includes('ai ') || tLower.includes('tech')) category = "Music Technology";
    else if (tLower.includes('market') || tLower.includes('social')) category = "Music Marketing";

    // Assign Image
    const imgUrl = stockImages[(blogPosts.length) % stockImages.length];

    if (nextTitle && nextTitle !== "Unknown Title") {
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

    if (foundNextTitle) {
        nextTitle = foundNextTitle;
    } else {
        nextTitle = "Unknown Title"; // Should not happen if parsing is good
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
