/**
 * Verifies themed JavaScript entries from a consumer's production output.
 *
 * For every generated HTML page, this follows its linked Vite CSS and counts stable signatures
 * from Material UI tokens, component foundations, and component themes. The direct page must
 * contain Button CSS only. Both barrel pages must contain the complete selected theme, with Button
 * and Slider CSS exactly once. Every page must contain only the theme selected by its import.
 */
import { readFileSync } from 'node:fs';

const distDirectory = new URL('./dist/', import.meta.url);

function count(source, value) {
  return source.split(value).length - 1;
}

/** Reads and combines every stylesheet emitted for one Vite HTML entry. */
function readPageCss(htmlFile) {
  const html = readFileSync(new URL(htmlFile, distDirectory), 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);

  if (hrefs.length === 0) {
    throw new Error(`${htmlFile} must load CSS through its themed JavaScript entry.`);
  }

  return hrefs
    .map((href) => readFileSync(new URL(href.replace(/^\//, ''), distDirectory), 'utf8'))
    .join('\n')
    .replace(/\s+/g, '');
}

const scenarios = {
  'index.html': { button: 1, slider: 0, theme: 'polished' },
  'barrel.html': { button: 1, slider: 1, theme: 'polished' },
  'multiple.html': { button: 1, slider: 1, theme: 'brutalist' },
};

const signatures = {
  tokens: '--mui-palette-common-black:',
  buttonBase: '.MuiButton-loadingIconPlaceholder{',
  sliderBase: '.MuiSlider-track.MuiSlider-trackFalse{',
  polished: 'background:linear-gradient(90deg,#0000,#ffffff7a,#0000)',
  brutalist: 'transform:rotate(45deg)',
};

// Count foundations to prove that automatic CSS imports remain granular and deduplicated.
for (const [htmlFile, expected] of Object.entries(scenarios)) {
  const css = readPageCss(htmlFile);
  const expectedCounts = {
    [signatures.tokens]: 1,
    [signatures.buttonBase]: expected.button,
    [signatures.sliderBase]: expected.slider,
  };

  for (const [signature, expectedCount] of Object.entries(expectedCounts)) {
    const actualCount = count(css, signature);
    if (actualCount !== expectedCount) {
      throw new Error(
        `${htmlFile} expected ${expectedCount} occurrence(s) of ${signature}, found ${actualCount}.`,
      );
    }
  }

  // Check both fingerprints so importing one theme can never accidentally bundle the other.
  for (const theme of ['polished', 'brutalist']) {
    const isPresent = css.includes(signatures[theme]);
    if (isPresent !== (theme === expected.theme)) {
      throw new Error(`${htmlFile} has an invalid ${theme} theme fingerprint.`);
    }
  }
}

// eslint-disable-next-line no-console
console.log('Verified granular direct and whole-theme barrel JavaScript entries.');
