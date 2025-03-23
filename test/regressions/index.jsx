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
    '../../docs/data/**/[A-Z]*.js',
    '!**/*.d.ts',
    '!**.preview',
    '!**/.eslintrc.js',
    '!**/pages.ts',
    '!**/pagesApi.js',
    '!../../docs/data/experiments/**',
    '!**/*NoSnap*',
    // Template
    '!**/docs-getting-started-templates-blog-components',
    '!**/docs-getting-started-templates-checkout-components',
    '!**/docs-getting-started-templates-dashboard-components',
    '!**/docs-getting-started-templates-dashboard-internals-components',
    '!**/docs-getting-started-templates-dashboard-theme-customizations',
    '!**/docs-getting-started-templates-marketing-page-components',
    '!**/docs-getting-started-templates-shared-theme',
    '!**/docs-getting-started-templates-sign-in-components',
    '!**/docs-getting-started-templates-sign-in-side-components',
    '!**/docs-getting-started-templates-sign-up-components',
    // Checkout Theme Customizations
    // Marketing Page Theme Customizations
    '!**/docs-base-getting-started-quickstart/BaseButtonTailwind.*', // CodeSandbox
    '!**/docs-base-guides-working-with-tailwind-css/PlayerFinal.*', // No public components
    '!**/docs-components-alert/TransitionAlerts.*', // Needs interaction
    '!**/docs-components-app-bar/BackToTop.*', // Needs interaction
    '!**/docs-components-app-bar/ElevateAppBar.*', // Needs interaction
    '!**/docs-components-app-bar/HideAppBar.*', // Needs interaction
    '!**/docs-components-app-bar/MenuAppBar.*', // Redundant
    '!**/docs-components-autocomplete/Asynchronous.*', // Redundant
    '!**/docs-components-autocomplete/CheckboxesTags.*', // Redundant
    '!**/docs-components-autocomplete/CountrySelect.*', // Redundant
    '!**/docs-components-autocomplete/DisabledOptions.*', // Redundant
    '!**/docs-components-autocomplete/Filter.*', // Redundant
    '!**/docs-components-autocomplete/FreeSolo.*', // Redundant
    '!**/docs-components-autocomplete/GoogleMaps.*', // Redundant
    '!**/docs-components-autocomplete/Grouped.*', // Redundant
    '!**/docs-components-autocomplete/Highlights.*', // Redundant
    '!**/docs-components-autocomplete/Playground.*', // Redundant
    '!**/docs-components-autocomplete/UseAutocomplete.*', // Redundant
    '!**/docs-components-autocomplete/Virtualize.*', // Redundant
    '!**/docs-components-backdrop/SimpleBackdrop.*', // Needs interaction
    '!**/docs-components-badges/BadgeAlignment.*', // Redux isolation
    '!**/docs-components-badges/BadgeVisibility.*', // Needs interaction
    '!**/docs-components-bottom-navigation/FixedBottomNavigation.*', // Redundant
    '!**/docs-components-breadcrumbs/ActiveLastBreadcrumb.*', // Redundant
    '!**/docs-components-chips/ChipsPlayground.*', // Redux isolation
    '!**/docs-components-click-away-listener', // Needs interaction
    '!**/docs-components-container', // Can't see the impact
    '!**/docs-components-dialogs', // Needs interaction
    '!**/docs-components-drawers/SwipeableEdgeDrawer.*', // Needs interaction
    '!**/docs-components-drawers/SwipeableTemporaryDrawer.*', // Needs interaction
    '!**/docs-components-drawers/TemporaryDrawer.*', // Needs interaction
    '!**/docs-components-floating-action-button/FloatingActionButtonZoom.*', // Needs interaction
    '!**/docs-components-grid-legacy/InteractiveGrid.*', // Redux isolation
    '!**/docs-components-grid-legacy/SpacingGrid.*', // Needs interaction
    '!**/docs-components-image-list', // Image don't load
    '!**/docs-components-masonry/ImageMasonry.*', // Image don't load
    '!**/docs-components-menus', // Need interaction
    '!**/docs-components-modal/BasicModal.*', // Needs interaction
    '!**/docs-components-modal/KeepMountedModal.*', // Needs interaction
    '!**/docs-components-modal/SpringModal.*', // Needs interaction
    '!**/docs-components-modal/TransitionsModal.*', // Needs interaction
    '!**/docs-components-no-ssr/FrameDeferring.*', // Needs interaction
    '!**/docs-components-popover/AnchorPlayground.*', // Redux isolation
    '!**/docs-components-popover/BasicPopover.*', // Needs interaction
    '!**/docs-components-popover/PopoverPopupState.*', // Needs interaction
    '!**/docs-components-popper/PopperPopupState.*', // Needs interaction
    '!**/docs-components-popper/PositionedPopper.*', // Needs interaction
    '!**/docs-components-popper/ScrollPlayground.*', // Redux isolation
    '!**/docs-components-popper/SimplePopper.*', // Needs interaction
    '!**/docs-components-popper/SpringPopper.*', // Needs interaction
    '!**/docs-components-popper/TransitionsPopper.*', // Needs interaction
    '!**/docs-components-popper/VirtualElementPopper.*', // Needs interaction
    '!**/docs-components-progress', // Flaky
    '!**/docs-components-selects/ControlledOpenSelect.*', // Needs interaction
    '!**/docs-components-selects/DialogSelect.*', // Needs interaction
    '!**/docs-components-selects/GroupedSelect.*', // Needs interaction
    '!**/docs-components-skeleton/Animations.*', // Animation disabled
    '!**/docs-components-skeleton/Facebook.*', // Flaky image loading
    '!**/docs-components-skeleton/SkeletonChildren.*', // flaky image loading
    '!**/docs-components-skeleton/YouTube.*', // Flaky image loading
    '!**/docs-components-snackbars/ConsecutiveSnackbars.*', // Needs interaction
    '!**/docs-components-snackbars/CustomizedSnackbars.*', // Redundant
    '!**/docs-components-snackbars/DirectionSnackbar.*', // Needs interaction
    '!**/docs-components-snackbars/FabIntegrationSnackbar.*', // Needs interaction
    '!**/docs-components-snackbars/IntegrationNotistack.*', // Needs interaction
    '!**/docs-components-snackbars/PositionedSnackbar.*', // Needs interaction
    '!**/docs-components-snackbars/SimpleSnackbar.*', // Needs interaction
    '!**/docs-components-snackbars/TransitionsSnackbar.*', // Needs interaction
    '!**/docs-components-speed-dial', // Needs interaction
    '!**/docs-components-stack/InteractiveStack.*', // Redundant
    '!**/docs-components-steppers/HorizontalNonLinearStepper.*', // Redundant
    '!**/docs-components-steppers/TextMobileStepper.*', // Flaky image loading
    '!**/docs-components-tabs/AccessibleTabs1.*', // Need interaction
    '!**/docs-components-tabs/AccessibleTabs2.*', // Need interaction
    '!**/docs-components-textarea-autosize', // Superseded by a dedicated regression test
    '!**/docs-components-tooltips', // Needs interaction
    '!**/docs-components-transitions', // Needs interaction
    '!**/docs-components-use-media-query', // Need to dynamically resize to test
    '!**/docs-customization-breakpoints', // Need to dynamically resize to test
    '!**/docs-customization-color', // Escape viewport
    '!**/docs-customization-container-queries/ResizableDemo.*', // No public components
    '!**/docs-customization-default-theme', // Redux isolation
    '!**/docs-customization-density/DensityTool.*', // Redux isolation
    '!**/docs-customization-right-to-left/RtlDemo.*',
    '!**/docs-customization-transitions/TransitionHover.*', // Need interaction
    '!**/docs-customization-typography/ResponsiveFontSizesChart.*',
    '!**/docs-getting-started-supported-components/MaterialUIComponents.*', // No public components
    '!**/docs-getting-started-templates-marketing-page/MarketingPage.*',
    '!**/docs-joy-components-circular-progress/CircularProgressCountUp.*', // Flaky due to animation
    '!**/docs-joy-components-divider/DividerChildPosition.*', // Needs interaction
    '!**/docs-joy-components-linear-progress/LinearProgressCountUp.*', // Flaky due to animation
    '!**/docs-joy-customization-theme-typography/TypographyThemeViewer.*', // No need for theme tokens
    '!**/docs-joy-getting-started-templates/TemplateCollection.*', // No public components
    '!**/docs-styles-advanced', // Redundant
    '!**/docs-styles-basics/StressTest.*', // Need interaction
    '!**/**/docs-guides/**',
    '!**/docs-premium-themes/**',
    '!**/docs-joy/**/Variables',
    '!**/docs-joy/**/Usage',
    // '!**/SearchIcons.js',
    '!**/getting-started/**',
    // '!**/material-icons/SearchIcons.js',
  ],
  {
    import: 'default',
    eager: true,
  },
);

const demoFixtures = [];
Object.keys(importDemos).forEach((path) => {
  const [name, ...suiteArray] = path
    .replace('./docs/data/', '')
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
