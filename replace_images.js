const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const filesToUpdate = [
  'src/data/blogPosts.ts',
  'src/data/destinations.ts',
  'src/data/itineraries.ts',
  'src/data/reviews.ts',
  'src/data/siteContent.ts',
  'src/components/home/QuoteCta.tsx',
  'src/components/home/WhyChoose.tsx',
  'src/app/admin/AdminClient.tsx'
];

const images = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));

let imgIndex = 0;
function getNextImage() {
  const img = images[imgIndex % images.length];
  imgIndex++;
  return encodeURI('/' + img);
}

let replacedCount = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /https:\/\/(?:cdn\.magicpatterns\.com|images\.unsplash\.com|i\.pravatar\.cc)[^"'\s]*/g;
  
  content = content.replace(regex, (match) => {
    if (match.includes('logo')) return match;
    if (match.includes('pravatar')) return match;
    replacedCount++;
    return getNextImage();
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Replaced ${replacedCount} images!`);
