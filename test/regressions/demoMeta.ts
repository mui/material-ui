/**
 * Per-tool VRT configuration as two independent rule arrays — one for
 * screenshots, one for axe — so editing one tool can never stomp on the
 * other. Each list is evaluated last-match-wins (no inheritance: an override
 * rule must restate every field it cares about) against the docs path
 * `docs/data/material/components/{slug}/{Demo}`.
 *
 * Whole-slug exclusions where *no* tool wants anything live in the
 * `index.jsx` glob — dropping them from the bundle entirely, not just from
 * the tools.
 */

import { minimatch } from 'minimatch';

export interface ScreenshotRule {
  /** Minimatch glob against `docs/data/material/components/{slug}/{Demo}`. */
  test: string;
  enabled?: boolean;
  /** Playwright waits for this selector after navigation, before axe + screenshot. */
  waitForSelector?: string;
}

export interface A11yRule {
  /** Minimatch glob against `docs/data/material/components/{slug}/{Demo}`. */
  test: string;
  enabled?: boolean;
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
];

/**
 * A11y defaults to off — only matched-and-enabled rules produce results.
 * Slug-wide rules use `*`; brace-globs narrow enrolment to specific demos;
 * later opt-out rules disable individual demos.
 *
 * Initial PR scope: `buttons` only. Other components onboard incrementally.
 */
export const A11Y_RULES: A11yRule[] = [
  { test: 'docs/data/material/components/buttons/{BasicButtons,ColorButtons}', enabled: true },
];

export interface ParsedRoute {
  path: string;
  slug: string;
  demo: string;
}

const ROUTE_REGEX = /^\/docs-components-([^/]+)\/(.+)$/;

/**
 * Map a VRT route to its docs path + slug + demo, or `null` for non-component
 * routes (regression fixtures).
 */
export function parseRoute(route: string): ParsedRoute | null {
  const match = route.match(ROUTE_REGEX);
  if (!match) {
    return null;
  }
  const [, slug, demo] = match;
  return { path: `docs/data/material/components/${slug}/${demo}`, slug, demo };
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
