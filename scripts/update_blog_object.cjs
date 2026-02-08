const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(__dirname, '../src/data/blogPosts.ts');
const jsonFilePath = path.join(__dirname, '../content_batch.json');

const tsContent = fs.readFileSync(tsFilePath, 'utf8');
const newPosts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

let updatedTsContent = tsContent;

newPosts.forEach(post => {
    // Regex to find the object with specific ID
    // Matches { ... "id": X, ... } including newlines
    const regex = new RegExp(`{\\s*"id": ${post.id},[\\s\\S]*?},`, 'g');

    if (!regex.test(tsContent)) {
        console.error(`Could not find ID ${post.id} block`);
        return;
    }

    // Convert object to JSON string, then remove outer braces to fit into the array structure if needed, 
    // OR just use the full object string since we matched the full object including braces.
    // The match includes the trailing comma if it exists in the regex? 
    // My regex ends with `},` so it expects a comma.
    // I should generate the new string with a trailing comma.

    const replacement = JSON.stringify(post, null, 4) + ','; // Pretty print with 4 spaces

    // We need to be careful about replacing global string only once per ID
    // But since IDs are unique, it should be fine.
    // However, since we are modifying 'updatedTsContent' in a loop, we need to use the CURRENT content state or stick to original if regexes don't overlap.
    // Regexes don't overlap, but index positions shift.
    // Better to split the file or use replace on the accumulated string.

    updatedTsContent = updatedTsContent.replace(regex, replacement);
    console.log(`Updated ID ${post.id}`);
});

fs.writeFileSync(tsFilePath, updatedTsContent, 'utf8');
console.log("Batch update complete");
