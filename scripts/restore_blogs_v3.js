import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../blogs.txt');
const outputPath = path.join(__dirname, '../src/data/blogPosts.ts');

const stockImages = [
    "/images/blog/blog-1.jpg",
    "/images/blog/blog-2.jpg",
    "/images/blog/blog-3.jpg",
    "/images/blog/blog-4.jpg",
    "/images/blog/blog-5.jpg",
    "/images/blog/blog-6.jpg",
    "/images/blog/blog-7.jpg",
    "/images/blog/blog-8.jpg",
    "/images/blog/blog-9.jpg",
    "/images/blog/blog-10.jpg"
];

function slugify(text) {
    if (!text) return 'unknown';
    return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

function normalizeTitle(title) {
    if (!title) return '';
    return title.replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i');
}

const rawContent = fs.readFileSync(blogsPath, 'utf8');
const chunks = rawContent.split('Writer: Burak');

// chunks[0] is Title of Post 1 (mostly)
// chunks[1] is Post 1 body + Post 2 Title
// ...

const blogPosts = [];
let nextTitle = chunks[0].trim();
// Clean up initial title if it has garbage
const titleLines = nextTitle.split('\n').filter(l => l.trim());
if (titleLines.length > 0) nextTitle = titleLines[titleLines.length - 1]; // Assume last line is title?

for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const lines = chunk.split('\n').map(l => l.trim());

    // 1. Metadata (Date)
    let contentStart = 0;
    while (contentStart < lines.length && (lines[contentStart] === 'Burak' || lines[contentStart] === '')) {
        contentStart++;
    }

    let date = "February 5, 2026";
    // Look for date in first 5 lines
    for (let k = contentStart; k < Math.min(contentStart + 5, lines.length); k++) {
        if (lines[k].match(/\w{3} \d{1,2}, \d{4}/)) {
            date = lines[k];
            contentStart = k + 1; // Content starts after date
            break;
        }
    }

    // Skip Read Time
    if (lines[contentStart] && lines[contentStart].includes('read')) contentStart++;

    // 2. Separate Content from Next Title
    // Scan backwards
    let contentEnd = lines.length;
    let foundNextTitle = false;
    let nextTitleCandidate = [];

    // Heuristic: "See All", "Recent Posts", "©", "Post not marked"
    for (let j = lines.length - 1; j >= contentStart; j--) {
        const line = lines[j];
        if (line === 'See All' || line === 'Recent Posts' || line.includes('©') || line.includes('Post not marked')) {
            contentEnd = j;
            // Continue scanning backwards to remove all footer noise
            continue;
        }

        // If we found a footer marker previously, then existing lines below it were Next Title?
        // No, Next Title is AFTER "See All" usually?
        // Let's check blogs.txt structure in step 1492.
        // Line 1109: "2"
        // Line 1111: "Loading..."
        // ...
        // Line 1137: "About Us"
        // ...
        // Line 1145: "All Posts"
        // Line 1150: "Grey Aesthetics... (Title)"
        // Line 1151: "Writer: Burak"

        // So the Title is right before "Writer: Burak".
        // And BEFORE Title is "All Posts", "Social Media Marketing" (Category?), "Log In", "Submit".

        // So valid Title usually preceded by Navigation/Tags.

    }

    // Improved Strategy:
    // The "Next Title" is the last non-empty line(s) of the chunk IF we strip away the Navigation/Footer junk.
    // Navigation junk: "All Posts", "Log In", "Submit", "Blog", "Artists", "About Us", "WBBT records".

    const navKeywords = ['All Posts', 'Log In', 'Submit', 'Blog', 'Artists', 'About Us', 'WBBT', 'records', 'Releases', 'VEVO', 'Producers wanted'];

    let endOfChunk = lines.length - 1;
    let capturedTitle = [];

    // Backtrack to find Title
    while (endOfChunk > contentStart) {
        const line = lines[endOfChunk];
        if (!line) {
            endOfChunk--;
            continue;
        }

        if (navKeywords.some(kw => line.includes(kw))) {
            // This is nav junk, ignore
            endOfChunk--;
            // If we had captured something, it was probably part of Nav we didn't recognize?
            // Or maybe Title is ABOVE Nav?
            // No, Title is usually the distinct line right before Writer.
            // But Nav elements seem to be ABOVE Title in some cases?
            // Actually in step 1492: "Grey Aesthetics..." (Line 1150). "Writer: Burak" (Line 1151).
            // Line 1149: "Streaming & Playlists".
            // Line 1130-1148: Nav stuff.
            // So Title is physically at the end of the chunk. Nav is above it?
            // Wait, chunk `i` contains Post `i` content... then Nav... then Title of `i+1`.
            // So yes, Title is at the end. Nav is before Title.
            // So we need to ignore Nav lines to identify Title lines.
            // But strict "last line" might be Title.
            // If line is Nav, it's not Title.
            continue;
        }

        // If line is NOT nav, it might be Title.
        // But is it Content? 
        // Content is separated from footer by big gap or "See All".
        // Let's assume Title is max 2-3 lines at the very end.

        // Let's checking if we hit "See All" or "©".
        if (line === 'See All' || line.includes('©') || line.includes('Post not marked')) {
            // We went too far back (into previous post's footer).
            // Stop.
            break;
        }

        // It's a candidate for Title.
        // Push to front (since we iterate backwards)
        capturedTitle.unshift(line);
        endOfChunk--;

        // If we have 1-3 lines of title, and we see something like "Streaming & Playlists" (Category), that's a separator.
        const categories = ['Streaming & Playlists', 'Music Technology', 'Music Marketing', 'Music Distribution', 'Music Business', 'Social Media Marketing', 'Make Money', 'Music News'];
        if (categories.includes(line)) {
            // Remove this line from capturedTitle
            capturedTitle.shift();
            // This is definitely end of Nav.
            // So what we have in capturedTitle so far (before this line) is the Title.
            // Wait, I am iterating backwards.
            // Sequence: Nav -> Category -> Title -> Writer
            // So Title is last. Category is before Title.
            // So if I hit Category, the lines AFTER it are Title.
            break;
        }

        if (capturedTitle.length > 3) {
            // Too long for a title, probably eating into content or nav list?
            // Safer to just take last 1-2 lines.
            break;
        }
    }

    // Consolidate Title
    let currentNextTitle = capturedTitle.join(' ');
    if (!currentNextTitle || currentNextTitle.length > 200) {
        currentNextTitle = "Restored Blog Post " + (blogPosts.length + 1);
    }

    // Now establish Content boundary.
    // Content ends before "© 2035" or "See All" or "Recent Posts".
    // We can scan lines forward from contentStart.

    let realContentEnd = contentStart;
    for (let k = contentStart; k < lines.length; k++) {
        const line = lines[k];
        if (line.includes('© 2035') || line === 'See All' || line === 'Recent Posts' || line.includes('Post not marked')) {
            break; // Found end of content
        }
        realContentEnd = k + 1;
    }

    const content = lines.slice(contentStart, realContentEnd).join('\n').trim();

    blogPosts.push({
        id: blogPosts.length + 1,
        title: nextTitle, // Use the title extracted from previous iteration
        slug: slugify(nextTitle),
        category: "Music Business", // Default, or can extract from Nav lines if I parse them
        date: date,
        author: "Burak",
        image: `/images/blog/blog-${blogPosts.length + 1}.jpg`, // Assign local path directly
        content: content || "<p>Content restoration pending.</p>"
    });

    nextTitle = currentNextTitle;
}

const fileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${blogPosts.length} posts.`);
