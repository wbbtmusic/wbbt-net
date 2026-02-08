import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/blogPosts.ts');
const reportPath = path.join(__dirname, '../reports/final_blog_report.json');

const rawData = fs.readFileSync(dataPath, 'utf8');
const start = rawData.indexOf('[');
const end = rawData.lastIndexOf(']');
let arrayContent = rawData.substring(start, end + 1);

function sloppyParse(str) {
    try { return JSON.parse(str); } catch (e) {
        return (new Function(`return ${str}`))();
    }
}

const blogPosts = sloppyParse(arrayContent);
const report = {
    total: blogPosts.length,
    shortContent: [],
    missingImages: []
};

blogPosts.forEach(post => {
    const textContent = post.content.replace(/<[^>]*>?/gm, '');
    if (textContent.length < 1000) {
        report.shortContent.push({ id: post.id, title: post.title, length: textContent.length });
    }

    // Check if image exists
    const expectedPath = path.join(__dirname, '../public', post.image);
    if (!fs.existsSync(expectedPath)) {
        report.missingImages.push({ id: post.id, title: post.title, path: post.image });
    }
});

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log("Report saved to " + reportPath);
