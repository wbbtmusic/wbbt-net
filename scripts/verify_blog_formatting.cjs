
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blogPosts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Regex to extract objects with id and content
// We look for 'id': N, ... 'content': "..."
const postRegex = /{\s*"id":\s*(\d+),[\s\S]*?"content":\s*"(.*?)"\s*}/g;

let match;
let total = 0;
let passed = 0;
let failed = [];

console.log("Starting Blog Post Formatting Verification...\n");

while ((match = postRegex.exec(fileContent)) !== null) {
    total++;
    const id = match[1];
    const content = match[2];

    const hasWrapper = content.includes('<div class=\\"blog-content\\">') || content.includes('<div class="blog-content">');

    if (hasWrapper) {
        console.log(`[PASS] ID ${id.padEnd(2)}: Format OK`);
        passed++;
    } else {
        console.log(`[FAIL] ID ${id.padEnd(2)}: MISSING WRAPPER!`);
        failed.push(id);
    }
}

console.log("\n---------------------------------------------------");
console.log(`Verified ${total} posts.`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed.length}`);

if (failed.length > 0) {
    console.log(`\nCRITICAL: The following IDs are broken: ${failed.join(", ")}`);
    process.exit(1);
} else {
    console.log("\nSUCCESS: All blog posts are standardized!");
    process.exit(0);
}
