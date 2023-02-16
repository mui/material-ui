import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as DomTestingLibrary from '@testing-library/dom';
import TestViewer from './TestViewer';

const fixtures = [];

const importFixtures = require.context('./fixtures', true, /\.(js|ts|tsx)$/, 'lazy');
importFixtures.keys().forEach((path) => {
  // require.context contains paths for module alias imports and relative imports
  if (!path.startsWith('.')) {
    return;
  }
  const [suite, name] = path
    .replace('./', '')
    .replace(/\.\w+$/, '')
    .split('/');
  fixtures.push({
    path,
    suite: `e2e/${suite}`,
    name,
    Component: React.lazy(() => importFixtures(path)),
  });
});

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

  function computePath(fixture) {
    return `/${fixture.suite}/${fixture.name}`;
  }

  return (
    <Router>
      <Routes>
        {fixtures.map((fixture) => {
          const path = computePath(fixture);
          const FixtureComponent = fixture.Component;
          if (FixtureComponent === undefined) {
            console.warn('Missing `Component` ', fixture);
            return null;
          }

          return (
            <Route
              key={path}
              exact
              path={path}
              element={
                <TestViewer>
                  <FixtureComponent />
                </TestViewer>
              }
            />
          );
        })}
      </Routes>
      <div hidden={!isDev}>
        <p>
          Devtools can be enabled by appending <code>#dev</code> in the addressbar or disabled by
          appending <code>#no-dev</code>.
        </p>
        <a href="#no-dev">Hide devtools</a>
        <details>
          <summary id="my-test-summary">nav for all tests</summary>
          <nav id="tests">
            <ol>
              {fixtures.map((test) => {
                const path = computePath(test);
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
  const root = ReactDOMClient.createRoot(container);
  root.render(children);
}

window.DomTestingLibrary = DomTestingLibrary;
window.elementToString = function elementToString(element) {
  if (
    element != null &&
    (element.nodeType === element.ELEMENT_NODE || element.nodeType === element.DOCUMENT_NODE)
  ) {
    return window.DomTestingLibrary.prettyDOM(element, undefined, {
      highlight: true,
      maxDepth: 1,
    });
  }
  return String(element);
};
