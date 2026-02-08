import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../public/images/blog');

const MISSING_MAP = {
    3: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000",
    12: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000",
    21: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000",
    30: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2000"
};

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(dest, () => { });
                reject(new Error(`Status: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', err => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function run() {
    console.log("Patching missing images (Attempt 2)...");
    for (const [id, url] of Object.entries(MISSING_MAP)) {
        const filename = `blog-${id}.jpg`;
        const filepath = path.join(blogDir, filename);
        process.stdout.write(`Downloading ID ${id}: ... `);
        try {
            await downloadImage(url, filepath);
            console.log("OK");
        } catch (e) {
            console.log("FAIL", e.message);
        }
    }
}

run();
