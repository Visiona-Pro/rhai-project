import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'src/assets/images/regenerated_image_1780716160590.png');
const outputPath = path.join(process.cwd(), 'src/assets/images/regenerated_image_1780716160590.webp');

try {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    process.exit(1);
  }

  const initialStats = fs.statSync(inputPath);
  const initialSizeKB = (initialStats.size / 1024).toFixed(2);

  console.log(`Converting ${inputPath} to WebP...`);
  console.log(`Original size: ${initialSizeKB} KB`);

  await sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(outputPath);

  const finalStats = fs.statSync(outputPath);
  const finalSizeKB = (finalStats.size / 1024).toFixed(2);

  console.log(`Successfully converted to WebP!`);
  console.log(`Optimized size: ${finalSizeKB} KB`);
  console.log(`Reduction: ${((1 - finalStats.size / initialStats.size) * 100).toFixed(2)}%`);
} catch (error) {
  console.error('Error converting image:', error);
  process.exit(1);
}
