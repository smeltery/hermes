import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
const source = readFileSync('website/public/og-image.svg');
const image = new Resvg(source, { font: { defaultFontFamily: 'Arial' } }).render();
writeFileSync('website/public/og-image.png', image.asPng());
console.log('Rendered 1200×630 social image');
