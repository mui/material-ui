// The fixtures render with webfonts. A screenshot taken with a fallback face
// looks like a repo-wide text rendering change, so report the missing faces and
// let `index.test.js` fail the run.

// Keep the v1 `css?family=` endpoint: it serves the static per-weight faces the
// baselines were recorded with, while `css2` returns variable fonts.
const STYLESHEETS = [
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CInter:300,400,500,600,700,800,900%7CMaterial+Icons',
  'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
];

// One entry per face the fixtures use.
const FACES = [
  ...[300, 400, 500, 700].map((weight) => ({ family: 'Roboto', weight })),
  ...[300, 400, 500, 600, 700, 800, 900].map((weight) => ({ family: 'Inter', weight })),
  { family: 'Material Icons', weight: 400 },
  { family: 'Font Awesome 5 Free', weight: 900 },
];

const TIMEOUT = 20000;

function loadStylesheet(href: string) {
  return new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener('load', () => resolve());
    link.addEventListener('error', () => reject(new Error(`Failed to load ${href}.`)));
    document.head.appendChild(link);
  });
}

async function loadFaces() {
  // `document.fonts` only matches `@font-face` rules that are already parsed.
  await Promise.all(STYLESHEETS.map(loadStylesheet));

  // A `<link>` alone does not download the font in chromium, because no element
  // renders the family yet. `document.fonts.load()` forces the download.
  const missing: string[] = [];
  await Promise.all(
    FACES.map(async ({ family, weight }) => {
      try {
        // `load()` applies normal CSS matching, so a request for a weight the
        // stylesheet omits resolves to the nearest one. Compare what came back.
        const faces = await document.fonts.load(`${weight} 16px "${family}"`);
        if (!faces.some((face) => face.weight === String(weight))) {
          missing.push(`${family} ${weight}`);
        }
      } catch {
        // The rule matched but the font file failed to download.
        missing.push(`${family} ${weight}`);
      }
    }),
  );

  if (missing.length > 0) {
    throw new Error(`Fonts failed to load. Missing: ${missing.join(', ')}`);
  }
}

/**
 * Loads the webfonts the fixtures render with.
 *
 * @returns a promise that rejects when a face does not load.
 */
export default function loadFonts() {
  return Promise.race([
    loadFaces(),
    new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error(`Fonts did not load within ${TIMEOUT}ms.`)), TIMEOUT);
    }),
  ]);
}
