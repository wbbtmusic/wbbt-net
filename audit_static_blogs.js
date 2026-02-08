
const BLOG_POSTS = [
    {
        "id": 1,
        "title": "The Streaming Shake-Up of 2025",
        "slug": "the-streaming-shake-up-of-2025",
        "category": "Streaming & Playlists",
        "date": "Dec 19, 2025",
        "author": "Burak",
        "image": "/images/blog/blog-1.jpg",
        "content": "<h3>What’s changing in streaming?</h3><h4>Deezer’s artist-centric royalty model</h4><p>#pSpotify’ss 1,000-stream threshold & ‘super premium’ tier</p><h3>Why does this matter?</h3><p>Despite the shake-up, there are strategies to maintain control and income:</p><p>1. <strong>Embrace direct-to-fan platforms.</strong> Bandcamp, Patreon and Unchained Music’s Web3 tools allow you to sell music and experiences directly to fans, bypassing the streaming middlemen. Offering exclusive content through these channels can create reliable monthly income.</p><p>2. <strong>Diversify your income.</strong> Don’t rely solely on streaming. Explore sync licensing for film/TV/games, teach music lessons, offer production services and sell merch. A diverse portfolio of revenue streams makes you less vulnerable to changes in one platform.</p><p>3. <strong>Cultivate superfans.</strong> Focus on building a dedicated audience rather than chasing virality. Supporters who love your work will buy vinyl, join membership communities and support crowdfunding campaigns. Engage them via email lists, Discord servers and regular live streams.</p><p>5. <strong>Release strategically.</strong> In the world of 1,000-stream thresholds, it may be better to release fewer, well-promoted singles than a barrage of tracks. Invest time in pre-save campaigns, playlist pitching and social media teasers to ensure your songs cross the new minimums.</p>"
    },
    // Truncated for brevity - I will assume the script runs on the full data I have in memory or I will paste enough to demo, 
    // BUT actually I should paste the whole content I read in the previous step.
    // For the tool call, I will include the logic to read the file directly if possible or paste the significant parts.
    // Since I can't pass 138kb in a tool call comfortably if I paste it all, 
    // I will write a script that reads the file 'src/data/blogPosts.ts' and strips the TS parts using regex to evaluate it.
];

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Quick and dirty TS to JS conversion for data extraction
    // Remove imports
    content = content.replace(/import .*?;/g, '');
    // Remove type annotation
    content = content.replace(/: BlogPost\[\]/g, '');
    // Change export const to const or global
    content = content.replace(/export const BLOG_POSTS/, 'const BLOG_POSTS');

    // Evaluate the code to get the object
    // Note: This is unsafe in production but fine for this controlled audit task
    eval(content);

    if (typeof BLOG_POSTS === 'undefined') {
        throw new Error('Failed to load BLOG_POSTS');
    }

    console.log(`Auditing ${BLOG_POSTS.length} blog posts...`);
    console.log('--------------------------------------------------');

    const issuesFound = [];

    BLOG_POSTS.forEach(post => {
        let postIssues = [];

        // 1. Content Length
        const cleanText = post.content.replace(/<[^>]*>/g, ' ');
        if (cleanText.length < 100) {
            postIssues.push('Content too short (< 100 chars)');
        }

        // 2. Long Words (Overflow)
        const words = cleanText.split(/\s+/);
        const longWords = words.filter(w => w.length > 30 && !w.startsWith('http') && !w.startsWith('data:'));
        if (longWords.length > 0) {
            postIssues.push(`Has ${longWords.length} very long words (potential overflow): ${longWords.slice(0, 3).join(', ')}...`);
        }

        // 3. Images
        if (!post.image) {
            postIssues.push('Missing Cover Image');
        } else if (post.image.startsWith('data:image')) {
            postIssues.push('Cover Image is Base64 (Performance issue)');
        }

        // 4. Content Images (Base64)
        if (post.content.includes('src="data:image')) {
            postIssues.push('Content contains Base64 images (Database bloat, slow load)');
        }

        // 5. Iframes
        if (post.content.includes('<iframe')) {
            postIssues.push('Contains <iframe> (Deprecated, use native embed or link)');
        }

        // 6. Broken HTML (Simple heuristic)
        const openDivs = (post.content.match(/<div/g) || []).length;
        const closeDivs = (post.content.match(/<\/div>/g) || []).length;
        if (openDivs !== closeDivs) {
            postIssues.push(`Mismatched <div> tags (Open: ${openDivs}, Close: ${closeDivs})`);
        }

        if (postIssues.length > 0) {
            issuesFound.push({
                id: post.id,
                title: post.title,
                issues: postIssues
            });
            console.log(`[ID: ${post.id}] "${post.title.substring(0, 40)}..."`);
            postIssues.forEach(issue => console.log(`   - ${issue}`));
            console.log('');
        }
    });

    if (issuesFound.length === 0) {
        console.log('✅ No major issues found in any blog posts.');
    } else {
        console.log(`❌ Found issues in ${issuesFound.length} posts.`);
    }

} catch (err) {
    console.error('Script failed:', err);
}
