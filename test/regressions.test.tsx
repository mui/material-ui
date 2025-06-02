import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { beforeAll, test, beforeEach, afterEach } from 'vitest';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import webfontloader from 'webfontloader';
import TestViewer from './regressions/TestViewer';

const importRegressionFixtures: Record<string, () => Promise<React.ComponentType>> =
  import.meta.glob(['./fixtures/**/*.(js|ts|tsx)'], {
    import: 'default',
  });

const importDemos: Record<string, () => Promise<React.ComponentType>> = import.meta.glob(
  [
    'docs/data/**/[A-Z]*.js',
    'docs/data/base/**/[A-Z]*/css/index.js',
    'docs/data/base/**/[A-Z]*/tailwind/index.js',
    'docs/data/base/**/[A-Z]*/system/index.js',
    // ================== Exclusions ==================
    '!docs/data/experiments',
    '!docs/data/material/**/*NoSnap.*',
    // Template
    '!docs/data/material/getting-started/templates/blog/components',
    '!docs/data/material/getting-started/templates/checkout/components',
    '!docs/data/material/getting-started/templates/dashboard/components',
    '!docs/data/material/getting-started/templates/dashboard/internals/components',
    '!docs/data/material/getting-started/templates/dashboard/theme/customizations',
    '!docs/data/material/getting-started/templates/marketing-page/components',
    '!docs/data/material/getting-started/templates/marketing-page/MarketingPage',
    '!docs/data/material/getting-started/templates/shared-theme',
    '!docs/data/material/getting-started/templates/sign-in/components',
    '!docs/data/material/getting-started/templates/sign-in-side/components',
    '!docs/data/material/getting-started/templates/sign-up/components',
    // Marketing Page Theme Customizations
    '!docs/data/material/components/alert/TransitionAlerts', // Needs interaction
    '!docs/data/material/components/app-bar/BackToTop', // Needs interaction
    '!docs/data/material/components/app-bar/ElevateAppBar', // Needs interaction
    '!docs/data/material/components/app-bar/HideAppBar', // Needs interaction
    '!docs/data/material/components/app-bar/MenuAppBar', // Redundant
    '!docs/data/material/components/autocomplete/Asynchronous', // Redundant
    '!docs/data/material/components/autocomplete/CheckboxesTags', // Redundant
    '!docs/data/material/components/autocomplete/CountrySelect', // Redundant
    '!docs/data/material/components/autocomplete/DisabledOptions', // Redundant
    '!docs/data/material/components/autocomplete/Filter', // Redundant
    '!docs/data/material/components/autocomplete/FreeSolo', // Redundant
    '!docs/data/material/components/autocomplete/GoogleMaps', // Redundant
    '!docs/data/material/components/autocomplete/Grouped', // Redundant
    '!docs/data/material/components/autocomplete/Highlights', // Redundant
    '!docs/data/material/components/autocomplete/Playground', // Redundant
    '!docs/data/material/components/autocomplete/UseAutocomplete', // Redundant
    '!docs/data/material/components/autocomplete/Virtualize', // Redundant
    '!docs/data/material/components/backdrop/SimpleBackdrop', // Needs interaction
    '!docs/data/material/components/badges/BadgeAlignment', // Redux isolation
    '!docs/data/material/components/badges/BadgeVisibility', // Needs interaction
    '!docs/data/material/components/bottom-navigation/FixedBottomNavigation', // Redundant
    '!docs/data/material/components/breadcrumbs/ActiveLastBreadcrumb', // Redundant
    '!docs/data/material/components/chips/ChipsPlayground', // Redux isolation
    '!docs/data/material/components/click-away-listener', // Needs interaction
    '!docs/data/material/components/container', // Can't see the impact
    '!docs/data/material/components/dialogs', // Needs interaction
    '!docs/data/material/components/drawers/SwipeableEdgeDrawer', // Needs interaction
    '!docs/data/material/components/drawers/SwipeableTemporaryDrawer', // Needs interaction
    '!docs/data/material/components/drawers/TemporaryDrawer', // Needs interaction
    '!docs/data/material/components/floating-action-button/FloatingActionButtonZoom', // Needs interaction
    '!docs/data/material/components/grid-legacy/InteractiveGrid', // Redux isolation
    '!docs/data/material/components/grid-legacy/SpacingGrid', // Needs interaction
    '!docs/data/material/components/image-list', // Image don't load
    '!docs/data/material/components/masonry/ImageMasonry', // Image don't load
    '!docs/data/material/components/masonry/Sequential', // Flaky
    '!docs/data/material/components/material-icons/SearchIcons',
    '!docs/data/material/components/menus', // Need interaction
    '!docs/data/material/components/modal/BasicModal', // Needs interaction
    '!docs/data/material/components/modal/KeepMountedModal', // Needs interaction
    '!docs/data/material/components/modal/SpringModal', // Needs interaction
    '!docs/data/material/components/modal/TransitionsModal', // Needs interaction
    '!docs/data/material/components/no-ssr/FrameDeferring', // Needs interaction
    '!docs/data/material/components/popover/AnchorPlayground', // Redux isolation
    '!docs/data/material/components/popover/BasicPopover', // Needs interaction
    '!docs/data/material/components/popover/PopoverPopupState', // Needs interaction
    '!docs/data/material/components/popper/PopperPopupState', // Needs interaction
    '!docs/data/material/components/popper/PositionedPopper', // Needs interaction
    '!docs/data/material/components/popper/ScrollPlayground', // Redux isolation
    '!docs/data/material/components/popper/SimplePopper', // Needs interaction
    '!docs/data/material/components/popper/SpringPopper', // Needs interaction
    '!docs/data/material/components/popper/TransitionsPopper', // Needs interaction
    '!docs/data/material/components/popper/VirtualElementPopper', // Needs interaction
    '!docs/data/material/components/progress', // Flaky
    '!docs/data/material/components/selects/ControlledOpenSelect', // Needs interaction
    '!docs/data/material/components/selects/DialogSelect', // Needs interaction
    '!docs/data/material/components/selects/GroupedSelect', // Needs interaction
    '!docs/data/material/components/skeleton/Animations', // Animation disabled
    '!docs/data/material/components/skeleton/Facebook', // Flaky image loading
    '!docs/data/material/components/skeleton/SkeletonChildren', // flaky image loading
    '!docs/data/material/components/skeleton/YouTube', // Flaky image loading
    '!docs/data/material/components/snackbars/ConsecutiveSnackbars', // Needs interaction
    '!docs/data/material/components/snackbars/CustomizedSnackbars', // Redundant
    '!docs/data/material/components/snackbars/DirectionSnackbar', // Needs interaction
    '!docs/data/material/components/snackbars/FabIntegrationSnackbar', // Needs interaction
    '!docs/data/material/components/snackbars/IntegrationNotistack', // Needs interaction
    '!docs/data/material/components/snackbars/PositionedSnackbar', // Needs interaction
    '!docs/data/material/components/snackbars/SimpleSnackbar', // Needs interaction
    '!docs/data/material/components/snackbars/TransitionsSnackbar', // Needs interaction
    '!docs/data/material/components/speed-dial', // Needs interaction
    '!docs/data/material/components/stack/InteractiveStack', // Redundant
    '!docs/data/material/components/steppers/HorizontalNonLinearStepper', // Redundant
    '!docs/data/material/components/steppers/TextMobileStepper', // Flaky image loading
    '!docs/data/material/components/tabs/AccessibleTabs1', // Need interaction
    '!docs/data/material/components/tabs/AccessibleTabs2', // Need interaction
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
    '!docs/data/joy/components/circular-progress/CircularProgressCountUp', // Flaky due to animation
    '!docs/data/joy/components/divider/DividerChildPosition', // Needs interaction
    '!docs/data/joy/components/linear-progress/LinearProgressCountUp', // Flaky due to animation
    '!docs/data/joy/customization/theme-typography/TypographyThemeViewer', // No need for theme tokens
    '!docs/data/joy/getting-started/templates/TemplateCollection', // No public components
    '!docs/data/joy/**/*Variables.*',
    '!docs/data/joy/**/*Usage.*',
    '!docs/data/premium-themes',
  ],
  {
    import: 'default',
  },
);

