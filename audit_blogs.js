const fs = require('fs');

async function audit() {
    try {
        const res = await fetch('http://127.0.0.1:3001/api/data');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const blogs = data.blogPosts || [];

        console.log(`Auditing ${blogs.length} blog posts...`);
        console.log('-----------------------------------');

        blogs.forEach(post => {
            const issues = [];

            // Check for Title Length
            if (post.title.length > 100) issues.push('Title excessively long (>100 chars)');

            // Check content for Long Words (potential overflow)
            // Strip HTML tags first
            const text = post.content.replace(/<[^>]*>/g, ' ');
            const words = text.split(/\s+/);
            const longWords = words.filter(w => w.length > 30 && !w.startsWith('http')); // Exclude URLs
            if (longWords.length > 0) {
                issues.push(`Contains ${longWords.length} words > 30 chars (potential overflow if CSS fails)`);
            }

            // Check for Base64 Images
            if (post.content.includes('src="data:image')) {
                issues.push('Contains Base64 encoded images (High DB usage, slow load)');
            }

            // Check for Iframes (User requested removal)
            if (post.content.includes('<iframe')) {
                issues.push('Contains <iframe> tag (User requested removal)');
            }

            // Check for empty content
            if (!post.content || post.content.trim().length < 20) {
                issues.push('Content too short or empty');
            }

            // Check Cover Image
            if (!post.image) {
                issues.push('Missing Cover Image');
            } else if (post.image.startsWith('data:image')) {
                issues.push('Cover Image is Base64');
            }

            if (issues.length > 0) {
                console.log(`[Issue] Post ID: ${post.id}`);
                console.log(`       Title: "${post.title.substring(0, 50)}..."`);
                issues.forEach(i => console.log(`       - ${i}`));
                console.log('');
            }
        });

        console.log('Audit Complete.');

    } catch (err) {
        console.error('Audit Failed:', err);
    }
}

audit();
