
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');

function cleanupOriginals(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            cleanupOriginals(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const name = path.basename(file, ext);
                const webpPath = path.join(directory, `${name}.webp`);

                if (fs.existsSync(webpPath)) {
                    // Only delete if the WebP version exists
                    console.log(`Deleting original: ${file}`);
                    fs.unlinkSync(fullPath);
                }
            }
        }
    }
}

console.log('Cleaning up legacy formats...');
cleanupOriginals(IMAGES_DIR);
console.log('Cleanup complete.');
