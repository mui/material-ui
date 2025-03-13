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
const importRegressionFixtures = require.context('./fixtures', true, /\.(js|ts|tsx)$/, 'lazy');
const regressionFixtures = [];
importRegressionFixtures.keys().forEach((path) => {
  const [suite, name] = path
    .replace('./', '')
    .replace(/\.\w+$/, '')
    .split('/');

  // TODO: Why does webpack include a key for the absolute and relative path?
  // We just want the relative path
  if (path.startsWith('./')) {
    regressionFixtures.push({
      path,
      suite: `regression-${suite}`,
      name,
      Component: React.lazy(() => importRegressionFixtures(path)),
    });
  }
}, []);

const blacklist = [
  // Excludes demos that we don't want
  /^docs-(.*)(?<=NoSnap)\.png$/,
  // Template
  'docs-getting-started-templates-blog-components',
  'docs-getting-started-templates-checkout-components',
  'docs-getting-started-templates-dashboard-components',
  'docs-getting-started-templates-dashboard-internals-components',
  'docs-getting-started-templates-dashboard-theme-customizations',
  'docs-getting-started-templates-marketing-page-components',
  'docs-getting-started-templates-shared-theme',
  'docs-getting-started-templates-sign-in-components',
  'docs-getting-started-templates-sign-in-side-components',
  'docs-getting-started-templates-sign-up-components',
  // Checkout Theme Customizations
  // Marketing Page Theme Customizations
  'docs-base-getting-started-quickstart/BaseButtonTailwind.png', // CodeSandbox
  'docs-base-guides-working-with-tailwind-css/PlayerFinal.png', // No public components
  'docs-components-alert/TransitionAlerts.png', // Needs interaction
  'docs-components-app-bar/BackToTop.png', // Needs interaction
  'docs-components-app-bar/ElevateAppBar.png', // Needs interaction
  'docs-components-app-bar/HideAppBar.png', // Needs interaction
  'docs-components-app-bar/MenuAppBar.png', // Redundant
  'docs-components-autocomplete/Asynchronous.png', // Redundant
  'docs-components-autocomplete/CheckboxesTags.png', // Redundant
  'docs-components-autocomplete/CountrySelect.png', // Redundant
  'docs-components-autocomplete/DisabledOptions.png', // Redundant
  'docs-components-autocomplete/Filter.png', // Redundant
  'docs-components-autocomplete/FreeSolo.png', // Redundant
  'docs-components-autocomplete/GoogleMaps.png', // Redundant
  'docs-components-autocomplete/Grouped.png', // Redundant
  'docs-components-autocomplete/Highlights.png', // Redundant
  'docs-components-autocomplete/Playground.png', // Redundant
  'docs-components-autocomplete/UseAutocomplete.png', // Redundant
  'docs-components-autocomplete/Virtualize.png', // Redundant
  'docs-components-backdrop/SimpleBackdrop.png', // Needs interaction
  'docs-components-badges/BadgeAlignment.png', // Redux isolation
  'docs-components-badges/BadgeVisibility.png', // Needs interaction
  'docs-components-bottom-navigation/FixedBottomNavigation.png', // Redundant
  'docs-components-breadcrumbs/ActiveLastBreadcrumb.png', // Redundant
  'docs-components-chips/ChipsPlayground.png', // Redux isolation
  'docs-components-click-away-listener', // Needs interaction
  'docs-components-container', // Can't see the impact
  'docs-components-dialogs', // Needs interaction
  'docs-components-drawers/SwipeableEdgeDrawer.png', // Needs interaction
  'docs-components-drawers/SwipeableTemporaryDrawer.png', // Needs interaction
  'docs-components-drawers/TemporaryDrawer.png', // Needs interaction
  'docs-components-floating-action-button/FloatingActionButtonZoom.png', // Needs interaction
  'docs-components-grid-legacy/InteractiveGrid.png', // Redux isolation
  'docs-components-grid-legacy/SpacingGrid.png', // Needs interaction
  'docs-components-image-list', // Image don't load
  'docs-components-masonry/ImageMasonry.png', // Image don't load
  'docs-components-menus', // Need interaction
  'docs-components-modal/BasicModal.png', // Needs interaction
  'docs-components-modal/KeepMountedModal.png', // Needs interaction
  'docs-components-modal/SpringModal.png', // Needs interaction
  'docs-components-modal/TransitionsModal.png', // Needs interaction
  'docs-components-no-ssr/FrameDeferring.png', // Needs interaction
  'docs-components-popover/AnchorPlayground.png', // Redux isolation
  'docs-components-popover/BasicPopover.png', // Needs interaction
  'docs-components-popover/PopoverPopupState.png', // Needs interaction
  'docs-components-popper/PopperPopupState.png', // Needs interaction
  'docs-components-popper/PositionedPopper.png', // Needs interaction
  'docs-components-popper/ScrollPlayground.png', // Redux isolation
  'docs-components-popper/SimplePopper.png', // Needs interaction
  'docs-components-popper/SpringPopper.png', // Needs interaction
  'docs-components-popper/TransitionsPopper.png', // Needs interaction
  'docs-components-popper/VirtualElementPopper.png', // Needs interaction
  'docs-components-progress', // Flaky
  'docs-components-selects/ControlledOpenSelect.png', // Needs interaction
  'docs-components-selects/DialogSelect.png', // Needs interaction
  'docs-components-selects/GroupedSelect.png', // Needs interaction
  'docs-components-skeleton/Animations.png', // Animation disabled
  'docs-components-skeleton/Facebook.png', // Flaky image loading
  'docs-components-skeleton/SkeletonChildren.png', // flaky image loading
  'docs-components-skeleton/YouTube.png', // Flaky image loading
  'docs-components-snackbars/ConsecutiveSnackbars.png', // Needs interaction
  'docs-components-snackbars/CustomizedSnackbars.png', // Redundant
  'docs-components-snackbars/DirectionSnackbar.png', // Needs interaction
  'docs-components-snackbars/FabIntegrationSnackbar.png', // Needs interaction
  'docs-components-snackbars/IntegrationNotistack.png', // Needs interaction
  'docs-components-snackbars/PositionedSnackbar.png', // Needs interaction
  'docs-components-snackbars/SimpleSnackbar.png', // Needs interaction
  'docs-components-snackbars/TransitionsSnackbar.png', // Needs interaction
  'docs-components-speed-dial', // Needs interaction
  'docs-components-stack/InteractiveStack.png', // Redundant
  'docs-components-steppers/HorizontalNonLinearStepper.png', // Redundant
  'docs-components-steppers/TextMobileStepper.png', // Flaky image loading
  'docs-components-tabs/AccessibleTabs1.png', // Need interaction
  'docs-components-tabs/AccessibleTabs2.png', // Need interaction
  'docs-components-textarea-autosize', // Superseded by a dedicated regression test
  'docs-components-tooltips', // Needs interaction
  'docs-components-transitions', // Needs interaction
  'docs-components-use-media-query', // Need to dynamically resize to test
  'docs-customization-breakpoints', // Need to dynamically resize to test
  'docs-customization-color', // Escape viewport
  'docs-customization-container-queries/ResizableDemo.png', // No public components
  'docs-customization-default-theme', // Redux isolation
  'docs-customization-density/DensityTool.png', // Redux isolation
  'docs-customization-right-to-left/RtlDemo.png',
  'docs-customization-transitions/TransitionHover.png', // Need interaction
  'docs-customization-typography/ResponsiveFontSizesChart.png',
  'docs-getting-started-supported-components/MaterialUIComponents.png', // No public components
  'docs-getting-started-templates-marketing-page/MarketingPage.png',
  'docs-joy-components-circular-progress/CircularProgressCountUp.png', // Flaky due to animation
  'docs-joy-components-divider/DividerChildPosition.png', // Needs interaction
  'docs-joy-components-linear-progress/LinearProgressCountUp.png', // Flaky due to animation
  'docs-joy-customization-theme-typography/TypographyThemeViewer.png', // No need for theme tokens
  'docs-joy-getting-started-templates/TemplateCollection.png', // No public components
  'docs-styles-advanced', // Redundant
  'docs-styles-basics/StressTest.png', // Need interaction
  /^docs-guides-.*/, // No public components
];

