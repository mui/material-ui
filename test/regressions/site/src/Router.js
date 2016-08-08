// @flow weak

import React from 'react';
import {
  hashHistory,
  Router as ReactRouter,
  Route,
  IndexRedirect,
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
        <IndexRedirect to={tests[0].routePath} />
        {tests.map(((n, i) => {
          return (
            <Route
              key={i}
              title={n.name}
              testIndex={i}
              path={`${n.routePath}`}
              component={requireTest(n.path).default}
            />
          );
        }))}
      </Route>
    </ReactRouter>
  );
}
