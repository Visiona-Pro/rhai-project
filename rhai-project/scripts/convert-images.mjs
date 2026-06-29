import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

const conversions = [
  {
    input: 'regenerated_image_1780461859488.png',
    output: 'regenerated_image_1780461859488.webp',
    quality: 82,
  },
  {
    input: 'brushed_gold_cta_bg_1780364499726.png',
    output: 'brushed_gold_cta_bg.webp',
    quality: 85,
  },
];

async function runConversions() {
  for (const { input, output, quality } of conversions) {
    const inputPath  = path.join(IMAGES_DIR, input);
    const outputPath = path.join(IMAGES_DIR, output);
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️ Arquivo não encontrado: ${input}`);
      continue;
    }
    const before = fs.statSync(inputPath).size;
    await sharp(inputPath).webp({ quality }).toFile(outputPath);
    const after = fs.statSync(outputPath).size;
    const saving = Math.round((1 - after / before) * 100);
    console.log(`✅ ${input} → ${output} | ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB | -${saving}%`);
  }
}

runConversions().catch(err => {
  console.error('Failure in converting images:', err);
  process.exit(1);
});