const unusedBlacklistPatterns = new Set(blacklist);

function excludeDemoFixture(suite, name) {
  if (/^docs-premium-themes(.*)/.test(suite)) {
    return true;
  }

  // Exclude files that are not images and are not PascalCase
  // Tantamount to skipping JS/TS files that are not React components or "index.js" files
  // PascalCase starts with a capital letter and has zero or more capital letters in the middle
  if (!suite.endsWith('.png') && name !== 'index' && !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
    return true;
  }

  if (suite.includes('docs-joy') && name.match(/(Variables|Usage)$/)) {
    return true;
  }

  return blacklist.some((pattern) => {
    if (typeof pattern === 'string') {
      if (pattern === suite) {
        unusedBlacklistPatterns.delete(pattern);

        return true;
      }
      if (pattern === `${suite}/${name}.png`) {
        unusedBlacklistPatterns.delete(pattern);

        return true;
      }

      return false;
    }

    // assume regex
    if (pattern.test(`${suite}/${name}.png`)) {
      unusedBlacklistPatterns.delete(pattern);
      return true;
    }
    return false;
  });
}

// Also use some of the demos to avoid code duplication.
const importDemos = require.context('docs/data', true, /(?<!pagesApi)\.js$/, 'lazy');
const demoFixtures = [];
importDemos.keys().forEach((path) => {
  const [name, ...suiteArray] = path.replace('./', '').replace('.js', '').split('/').reverse();
  const suite = `docs-${suiteArray
    .reverse()
    .join('-')
    .replace(/^material-/, '')}`;

  // TODO: Why does webpack include a key for the absolute and relative path?
  // We just want the relative path
  if (path.startsWith('./') && !excludeDemoFixture(suite, name)) {
    demoFixtures.push({
      path,
      suite,
      name,
      Component: React.lazy(() => importDemos(path)),
    });
  }
}, []);

