import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../public/images/blog');

// A specialized list of 50 Unique High-Quality Music IDs
const UNIQUE_IDS = [
    "photo-1511671782779-c97d3d27a1d4", // Microphone
    "photo-1514320291840-2e0a9bf2a9ae", // Club
    "photo-1470225620780-dba8ba36b745", // DJ
    "photo-1493225255756-d9584f8606e9", // Vinyl
    "photo-1511379938547-c1f69419868d", // Piano
    "photo-1598488035139-bdbb2231ce04", // Studio
    "photo-1520523831597-d8c3df5263f5", // Piano
    "photo-1507838153414-b4b713384ebd", // Sheet music
    "photo-1506157788151-584026e584b3", // Guitar
    "photo-1510915362694-656eb0b46d0e", // Concert
    "photo-1619983081563-430f63602796", // Mixing
    "photo-1505740420928-5e560c06d30e", // Headphones
    "photo-1459749411177-0473ef716175", // Band
    "photo-1518972559570-7cc1309f3229", // Stage
    "photo-1460518451285-97b6aa326961", // Crowd
    "photo-1487180144351-b8472da7d491", // Abstract
    "photo-1621625248775-9c5952d7e8b6", // Synth
    "photo-1508700115892-45ecd05ae2ad", // Earphones
    "photo-1496293455970-f8581aae0e3c", // Festival
    "photo-1468164016595-6108e4c60c8b", // Turntable
    "photo-1501612780327-45045538702b", // Guitar Close
    "photo-1445985543470-4102eb9e5c61", // Stage Light
    "photo-1533174072545-e8d4aa97edf9", // Singer
    "photo-1506093483035-15a712ccba6c", // Acoustic
    "photo-1516280440614-6697288d5d38", // Party
    "photo-1525362081669-2b476bbd5db3", // Drum
    "photo-1483814888607-1bc54da2dc71", // Cover
    "photo-1524368535928-5b5e00ddc76b", // Concert Hand
    "photo-1517230878791-4d28214057c2", // Record Store
    "photo-1530587191325-3db32d826c18", // Stage Smoke
    "photo-1534067783741-512d0deaf05c", // Equalizer
    "photo-1445375011755-91c63afd9c44", // Mixer
    "photo-1484876065684-b683cf17d276", // Cassette
    "photo-1460039230329-eb070fc6c77c", // Stage wide
    "photo-1466096115517-bceecbfb6fde", // Nature Music
    "photo-1465821185566-86d3684a22c8", // Note
    "photo-1484755560695-422f6d6f5bf1", // Portrait
    "photo-1479839672679-a46483c0e7c8"  // Art
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
                fs.unlink(dest, () => { }); // Delete failed file
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

function getFileSize(filepath) {
    try {
        const stats = fs.statSync(filepath);
        return stats.size;
    } catch (e) {
        return 0;
    }
}

async function fixImages() {
    console.log("Checking 37 blog images...");
    const usedSizes = new Set();

    // First pass: Index existing valid files to avoid duplicate content if possible
    // Actually, just checking size collision is a good heuristic for "identical file".

    for (let i = 1; i <= 37; i++) {
        const filename = `blog-${i}.jpg`;
        const filepath = path.join(blogDir, filename);

        let shouldDownload = false;

        if (!fs.existsSync(filepath)) {
            console.log(`[MISSING] ${filename}`);
            shouldDownload = true;
        } else {
            const size = getFileSize(filepath);
            if (size < 1000) { // Too small? Corrupt?
                console.log(`[CORRUPT] ${filename} (Size: ${size}b)`);
                shouldDownload = true;
            } else if (usedSizes.has(size)) {
                console.log(`[DUPLICATE CONTENT] ${filename} matches another file.`);
                shouldDownload = true;
            } else {
                usedSizes.add(size);
            }
        }

        if (shouldDownload) {
            // Pick a unique ID from the list
            // Use index + seed to jump around
            const poolIndex = (i - 1) % UNIQUE_IDS.length;
            const unsplashId = UNIQUE_IDS[poolIndex];
            const url = `https://images.unsplash.com/${unsplashId}?q=80&w=1200&auto=format&fit=crop`;

            console.log(` Downloading verified ID: ${unsplashId} -> ${filename}`);
            try {
                await downloadImage(url, filepath);
                const newSize = getFileSize(filepath);
                usedSizes.add(newSize);
                console.log(` OK (${newSize} bytes)`);
            } catch (err) {
                console.error(` FAIL: ${err.message}`);
            }
        }
    }
}

fixImages();
