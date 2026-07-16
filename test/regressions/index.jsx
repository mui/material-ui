// `./fakeDateSetup` MUST stay first: it installs the frozen `Date` before any
// other module — notably the demo modules pulled in by `./fixtures`'s eager
// globs — reads `Date` at module scope. See `fakeDateSetup.ts` for why this
// ordering (and the separate `./fixtures` module) is required.
import './fakeDateSetup';
// Make the Data Grid demo-data generator run synchronously (before fixtures
// load any composite). See `syncDataGridGenerator.ts` — prevents the async
// row-generation skeleton/flake on the grid composites.
import './syncDataGridGenerator';
import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router';
import webfontloader from 'webfontloader';
import { Globals } from '@react-spring/web';
import TestViewer from './TestViewer';
import MarketingWrapper from './MarketingWrapper';
import allFixtures from './fixtures';
import './global.css';

// Skip charts annimation for screen shots
Globals.assign({
  skipAnimation: true,
});

window.muiFixture = {
  navigate: () => {
    throw new Error(`muiFixture.navigate is not ready`);
  },
};

function FixtureRenderer({ component: FixtureComponent, path }) {
  React.useEffect(() => {
    const viewerRoot = document.getElementById('test-viewer');
    const testRoot = document.createElement('div');
    viewerRoot.appendChild(testRoot);
    const reactRoot = ReactDOMClient.createRoot(testRoot);
    React.startTransition(() => {
      reactRoot.render(
        <TestViewer path={path} FixtureComponent={FixtureComponent}>
          <FixtureComponent />
        </TestViewer>,
      );
    });

    return () => {
      setTimeout(() => {
        reactRoot.unmount();
      }, 0);

      viewerRoot.removeChild(testRoot);
    };
  }, [FixtureComponent, path]);

  return null;
}

FixtureRenderer.propTypes = {
  component: PropTypes.elementType,
  path: PropTypes.string.isRequired,
};

function useHash() {
  const subscribe = React.useCallback((callback) => {
    window.addEventListener('hashchange', callback);
    return () => {
      window.removeEventListener('hashchange', callback);
    };
  }, []);
  const getSnapshot = React.useCallback(() => window.location.hash, []);
  const getServerSnapshot = React.useCallback(() => '', []);
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function computeIsDev(hash) {
  if (hash === '#dev') {
    return true;
  }
  if (hash === '#no-dev') {
    return false;
  }
  return process.env.NODE_ENV !== 'production';
}

function App(props) {
  const { fixtures } = props;

  const hash = useHash();
  const isDev = computeIsDev(hash);

  // Using <link rel="stylesheet" /> does not apply the google Roboto font in chromium headless/headfull.
  const [fontState, setFontState] = React.useState('pending');
  React.useEffect(() => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Inter:300,400,500,600,700,800,900', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:n9'],
        urls: ['https://use.fontawesome.com/releases/v5.14.0/css/all.css'],
      },
      timeout: 20000,
      active: () => {
        setFontState('active');
      },
      inactive: () => {
        setFontState('inactive');
      },
    });
  }, []);

  function computePath(fixture) {
    return `/${fixture.suite}/${fixture.name}`;
  }

  const navigate = useNavigate();
  React.useEffect(() => {
    window.muiFixture.navigate = navigate;
  }, [navigate]);

  return (
    <React.Fragment>
      {fontState === 'active' ? (
        <Routes>
          {fixtures.map((fixture) => {
            const path = computePath(fixture);
            const Component = fixture.Component;
            if (Component === undefined) {
              console.warn('Missing `Component` for ', fixture);
              return null;
            }

            // Composites are authored for the Next.js docs site; wrap them in
            // the branding theme here rather than threading a flag through
            // `FixtureRenderer`.
            const FixtureComponent = fixture.isComposite
              ? () => (
                  <MarketingWrapper>
                    <Component />
                  </MarketingWrapper>
                )
              : Component;

            return (
              <Route
                key={path}
                exact
                path={path}
                element={<FixtureRenderer component={FixtureComponent} path={path} />}
              />
            );
          })}
        </Routes>
      ) : null}

      {isDev ? (
        <div>
          <div data-webfontloader={fontState}>webfontloader: {fontState}</div>
          <p>
            Devtools can be enabled by appending <code>#dev</code> in the addressbar or disabled by
            appending <code>#no-dev</code>.
          </p>
          <a href="#no-dev">Hide devtools</a>
          <details>
            <summary id="my-test-summary">nav for all tests</summary>

            <nav id="tests">
              <ol>
                {fixtures.map((fixture) => {
                  const path = computePath(fixture);

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
      ) : null}
    </React.Fragment>
  );
}

App.propTypes = {
  fixtures: PropTypes.array,
};

const container = document.getElementById('react-root');
const children = (
  <Router>
    <App fixtures={allFixtures} />
  </Router>
);
const reactRoot = ReactDOMClient.createRoot(container);
reactRoot.render(children);
