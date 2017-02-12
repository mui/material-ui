// @flow weak

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import vrtest from 'vrtest/client';
import webfontloader from 'webfontloader';
import TestViewer from './TestViewer';

const requireTest = require.context('./tests', true, /js$/);
const testFiles = requireTest.keys();
const tests = testFiles.reduce((res, path) => {
  const [suite, name] = path.replace('./', '').replace('.js', '').split('/');
  res.push({ path, suite, name });
  return res;
}, []);

const rootEl = document.createElement('div');

rootEl.style.display = 'inline-block';

vrtest.before(() => {
  if (document && document.body) {
    document.body.appendChild(rootEl);
  }

  return new Promise((resolve) => {
    webfontloader.load({
      google: {
        families: [
          'Roboto:300,400,500',
          'Material+Icons',
        ],
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

tests.forEach(((test) => {
  if (!suite || suite.name !== test.suite) {
    suite = vrtest.createSuite(test.suite);
  }

  suite.createTest(test.name, () => {
    ReactDOM.render(
      <MuiThemeProvider>
        <TestViewer>
          {React.createElement(requireTest(test.path).default)}
        </TestViewer>
      </MuiThemeProvider>,
      rootEl,
    );
  });
}));
