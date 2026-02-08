
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../src/data/blogPosts.ts');

const rawData = fs.readFileSync(dataPath, 'utf8');
const start = rawData.indexOf('[');
const end = rawData.lastIndexOf(']');

if (start === -1 || end === -1) {
    console.error("Could not find array in data file.");
    process.exit(1);
}

const arrayContent = rawData.substring(start, end + 1);

function sloppyParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return (new Function(`return ${str}`))();
    }
}

let blogPosts;
try {
    blogPosts = sloppyParse(arrayContent);
} catch (err) {
    console.error("Failed to parse blog data:", err.message);
    process.exit(1);
}

// ANALYSIS
const sortedBlogs = blogPosts.map(post => {
    const textContent = post.content.replace(/<[^>]*>?/gm, '');
    return {
        id: post.id,
        title: post.title,
        length: textContent.length
    };
}).sort((a, b) => a.length - b.length);

console.log("Blog Length Report (Shortest to Longest):");
sortedBlogs.forEach(b => {
    // Flag anything under 2500 as "Suspiciously Short" given the user's demand
    const flag = b.length < 2500 ? " [SHORT]" : "";
    console.log(`ID: ${b.id.toString().padEnd(3)} | Length: ${b.length.toString().padEnd(5)} | ${b.title}${flag}`);
});
