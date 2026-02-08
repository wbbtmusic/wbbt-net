import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../src/data/blogPosts.ts');
const imagesDir = path.join(__dirname, '../public/images/blog');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Read blogPosts.ts content
const content = fs.readFileSync(blogsPath, 'utf8');

// Regex to find ID and Image URL
// { id: 1, ... image: "https://..." }
const regex = /"id":\s*(\d+),[\s\S]*?"image":\s*"(https?:\/\/[^"]+)"/g;

let match;
const downloads = [];

while ((match = regex.exec(content)) !== null) {
    const id = match[1];
    const url = match[2];
    downloads.push({ id, url });
}

console.log(`Found ${downloads.length} images to download.`);

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                download(response.headers.location, dest).then(resolve).catch(reject);
            } else {
                fs.unlink(dest, () => { });
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err.message);
        });
    });
};

const run = async () => {
    for (const { id, url } of downloads) {
        const dest = path.join(imagesDir, `blog-${id}.jpg`);
        try {
            process.stdout.write(`Downloading ${id}... `);
            await download(url, dest);
            console.log('OK');
        } catch (e) {
            console.log('FAIL:', e);
        }
    }
};

run();
