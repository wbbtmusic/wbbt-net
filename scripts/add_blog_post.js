
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.ts');
const TEMP_JSON_PATH = path.join(__dirname, '../temp_post.json');

function addBlogPost() {
    if (!fs.existsSync(TEMP_JSON_PATH)) {
        console.error('temp_post.json not found!');
        process.exit(1);
    }

    const newPost = JSON.parse(fs.readFileSync(TEMP_JSON_PATH, 'utf-8'));
    let content = fs.readFileSync(BLOG_POSTS_PATH, 'utf-8');

    // Simple heuristic: Find the end of the array `];`
    // We assume the file structure is `export const blogPosts: BlogPost[] = [ ... ];`

    // We want to insert at the beginning or end? 
    // Usually newest first is better for display, but array order implies order.
    // Let's insert at the BEGINNING of the array (after `export const blogPosts: BlogPost[] = [`)

    const arrayStartRegex = /(export\s+const\s+blogPosts\s*:\s*BlogPost\[\]\s*=\s*\[)/;
    const match = content.match(arrayStartRegex);

    if (match) {
        // Prepare the string representation of the new post
        // We need to format specific fields properly, especially content (HTML/String)
        // JSON.stringify is good, but we want it to look like code.
        // Actually, JSON.stringify is valid JS for object literals mostly.

        const newPostString = JSON.stringify(newPost, null, 4);

        // Insert after the bracket
        const insertPos = match.index + match[0].length;
        const newContent = content.slice(0, insertPos) + '\n' + newPostString + ',' + content.slice(insertPos);

        fs.writeFileSync(BLOG_POSTS_PATH, newContent, 'utf-8');
        console.log(`Added blog post: ${newPost.title}`);

        // Clean up temp file
        fs.unlinkSync(TEMP_JSON_PATH);
    } else {
        console.error('Could not find blogPosts array in file.');
        process.exit(1);
    }
}

addBlogPost();