beforeAll(async () => {
  await new Promise<void>((resolve, reject) => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Inter:300,400,500,600,700,800,900', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:n9'],
        urls: ['https://use.fontawesome.com/releases/v5.14.0/css/all.css'],
      },
      timeout: 20000,
      active: () => {
        resolve();
      },
      inactive: () => {
        reject(new Error('Font loading failed'));
      },
    });
  });
});

// Problem with fg-loadcss using `typeof global !== "undefined" ? global : this` to obtain the `window`
// See https://github.com/filamentgroup/loadCSS/blob/e2fa3939a641ae0501854d15f15443fe4d017c58/src/loadCSS.js#L88
// Remove when `fg-loadcss` no loner appears in Examples
globalThis.global = window;

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = ReactDOM.createRoot(container);
});

afterEach(() => {
  root.unmount();
  document.body.removeChild(container);
  container = null;
});

test.for(Object.entries({ ...importRegressionFixtures, ...importDemos }))(
  'Screenshot test fixture %s',
  async ([path, mod]) => {
    const Component = await mod();
    await root.render(
      <TestViewer path={path.startsWith('../docs/data/joy/') ? '/docs-joy' : '/'}>
        <Component />
      </TestViewer>,
    );
    await page.getByTestId('testcase');
    await page.screenshot();
  },
);
