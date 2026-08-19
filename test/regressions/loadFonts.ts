// The fixtures render with webfonts. A screenshot taken with a fallback face
// looks like a repo-wide text rendering change, so report the missing faces and
// let `index.test.js` fail the run.

// Keep the v1 `css?family=` endpoint: it serves the static per-weight faces the
// baselines were recorded with, while `css2` returns variable fonts.
const STYLESHEETS = [
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CInter:300,400,500,600,700,800,900%7CMaterial+Icons',
  'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
];

// CSS `font` shorthands, one per face the fixtures use.
const FACES = [
  ...[300, 400, 500, 700].map((weight) => `${weight} 16px Roboto`),
  ...[300, 400, 500, 600, 700, 800, 900].map((weight) => `${weight} 16px Inter`),
  '400 24px "Material Icons"',
  '900 16px "Font Awesome 5 Free"',
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
    FACES.map(async (face) => {
      try {
        // Resolves with an empty list when no rule declares the face, and
        // rejects when the font file fails to download.
        if ((await document.fonts.load(face)).length === 0) {
          missing.push(face);
        }
      } catch {
        missing.push(face);
      }
    }),
  );

  return missing;
}

/**
 * Loads the webfonts the fixtures render with.
 *
 * @returns the faces that did not load. Empty when every face is available.
 */
export default function loadFonts() {
  return Promise.race([
    loadFaces(),
    new Promise<string[]>((_, reject) => {
      setTimeout(() => reject(new Error(`Fonts did not load within ${TIMEOUT}ms.`)), TIMEOUT);
    }),
  ]);
}
