import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/blogPosts.ts');
const imagesDir = path.join(__dirname, '../public/images/blog');

// Ensure image dir exists
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// Read and parse the TS file (Quick and dirty parsing)
const rawData = fs.readFileSync(dataPath, 'utf8');
// Extract the array part. Assuming it starts with '[' and ends with '];' index
const start = rawData.indexOf('[');
const end = rawData.lastIndexOf(']');
if (start === -1 || end === -1) {
    console.error("Could not find array in data file.");
    process.exit(1);
}

// Prepare content for evaluation
let arrayContent = rawData.substring(start, end + 1);

// Replace "import ..." lines if any (not in the array usually)
// The object keys might not be quoted in TS, but the view_file output showed they ARE quoted or at least valid keys. 
// "id": 1, "title": ...
// So JSON.parse might ALMOST work if we handle trailing commas and single quotes.
// However, the file content showed "content": "..." with HTML.
// Let's try to use eval by assigning to a variable.
// We need to mock "BlogPost" type if it's used? No, the file says `const BLOG_POSTS: BlogPost[] = ...`
// We are only extracting the array literal `[...]`.

// Clean up any TS type assertions if present inside (unlikely in the view shown).
// We might need to handle comments.

function sloppyParse(str) {
    try {
        // Try JSON parse first if it's strict JSON
        return JSON.parse(str);
    } catch (e) {
        // Use Function constructor to eval
        // Need to ensure keys are valid.
        return (new Function(`return ${str}`))();
    }
}

let blogPosts;
try {
    blogPosts = sloppyParse(arrayContent);
} catch (err) {
    console.error("Failed to parse blog data:", err.message);
    // Fallback: Try to clean up the string (e.g. remove trailing commas) or fix quotes
    // For now, let's assume it evaluates as JS object literal
    process.exit(1);
}

// ANALYSIS
console.log(`Analyzing ${blogPosts.length} blogs...`);

const report = {
    shortContent: [],
    missingImages: [],
    brokenImages: [], // 0 byte files
    malformed: []
};

// Check duplicated image IDs in the *data* (two blogs pointing to same file)
const imageUsage = {};

blogPosts.forEach(post => {
    // 1. Content Length
    // Strip HTML tags for rough count
    const textContent = post.content.replace(/<[^>]*>?/gm, '');
    if (textContent.length < 500) { // Threshold
        report.shortContent.push({ id: post.id, title: post.title, length: textContent.length });
    }

    // 2. Image Check
    const imgName = path.basename(post.image);
    const localPath = path.join(imagesDir, imgName);

    // Count usage
    imageUsage[imgName] = (imageUsage[imgName] || 0) + 1;

    if (!fs.existsSync(localPath)) {
        report.missingImages.push({ id: post.id, title: post.title, path: localPath });
    } else {
        const stats = fs.statSync(localPath);
        if (stats.size === 0) {
            report.brokenImages.push({ id: post.id, title: post.title, path: localPath });
        }
    }
});

console.log("Analysis Report:", JSON.stringify(report, null, 2));


// FIXING IMAGES
// We will look for missing or broken images AND images that we just want to refresh if requested.
// The user said "download images... analyze duplicate... ensure they are not same".
// We will interpret this as: Ensure every blog has a unique image file (blog-{id}.jpg) and that file is valid.

// Reliable Image Pool (Music, Studio, Concerts, Abstract)
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
    "photo-1533174072545-e8d4aa97edf9", "photo-1506093483035-15a712ccba6c", "photo-1525362081669-2b476bbd5db3",
    "photo-1483814888607-1bc54da2dc71", "photo-1516280440614-6697288d5d38", "photo-1524368535928-5b5e00ddc76b",
    "photo-1517230878791-4d28214057c2", "photo-1530587191325-3db32d826c18", "photo-1534067783741-512d0deaf05c",
    "photo-1445375011755-91c63afd9c44", "photo-1484876065684-b683cf17d276", "photo-1460039230329-eb070fc6c77c",
    "photo-1466096115517-bceecbfb6fde", "photo-1465821185566-86d3684a22c8", "photo-1468164016595-6108e4c60c8b",
    "photo-1484755560695-422f6d6f5bf1", "photo-1479839672679-a46483c0e7c8"
];

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, response => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            } else {
                file.close(); fs.unlink(destPath, () => { }); reject(new Error(`Status ${response.statusCode}`));
            }
        }).on('error', err => {
            fs.unlink(destPath, () => { }); reject(err);
        });
    });
}

async function fixImages() {
    console.log("Fixing images...");
    let downloadedCount = 0;

    for (const post of blogPosts) {
        const expectedFilename = `blog-${post.id}.jpg`;
        const expectedPath = path.join(imagesDir, expectedFilename);

        let needsDownload = false;

        if (!fs.existsSync(expectedPath)) {
            needsDownload = true;
            console.log(`[${post.id}] Missing image. Downloading...`);
        } else {
            const stats = fs.statSync(expectedPath);
            if (stats.size < 1000) {
                needsDownload = true;
                console.log(`[${post.id}] Broken image (size ${stats.size}). Re-downloading...`);
            }
        }

        if (needsDownload) {
            // Pick a unique ID from pool. Use modulo to wrap around if more blogs than images.
            // Using (id - 1) ensures stability: Blog 1 always gets Image A, regardless of when we run.
            const uniqueId = ID_POOL[(post.id - 1) % ID_POOL.length];
            const url = `https://images.unsplash.com/${uniqueId}?q=80&w=2070&auto=format&fit=crop`;

            try {
                await downloadImage(url, expectedPath);
                console.log(` > Done: ${expectedFilename}`);
                downloadedCount++;
            } catch (err) {
                console.error(` > Failed: ${expectedFilename} (${err.message}). Using backup...`);
                try {
                    // Backup generic image (music studio)
                    const BACKUP_URL = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop";
                    await downloadImage(BACKUP_URL, expectedPath);
                    console.log(` > Backup Done: ${expectedFilename}`);
                } catch (err2) {
                    console.error(" > Backup failed too.");
                }
            }
        }
    }
    console.log(`Download complete. New images: ${downloadedCount}`);
}

fixImages().then(() => console.log("Finished image fixes."));
