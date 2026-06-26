// Fixture discovery for the visual-regression bundle.
//
// This module exists to host the eager `import.meta.glob` calls in isolation.
// Eager globs *prepend* their resolved imports to the top of the module that
// contains them, ahead of that module's own `import` statements (see
// mui/base-ui#4370). If these globs lived in `index.jsx`, the demo modules —
// including their top-level `dayjs()` calls — would evaluate before
// `index.jsx`'s first import (`./fakeDateSetup`) could install the frozen
// clock. Keeping them here, imported *after* `./fakeDateSetup`, guarantees the
// override is in place first.

// Get all the fixtures specifically written for preventing visual regressions.
const importRegressionFixtures = import.meta.glob(['./fixtures/**/*.(js|ts|tsx)'], {
  import: 'default',
  eager: true,
});

const regressionFixtures = [];

Object.keys(importRegressionFixtures).forEach((path) => {
  const [suite, name] = path
    .replace('./fixtures/', '')
    .replace(/\.\w+$/, '')
    .split('/');

  // TODO: Why does webpack include a key for the absolute and relative path?
  // We just want the relative path
  if (path.startsWith('./')) {
    regressionFixtures.push({
      path,
      suite: `regression-${suite}`,
      name,
      Component: importRegressionFixtures[path],
    });
  }
}, []);

// Also use some of the demos to avoid code duplication.
//
// Two exclusion layers:
//   - Slug-level (whole slug has no tool consumer, or path can't be imported) lives here,
//     dropping the demo from the bundle entirely.
//   - Per-demo (a specific demo inside an otherwise-enrolled slug is skipped by one tool
//     or the other) lives in `demoMeta.ts`, so screenshot-specific reasons
//     ("Redundant", "Flaky image loading") don't also drop a11y coverage.
//
// Enrolling a new component for a11y: un-negate the slug glob below if needed,
// then add an `A11Y_RULES` entry in `demoMeta.ts`
// (e.g. `{ test: 'docs/data/material/components/foo/{BasicFoo,FooVariants}', enabled: true }`).
const importDemos = import.meta.glob(
  [
    'docs/data/**/[A-Z]*.js',
    'docs/data/base/**/[A-Z]*/css/index.js',
    'docs/data/base/**/[A-Z]*/tailwind/index.js',
    'docs/data/base/**/[A-Z]*/system/index.js',
    // ================== Structural — cannot be imported safely ==================
    '!docs/data/experiments',
    '!docs/data/material/**/*NoSnap.*',
    // Templates — not demos
    '!docs/data/material/getting-started/templates/blog/components',
    '!docs/data/material/getting-started/templates/checkout/components',
    '!docs/data/material/getting-started/templates/crud-dashboard/components',
    '!docs/data/material/getting-started/templates/crud-dashboard/theme/customizations',
    '!docs/data/material/getting-started/templates/crud-dashboard/hooks',
    '!docs/data/material/getting-started/templates/crud-dashboard/context',
    '!docs/data/material/getting-started/templates/dashboard/components',
    '!docs/data/material/getting-started/templates/dashboard/internals/components',
    '!docs/data/material/getting-started/templates/dashboard/theme/customizations',
    '!docs/data/material/getting-started/templates/marketing-page/components',
    '!docs/data/material/getting-started/templates/marketing-page/MarketingPage',
    '!docs/data/material/getting-started/templates/shared-theme',
    '!docs/data/material/getting-started/templates/sign-in/components',
    '!docs/data/material/getting-started/templates/sign-in-side/components',
    '!docs/data/material/getting-started/templates/sign-up/components',
    // Customization demos — not component pages
    '!docs/data/material/customization/breakpoints',
    '!docs/data/material/customization/color',
    '!docs/data/material/customization/container-queries/ResizableDemo',
    '!docs/data/material/customization/default-theme',
    '!docs/data/material/customization/density/DensityTool',
    '!docs/data/material/customization/right-to-left/RtlDemo',
    '!docs/data/material/customization/transitions/TransitionHover',
    '!docs/data/material/customization/typography/ResponsiveFontSizesChart',
    // Other non-demo subtrees
    '!docs/data/material/components/menubar/components', // Source subdir, not demos
    '!docs/data/material/getting-started/supported-components/MaterialUIComponents',
    '!docs/data/material/guides',
    '!docs/data/base/getting-started/quickstart/BaseButtonTailwind',
    '!docs/data/base/guides/working-with-tailwind-css/PlayerFinal',
    '!docs/data/premium-themes',
    // ================== Slug-level — no tool consumer ==================
    '!docs/data/material/components/backdrop', // Needs interaction
    '!docs/data/material/components/click-away-listener', // Needs interaction
    '!docs/data/material/components/container', // Can't see the impact
    '!docs/data/material/components/dialogs', // Needs interaction
    '!docs/data/material/components/image-list', // Images don't load
    '!docs/data/material/components/material-icons/SearchIcons', // Heavy icon grid
    '!docs/data/material/components/menus', // Needs interaction
    '!docs/data/material/components/popper', // Needs interaction
    // `progress` is included so axe can run on the LinearProgress a11y demos; its
    // animated bars make screenshots flaky, so screenshots are disabled slug-wide
    // in `SCREENSHOT_RULES` (a11y still runs on the enrolled demos).
    '!docs/data/material/components/speed-dial', // Needs interaction
    '!docs/data/material/components/textarea-autosize', // Superseded by a dedicated regression test
    '!docs/data/material/components/tooltips', // Needs interaction
    '!docs/data/material/components/transitions', // Needs interaction
    '!docs/data/material/components/use-media-query', // Need to dynamically resize to test
    '!docs/data/material/customization/breakpoints', // Need to dynamically resize to test
    '!docs/data/material/customization/color', // Escape viewport
    '!docs/data/material/customization/container-queries/ResizableDemo', // No public components
    '!docs/data/material/customization/default-theme', // Redux isolation
    '!docs/data/material/customization/density/DensityTool', // Redux isolation
    '!docs/data/material/customization/right-to-left/RtlDemo',
    '!docs/data/material/customization/transitions/TransitionHover', // Need interaction
    '!docs/data/material/customization/typography/ResponsiveFontSizesChart',
    '!docs/data/material/getting-started/supported-components/MaterialUIComponents', // No public components
    '!docs/data/material/guides',
    '!docs/data/base/getting-started/quickstart/BaseButtonTailwind', // CodeSandbox
    '!docs/data/base/guides/working-with-tailwind-css/PlayerFinal', // No public components
    '!docs/data/premium-themes',
    '!docs/data/material/getting-started/versions/LatestVersions', // not a component
    '!docs/data/material/getting-started/versions/ReleasedVersions', // not a component
  ],
  {
    import: 'default',
    eager: true,
  },
);

