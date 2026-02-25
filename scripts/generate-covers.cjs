const puppeteer = require('puppeteer');
const path = require('path');

const covers = [
    {
        id: 87,
        title: "DistroKid vs. Mitas Muzik",
        subtitle: "The 2026 Distribution Showdown",
        leftTitle: "DISTROKID",
        rightTitle: "MITAS MUZIK",
        leftColor: "#111111",
        rightColor: "#5b21b6",
        hasVs: true
    },
    {
        id: 89,
        title: "TuneCore vs. Mitas Muzik",
        subtitle: "Ultimate 2026 Guide",
        leftTitle: "TUNECORE",
        rightTitle: "MITAS MUZIK",
        leftColor: "#1d4ed8",
        rightColor: "#5b21b6",
        hasVs: true
    },
    {
        id: 88,
        title: "The Death of the Aggregator",
        subtitle: "Why Direct Integration is the Future",
        leftTitle: "OLD TECH",
        rightTitle: "DIRECT DSP",
        leftColor: "#374151",
        rightColor: "#059669",
        hasVs: true
    },
    {
        id: 90,
        title: "Release Music for Free",
        subtitle: "The 2026 No-BS Guide",
        leftTitle: "FEES",
        rightTitle: "FREE",
        leftColor: "#991b1b",
        rightColor: "#059669",
        hasVs: true
    },
    {
        id: 84,
        title: "Mitas Muzik Review",
        subtitle: "2026 Honest Breakdown",
        leftTitle: "INDEPENDENT",
        rightTitle: "EMPOWERED",
        leftColor: "#1e1e1e",
        rightColor: "#5b21b6",
        hasVs: false
    }
];

async function generateCovers() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    for (const cover of covers) {
        console.log('Rendering cover for post ' + cover.id + '...');

        let vsBadgeHTML = '';
        if (cover.hasVs) {
            vsBadgeHTML = '<div class="vs-badge">VS</div>';
        }

        const html = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<style>' +
            '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");' +
            'body { margin: 0; padding: 0; width: 1200px; height: 630px; font-family: "Inter", sans-serif; display: flex; color: white; overflow: hidden; position: relative; }' +
            '.side { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }' +
            '.left { background: linear-gradient(135deg, ' + cover.leftColor + ', #000000); }' +
            '.right { background: linear-gradient(225deg, ' + cover.rightColor + ', #000000); }' +
            '.vs-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; background: white; color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 50px; font-weight: 900; z-index: 10; box-shadow: 0 0 50px rgba(0,0,0,0.5); border: 8px solid #111; }' +
            '.logo-text { font-size: 64px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; text-align: center; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }' +
            '.year-badge { position: absolute; top: 40px; right: 40px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 10px 20px; border-radius: 50px; font-weight: 700; font-size: 24px; border: 1px solid rgba(255,255,255,0.2); z-index: 20; color: white; }' +
            '.bottom-title { position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px; padding-bottom: 50px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); text-align: center; z-index: 20; box-sizing: border-box; }' +
            '.main-title { font-size: 56px; font-weight: 900; margin: 0 0 10px 0; text-shadow: 0 4px 20px rgba(0,0,0,0.8); }' +
            '.subtitle { font-size: 28px; color: #cbd5e1; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; }' +
            '.pattern { position: absolute; width: 200%; height: 200%; background-image: radial-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px); background-size: 40px 40px; pointer-events: none; }' +
            '</style>' +
            '</head>' +
            '<body>' +
            '<div class="year-badge">2026 EDITION</div>' +
            '<div class="side left">' +
            '<div class="pattern"></div>' +
            '<div class="logo-text">' + cover.leftTitle + '</div>' +
            '</div>' +
            '<div class="side right">' +
            '<div class="pattern"></div>' +
            '<div class="logo-text">' + cover.rightTitle + '</div>' +
            '</div>' +
            vsBadgeHTML +
            '<div class="bottom-title">' +
            '<h1 class="main-title">' + cover.title + '</h1>' +
            '<div class="subtitle">' + cover.subtitle + '</div>' +
            '</div>' +
            '</body>' +
            '</html>';

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const outputPath = path.join(__dirname, '..', 'public', 'images', 'blog', 'cover-' + cover.id + '.jpg');
        await page.screenshot({ path: outputPath, type: 'jpeg', quality: 90 });
        console.log('Successfully generated: cover-' + cover.id + '.jpg');
    }

    await browser.close();
    console.log('All covers generated!');
}

generateCovers().catch(console.error);
