// @vitest-environment node
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ScopeStyleSheet, { createScopeStyleSheetRegistry } from './ScopeStyleSheet';

const styles = { '.scope': { '--color': 'red' } };

function countRules(markup) {
  return markup.split('.scope{--color:red;}').length - 1;
}

// The other tests that render to a string run where a document exists, so the style engine inserts nothing in them.
describe.skipIf(typeof document !== 'undefined')('ScopeStyleSheet on the server', () => {
  it('renders the stylesheet of each provider', () => {
    const registry = createScopeStyleSheetRegistry();
    const view = ReactDOMServer.renderToString(
      <React.Fragment>
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
      </React.Fragment>,
    );
    expect(countRules(view)).to.equal(2);
  });

  // React 17 can't render Suspense on the server.
  it.skipIf(parseInt(React.version, 10) < 18)(
    'renders the stylesheet after a Suspense boundary that suspends',
    () => {
      function Suspends() {
        throw new Promise(() => {});
      }
      const registry = createScopeStyleSheetRegistry();
      const view = ReactDOMServer.renderToString(
        <React.Fragment>
          <React.Suspense fallback={<span>loading</span>}>
            <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
            <Suspends />
          </React.Suspense>
          <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        </React.Fragment>,
      );
      expect(view).to.include('loading');
      expect(countRules(view)).to.equal(1);
    },
  );

  it('inserts the stylesheet once in a cache that extracts the styles', () => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    const registry = createScopeStyleSheetRegistry();
    const view = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
      </CacheProvider>,
    );
    expect(view).to.equal('');
    expect(Object.values(cache.inserted)).to.deep.equal(['.scope{--color:red;}']);
  });
});
