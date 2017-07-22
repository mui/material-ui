// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import vrtest from 'vrtest/client';
import webfontloader from 'webfontloader';
import TestViewer from './TestViewer';

// Get all the tests specifically written for preventing regressions.
const requireRegression = require.context('./tests', true, /js$/);
const regressions = requireRegression.keys().reduce((res, path) => {
  const [suite, name] = path.replace('./', '').replace('.js', '').split('/');
  res.push({
    path,
    suite: `regression-${suite}`,
    name,
    case: requireRegression(path).default,
  });
  return res;
}, []);

const blacklist = [
  // Flaky
  'docs-component-demos-progress',

  // Needs interaction
  'docs-component-demos-dialogs',
  'docs-component-demos-drawers',
  'docs-component-demos-menus',

  // Useless
  'docs-',
  'docs-style',
  'docs-guides',
];

// Also use some of the demos to avoid code duplication.
const requireDemos = require.context('docs/src/pages', true, /js$/);
const demos = requireDemos.keys().reduce((res, path) => {
  const [name, ...suiteArray] = path.replace('./', '').replace('.js', '').split('/').reverse();
  const suite = `docs-${suiteArray.reverse().join('-')}`;

  if (!blacklist.includes(suite)) {
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

  suite.createTest(test.name, () => {
    const TestCase = test.case;
    ReactDOM.render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <TestViewer>
          <TestCase />
        </TestViewer>
      </MuiThemeProvider>,
      rootEl,
    );
  });
});
