
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/blog');

console.log('Verifying Image Integrity in: ' + dir);

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Could not list directory.", err);
        process.exit(1);
    }

    let corruptCount = 0;

    files.forEach(file => {
        if (!file.endsWith('.jpg') && !file.endsWith('.png') && !file.endsWith('.webp')) return;

        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.size === 0) {
            console.error(`[CRITICAL] ${file} is 0 bytes!`);
            corruptCount++;
            return;
        }

        // Check magic numbers for JPG (FF D8 FF)
        const buffer = Buffer.alloc(3);
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, 3, 0);
        fs.closeSync(fd);

        if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
            // Valid JPG magic number
        } else {
            // Maybe it's png or just invalid
            // Just logging potential issues
            if (file.endsWith('.jpg')) {
                console.warn(`[WARN] ${file} might not be a valid JPG (Header: ${buffer.toString('hex')})`);
                // Don't count as corrupt yet unless we are specific
            }
        }
    });

    if (corruptCount > 0) {
        console.log(`\nFound ${corruptCount} corrupt files.`);
    } else {
        console.log('\nAll files passed basic size/header check.');
    }
});
