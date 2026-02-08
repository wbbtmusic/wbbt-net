
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

// Extensions to replace
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function updateReferences(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            updateReferences(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css'].includes(ext)) {
                let content = fs.readFileSync(fullPath, 'utf-8');
                let modified = false;

                // Replace /images/....jpg with .webp
                // We want to be careful not to replace external URLs unless we know they are ours.
                // But mostly we are looking for local paths like "/images/..." or just filenames if imported.
                // Regex: Look for .jpg/.png preceded by typical path chars or at end of string

                // Simple string replacement for known local folders is safest:
                // "/images/blog/..." 
                // "/images/partners/..."

                const lines = content.split('\n');
                const newLines = lines.map(line => {
                    // Check if line contains our target paths
                    if (line.includes('/images/') || line.includes("cover:")) {
                        let newLine = line;
                        // We'll use a regex to be safer: /(\/images\/.*?)\.(jpg|png|jpeg)/gi
                        // This regex covers all extensions in EXTENSIONS, so we can process matches directly.

                        // Use a global regex to find all occurrences in the line
                        const regex = /(\/images\/.*?)\.(jpg|png|jpeg)/gi;
                        let match;
                        let tempLine = newLine; // Use a temporary line to build up changes
                        let lastIndex = 0;
                        let parts = [];

                        while ((match = regex.exec(newLine)) !== null) {
                            const fullMatch = match[0]; // e.g., /images/blog/my-image.jpg
                            const basePath = match[1];  // e.g., /images/blog/my-image

                            // Construct the path to the potential .webp file in the public directory
                            // __dirname is scripts/, so ../public is project_root/public
                            // basePath starts with /images/, so path.join will correctly resolve to project_root/public/images/...
                            const publicPath = path.join(__dirname, '../public', basePath + '.webp');

                            // Append the part of the line before the current match
                            parts.push(tempLine.substring(lastIndex, match.index));

                            if (fs.existsSync(publicPath)) {
                                parts.push(basePath + '.webp');
                                modified = true; // Mark as modified if any replacement occurs
                            } else {
                                console.warn(`Skipping replacement for ${fullMatch} in file ${file} - WebP not found at ${publicPath}`);
                                parts.push(fullMatch); // Keep the original if .webp doesn't exist
                            }
                            lastIndex = regex.lastIndex;
                        }

                        // Append any remaining part of the line after the last match
                        parts.push(tempLine.substring(lastIndex));
                        newLine = parts.join('');

                        // Also handle relative imports if any? (Usually public assets are referenced absolute /images/...)

                        if (newLine !== line) {
                            return newLine;
                        }
                    }
                    return line;
                });

                if (modified) {
                    console.log(`Updating references in: ${file}`);
                    fs.writeFileSync(fullPath, newLines.join('\n'), 'utf-8');
                }
            }
        }
    }
}

console.log('Updating code references to WebP...');
updateReferences(SRC_DIR);
console.log('Update complete.');