const demoFixtures = [];
Object.keys(importDemos).forEach((path) => {
  const [name, ...suiteArray] = path
    .replace('../../docs/data/', '')
    .replace('.js', '')
    .split('/')
    .reverse();
  const suite = `docs-${suiteArray
    .reverse()
    .join('-')
    .replace(/^material-/, '')}`;

  demoFixtures.push({
    path,
    suite,
    name,
    Component: importDemos[path],
  });
}, []);

// Bespoke composites under `docs/src/components/product*/` that assemble the
// product landing pages (`/material-ui`, `/x`). They aren't covered by the
// `docs/data/**` glob above. See `test/regressions/MarketingWrapper.tsx` for
// the branding wrapper and `test/regressions/stubs/` for the `next/*` shims
// that let composites with transitive `next/router` imports render outside
// the Next.js docs host.
//
// This is an explicit allowlist rather than a `product*/[A-Z]*.tsx` glob: most
// composites are marketing chrome (heroes with links, pricing tables, Figma
// kit promos, template thumbnails) with no meaningful component integration to
// guard. We only cover the ones that render real MUI / MUI X components in a
// composed layout — where a CSS/theme regression would actually show up.
const importComposites = import.meta.glob(
  [
    // Material UI — component showcases under the docs branding theme.
    'docs/src/components/productMaterial/MaterialHero.tsx',
    'docs/src/components/productMaterial/MaterialStyling.tsx',
    'docs/src/components/productMaterial/MaterialTheming.tsx',
    // MUI X — one isolated demo per product (the switcher composite
    // `XComponents` renders these same demos behind tabs; isolating them
    // drops the tab chrome and avoids screenshotting one product at a time).
    'docs/src/components/productX/XHero.tsx',
    'docs/src/components/productX/XGridFullDemo.tsx',
    'docs/src/components/productX/XDateRangeDemo.tsx',
    'docs/src/components/productX/XChartsDemo.tsx',
    'docs/src/components/productX/XTreeViewDemo.tsx',
    'docs/src/components/productX/XTheming.tsx',
  ],
  {
    import: 'default',
    eager: true,
  },
);

const compositeFixtures = [];
Object.keys(importComposites).forEach((path) => {
  const productMatch = path.match(/components\/product([^/]+)\//);
  if (!productMatch) {
    return;
  }
  // Only single-word products are covered (`productMaterial`, `productX`), so
  // the suite name is just the lower-cased segment (`material`, `x`).
  // `parseRoute` in `demoMeta.ts` re-capitalizes it to rebuild the docs path.
  const product = productMatch[1].toLowerCase();
  const name = path
    .split('/')
    .pop()
    .replace(/\.tsx$/, '');
  compositeFixtures.push({
    path,
    suite: `docs-product-${product}`,
    name,
    Component: importComposites[path],
    isComposite: true,
  });
}, []);

const fixtures = regressionFixtures.concat(demoFixtures).concat(compositeFixtures);

export default fixtures;
