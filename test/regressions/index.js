import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import webfontloader from 'webfontloader';
import TestViewer from './TestViewer';

// Get all the fixtures specifically written for preventing visual regressions.
const requireRegressionFixtures = require.context('./fixtures', true, /\.(js|ts|tsx)$/);
const regressionFixtures = [];
requireRegressionFixtures.keys().forEach((path) => {
  const [suite, name] = path
    .replace('./', '')
    .replace(/\.\w+$/, '')
    .split('/');

  regressionFixtures.push({
    path,
    suite: `regression-${suite}`,
    name,
    Component: requireRegressionFixtures(path).default,
  });
}, []);

const blacklist = [
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
  'docs-components-date-picker/CustomInput.png', // Redundant
  'docs-components-date-picker/LocalizedDatePicker.png', // Redundant
  'docs-components-date-picker/ResponsiveDatePickers.png', // Redundant
  'docs-components-date-picker/ServerRequestDatePicker.png', // Redundant
  'docs-components-date-picker/ViewsDatePicker.png', // Redundant
  'docs-components-date-range-picker/CalendarsDateRangePicker.png', // Redundant
  'docs-components-date-range-picker/CustomDateRangeInputs.png', // Redundant
  'docs-components-date-range-picker/MinMaxDateRangePicker.png', // Redundant
  'docs-components-date-range-picker/ResponsiveDateRangePicker.png', // Redundant
  'docs-components-date-time-picker/BasicDateTimePicker.png', // Redundant
  'docs-components-date-time-picker/ResponsiveDateTimePickers.png', // Redundant
  'docs-components-dialogs', // Needs interaction
  'docs-components-drawers/SwipeableEdgeDrawer.png', // Needs interaction
  'docs-components-drawers/SwipeableTemporaryDrawer.png', // Needs interaction
  'docs-components-drawers/TemporaryDrawer.png', // Needs interaction
  'docs-components-floating-action-button/FloatingActionButtonZoom.png', // Needs interaction
  'docs-components-grid/InteractiveGrid.png', // Redux isolation
  'docs-components-grid/SpacingGrid.png', // Needs interaction
  'docs-components-hidden', // Need to dynamically resize to test
  'docs-components-icons/FontAwesomeIconSize.png', // Relies on cascading network requests
  'docs-components-image-list', // Image don't load
  'docs-components-material-icons/synonyms.png', // No component
  'docs-components-menus', // Need interaction
  'docs-components-modal/KeepMountedModal.png', // Needs interaction
  'docs-components-modal/BasicModal.png', // Needs interaction
  'docs-components-modal/SpringModal.png', // Needs interaction
  'docs-components-modal/TransitionsModal.png', // Needs interaction
  'docs-components-no-ssr/FrameDeferring.png', // Needs interaction
  'docs-components-popover/AnchorPlayground.png', // Redux isolation
  'docs-components-popover/MouseOverPopover.png', // Needs interaction
  'docs-components-popover/PopoverPopupState.png', // Needs interaction
  'docs-components-popover/BasicPopover.png', // Needs interaction
  'docs-components-popper/PopperPopupState.png', // Needs interaction
  'docs-components-popper/PositionedPopper.png', // Needs interaction
  'docs-components-popper/ScrollPlayground.png', // Redux isolation
  'docs-components-popper/SimplePopper.png', // Needs interaction
  'docs-components-popper/SpringPopper.png', // Needs interaction
  'docs-components-popper/TransitionsPopper.png', // Needs interaction
  'docs-components-popper/VirtualElementPopper.png', // Needs interaction
  'docs-components-portal/SimplePortal.png', // Needs interaction
  'docs-components-progress', // Flaky
  'docs-components-selects/ControlledOpenSelect.png', // Needs interaction
  'docs-components-selects/DialogSelect.png', // Needs interaction
  'docs-components-selects/GroupedSelect.png', // Needs interaction
  'docs-components-skeleton/Animations.png', // Animation disabled
  'docs-components-skeleton/Facebook.png', // Flaky image loading
  'docs-components-skeleton/SkeletonChildren.png', // flaky image loading
  'docs-components-skeleton/YouTube.png', // Flaky image loading
  'docs-components-slider/VerticalAccessibleSlider.png', // Redundant
  'docs-components-snackbars/ConsecutiveSnackbars.png', // Needs interaction
  'docs-components-snackbars/CustomizedSnackbars.png', // Redundant
  'docs-components-snackbars/DirectionSnackbar.png', // Needs interaction
  'docs-components-snackbars/FabIntegrationSnackbar.png', // Needs interaction
  'docs-components-snackbars/IntegrationNotistack.png', // Needs interaction
  'docs-components-snackbars/PositionedSnackbar.png', // Needs interaction
  'docs-components-snackbars/SimpleSnackbar.png', // Needs interaction
  'docs-components-snackbars/TransitionsSnackbar.png', // Needs interaction
  'docs-components-speed-dial', // Needs interaction
  'docs-components-steppers/HorizontalNonLinearStepper.png', // Redundant
  'docs-components-steppers/SwipeableTextMobileStepper.png', // Flaky image loading
  'docs-components-steppers/TextMobileStepper.png', // Flaky image loading
  'docs-components-tabs/AccessibleTabs1.png', // Need interaction
  'docs-components-tabs/AccessibleTabs2.png', // Need interaction
  'docs-components-textarea-autosize', // Superseded by a dedicated regression test
  'docs-components-time-picker/LocalizedTimePicker.png', // Redundant
  'docs-components-time-picker/ResponsiveTimePickers.png', // Redundant
  'docs-components-tooltips', // Needs interaction
  'docs-components-transitions', // Needs interaction
  'docs-components-trap-focus', // Need interaction
  'docs-components-tree-view/ControlledTreeView.png', // Redundant
  'docs-components-tree-view/CustomizedTreeView.png', // Flaky
  'docs-components-tree-view/IconExpansionTreeView.png', // Need interaction
  'docs-components-tree-view/MultiSelectTreeView.png', // Need interaction
  'docs-components-use-media-query', // Need to dynamically resize to test
  'docs-customization-breakpoints', // Need to dynamically resize to test
  'docs-customization-color', // Escape viewport
  'docs-customization-default-theme', // Redux isolation
  'docs-customization-density/DensityTool.png', // Redux isolation
  'docs-customization-transitions/TransitionHover.png', // Need interaction
  'docs-customization-typography/ResponsiveFontSizesChart.png',
  'docs-discover-more-languages', // No public components
  'docs-discover-more-showcase', // No public components
  'docs-discover-more-team', // No public components
  'docs-getting-started-templates-album/Album.png', // Flaky image loading
  'docs-getting-started-templates-blog', // Flaky random images
  'docs-getting-started-templates-checkout/AddressForm.png', // Already tested in docs-getting-started-templates-checkout/Checkout
  'docs-getting-started-templates-checkout/PaymentForm.png', // Already tested in docs-getting-started-templates-checkout/Checkout
  'docs-getting-started-templates-checkout/Review.png', // Already tested in docs-getting-started-templates-checkout/Checkout
  'docs-getting-started-templates-dashboard/Chart.png', // Already tested in docs-getting-started-templates-dashboard/Dashboard
  'docs-getting-started-templates-dashboard/Deposits.png', // Already tested in docs-getting-started-templates-dashboard/Dashboard
  'docs-getting-started-templates-dashboard/listItems.png', // nothing to test
  'docs-getting-started-templates-dashboard/Orders.png', // Already tested in docs-getting-started-templates-dashboard/Dashboard
  'docs-getting-started-templates-dashboard/Title.png', // Already tested in docs-getting-started-templates-dashboard/Dashboard
  'docs-getting-started-templates-sign-in-side/SignInSide.png', // Flaky
  'docs-getting-started-templates', // No public components
  'docs-getting-started-usage/Usage.png', // No public components
  'docs-landing', // Mostly images, redundant
  'docs-production-error', // No components, page for DX
  'docs-styles-advanced', // Redudant
  'docs-styles-basics/StressTest.png', // Need interaction
  'docs-system-basics/BreakpointsAsArray.png', // Unit tests are enough
  'docs-system-basics/BreakpointsAsObject.png', // Unit tests are enough
  'docs-system-basics/ValueAsFunction.png', // Unit tests are enough
  'docs-system-borders', // Unit tests are enough
  'docs-system-display', // Unit tests are enough
  'docs-system-flexbox', // Unit tests are enough
  'docs-system-palette', // Unit tests are enough
  'docs-system-positions', // Unit tests are enough
  'docs-system-shadows', // Unit tests are enough
  'docs-system-sizing', // Unit tests are enough
  'docs-system-spacing', // Unit tests are enough
  'docs-system-typography', // Unit tests are enough
  'docs-versions', // No public components
  /^docs-guides-.*/, // No public components
];

