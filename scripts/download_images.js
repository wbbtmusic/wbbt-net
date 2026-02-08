import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
    "300": "https://images.unsplash.com/photo-1514525253440-b393452e8d2e?q=80&w=2070&auto=format&fit=crop",
    "200": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "201": "https://images.unsplash.com/photo-1550745165-90148454dcf9?q=80&w=2070&auto=format&fit=crop",
    "202": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    "203": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    "204": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
    "1": "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop",
    "2": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    "3": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "4": "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "5": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop",
    "6": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    "7": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "8": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    "9": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    "10": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    "11": "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop",
    "12": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    "13": "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    "14": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
};

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
                fs.unlink(dest, () => { }); // Delete failed file
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err.message);
        });
    });
};

const run = async () => {
    // Ensure directory exists
    const dir = path.join(__dirname, '../public/images/blog');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const [id, url] of Object.entries(images)) {
        const dest = path.join(dir, `blog-${id}.jpg`);
        try {
            console.log(`Downloading image for ID ${id}...`);
            await download(url, dest);
            console.log(`Saved to ${dest}`);
        } catch (e) {
            console.error(`Failed to download ${id}:`, e);
        }
    }
};

run();
