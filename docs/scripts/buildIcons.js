/* eslint-disable no-console */
const path = require('path');
const sharp = require('sharp');

console.log('Generating Icons');

async function resizeIcon(size, output) {
  const INPUT_ICON = path.join(__dirname, '../public/static/logo.png');

  // Match gm/ImageMagick defaults: resize only, truecolor PNG (no palette quantization).
  await sharp(INPUT_ICON).resize(size, size).png().toFile(output);
  console.log(`${path.basename(output)} created`);
}

const promises = [
  ...[48, 96, 180, 192, 256, 384, 512].map((size) =>
    resizeIcon(
      size,
      path.join(path.join(__dirname, '../public/static/icons'), `${size}x${size}.png`),
    ),
  ),
  resizeIcon(180, path.join(__dirname, '../public/static/apple-touch-icon.png')),
];

Promise.all(promises).catch((err) => {
  setTimeout(() => {
    console.log(err);
    throw err;
  });
});
