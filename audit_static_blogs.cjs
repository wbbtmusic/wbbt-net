
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');

try {
    console.log('Reading file:', filePath);
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the array content
    // Look for: export const BLOG_POSTS: BlogPost[] = [ ... ];
    const match = content.match(/export const BLOG_POSTS[^=]*=\s*(\[\s*\{[\s\S]*\}\s*\]);/);

    if (!match) {
        throw new Error('Could not find BLOG_POSTS array in file via Regex.');
    }

    let arrayString = match[1];

    // Evaluate the array string to get the JS object
    // This handles quoted keys, trailing commas, etc.
    const blogs = eval(arrayString);

    if (!Array.isArray(blogs)) {
        throw new Error('Parsed content is not an array');
    }

    console.log(`Auditing ${blogs.length} blog posts...`);
    console.log('--------------------------------------------------');

    const issuesFound = [];

    blogs.forEach(post => {
        let postIssues = [];

        // 1. Content Length
        if (!post.content) {
            postIssues.push('Content is empty/null');
        } else {
            const cleanText = post.content.replace(/<[^>]*>/g, ' ');
            if (cleanText.length < 100) {
                postIssues.push('Content too short (< 100 chars)');
            }

            // 2. Long Words (Overflow) using simple space split
            const words = cleanText.split(/\s+/);
            const longWords = words.filter(w => w.length > 30 && !w.startsWith('http') && !w.startsWith('data:') && !w.startsWith('/'));
            if (longWords.length > 0) {
                postIssues.push(`Has ${longWords.length} very long words (potential overflow): ${longWords.slice(0, 3).join(', ')}...`);
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
        }

        // 3. Images
        if (!post.image) {
            postIssues.push('Missing Cover Image');
        } else if (post.image.startsWith('data:image')) {
            postIssues.push('Cover Image is Base64 (Performance issue)');
        }

        if (postIssues.length > 0) {
            issuesFound.push({
                id: post.id,
                title: post.title,
                issues: postIssues
            });
            console.log(`[ID: ${post.id}] "${post.title ? post.title.substring(0, 40) : 'No Title'}..."`);
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
    console.error('Audit Script failed:', err);
    console.error(err.stack);
}
