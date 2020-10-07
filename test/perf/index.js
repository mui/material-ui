import React from 'react';
import ReactDOM from 'react-dom';

// Get all the tests specifically written for preventing regressions.
const requirePerfTests = require.context('./tests', true, /(js|ts|tsx)$/);

const rootEl = document.getElementById('root');

// ./Button/index.js
// ./Dialog/index.js

const testSuitePath = window.location.search.replace("?", "");

const Component = requirePerfTests(testSuitePath).default;

ReactDOM.render(
  <Component />,
  rootEl,
);
