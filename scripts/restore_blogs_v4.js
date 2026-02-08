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

// Keywords to ignore when looking for Title
const ignoreKeywords = [
    'All Posts', 'Log In', 'Submit', 'Blog', 'Artists', 'About Us', 'WBBT', 'records', 'Releases', 'VEVO',
    'Producers wanted', 'Details here', 'Make Money', 'Music Distribution', 'Social Media Marketing',
    'Streaming & Playlists', 'Music Business', 'Music Technology', 'Music News', 'Burak Can ÖĞÜT',
    'Skip to Main Content', 'Orbis AI'
];

// Helper to clean title candidates
const isJunk = (line) => {
    if (!line) return true;
    if (line.length < 3) return true; // too short
    if (ignoreKeywords.some(kw => line.includes(kw))) return true;
    if (line.includes('2035')) return true;
    return false;
};

// Initial Title (Chunk 0)
let nextTitle = "The Streaming Shake-Up of 2025"; // Hardcoded first title fallback if parsing fails
// Try to find real title from Chunk 0 end
const chunk0Lines = chunks[0].split('\n').map(l => l.trim());
let c0Idx = chunk0Lines.length - 1;
// Backtrack to find title
while (c0Idx >= 0) {
    if (!isJunk(chunk0Lines[c0Idx])) {
        // Found it?
        // Check if it's a category
        // Assuming no categories in Chunk 0
        nextTitle = chunk0Lines[c0Idx];
        break;
    }
    c0Idx--;
}

for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const lines = chunk.split('\n').map(l => l.trim());

    // --- PARSE CONTENT (Start) ---
    let contentStart = 0;
    while (contentStart < lines.length && (lines[contentStart] === 'Burak' || lines[contentStart] === '')) contentStart++;

    // Date
    let date = "February 5, 2026";
    // Check first few lines for date
    for (let k = 0; k < 5; k++) {
        if (contentStart + k < lines.length && lines[contentStart + k].match(/\w{3} \d{1,2}, \d{4}/)) {
            date = lines[contentStart + k];
            contentStart += k + 1;
            break;
        }
    }

    // Read time
    if (lines[contentStart] && lines[contentStart].includes('read')) contentStart++;

    // --- PARSE NEXT TITLE (End) ---
    let contentEnd = lines.length;
    let foundNextTitle = null;
    let endScan = lines.length - 1;

    // Backtrack to find Next Title
    while (endScan > contentStart) {
        const line = lines[endScan];

        // Stop if we hit footer markers
        if (line === 'See All' || line === 'Recent Posts' || line.includes('©') || line.includes('Post not marked')) {
            contentEnd = endScan;
            break;
        }

        if (!isJunk(line)) {
            // This is a candidate for Title
            if (!foundNextTitle) {
                foundNextTitle = line;
                // But wait, sometimes title is split across 2 lines?
                // Or we might have hit "Introduction" (which is content)
                // "Introduction" is NOT title.
                if (line === 'Introduction') {
                    // Oops, we went too far back into content? 
                    // No, "Introduction" is usually start of content.
                    // But we are scanning from END.
                    // If we see "Introduction" at the end, that's weird.
                }
            } else {
                // If we already found a title line, this might be the first line of a 2-line title?
                // Or it might be Content?
                // Titles are usually distinct.
                // If we found a title, and this line is also non-junk, maybe it's the Category?
                // Check if it's a category
            }
        }
        endScan--;
    }

    // Refine Content End
    // Scan forward from Content Start to find "See All", "Recent Posts", or Copyright
    let realContentEnd = contentStart;
    for (let k = contentStart; k < lines.length; k++) {
        const line = lines[k];
        if (line === 'See All' || line === 'Recent Posts' || line.includes('©') || line.includes('Post not marked')) {
            break;
        }
        // Also if we hit the Nav keywords, it's end of content
        if (ignoreKeywords.some(kw => line.includes(kw))) {
            // Careful, "Music Business" might be mentioned in text?
            // Usually Nav keywords appear in a block.
        }
        realContentEnd = k + 1;
    }

    // Filter Nav block from end of content
    let finalContentLines = lines.slice(contentStart, realContentEnd);
    // Remove trailing junk lines
    while (finalContentLines.length > 0 && isJunk(finalContentLines[finalContentLines.length - 1])) {
        // Only remove if it strictly matches a keyword or is empty
        const l = finalContentLines[finalContentLines.length - 1];
        if (ignoreKeywords.some(kw => l === kw) || l === '') {
            finalContentLines.pop();
        } else {
            break;
        }
    }

    const content = finalContentLines.filter(l => !l.includes('Writer: Burak') && l !== 'Burak').join('\n').trim();

    // DETERMINE IMAGE
    // Check if we have a specific image associated or just use stock
    const imgUrl = stockImages[(blogPosts.length) % stockImages.length];

    blogPosts.push({
        id: blogPosts.length + 1,
        title: nextTitle,
        slug: slugify(nextTitle),
        category: "Music Business", // Default
        date: date,
        author: "Burak",
        image: imgUrl, // Use URL first to allow downloading
        content: content || "<p>Content coming soon.</p>"
    });

    if (foundNextTitle) {
        nextTitle = foundNextTitle;
    } else {
        // Fallback: try to find it in the "junk" we skipped?
        // Sometimes title might be "Music Distribution" (if it's same as category?)
        // Let's rely on "Restored" fallback if strictly needed but try to avoid it.
        // nextTitle = "Restored Post " + (i+1); 
        // Keep previous title? No.
        // If we can't find it, look at the very last line of the chunk
        const lastLine = lines[lines.length - 1];
        if (lastLine && lastLine.length > 5 && !lastLine.includes('Writer')) {
            nextTitle = lastLine;
        }
    }
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
