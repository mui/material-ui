// @flow weak

import React from 'react';
import {
  hashHistory,
  Router as ReactRouter,
  Route,
} from 'react-router';
import TestViewer from './TestViewer';

const requireTest = require.context('./tests', true, /js$/);
const testFiles = requireTest.keys();
const tests = testFiles.reduce((res, n) => {
  res.push({
    path: n,
    routePath: n.replace('./', '').replace('.js', ''),
    name: n.replace(/.*\//, '').replace('.js', ''),
  });
  return res;
}, []);

export default function Router() {
  return (
    <ReactRouter history={hashHistory}>
      <Route
        title="Material UI Regression Tests"
        path="/"
        component={TestViewer}
        numTests={tests.length}
      >
        {tests.map(((test, index) => {
          return (
            <Route
              key={index}
              title={test.name}
              testIndex={index}
              path={test.routePath}
              component={requireTest(test.path).default}
            />
          );
        }))}
      </Route>
    </ReactRouter>
  );
}
