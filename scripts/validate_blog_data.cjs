
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blogPosts.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

console.log('Validating Blog Data...');

// Extract JSON-like objects manually since it's a TS file
const regex = /{\s*"id":\s*(\d+),[\s\S]*?"slug":\s*"([^"]+)",[\s\S]*?"content":\s*"((?:[^"\\]|\\.)*)"[\s\S]*?}/g;

const ids = new Set();
const slugs = new Set();
let match;
let count = 0;
let errors = 0;

while ((match = regex.exec(fileContent)) !== null) {
    count++;
    const id = parseInt(match[1]);
    const slug = match[2];
    const content = match[3];

    // Check ID
    if (ids.has(id)) {
        console.error(`[ERROR] Duplicate ID found: ${id}`);
        errors++;
    }
    ids.add(id);

    // Check Slug
    if (slugs.has(slug)) {
        console.error(`[ERROR] Duplicate Slug found: ${slug}`);
        errors++;
    }
    slugs.add(slug);

    // Check Basic HTML Structure (Simple count of open/close tags)
    const openDiv = (content.match(/<div/g) || []).length;
    const closeDiv = (content.match(/<\/div>/g) || []).length;
    if (openDiv !== closeDiv) {
        console.warn(`[WARN] ID ${id}: Mismatched DIV tags (Open: ${openDiv}, Close: ${closeDiv})`);
    }

    const openP = (content.match(/<p/g) || []).length;
    const closeP = (content.match(/<\/p>/g) || []).length;
    if (openP !== closeP) {
        console.warn(`[WARN] ID ${id}: Mismatched P tags (Open: ${openP}, Close: ${closeP})`);
    }

    // Check for empty content
    if (content.length < 50) {
        console.error(`[ERROR] ID ${id} has suspicious content length: ${content.length}`);
        errors++;
    }
}

console.log(`\nScanned ${count} posts.`);
if (errors === 0) {
    console.log('No critical structural errors found.');
} else {
    console.log(`Found ${errors} critical errors.`);
}
