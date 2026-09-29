const fs = require('fs');

let data = fs.readFileSync('posts.json', 'utf8');
if (data.charCodeAt(0) === 0xFEFF) {
  data = data.slice(1);
}
const parsed = JSON.parse(data);
const posts = parsed.value ? parsed.value : parsed;

const cleanSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const cleanHtml = (html) => {
    return html
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8230;/g, '...')
        .replace(/&#8211;/g, '-')
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&#\d+;/g, '')
        .trim();
};

const blogPosts = posts.map(p => {
    let rawTitle = cleanHtml(p.title.rendered);
    
    if (rawTitle.includes('BAHRAIN GRAND PRIX')) {
        rawTitle = 'BAHRAIN GRAND PRIX 2027 - BE PART OF THE ACTION!';
    } else {
        // Strip out Mojibake 'dY?Z' patterns
        rawTitle = rawTitle.replace(/[dD][yY]\?[a-zA-Z0-9"~\\,]+/g, '');
    }

    let id = cleanSlug(rawTitle);
    if (!id || id === '-') id = 'post-' + p.id;
    
    const cleanMojibake = (text) => text.replace(/[dD][yY]\?[a-zA-Z0-9"~\\,]+/g, '').replace(/[\u{0080}-\u{FFFF}]/gu, "");

    const rawExcerpt = cleanMojibake(cleanHtml(p.excerpt.rendered));
        
    const contentParts = p.content.rendered.split(/<p>|<h[1-6]>/)
        .map(part => cleanMojibake(cleanHtml(part)))
        .filter(part => part.length > 20);

    let img = 'https://oceanwaytours.com/wp-content/uploads/2026/09/logo.png';
    const imgMatch = p.content.rendered.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) img = imgMatch[1];

    let finalTitle = rawTitle.replace(/[^\x00-\x7F]/g, "").replace(/\?/g, "").trim() || "OceanWay Update";

    return {
        id,
        title: finalTitle,
        excerpt: rawExcerpt,
        content: contentParts.length ? contentParts : [rawExcerpt],
        author: "OceanWay Tours",
        date: p.date ? new Date(p.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) : "September 29, 2026",
        category: "Travel Guides",
        image: img,
        readTime: Math.max(1, Math.ceil(contentParts.join(' ').length / 800)),
        seoTitle: `${finalTitle} | OceanWay Tours`.substring(0, 60),
        seoDescription: rawExcerpt.substring(0, 150)
    };
});

const fileContent = `import { BlogPost } from '@/types/content';\n\nexport const blogPostsSeed: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};\n`;
fs.writeFileSync('src/data/blogPosts.ts', fileContent);
console.log('Successfully wrote ' + blogPosts.length + ' posts');
