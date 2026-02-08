import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../public/images/blog');

// Reliable backup images (High quality, generic music)
const RELIABLE_URLS = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop"
];

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

async function fillGaps() {
    console.log("Filling image gaps...");

    // We need images for IDs 1 to 37
    for (let i = 1; i <= 37; i++) {
        const filename = `blog-${i}.jpg`;
        const filepath = path.join(blogDir, filename);

        if (!fs.existsSync(filepath)) {
            console.log(`[MISSING] ${filename} - Downloading backup...`);
            // Pick a reliable URL
            const url = RELIABLE_URLS[(i - 1) % RELIABLE_URLS.length];
            try {
                await downloadImage(url, filepath);
                console.log(` OK`);
            } catch (err) {
                console.error(` FAIL: ${err.message}`);
            }
        }
    }
}

fillGaps();
