import https from 'https';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  try {
    const wpApiUrl = 'https://oceanwaytours.com/index.php?rest_route=/wp/v2/posts&_embed&per_page=100';
    const data = await fetchUrl(wpApiUrl);
    const posts = JSON.parse(data);
    
    if (!Array.isArray(posts) || posts.length === 0) {
        console.log('No posts found in API response.');
        return;
    }
    console.log('Found ' + posts.length + ' posts via REST API.');
    
    const formattedPosts = posts.map(post => {
      let imageUrl = 'https://cdn.magicpatterns.com/patterns/generated-images/710acca0-7433-4231-b9f4-1e43fc9a89e0.jpg';
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      let category = 'Travel Guide';
      if (post._embedded && post._embedded['wp:term']) {
         const cats = post._embedded['wp:term'][0];
         if (cats && cats.length > 0) category = cats[0].name;
      }

      let rawContent = post.content.rendered || '';
      let paragraphs = rawContent
          .replace(/<\/p>/gi, '\n\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&#8211;/g, '-')
          .replace(/&#8217;/g, "'")
          .replace(/&#8220;/g, '\"')
          .replace(/&#8221;/g, '\"')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .split('\n\n')
          .map(p => p.trim())
          .filter(p => p.length > 0);

      let excerpt = post.excerpt.rendered
          .replace(/<[^>]+>/g, '')
          .replace(/&#8211;/g, '-')
          .replace(/&#8217;/g, "'")
          .replace(/&#8220;/g, '\"')
          .replace(/&#8221;/g, '\"')
          .replace(/&nbsp;/g, ' ')
          .replace(/&hellip;/g, '...')
          .trim();
          
      if (!excerpt && paragraphs.length > 0) excerpt = paragraphs[0].substring(0, 150) + '...';

      const readTime = Math.max(1, Math.ceil(paragraphs.join(' ').split(' ').length / 200));
      let title = post.title.rendered
          .replace(/&#8211;/g, '-')
          .replace(/&#8217;/g, "'")
          .replace(/&#8220;/g, '\"')
          .replace(/&#8221;/g, '\"')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&');

      return {
        id: post.slug,
        title: title,
        excerpt: excerpt,
        content: paragraphs,
        author: 'OceanWay Tours',
        date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: category,
        image: imageUrl,
        readTime: readTime,
        seoTitle: title + ' | OceanWay Tours',
        seoDescription: excerpt.substring(0, 160)
      };
    });

    console.log('Sample parsed post:', formattedPosts[0].title);
    
    fs.writeFileSync('scraped_blogs.json', JSON.stringify(formattedPosts, null, 2));
    console.log('Saved to scraped_blogs.json');
  } catch (err) {
    console.error('Error fetching/parsing:', err.message);
  }
}

scrape();
