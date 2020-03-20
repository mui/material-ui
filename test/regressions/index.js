import React from 'react';
import ReactDOM from 'react-dom';
import vrtest from 'vrtest-mui/client';
import webfontloader from 'webfontloader';
import TestViewer from './TestViewer';

// Get all the tests specifically written for preventing regressions.
const requireRegression = require.context('./tests', true, /js$/);
const regressions = requireRegression.keys().reduce((res, path) => {
  const [suite, name] = path
    .replace('./', '')
    .replace('.js', '')
    .split('/');
  res.push({
    path,
    suite: `regression-${suite}`,
    name,
    case: requireRegression(path).default,
  });
  return res;
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
  'docs-components-breadcrumbs/ActiveLastBreadcrumb.png', // Redundant
  'docs-components-buttons/ButtonBases.png', // Useless
  'docs-components-buttons/FloatingActionButtonZoom.png', // Needs interaction
  'docs-components-chips/ChipsPlayground.png', // Redux isolation
  'docs-components-click-away-listener', // Needs interaction
  'docs-components-container',
  'docs-components-dialogs', // Needs interaction
  'docs-components-drawers/SwipeableTemporaryDrawer.png', // Needs interaction
  'docs-components-drawers/TemporaryDrawer.png', // Needs interaction
  'docs-components-grid-list',
  'docs-components-grid-list/tileData.png', // No component
  'docs-components-grid/InteractiveGrid.png', // Redux isolation
  'docs-components-grid/SpacingGrid.png', // Needs interaction
  'docs-components-hidden',
  'docs-components-material-icons/synonyms.png', // No component
  'docs-components-menus',
  'docs-components-modal/SimpleModal.png', // Needs interaction
  'docs-components-modal/SpringModal.png', // Needs interaction
  'docs-components-modal/TransitionsModal.png', // Needs interaction
  'docs-components-modal/TransitionsModal.png', // Needs interaction
  'docs-components-no-ssr/FrameDeferring.png', // Needs interaction
  'docs-components-popover/AnchorPlayground.png', // Redux isolation
  'docs-components-popover/MouseOverPopover.png', // Needs interaction
  'docs-components-popover/PopoverPopupState.png', // Needs interaction
  'docs-components-popover/SimplePopover.png', // Needs interaction
  'docs-components-popper/FakedReferencePopper.png', // Needs interaction
  'docs-components-popper/PopperPopupState.png', // Needs interaction
  'docs-components-popper/PositionedPopper.png', // Needs interaction
  'docs-components-popper/ScrollPlayground.png', // Redux isolation
  'docs-components-popper/SimplePopper.png', // Needs interaction
  'docs-components-popper/SpringPopper.png', // Needs interaction
  'docs-components-popper/TransitionsPopper.png', // Needs interaction
  'docs-components-portal/SimplePortal.png', // Needs interaction
  'docs-components-progress',
  'docs-components-selects/ControlledOpenSelect.png', // Needs interaction
  'docs-components-selects/DialogSelect.png', // Needs interaction
  'docs-components-selects/GroupedSelect.png', // Needs interaction
  'docs-components-skeleton/Animations.png', // Animation disabled
  'docs-components-skeleton/Facebook.png', // Flaky image loading
  'docs-components-skeleton/YouTube.png', // Flaky image loading
  'docs-components-snackbars/ConsecutiveSnackbars.png', // Needs interaction
  'docs-components-snackbars/CustomizedSnackbars.png', // Redundant
  'docs-components-snackbars/DirectionSnackbar.png', // Needs interaction
  'docs-components-snackbars/FabIntegrationSnackbar.png',
  'docs-components-snackbars/IntegrationNotistack.png', // Needs interaction
  'docs-components-snackbars/PositionedSnackbar.png', // Needs interaction
  'docs-components-snackbars/SimpleSnackbar.png', // Needs interaction
  'docs-components-snackbars/TransitionsSnackbar.png', // Needs interaction
  'docs-components-speed-dial', // Needs interaction
  'docs-components-steppers/HorizontalNonLinearAlternativeLabelStepper.png', // Redundant
  'docs-components-steppers/HorizontalNonLinearStepper.png', // Redundant
  'docs-components-steppers/SwipeableTextMobileStepper.png', // Flaky image loading
  'docs-components-steppers/TextMobileStepper.png', // Flaky image loading
  'docs-components-textarea-autosize', // Superseded by a dedicated regression test
  'docs-components-tooltips', // Needs interaction
  'docs-components-transitions', // Needs interaction
  'docs-components-tree-view/ControlledTreeView.png', // Redundant
  'docs-components-tree-view/CustomizedTreeView.png', // Flaky
  'docs-components-use-media-query',
  'docs-customization-breakpoints',
  'docs-customization-color',
  'docs-customization-default-theme', // Redux isolation
  'docs-customization-density/DensityTool.png', // Redux isolation
  'docs-customization-typography/ResponsiveFontSizesChart.png',
  'docs-discover-more-languages',
  'docs-discover-more-showcase',
  'docs-discover-more-team',
  'docs-getting-started-templates',
  'docs-getting-started-templates-album/Album.png', // Flaky image loading
  'docs-getting-started-templates-blog',
  'docs-getting-started-templates-checkout/AddressForm.png', // Already tested once assembled
  'docs-getting-started-templates-checkout/PaymentForm.png', // Already tested once assembled
  'docs-getting-started-templates-checkout/Review.png', // Already tested once assembled
  'docs-getting-started-templates-dashboard/Chart.png', // Already tested once assembled
  'docs-getting-started-templates-dashboard/Deposits.png', // Already tested once assembled
  'docs-getting-started-templates-dashboard/Orders.png', // Already tested once assembled
  'docs-getting-started-templates-dashboard/Title.png', // Already tested once assembled
  'docs-getting-started-templates-sign-in-side/SignInSide.png', // Flaky
  'docs-getting-started-usage/Usage.png',
  'docs-guides',
  'docs-styles-advanced',
  'docs-system-borders',
  'docs-system-display',
  'docs-system-flexbox',
  'docs-system-palette',
  'docs-system-positions',
  'docs-system-shadows',
  'docs-system-sizing',
  'docs-system-spacing',
  'docs-system-typography',
  'docs-versions',
];

const unusedBlacklistPatterns = new Set(blacklist);

function excludeTest(suite, name) {
  if (/^docs-premium-themes(.*)/.test(suite)) {
    // eslint-disable-next-line no-console
    console.log('ingoring premium themes pages');
    return true;
  }

  return blacklist.some(pattern => {
    if (pattern === suite) {
      unusedBlacklistPatterns.delete(pattern);
      // eslint-disable-next-line no-console
      console.log(`suite exact match: ignoring '${suite}/${name}'`);
      return true;
    }
    if (pattern === `${suite}/${name}.png`) {
      unusedBlacklistPatterns.delete(pattern);
      // eslint-disable-next-line no-console
      console.log(`suite+name exact match: ignoring '${suite}/${name}'`);
      return true;
    }

    return false;
  });
}

// Also use some of the demos to avoid code duplication.
const requireDemos = require.context('docs/src/pages', true, /js$/);
const demos = requireDemos.keys().reduce((res, path) => {
  const [name, ...suiteArray] = path
    .replace('./', '')
    .replace('.js', '')
    .split('/')
    .reverse();
  const suite = `docs-${suiteArray.reverse().join('-')}`;

  if (excludeTest(suite, name)) {
    return res;
  }
  // eslint-disable-next-line no-console
  console.log(`testing ${suite}/${name}`);

  res.push({
    path,
    suite,
    name,
    case: requireDemos(path).default,
  });

  return res;
}, []);

const rootEl = document.createElement('div');
rootEl.style.display = 'inline-block';

vrtest.before(() => {
  if (document && document.body) {
    document.body.appendChild(rootEl);
  }

  return new Promise((resolve, reject) => {
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
        resolve('webfontloader: active');
      },
      inactive: () => {
        reject(new Error('webfontloader: inactive'));
      },
    });
  });
});

let suite;

const tests = regressions.concat(demos);
tests.forEach(test => {
  if (!suite || suite.name !== test.suite) {
    suite = vrtest.createSuite(test.suite);
  }

  const TestCase = test.case;

  if (!TestCase) {
    return;
  }

  suite.createTest(test.name, () => {
    ReactDOM.render(
      <TestViewer>
        <TestCase />
      </TestViewer>,
      rootEl,
    );
  });
});

if (unusedBlacklistPatterns.size > 0) {
  throw new Error(
    `The following patterns are unused:\n\n${Array.from(unusedBlacklistPatterns)
      .map(pattern => `- ${pattern}`)
      .join('\n')}`,
  );
}