const unusedBlacklistPatterns = new Set(blacklist);

function excludeDemoFixture(suite, name) {
  if (/^docs-premium-themes(.*)/.test(suite)) {
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
    if (pattern.test(suite)) {
      unusedBlacklistPatterns.delete(pattern);
      return true;
    }
    return false;
  });
}

// Also use some of the demos to avoid code duplication.
const requireDemos = require.context('docs/src/pages', true, /js$/);
const demoFixtures = [];
requireDemos.keys().forEach((path) => {
  const [name, ...suiteArray] = path.replace('./', '').replace('.js', '').split('/').reverse();
  const suite = `docs-${suiteArray.reverse().join('-')}`;

  if (!excludeDemoFixture(suite, name)) {
    demoFixtures.push({
      path,
      suite,
      name,
      Component: requireDemos(path).default,
    });
  }
}, []);

const fixtures = regressionFixtures.concat(demoFixtures);

if (unusedBlacklistPatterns.size > 0) {
  console.warn(
    `The following patterns are unused:\n\n${Array.from(unusedBlacklistPatterns)
      .map((pattern) => `- ${pattern}`)
      .join('\n')}`,
  );
}

function App() {
  function computeIsDev() {
    if (window.location.hash === '#dev') {
      return true;
    }
    if (window.location.hash === '#no-dev') {
      return false;
    }
    return process.env.NODE_ENV === 'development';
  }
  const [isDev, setDev] = React.useState(computeIsDev);
  React.useEffect(() => {
    function handleHashChange() {
      setDev(computeIsDev());
    }
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Using <link rel="stylesheet" /> does not apply the google Roboto font in chromium headless/headfull.
  const [fontState, setFontState] = React.useState('pending');
  React.useEffect(() => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:n9'],
        urls: ['https://use.fontawesome.com/releases/v5.1.0/css/all.css'],
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

  return (
    <Router>
      <Switch>
        {fixtures.map((fixture) => {
          const path = computePath(fixture);
          const FixtureComponent = fixture.Component;
          if (FixtureComponent === undefined) {
            console.warn('Missing `Component` for ', fixture);
            return null;
          }

          return (
            <Route key={path} exact path={path}>
              {fixturePrepared && (
                <TestViewer>
                  <FixtureComponent />
                </TestViewer>
              )}
            </Route>
          );
        })}
      </Switch>
      <div hidden={!isDev}>
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
    </Router>
  );
}

const container = document.getElementById('react-root');
const children = <App />;
if (typeof ReactDOM.unstable_createRoot === 'function') {
  const root = ReactDOM.unstable_createRoot(container);
  root.render(children);
} else {
  ReactDOM.render(children, container);
}
