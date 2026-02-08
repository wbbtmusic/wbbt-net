
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blogPosts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Regex to match content fields
// Matches "content": "..." (handling escaped quotes)
const contentRegex = /"content":\s*"((?:[^"\\]|\\.)*)"/g;

let match;
let count = 0;
let totalLen = 0;
let fail = 0;

console.log('Auditing Blog Lengths (Regex)...');

while ((match = contentRegex.exec(fileContent)) !== null) {
    const content = match[1];
    // approximate length (unescaped)
    const len = content.length;
    count++;
    totalLen += len;

    // We can't easily get the ID without more parsing, but we can assume order
    const id = count;

    console.log(`Post #${id}: ~${len} chars`);

    if (len < 2000) {
        fail++;
    }
}

console.log(`\nTotal Posts: ${count}`);
console.log(`Average Length: ${Math.round(totalLen / count)} chars`);
console.log(`Posts under 2000 chars: ${fail}`);
