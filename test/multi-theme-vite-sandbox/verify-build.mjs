import { readdirSync, readFileSync } from 'node:fs';

const distDirectory = new URL('./dist/', import.meta.url);
const assetsDirectory = new URL('./dist/assets/', import.meta.url);

function findThemeAsset(theme) {
  const matches = readdirSync(assetsDirectory).filter(
    (file) => file.startsWith(`${theme}-`) && file.endsWith('.css'),
  );

  if (matches.length !== 1) {
    throw new Error(`Expected one ${theme} CSS asset, found ${matches.length}.`);
  }

  return matches[0];
}

function count(source, value) {
  return source.split(value).length - 1;
}

const signatures = {
  polished: 'linear-gradient',
  brutalist: 'rotate(45deg)',
  consumer: 'translateY(2px)',
};

const assets = Object.fromEntries(
  Object.keys(signatures).map((theme) => [theme, findThemeAsset(theme)]),
);

for (const [theme, asset] of Object.entries(assets)) {
  const css = readFileSync(new URL(`./dist/assets/${asset}`, import.meta.url), 'utf8');

  if (count(css, '--mui-palette-common-black:') !== 1) {
    throw new Error(`${theme} must contain exactly one copy of the shared token contract.`);
  }

  if (count(css, '.MuiButton-root{box-sizing:border-box') !== 1) {
    throw new Error(`${theme} must contain exactly one copy of Button base CSS.`);
  }

  if (count(css, '.MuiSlider-track.MuiSlider-trackFalse{') !== 1) {
    throw new Error(`${theme} must contain exactly one copy of Slider base CSS.`);
  }

  for (const [signatureTheme, signature] of Object.entries(signatures)) {
    const isPresent = css.includes(signature);
    if (isPresent !== (theme === signatureTheme)) {
      throw new Error(`${theme} has an invalid ${signatureTheme} theme signature.`);
    }
  }
}

const htmlEntries = {
  polished: 'index.html',
  brutalist: 'brutalist.html',
  consumer: 'consumer.html',
};

for (const [theme, htmlFile] of Object.entries(htmlEntries)) {
  const html = readFileSync(new URL(htmlFile, distDirectory), 'utf8');

  for (const [assetTheme, asset] of Object.entries(assets)) {
    const isReferenced = html.includes(asset);
    if (isReferenced !== (theme === assetTheme)) {
      throw new Error(`${htmlFile} has an invalid ${assetTheme} CSS reference.`);
    }
  }
}

// eslint-disable-next-line no-console
console.log('Verified isolated theme CSS, shared CSS deduplication, and per-page references.');
