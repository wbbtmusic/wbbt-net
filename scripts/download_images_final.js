import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Backup generic image (music studio) to use if real download fails
const BACKUP_URL = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop";

// A list of 50 distinct Unsplash Music IDs to cycle through
const ID_POOL = [
    "photo-1511379938547-c1f69419868d", "photo-1598488035139-bdbb2231ce04", "photo-1493225255756-d9584f8606e9",
    "photo-1470225620780-dba8ba36b745", "photo-1505740420928-5e560c06d30e", "photo-1514320291840-2e0a9bf2a9ae",
    "photo-1619983081563-430f63602796", "photo-1511671782779-c97d3d27a1d4", "photo-1614149162883-504ce4d13909",
    "photo-1506157788151-584026e584b3", "photo-1507838153414-b4b713384ebd", "photo-1459749411177-0473ef716175",
    "photo-1487180144351-b8472da7d491", "photo-1520523831597-d8c3df5263f5", "photo-1510915362694-656eb0b46d0e",
    "photo-1514525253440-b393452e8d2e", "photo-1518972559570-7cc1309f3229", "photo-1508700115892-45ecd05ae2ad",
    "photo-1460518451285-97b6aa326961", "photo-1621625248775-9c5952d7e8b6", "photo-1550508688-661665a50780",
    "photo-1496293455970-f8581aae0e3c", "photo-1525091595181-ca41ec56d787", "photo-1415201364774-f6f0bb35f28f",
    "photo-1519750783826-e2420f4d687f", "photo-1505672675386-4b6d4fe0569a", "photo-1485579149621-3e235f722870",
    "photo-1445985543470-4102eb9e5c61", "photo-1501612780327-45045538702b", "photo-1461749280684-dccba630e2f6",
    "photo-1510915362694-656eb0b46d0e", "photo-1533174072545-e8d4aa97edf9", "photo-1506093483035-15a712ccba6c",
    "photo-1525362081669-2b476bbd5db3", "photo-1483814888607-1bc54da2dc71", "photo-1516280440614-6697288d5d38",
    "photo-1524368535928-5b5e00ddc76b", "photo-1517230878791-4d28214057c2", "photo-1530587191325-3db32d826c18",
    "photo-1534067783741-512d0deaf05c", "photo-1445375011755-91c63afd9c44", "photo-1484876065684-b683cf17d276",
    "photo-1460039230329-eb070fc6c77c", "photo-1466096115517-bceecbfb6fde", "photo-1465821185566-86d3684a22c8",
    "photo-1468164016595-6108e4c60c8b", "photo-1484755560695-422f6d6f5bf1", "photo-1479839672679-a46483c0e7c8"
];

const constructUrl = (id) => `https://images.unsplash.com/${id}?q=80&w=2070&auto=format&fit=crop`;

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Status ${res.statusCode}`));
                return;
            }
            const stream = fs.createWriteStream(filepath);
            res.pipe(stream);
            stream.on('finish', () => {
                stream.close();
                resolve();
            });
            stream.on('error', reject);
        }).on('error', reject);
    });
};

async function main() {
    console.log("Starting reliable image download...");

    // We need 40 images (indices 1 to 40)
    for (let i = 1; i <= 40; i++) {
        const filename = `blog-${i}.jpg`;
        const filepath = path.join(targetDir, filename);

        // Pick an ID from the pool based on index to ensure variety
        const imageId = ID_POOL[(i - 1) % ID_POOL.length];
        const primaryUrl = constructUrl(imageId);

        process.stdout.write(`Downloading ${filename}... `);

        try {
            await downloadImage(primaryUrl, filepath);
            console.log("OK");
        } catch (err) {
            console.log(`FAIL (${err.message}). Using backup...`);
            try {
                await downloadImage(BACKUP_URL, filepath);
                console.log("BACKUP OK");
            } catch (err2) {
                console.error("FATAL: Backup failed too.");
            }
        }
    }
}

main();