if (unusedBlacklistPatterns.size > 0) {
  console.warn(
    `The following patterns are unused:\n\n${Array.from(unusedBlacklistPatterns)
      .map((pattern) => `- ${pattern}`)
      .join('\n')}`,
  );
}

const viewerRoot = document.getElementById('test-viewer');

function FixtureRenderer({ component: FixtureComponent, path }) {
  const viewerReactRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const renderTimeout = setTimeout(() => {
      const children = (
        <TestViewer path={path}>
          <FixtureComponent />
        </TestViewer>
      );

      if (viewerReactRoot.current === null) {
        viewerReactRoot.current = ReactDOMClient.createRoot(viewerRoot);
      }

      viewerReactRoot.current.render(children);
    });

    return () => {
      clearTimeout(renderTimeout);
      setTimeout(() => {
        viewerReactRoot.current.unmount();
        viewerReactRoot.current = null;
      });
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

  const fixturePrepared = fontState !== 'pending';

  function computePath(fixture) {
    return `/${fixture.suite}/${fixture.name}`;
  }

  const navigate = useNavigate();
  React.useEffect(() => {
    window.muiFixture.navigate = navigate;
  }, [navigate]);

  return (
    <React.Fragment>
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
              element={
                fixturePrepared ? (
                  <FixtureRenderer component={FixtureComponent} path={path} />
                ) : null
              }
            />
          );
        })}
      </Routes>

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
    <App fixtures={regressionFixtures.concat(demoFixtures)} />{' '}
  </Router>
);
const reactRoot = ReactDOMClient.createRoot(container);
reactRoot.render(children);
