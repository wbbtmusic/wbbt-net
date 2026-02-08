import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images/blog');

const missing = [
    { id: 3, url: "https://images.unsplash.com/photo-1518887674551-653367e3bcc0?fm=jpg&q=60&w=3000&auto=format&fit=crop" },
    { id: 38, url: "https://images.unsplash.com/photo-tgIRdDo5g_o?auto=format&fit=crop&q=80&w=800" },
    { id: 39, url: "https://images.unsplash.com/photo-JrJL8RquOuU?auto=format&fit=crop&q=80&w=800" }
];

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
                file.close();
                download(response.headers.location, dest).then(resolve).catch(reject);
            } else {
                file.close();
                fs.unlink(dest, () => { });
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            file.close();
            fs.unlink(dest, () => { });
            reject(err.message);
        });
    });
};

const run = async () => {
    for (const { id, url } of missing) {
        const dest = path.join(imagesDir, `blog-${id}.jpg`);
        try {
            console.log(`Downloading ${id}...`);
            await download(url, dest);
            console.log(`Downloaded blog-${id}.jpg`);
        } catch (e) {
            console.error(`Failed ${id}:`, e);
        }
    }
};

run();
