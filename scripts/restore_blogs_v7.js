import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

// Fresh, reliable Unsplash Images (Music, Studio, Vinyl, Technology)
const stockImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop", // Music Generic
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop", // Studio
    "https://images.unsplash.com/photo-1514525253440-b393452e8d2e?q=80&w=2070&auto=format&fit=crop", // Live
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop", // DJ
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", // Headphones
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop", // Concert
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop", // Vinyl
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop", // MIC
    "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop"  // Abstract
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
    'min read', 'views', 'Admin', 'Site Contents', '© 2035', 'Orbis AI ile Sohbet Edin', 'likes.',
    'Recent Posts', 'See All', 'Illustration of'
];

const isJunk = (line) => {
    if (!line || line.trim().length === 0) return true;
    const l = line.trim();
    if (l.length < 2) return true;
    if (/^\d+$/.test(l)) return true; // Just numbers
    if (junkPhrases.some(phrase => l.includes(phrase))) return true;
    if (l.includes('**')) return true; // Ads or bold formatting lines shouldn't be Titles
    return false;
};

// Initial Title Finding (Chunk 0)
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

    // --- 1. FIND START OF CONTENT ---
    let contentStart = 0;
    while (contentStart < lines.length) {
        if (lines[contentStart] === 'Burak') { contentStart++; continue; }
        if (lines[contentStart].match(/\w{3} \d{1,2}, \d{4}/) || lines[contentStart].includes('read')) { contentStart++; continue; }
        if (!lines[contentStart]) { contentStart++; continue; }
        break;
    }

    // --- 2. FIND END OF CONTENT & NEXT TITLE ---
    let contentEnd = lines.length;
    let foundNextTitle = null;
    let hitRecentPosts = false;

    // Scan backwards
    for (let j = lines.length - 1; j >= contentStart; j--) {
        const line = lines[j];

        // Check for explicit Footer Markers
        if (line === 'See All' || line === 'Recent Posts' || line.includes('©') || line.includes('Post not marked')) {
            contentEnd = j;
            hitRecentPosts = true; // We are definitely in footer/junk territory
            continue;
        }

        // If we found the title already, we are looking for the content boundary
        if (foundNextTitle) {
            // If we hit "Recent Posts" NOW (after finding title), it confirms title was alone?
            // Actually, "Recent Posts" is usually ABOVE "All Posts" which is ABOVE "Title".
            // So scanning backwards: Writer -> Title -> All Posts -> Recent Posts -> Content.

            // So if we found Title, and we keep going back, we typically hit junk (All Posts, Recent Posts).
            // We should strip ALL of that until we hit Content.

            if (isJunk(line) || hitRecentPosts) {
                contentEnd = j;
                // If this junk line is "Recent Posts", mark flag
                if (line === 'Recent Posts') hitRecentPosts = true;
                continue;
            }

            // We hit a non-junk line.
            // If we haven't hit "Recent Posts" yet, could this still be part of the footer list?
            // Yes, the "Recent Posts" list contains titles that look like content.
            // BUT, "Recent Posts" header is ABOVE the list.
            // Scan: Writer -> Title -> All Posts -> [List Items] -> Recent Posts -> Content.
            // So "Recent Posts" header separates Content from List.
            // Thus, we must discard EVERYTHING until we see "Recent Posts" (scanning backwards).

            // Wait. "Recent Posts" (Header) -> List -> Title (of next post)?
            // No. "Recent Posts" is at the bottom of Post `i`.
            // Structure:
            // Content `i`
            // "Recent Posts"
            // "Title A"
            // "Title B"
            // "See All"
            // "All Posts" (Nav)
            // "Title `i+1`"
            // "Writer: Burak"

            // So, scanning backwards:
            // 1. Title `i+1` (Found!)
            // 2. All Posts (Junk)
            // 3. See All (Junk/Marker)
            // 4. Title B (List item - looks like text!)
            // 5. Title A (List item)
            // 6. Recent Posts (Marker)
            // 7. Content `i`

            // CONCLUSION:
            // Once we find Title `i+1`, we MUST keep discarding lines until we pass "Recent Posts".
            // If we don't find "Recent Posts", we might delete real content?
            // "Recent Posts" is very common.
            // ALSO, "See All" is common.

            if (!hitRecentPosts) {
                // We are in the danger zone (Recent Lists).
                // Safest bet: Discard it.
                // How to know when we are out of danger? When we hit "Recent Posts".
                contentEnd = j;
                if (line === 'Recent Posts') hitRecentPosts = true;
            } else {
                // We have passed "Recent Posts". Use this line as content end?
                // No, line `j` IS content. `contentEnd` should be `j + 1`.
                contentEnd = j + 1;
                break; // Done! found content end.
            }
            continue;
        }

        // We haven't found Title `i+1` yet.
        if (!isJunk(line)) {
            // Found it!
            foundNextTitle = line;
            contentEnd = j;
            // Now continue scanning to strip footer
        } else {
            // Still junk (Writer, date, nav)
            contentEnd = j;
            if (line === 'Recent Posts') hitRecentPosts = true;
        }
    }

    const contentLines = lines.slice(contentStart, contentEnd).filter(l => !isJunk(l));
    let content = contentLines.join('\n\n');

    // Fallback: If no "Recent Posts" found, we might have stripped nothing?
    // User feedback says "Recent Posts" residues were present.
    // So usually "Recent Posts" IS present.
    // If content is suspiciously short?

    const imgUrl = stockImages[(blogPosts.length) % stockImages.length];

    // Category Logic
    let category = "Music Business";
    const tLower = nextTitle.toLowerCase();
    if (tLower.includes('spotify') || tLower.includes('play')) category = "Streaming & Playlists";
    else if (tLower.includes('ai ') || tLower.includes('tech')) category = "Music Technology";
    else if (tLower.includes('market') || tLower.includes('social')) category = "Music Marketing";

    // Date
    let date = "February 5, 2026";
    const dateLine = lines.find(l => l.match(/\w{3} \d{1,2}, \d{4}/));
    if (dateLine) date = dateLine;

    // Reject if Title is "Unknown" or same as content start
    if (nextTitle && nextTitle !== "Unknown Title" && nextTitle.length < 200) {
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
        nextTitle = "Unknown Title";
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
