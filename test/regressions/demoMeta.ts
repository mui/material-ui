/**
 * Per-tool VRT configuration as two independent rule arrays — one for
 * screenshots, one for axe — so editing one tool can never stomp on the
 * other. Each list is evaluated last-match-wins (no inheritance: an override
 * rule must restate every field it cares about) against the docs path
 * `docs/data/material/components/{slug}/{Demo}` (component demos) or
 * `docs/src/components/product{Product}/{Name}` (landing-page composites).
 *
 * Whole-slug exclusions where *no* tool wants anything live in the
 * `index.jsx` glob — dropping them from the bundle entirely, not just from
 * the tools.
 */

import { minimatch } from 'minimatch';

/** Default playwright viewport when no `ScreenshotRule.viewport` matches. */
export const DEFAULT_VIEWPORT = { width: 1000, height: 700 };

export interface ScreenshotRule {
  /** Minimatch glob against the docs path (see file-level comment). */
  test: string;
  enabled?: boolean;
  /** Playwright waits for this selector to appear after navigation, before axe + screenshot. */
  waitForSelector?: string;
  /**
   * Per-route viewport width override (px). Defaults to
   * {@link DEFAULT_VIEWPORT}'s width. Only the width is configurable: the
   * screenshot targets the testcase element, which captures its full rendered
   * height regardless of viewport, so width is the only axis that affects the
   * result (composites key off desktop breakpoints). The viewport height stays
   * at the default.
   */
  viewportWidth?: number;
}

export interface A11yRule {
  /** Minimatch glob against `docs/data/material/components/{slug}/{Demo}`. */
  test: string;
  enabled?: boolean;
  /**
   * `visual` asserts rules that depend on rendered CSS. `all` asserts every
   * axe violation/incomplete that is not listed in `skipAssertions`.
   */
  assertions?: 'visual' | 'all';
  /** Axe rule IDs recorded into results JSON but not asserted on. */
  skipAssertions?: string[];
}

/**
 * Screenshots default to enabled. Add a rule with `enabled: false` to opt
 * out, or `waitForSelector` to gate axe + screenshot on a specific element.
 * Trailing comments preserve the prose used in the old glob so `git grep` on a
 * reason still finds every affected demo.
 */
