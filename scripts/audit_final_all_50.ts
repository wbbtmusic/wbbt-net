
import { blogPosts } from '../src/data/blogPosts';

const run = () => {
    console.log('Auditing Blog Post Lengths...');
    let total = 0;
    let failing = [];

    blogPosts.forEach(post => {
        const len = post.content.length;
        total += len;
        console.log(`ID ${post.id}: ${len} chars - ${post.title.substring(0, 30)}...`);
        if (len < 2000) {
            failing.push(post.id);
        }
    });

    console.log(`\nTotal Posts: ${blogPosts.length}`);
    console.log(`Average Length: ${Math.round(total / blogPosts.length)} chars`);
    console.log(`Posts under 2000 chars: ${failing.length} (${failing.join(', ')})`);
};

run();
