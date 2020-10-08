import React from 'react';
import ReactDOM from 'react-dom';

// Get all the scenarios
const requirePerfScenarios = require.context('./scenarios', true, /(js|ts|tsx)$/);

const rootEl = document.getElementById('root');

const scenarioSuitePath = window.location.search.replace('?', '');

const Component = requirePerfScenarios(scenarioSuitePath).default;

ReactDOM.render(<Component />, rootEl);
