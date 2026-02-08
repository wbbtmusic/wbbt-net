import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images/blog');

// Specific reliable images (Music, Concert, Vinyl, Studio)
const FALLBACK_IMAGES = {
    14: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    16: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    33: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    39: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    11: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
};

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, response => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            } else {
                file.close(); fs.unlink(destPath, () => { }); reject(new Error(`Status ${response.statusCode}`));
            }
        }).on('error', err => {
            fs.unlink(destPath, () => { }); reject(err);
        });
    });
}

async function run() {
    console.log("Force fixing specific missing/broken images...");
    const missingIds = [14, 16, 33, 39, 11];

    for (const id of missingIds) {
        const url = FALLBACK_IMAGES[id];
        const dest = path.join(imagesDir, `blog-${id}.jpg`);
        console.log(`Downloading fix for Blog ${id}...`);
        try {
            await downloadImage(url, dest);
            console.log(`  > Success: blog-${id}.jpg`);
        } catch (e) {
            console.error(`  > Failed: ${e.message}`);
        }
    }
}

run();
