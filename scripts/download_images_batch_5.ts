
import fs from 'fs';
import path from 'path';

const images = [
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 }
];

const run = async () => {
    const dir = 'd:\\Indirilenler\\wbbt net\\public\\images\\blog';

    for (const img of images) {
        // Use picsum with seed to get a unique consistent image for each ID
        const url = `https://picsum.photos/seed/${img.id}/800/600`;
        const filename = `blog-${img.id}.jpg`;
        const filepath = path.join(dir, filename);

        try {
            console.log(`Downloading ${filename} from ${url}...`);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const buffer = await response.arrayBuffer();
            fs.writeFileSync(filepath, Buffer.from(buffer));
            console.log(`Saved: ${filepath}`);
        } catch (e) {
            console.error(`Failed to download ${filename}:`, e);
        }
    }
};

run();
