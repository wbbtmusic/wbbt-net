import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const rawContent = fs.readFileSync(blogPostsPath, 'utf8');

// 1. EXTRACT DATA
// We'll use a simple eval-like extraction since the file format is known and simple
// "export const BLOG_POSTS: BlogPost[] = [ ... ];"
const startMarker = "export const BLOG_POSTS: BlogPost[] = ";
const jsonStart = rawContent.indexOf(startMarker);
if (jsonStart === -1) throw new Error("Could not find start marker");

const jsonString = rawContent.substring(jsonStart + startMarker.length);
// The string might end with a semicolon, strip it.
const cleanJsonString = jsonString.trim().replace(/;$/, '');

let blogPosts;
try {
    blogPosts = JSON.parse(cleanJsonString);
} catch (e) {
    console.error("JSON parse failed. Fallback to Regex replacement.");
    // Fallback: we won't load/save JSON, we'll brute-force replace title lines associated with IDs?
    // No, JSON parse IS robust if the file was generated with JSON.stringify.
    // The previous generation script used `JSON.stringify(blogPosts, null, 4)`.
    // So it should be valid JSON.
    throw e;
}

// 2. MAP TITLES
const titleMap = {
    1: "The Streaming Shake-Up of 2025",
    2: "Blockchain & Smart Contracts: Future of Royalties",
    3: "Eco-Friendly Touring: Sustainability in 2025",
    4: "Surviving the TikTok Ban: Marketing Strategies",
    5: "SoundCloud's 2025 Revival: Ascending Program",
    6: "SoundCloud's Revival: Niche Playlists & Trends",
    7: "AI Music & Micro-Genres: Shaping 2025",
    8: "Generative AI: The New Frontier of Creation",
    9: "Virtual Concerts: The New Live Experience",
    10: "Adapting to the TikTok Ban: 2025 Strategies",
    11: "Grey Aesthetics: Minimalist Design Trends",
    12: "Interactive Virtual Concerts: Engaging Fans",
    13: "FUGA vs LANDR: Fighting Fake Streams",
    14: "TikTok Ban Guide: Social Media Alternatives",
    15: "Top Music Distributors 2025: DistroKid Review",
    16: "Music Industry Trends 2025: AI & NFTs",
    17: "Spotify Earnings Guide: Using Statsify",
    18: "Indie Artist Trends: Hybrid Events 2025",
    19: "Launching an Indie Record Label in 2025",
    20: "Budget Studio Magic: Affordable Presets",
    21: "AI Music Tools Comparison 2025",
    22: "Global Summer Hits 2025: Turkish Pop Rise",
    23: "Unchained Music Review: Distribution Guide",
    24: "Müzisyenler İçin Şirket Kurmanın Önemi",
    25: "Best Paid Music Distributors: Who is Worth It?",
    26: "Free Music Distribution Guide 2025",
    27: "Influential Musicians of the Decade",
    28: "AI Composition: Changing Tomorrow's Sound",
    29: "AI in Music: Revolution or Threat?",
    30: "YouTube Branding & Visibility for Musicians",
    31: "Spotify Discovery Mode: Unlocking Audiences",
    32: "Songwriting Maestros: Taylor Swift & Icons",
    33: "Music Licensing: Unlocking Sync Potential",
    34: "Highest-Paid Musicians of 2024",
    35: "Spotify Earnings Reality: 1 Million Streams",
    36: "Streaming Giants: Spotify vs Apple vs YouTube",
    37: "Publishing Royalties & Split Sheets 101"
};

// 3. APPLY UPDATES
let updatedCount = 0;
blogPosts.forEach(post => {
    if (titleMap[post.id]) {
        post.title = titleMap[post.id];
        // Also update slug to be consistent
        post.slug = post.title.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
        updatedCount++;
    }
});

// 4. WRITE BACK
const newFileContent = `import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(blogPostsPath, newFileContent);
console.log(`Updated ${updatedCount} posts with new titles.`);