export const SCREENSHOT_RULES: ScreenshotRule[] = [
  { test: 'docs/data/material/components/alert/TransitionAlerts', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/BackToTop', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/ElevateAppBar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/HideAppBar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/MenuAppBar', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Asynchronous', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/CheckboxesTags', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/CountrySelect', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/DisabledOptions', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Filter', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/FreeSolo', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/GoogleMaps', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Grouped', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Highlights', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Playground', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/UseAutocomplete', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Virtualize', enabled: false }, // Redundant
  { test: 'docs/data/material/components/badges/BadgeAlignment', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/badges/BadgeVisibility', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/bottom-navigation/FixedBottomNavigation', enabled: false }, // Redundant
  { test: 'docs/data/material/components/breadcrumbs/ActiveLastBreadcrumb', enabled: false }, // Redundant
  { test: 'docs/data/material/components/chips/ChipsPlayground', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/drawers/SwipeableEdgeDrawer', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/drawers/SwipeableTemporaryDrawer', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/drawers/TemporaryDrawer', enabled: false }, // Needs interaction
  {
    test: 'docs/data/material/components/floating-action-button/FloatingActionButtonZoom',
    enabled: false,
  }, // Needs interaction
  { test: 'docs/data/material/components/masonry/ImageMasonry', enabled: false }, // Images don't load
  { test: 'docs/data/material/components/masonry/Sequential', enabled: false }, // Flaky
  { test: 'docs/data/material/components/modal/BasicModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/KeepMountedModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/SpringModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/TransitionsModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/no-ssr/FrameDeferring', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/popover/AnchorPlayground', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/popover/BasicPopover', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/popover/PopoverPopupState', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/ControlledOpenSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/DialogSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/GroupedSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/skeleton/Animations', enabled: false }, // Animation disabled
  { test: 'docs/data/material/components/skeleton/Facebook', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/skeleton/SkeletonChildren', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/skeleton/YouTube', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/snackbars/ConsecutiveSnackbars', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/CustomizedSnackbars', enabled: false }, // Redundant
  { test: 'docs/data/material/components/snackbars/DirectionSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/FabIntegrationSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/IntegrationNotistack', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/PositionedSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/SimpleSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/TransitionsSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/stack/InteractiveStack', enabled: false }, // Redundant
  { test: 'docs/data/material/components/steppers/HorizontalNonLinearStepper', enabled: false }, // Redundant
  { test: 'docs/data/material/components/steppers/TextMobileStepper', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/tabs/AccessibleTabs1', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/tabs/AccessibleTabs2', enabled: false }, // Needs interaction
  {
    test: 'docs/data/material/components/table/ReactVirtualizedTable',
    waitForSelector: '[data-index="1"]',
  }, // Wait for virtualized rows to render

  // Landing-page composites under `docs/src/components/product*/` use
  // desktop breakpoints (`md`+) and look clipped at the default width.
  { test: 'docs/src/components/product*/**', viewportWidth: 1280 },
  // X composites (large grids, dense charts) want a wider canvas to match
  // their live-docs desktop layout. Last-match-wins so this overrides the
  // broader product*/** width above.
  { test: 'docs/src/components/productX/**', viewportWidth: 1440 },

  // Composites whose Data Grid loads its rows asynchronously via `useDemoData`
  // — `aria-busy` only tracks fonts, not the grid data, so without this the
  // screenshot can capture the loading skeleton. The skeleton's cells carry
  // *both* `.MuiDataGrid-cell` and `.MuiDataGrid-cellSkeleton` (and its rows
  // both `.MuiDataGrid-row` and `.MuiDataGrid-rowSkeleton`), so a plain
  // `.MuiDataGrid-row .MuiDataGrid-cell` matches the skeleton too. Exclude
  // skeleton rows so the wait only resolves once real data has rendered. Rules
  // are last-match-wins, so each restates the X width from the rule above.
  {
    test: 'docs/src/components/productX/XHero',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
  {
    test: 'docs/src/components/productX/XGridFullDemo',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
  {
    test: 'docs/src/components/productX/XTheming',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
];

/**
 * A11y defaults to off — only matched-and-enabled rules produce results.
 * Slug-wide rules use `*`; brace-globs narrow enrolment to specific demos;
 * later opt-out rules disable individual demos.
 *
 * Initial PR scope: `buttons` only. Other components onboard incrementally.
 */
// TextField docs demos enrolled for axe assertions; the `select` dropdown,
// InputBase-only, and standalone hidden-label demos are excluded.
const TEXTFIELD_A11Y_DEMOS = [
  'BasicTextFields',
  'ColorTextFields',
  'ValidationTextFields',
  'FormPropsTextFields',
  'TextFieldSizes',
  'MultilineTextFields',
];

export const A11Y_RULES: A11yRule[] = [
  { test: 'docs/data/material/components/buttons/{BasicButtons,ColorButtons}', enabled: true },
  {
    test: `docs/data/material/components/text-fields/{${TEXTFIELD_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
    // color-contrast is recorded but not asserted (1.4.3): axe cannot resolve
    // the input value's background through the overlapping notched outline
    // (logged as incomplete), and the focused color labels (warning 3.11:1),
    // error text on the filled surface (4.36:1), and the ~0.42-opacity
    // placeholder (~2.6:1) are known shortfalls kept in the JSON without
    // failing CI.
    skipAssertions: ['color-contrast'],
  },
];

export interface ParsedRoute {
  path: string;
  slug: string;
  demo: string;
}

const COMPONENT_ROUTE_REGEX = /^\/docs-components-([^/]+)\/(.+)$/;
const COMPOSITE_ROUTE_REGEX = /^\/docs-product-([^/]+)\/(.+)$/;

/**
 * Map a VRT route to its docs path + slug + demo, or `null` for non-component
 * routes (regression fixtures).
 *
 * Recognises two route shapes:
 * - `/docs-components-{slug}/{Demo}` → `docs/data/material/components/{slug}/{Demo}`
 * - `/docs-product-{product}/{Name}` → `docs/src/components/product{Product}/{Name}`
 */
export function parseRoute(route: string): ParsedRoute | null {
  const componentMatch = route.match(COMPONENT_ROUTE_REGEX);
  if (componentMatch) {
    const [, slug, demo] = componentMatch;
    return { path: `docs/data/material/components/${slug}/${demo}`, slug, demo };
  }
  const compositeMatch = route.match(COMPOSITE_ROUTE_REGEX);
  if (compositeMatch) {
    const [, product, demo] = compositeMatch;
    // Re-capitalize the single-word product segment from `index.jsx`'s glob
    // (`material` → `Material`, `x` → `X`) to rebuild the directory name.
    const dir = `product${product.charAt(0).toUpperCase()}${product.slice(1)}`;
    return { path: `docs/src/components/${dir}/${demo}`, slug: product, demo };
  }
  return null;
}

/**
 * Walk a rule list back-to-front, return the last matching rule (or undefined).
 * Rules don't inherit from each other — every override must restate any field
 * it cares about. Defaults (`enabled` on/off when no rule matches) live at
 * the call site, not here.
 */
export function getConfig<T extends { test: string }>(
  rules: ReadonlyArray<T>,
  pathStr: string,
): T | undefined {
  for (let i = rules.length - 1; i >= 0; i -= 1) {
    if (minimatch(pathStr, rules[i].test)) {
      return rules[i];
    }
  }
  return undefined;
}
