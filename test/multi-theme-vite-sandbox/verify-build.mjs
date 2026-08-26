import { existsSync, readdirSync, readFileSync } from 'node:fs';

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

function assertFoundationIsDeduplicated(css, label) {
  const compactCss = css.replace(/\s+/g, '');

  if (count(compactCss, '--mui-palette-common-black:') !== 1) {
    throw new Error(`${label} must contain exactly one copy of the shared token contract.`);
  }

  if (count(compactCss, '.MuiButton-loadingIconPlaceholder{') !== 1) {
    throw new Error(`${label} must contain exactly one copy of Button base CSS.`);
  }

  if (count(compactCss, '.MuiSlider-track.MuiSlider-trackFalse{') !== 1) {
    throw new Error(`${label} must contain exactly one copy of Slider base CSS.`);
  }
}

function readLinkedViteCss(html) {
  const hrefs = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);

  if (hrefs.length === 0) {
    throw new Error('Expected the Vite page to load CSS.');
  }

  return hrefs
    .map((href) => readFileSync(new URL(href.replace(/^\//, ''), distDirectory), 'utf8'))
    .join('\n');
}

function readCssGraph(cssUrl, visited = new Set()) {
  if (visited.has(cssUrl.href)) {
    return '';
  }

  visited.add(cssUrl.href);
  const css = readFileSync(cssUrl, 'utf8');
  const dependencies = [...css.matchAll(/@import\s+["']([^"']+)["']/g)].map((match) =>
    readCssGraph(new URL(match[1], cssUrl), visited),
  );

  return [...dependencies, css].join('\n');
}

const signatures = {
  polished: 'linear-gradient',
  brutalist: 'rotate(45deg)',
  consumer: 'translateY(2px)',
};

const assets = Object.fromEntries(
  Object.keys(signatures).map((theme) => [theme, findThemeAsset(theme)]),
);

const htmlEntries = {
  polished: 'index.html',
  brutalist: 'brutalist.html',
  consumer: 'consumer.html',
};

for (const [theme, htmlFile] of Object.entries(htmlEntries)) {
  const html = readFileSync(new URL(htmlFile, distDirectory), 'utf8');
  const css = readLinkedViteCss(html);

  assertFoundationIsDeduplicated(css, `${theme} page's loaded CSS`);

  for (const [assetTheme, asset] of Object.entries(assets)) {
    const isReferenced = html.includes(asset);
    if (isReferenced !== (theme === assetTheme)) {
      throw new Error(`${htmlFile} has an invalid ${assetTheme} CSS reference.`);
    }
  }

  for (const [signatureTheme, signature] of Object.entries(signatures)) {
    const isPresent = css.includes(signature);
    if (isPresent !== (theme === signatureTheme)) {
      throw new Error(`${htmlFile} has an invalid ${signatureTheme} theme signature.`);
    }
  }
}

const noBundlerEntries = {
  'cdn.html': {
    stylesheet: '../../packages/mui-material/build/css/themes/polished/index.bundle.css',
    signatures: ['linear-gradient'],
    components: ['button', 'slider'],
  },
  'cdn-granular.html': {
    stylesheet: '../../packages/mui-material/build/css/themes/brutalist/button.css',
    signatures: ['rotate(45deg)'],
    components: ['button'],
  },
};

for (const [htmlFile, expected] of Object.entries(noBundlerEntries)) {
  const htmlUrl = new URL(htmlFile, import.meta.url);
  const html = readFileSync(htmlUrl, 'utf8');
  const stylesheetHrefs = [...html.matchAll(/<link\s[^>]*href="([^"]+\.css)"/g)].map(
    (match) => match[1],
  );

  if (stylesheetHrefs.length !== 1 || html.includes('<script')) {
    throw new Error(`${htmlFile} must use one CSS link and no JavaScript bundler entry.`);
  }

  const stylesheetUrl = new URL(stylesheetHrefs[0], htmlUrl);
  if (stylesheetUrl.href !== new URL(expected.stylesheet, htmlUrl).href) {
    throw new Error(`${htmlFile} links to an unexpected stylesheet.`);
  }

  const css = readCssGraph(stylesheetUrl);
  const compactCss = css.replace(/\s+/g, '');
  if (count(compactCss, '--mui-palette-common-black:') !== 1) {
    throw new Error(`${htmlFile} must load the shared token contract once.`);
  }

  const componentSignatures = {
    button: '.MuiButton-loadingIconPlaceholder{',
    slider: '.MuiSlider-track.MuiSlider-trackFalse{',
  };

  for (const [component, signature] of Object.entries(componentSignatures)) {
    const expectedCount = expected.components.includes(component) ? 1 : 0;
    if (count(compactCss, signature) !== expectedCount) {
      throw new Error(`${htmlFile} has an invalid ${component} base CSS count.`);
    }
  }

  for (const signature of expected.signatures) {
    if (!css.includes(signature)) {
      throw new Error(`${htmlFile} is missing its expected CSS signature.`);
    }
  }
}

for (const theme of ['polished', 'brutalist']) {
  const bundleUrl = new URL(
    `../../packages/mui-material/build/css/themes/${theme}/index.bundle.css`,
    import.meta.url,
  );

  if (!existsSync(bundleUrl) || !existsSync(new URL('index.bundle.css.map', bundleUrl))) {
    throw new Error(`${theme} must provide a flattened CSS bundle and source map.`);
  }

  const css = readFileSync(bundleUrl, 'utf8');
  if (css.includes('@import')) {
    throw new Error(`${theme} CDN bundle must not contain CSS imports.`);
  }

  assertFoundationIsDeduplicated(css, `${theme} CDN bundle`);

  for (const [signatureTheme, signature] of Object.entries(signatures)) {
    const isPresent = css.includes(signature);
    if (isPresent !== (theme === signatureTheme)) {
      throw new Error(`${theme} CDN bundle has an invalid ${signatureTheme} theme signature.`);
    }
  }
}

// eslint-disable-next-line no-console
console.log('Verified bundler deduplication, theme isolation, and no-bundler CSS artifacts.');
