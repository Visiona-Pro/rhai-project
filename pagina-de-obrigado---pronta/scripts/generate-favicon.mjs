import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public/og-image.jpg');
const faviconPath = path.join(process.cwd(), 'public/favicon.png');
const appleIconPath = path.join(process.cwd(), 'public/apple-touch-icon.png');
const ogOptimizedPath = path.join(process.cwd(), 'public/og-image-optimized.jpg');

try {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    process.exit(1);
  }

  const initialStats = fs.statSync(inputPath);
  console.log(`Original og-image.jpg size: ${(initialStats.size / 1024).toFixed(2)} KB`);

  // 1. Generate favicon.png (32x32, center cropped, PNG)
  console.log('Generating public/favicon.png (32x32)...');
  await sharp(inputPath)
    .resize(32, 32, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(faviconPath);
  const favStats = fs.statSync(faviconPath);
  console.log(`Created favicon.png: ${(favStats.size / 1024).toFixed(2)} KB`);

  // 2. Generate apple-touch-icon.png (180x180, center cropped, PNG)
  console.log('Generating public/apple-touch-icon.png (180x180)...');
  await sharp(inputPath)
    .resize(180, 180, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(appleIconPath);
  const appleStats = fs.statSync(appleIconPath);
  console.log(`Created apple-touch-icon.png: ${(appleStats.size / 1024).toFixed(2)} KB`);

  // 3. Generate og-image-optimized.jpg (1200x630, quality 82, progressive JPEG)
  console.log('Generating public/og-image-optimized.jpg (1200x630, Q82, progressive)...');
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, progressive: true })
    .toFile(ogOptimizedPath);
  const ogOptStats = fs.statSync(ogOptimizedPath);
  const ogOptSizeKB = ogOptStats.size / 1024;
  console.log(`Created og-image-optimized.jpg: ${ogOptSizeKB.toFixed(2)} KB`);
  console.log(`OG Image size reduction: ${((1 - ogOptStats.size / initialStats.size) * 100).toFixed(2)}%`);

} catch (error) {
  console.error('Error generating favicons/og-image:', error);
  process.exit(1);
}
