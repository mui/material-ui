import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import PropTypes from 'prop-types';
import { logReactMetrics } from './utils';

// Get all the scenarios
const requirePerfScenarios = require.context('./scenarios', true, /(js|ts|tsx)$/);

const rootEl = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootEl);

const scenarioSuitePath = window.location.search.replace('?', '');

const Component = requirePerfScenarios(scenarioSuitePath).default;

const start = performance.now();
let end;

function Measure(props) {
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    // Force layout
    ref.current.getBoundingClientRect();

    end = performance.now();
    window.timing = {
      render: end - start,
    };
  });

  return <div ref={ref}>{props.children}</div>;
}

Measure.propTypes = {
  children: PropTypes.node,
};

root.render(
  <React.Profiler id={scenarioSuitePath} onRender={logReactMetrics}>
    <Measure>
      <Component />
    </Measure>
  </React.Profiler>,
);
