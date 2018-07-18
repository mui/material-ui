import React from 'react';
import ReactDOM from 'react-dom';
import vrtest from 'vrtest/client';
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

const blacklistSuite = [
  // Flaky
  'docs-demos-progress',
  'docs-discover-more-team', // GitHub images

  // Needs interaction
  'docs-demos-dialogs',
  'docs-demos-menus',
  'docs-demos-tooltips',
  'docs-utils-transitions',

  // Useless
  'docs-', // Home
  'docs-discover-more-showcase',
  'docs-guides',
  'docs-premium-themes',
  'docs-style-color', // non important demo
  'docs-versions',
];

const blacklistFilename = [
  'docs-demos-drawers/tileData.png', // no component
  'docs-demos-grid-list/tileData.png', // no component
  'docs-getting-started-usage/Usage.png', // codesandbox iframe
];

// Also use some of the demos to avoid code duplication.
const requireDemos = require.context('docs/src/pages', true, /js$/);
const demos = requireDemos.keys().reduce((res, path) => {
  const [name, ...suiteArray] = path
    .replace('./', '')
    .replace('.js', '')
    .split('/')
    .reverse();
  const suite = `docs-${suiteArray.reverse().join('-')}`;

  if (!blacklistSuite.includes(suite) && !blacklistFilename.includes(`${suite}/${name}.png`)) {
    res.push({
      path,
      suite,
      name,
      case: requireDemos(path).default,
    });
  }

  return res;
}, []);

const rootEl = document.createElement('div');
rootEl.style.display = 'inline-block';

vrtest.before(() => {
  if (document && document.body) {
    document.body.appendChild(rootEl);
  }

  return new Promise(resolve => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:400,900'],
        urls: ['https://use.fontawesome.com/releases/v5.1.0/css/all.css'],
      },
      timeout: 20000,
      active: () => {
        resolve('active');
      },
      inactive: () => {
        resolve('inactive');
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
