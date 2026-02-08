import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

// Reliable Unsplash Images for Music/Tech
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
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Function to replace Turkish characters
function normalizeTitle(title) {
    return title.replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i');
}

const rawContent = fs.readFileSync(blogsPath, 'utf8');

const lines = rawContent.split('\n');
let currentPost = {};
let buffer = [];
let isCapturingContent = false;

const blogPosts = [];

// Helper to flush current post
const flushPost = () => {
    if (Object.keys(currentPost).length > 0) {
        // Clean up content
        // Remove empty lines from start/end of buffer before joining
        let startContent = 0;
        while (startContent < buffer.length && !buffer[startContent].trim()) startContent++;

        let endContent = buffer.length - 1;
        while (endContent >= 0 && !buffer[endContent].trim()) endContent--;

        const contentLines = buffer.slice(startContent, endContent + 1);
        currentPost.content = contentLines.join('\n');

        // Generate Slug
        const cleanTitle = normalizeTitle(currentPost.title || "Untitled");
        currentPost.slug = slugify(cleanTitle);

        // Assign Image (Cycle through stock if missing)
        currentPost.image = stockImages[blogPosts.length % stockImages.length];

        // Category Inference
        const t = (currentPost.title || "").toLowerCase();
        if (t.includes('spotify') || t.includes('streaming')) currentPost.category = "Streaming & Playlists";
        else if (t.includes('ai') || t.includes('technology')) currentPost.category = "Music Technology";
        else if (t.includes('marketing') || t.includes('social')) currentPost.category = "Music Marketing";
        else if (t.includes('distribution')) currentPost.category = "Music Distribution";
        else currentPost.category = "Music Business";

        // Assign ID
        // Keep existing IDs logic? Or just sequential?
        // Let's use sequential starting from 50 to avoid conflict if I merge?
        // Or better: just replace everything with new IDs 1..N.
        // User said "restore", so I will just produce a clean full list.
        currentPost.id = blogPosts.length + 1;
        currentPost.author = "Burak"; // Ensure author is set

        if (currentPost.title) {
            blogPosts.push(currentPost);
        }
        currentPost = {};
        buffer = [];
    }
};

let lineIdx = 0;
while (lineIdx < lines.length) {
    const line = lines[lineIdx].trim();

    if (line.includes('Writer: Burak')) {
        // Extract Title from buffer (last few lines)
        let titleLines = [];
        let contentEndIdx = buffer.length - 1;

        while (contentEndIdx >= 0 && !buffer[contentEndIdx].trim()) {
            contentEndIdx--;
        }

        let foundSeparator = false;
        // Search backwards for "See All", "Recent Posts", "© 2035"
        for (let i = contentEndIdx; i >= 0; i--) {
            const txt = buffer[i].trim();
            // Checking for common footer/separator text from previous post
            if (txt === 'See All' || txt === 'Recent Posts' || txt.includes('© 2035')) {
                for (let k = i + 1; k <= contentEndIdx; k++) {
                    if (buffer[k].trim()) titleLines.push(buffer[k].trim());
                }
                buffer = buffer.slice(0, i);
                foundSeparator = true;
                break;
            }
        }

        // Fallback for first post or missed separator
        if (!foundSeparator) {
            if (buffer.length < 10) {
                titleLines = buffer.filter(l => l.trim().length > 0);
                buffer = [];
            } else {
                // Take last 2 lines as title heuristic
                const lastLine = buffer[contentEndIdx];
                titleLines = [lastLine]; // Risky but better than nothing
                buffer = buffer.slice(0, contentEndIdx);
            }
        }

        const title = titleLines.join(' ');

        // Flush PREVIOUS post
        if (blogPosts.length > 0 || currentPost.content) {
            flushPost();
        }

        // Start NEW post
        currentPost = { title: title };

        // Grab Date
        if (lineIdx + 2 < lines.length) {
            const dateLine = lines[lineIdx + 2].trim();
            currentPost.date = dateLine.includes(',') ? dateLine : "February 5, 2026";
        }

        lineIdx += 4; // Skip headers
        buffer = [];
    } else {
        buffer.push(line);
        lineIdx++;
    }
}
flushPost();

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
