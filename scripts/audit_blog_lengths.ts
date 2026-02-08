
import { BLOG_POSTS } from '../src/data/blogPosts';

console.log("Auditing Blog Post Lengths...");
let shortBlogs = 0;
const shortIds: number[] = [];

BLOG_POSTS.forEach(post => {
    const length = post.content.length;
    const isShort = length < 3000;
    if (isShort) {
        shortBlogs++;
        shortIds.push(post.id);
        console.log(`[SHORT] ID: ${post.id} | Length: ${length}`);
    } else {
        // console.log(`[OK] ID: ${post.id} | Length: ${length}`);
    }
});

console.log(`\nTotal Blogs: ${BLOG_POSTS.length}`);
console.log(`Total Short Blogs (<3000 chars): ${shortBlogs}`);
console.log(`Short IDs: ${shortIds.join(', ')}`);
