
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to point to public/images based on script location
// Assuming script is in d:\Indirilenler\wbbt net\scripts
const IMAGES_DIR = path.join(__dirname, '../public/images');

async function convertToWebP(directory) {
    if (!fs.existsSync(directory)) {
        console.warn(`Directory does not exist: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await convertToWebP(fullPath); // Recursive
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const name = path.basename(file, ext);
                const webpPath = path.join(directory, `${name}.webp`);

                // Skip if webp already exists (optional, but good for idempotency)
                // if (fs.existsSync(webpPath)) continue;

                try {
                    console.log(`Converting: ${file} -> ${name}.webp`);
                    await sharp(fullPath)
                        .webp({ quality: 80 }) // Good balance for web
                        .toFile(webpPath);

                    // Optional: Delete original? 
                    // Let's keep originals for safety for now, or maybe move to a '_backup' folder.
                    // For this task, user said "Convert", usually implies replacement or usage of new ones.
                    // I will DELETE the original to ensure we don't accidentally ship both, 
                    // BUT I will create a backup folder first just in case.

                    // Actually, let's just delete to allow the 'Update References' step to be forced to work 
                    // and to clean up the 'bloatware'. 
                    // fs.unlinkSync(fullPath); 
                    // Wait, deleting right away is risky if conversion fails halfway. 
                    // Let's just create WebP for now.

                } catch (err) {
                    console.error(`Failed to convert ${file}:`, err);
                }
            }
        }
    }
}

console.log('Starting WebP conversion...');
await convertToWebP(IMAGES_DIR);
console.log('Conversion complete.');
