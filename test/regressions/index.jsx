import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router';
import webfontloader from 'webfontloader';
import { Globals } from '@react-spring/web';
import TestViewer from './TestViewer';

// Skip charts annimation for screen shots
Globals.assign({
  skipAnimation: true,
});

window.muiFixture = {
  navigate: () => {
    throw new Error(`muiFixture.navigate is not ready`);
  },
};

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
const importDemos = import.meta.glob(
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

function FixtureRenderer({ component: FixtureComponent, path }) {
  React.useEffect(() => {
    const viewerRoot = document.getElementById('test-viewer');
    const testRoot = document.createElement('div');
    viewerRoot.appendChild(testRoot);
    const reactRoot = ReactDOMClient.createRoot(testRoot);
    React.startTransition(() => {
      reactRoot.render(
        <TestViewer path={path} FixtureComponent={FixtureComponent}>
          <FixtureComponent />
        </TestViewer>,
      );
    });

    return () => {
      setTimeout(() => {
        reactRoot.unmount();
      }, 0);

      viewerRoot.removeChild(testRoot);
    };
  }, [FixtureComponent, path]);

  return null;
}

FixtureRenderer.propTypes = {
  component: PropTypes.elementType,
  path: PropTypes.string.isRequired,
};

function useHash() {
  const subscribe = React.useCallback((callback) => {
    window.addEventListener('hashchange', callback);
    return () => {
      window.removeEventListener('hashchange', callback);
    };
  }, []);
  const getSnapshot = React.useCallback(() => window.location.hash, []);
  const getServerSnapshot = React.useCallback(() => '', []);
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function computeIsDev(hash) {
  if (hash === '#dev') {
    return true;
  }
  if (hash === '#no-dev') {
    return false;
  }
  return process.env.NODE_ENV === 'development';
}

function App(props) {
  const { fixtures } = props;

  const hash = useHash();
  const isDev = computeIsDev(hash);

  // Using <link rel="stylesheet" /> does not apply the google Roboto font in chromium headless/headfull.
  const [fontState, setFontState] = React.useState('pending');
  React.useEffect(() => {
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
        setFontState('active');
      },
      inactive: () => {
        setFontState('inactive');
      },
    });
  }, []);

  function computePath(fixture) {
    return `/${fixture.suite}/${fixture.name}`;
  }

  const navigate = useNavigate();
  React.useEffect(() => {
    window.muiFixture.navigate = navigate;
  }, [navigate]);

  return (
    <React.Fragment>
      {fontState === 'active' ? (
        <Routes>
          {fixtures.map((fixture) => {
            const path = computePath(fixture);
            const FixtureComponent = fixture.Component;
            if (FixtureComponent === undefined) {
              console.warn('Missing `Component` for ', fixture);
              return null;
            }

            return (
              <Route
                key={path}
                exact
                path={path}
                element={<FixtureRenderer component={FixtureComponent} path={path} />}
              />
            );
          })}
        </Routes>
      ) : null}

      {isDev ? (
        <div>
          <div data-webfontloader={fontState}>webfontloader: {fontState}</div>
          <p>
            Devtools can be enabled by appending <code>#dev</code> in the addressbar or disabled by
            appending <code>#no-dev</code>.
          </p>
          <a href="#no-dev">Hide devtools</a>
          <details>
            <summary id="my-test-summary">nav for all tests</summary>

            <nav id="tests">
              <ol>
                {fixtures.map((fixture) => {
                  const path = computePath(fixture);

                  return (
                    <li key={path}>
                      <Link to={path}>{path}</Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </details>
        </div>
      ) : null}
    </React.Fragment>
  );
}

App.propTypes = {
  fixtures: PropTypes.array,
};

const container = document.getElementById('react-root');
const children = (
  <Router>
    <App fixtures={regressionFixtures.concat(demoFixtures)} />
  </Router>
);
const reactRoot = ReactDOMClient.createRoot(container);
reactRoot.render(children);
