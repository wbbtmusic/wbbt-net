import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../public/images/blog');

// MANUALLY CURATED LIST OF RELEVANT IMAGES
// I have selected these to match the specific titles of the 37 blog posts.
const IMAGE_MAP = {
    1: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2000", // Spotify/Streaming
    2: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000", // Blockchain
    3: "https://images.unsplash.com/photo-1542601906990-24d4c16419d4?q=80&w=2000", // Eco/Nature + Music (Festival)
    4: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000", // TikTok/Phone
    5: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2000", // SoundCloud (Orange waveform aesthetics)
    6: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2000", // Playlist/Mixing
    7: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000", // AI Music (Abstract)
    8: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000", // Generative/Abstract
    9: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2000", // Virtual Concert (Lights)
    10: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000", // Social Media Strategy
    11: "https://images.unsplash.com/photo-1481487484168-9b995ecc1679?q=80&w=2000", // Grey/Minimalist
    12: "https://images.unsplash.com/photo-1514525253440-b393452e8d2e?q=80&w=2000", // Live Sci-Fi
    13: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000", // Data/protection
    14: "https://images.unsplash.com/photo-1611262588024-d12430b98169?q=80&w=2000", // Social Icons
    15: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000", // Studio/Distro
    16: "https://images.unsplash.com/photo-1639322537228-ad7117a7a423?q=80&w=2000", // NFT/Future
    17: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000", // Money/Earnings
    18: "https://images.unsplash.com/photo-1501386761106-24f5f3f10ef9?q=80&w=2000", // Indie Crowd
    19: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000", // Record Label/DJ
    20: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000", // Bedroom Studio
    21: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=2000", // Composing/Sheet
    22: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000", // Summer/Pop
    23: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2000", // Chain/Unchained (Abstract)
    24: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000", // Business/Company
    25: "https://images.unsplash.com/photo-1554224154-260327c00c39?q=80&w=2000", // Money/Finance
    26: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000", // Free/Vinyl
    27: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000", // Mic/Fame
    28: "https://images.unsplash.com/photo-1485579149621-3e235f722870?q=80&w=2000", // Future Sound
    29: "https://images.unsplash.com/photo-1531297461136-82lw9b61d696?q=80&w=2000", // Robot/AI
    30: "https://images.unsplash.com/photo-1611162616475-46aa45e135f4?q=80&w=2000", // YouTube
    31: "https://images.unsplash.com/photo-1506157788151-584026e584b3?q=80&w=2000", // Discovery/Lens
    32: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000", // Songwriting
    33: "https://images.unsplash.com/photo-1510915362694-656eb0b46d0e?q=80&w=2000", // Film/Sync
    34: "https://images.unsplash.com/photo-1549834125-906c85a1dd00?q=80&w=2000", // Wealth/Rich
    35: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2000", // Spotify Reprise
    36: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=2000", // Streaming Apps
    37: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000"  // Contract/Publishing
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
    console.log("Starting Curated Image Download...");

    // Create Dir
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

    for (const [id, url] of Object.entries(IMAGE_MAP)) {
        const filename = `blog-${id}.jpg`;
        const filepath = path.join(blogDir, filename);

        // Always download to ensure correct image
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
