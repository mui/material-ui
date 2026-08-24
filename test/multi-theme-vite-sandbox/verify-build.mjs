/**
 * Checks the files produced by the Material UI and Vite production builds.
 *
 * This script does not render the pages. It reads the generated HTML and CSS files directly:
 *
 * 1. For each Vite page, it finds every linked stylesheet and combines their contents. It then
 *    checks that shared tokens, Button base CSS, and Slider base CSS each appear once, and that only
 *    the page's selected theme is present.
 * 2. For the plain HTML examples, it follows CSS `@import` paths as a browser would. It checks that
 *    the page needs no script, links the expected package CSS, and receives only the expected
 *    component styles.
 * 3. For CDN usage, it checks that every generated theme bundle and source map exists. A CDN bundle
 *    must contain all shared and theme CSS directly, with no remaining `@import` requests.
 *
 * The checks look for small CSS snippets that uniquely identify tokens, base files, and themes.
 * Throwing an error makes the build command fail, so the same checks can run in CI.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const distDirectory = new URL('./dist/', import.meta.url);
const assetsDirectory = new URL('./dist/assets/', import.meta.url);

/**
 * Finds the generated CSS filename that starts with a theme name, ignoring its changing hash.
 * @param {string} theme
 * @returns {string}
 */
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

/**
 * Confirms that tokens and both component base files each occur exactly once in the supplied CSS.
 * @param {string} css
 * @param {string} label
 */
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

/**
 * Reads and combines every stylesheet linked by a generated Vite HTML page.
 * @param {string} html
 * @returns {string}
 */
function readLinkedViteCss(html) {
  const hrefs = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);

  if (hrefs.length === 0) {
    throw new Error('Expected the Vite page to load CSS.');
  }

  return hrefs
    .map((href) => readFileSync(new URL(href.replace(/^\//, ''), distDirectory), 'utf8'))
    .join('\n');
}

/**
 * Recursively follows CSS imports, like a browser, while reading each URL only once.
 * @param {URL} cssUrl
 * @param {Set<string>} [visited]
 * @returns {string}
 */
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

// Each value uniquely identifies theme rules without depending on generated asset names.
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

// For each Vite page, combine its linked CSS and verify foundation deduplication and theme isolation.
for (const [theme, htmlFile] of Object.entries(htmlEntries)) {
  const html = readFileSync(new URL(htmlFile, distDirectory), 'utf8');
  const css = readLinkedViteCss(html);

  assertFoundationIsDeduplicated(css, `${theme} page's loaded CSS`);

  // Assert that the HTML references its theme-named asset and none of the other theme assets.
  for (const [assetTheme, asset] of Object.entries(assets)) {
    const isReferenced = html.includes(asset);
    if (isReferenced !== (theme === assetTheme)) {
      throw new Error(`${htmlFile} has an invalid ${assetTheme} CSS reference.`);
    }
  }

  // Assert that the loaded CSS contains only the selected theme's unique rule fingerprint.
  for (const [signatureTheme, signature] of Object.entries(signatures)) {
    const isPresent = css.includes(signature);
    if (isPresent !== (theme === signatureTheme)) {
      throw new Error(`${htmlFile} has an invalid ${signatureTheme} theme signature.`);
    }
  }
}

// These files are deliberately outside Vite's inputs and consume package CSS directly.
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

// For each plain HTML page, resolve its linked CSS graph and verify the expected no-bundler mode.
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

  // Assert base CSS presence or absence by counting a stable selector from each component file.
  for (const [component, signature] of Object.entries(componentSignatures)) {
    const expectedCount = expected.components.includes(component) ? 1 : 0;
    if (count(compactCss, signature) !== expectedCount) {
      throw new Error(`${htmlFile} has an invalid ${component} base CSS count.`);
    }
  }

  // Assert that the resolved CSS graph contains the selected theme's unique rule fingerprint.
  for (const signature of expected.signatures) {
    if (!css.includes(signature)) {
      throw new Error(`${htmlFile} is missing its expected CSS signature.`);
    }
  }
}

// For each theme, verify that the package build emits a complete, flattened CDN artifact.
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

  // Assert that each bundle contains its own fingerprint and no other theme's fingerprint.
  for (const [signatureTheme, signature] of Object.entries(signatures)) {
    const isPresent = css.includes(signature);
    if (isPresent !== (theme === signatureTheme)) {
      throw new Error(`${theme} CDN bundle has an invalid ${signatureTheme} theme signature.`);
    }
  }
}

// eslint-disable-next-line no-console
console.log('Verified bundler deduplication, theme isolation, and no-bundler CSS artifacts.');
