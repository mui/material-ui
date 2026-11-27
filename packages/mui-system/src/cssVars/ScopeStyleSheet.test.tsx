import { describe, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import ScopeStyleSheet, { createScopeStyleSheetRegistry } from './ScopeStyleSheet';

const styles = { '.scope': { '--color': 'red' } };

function countRules(root: Document | ShadowRoot) {
  return (
    Array.from(root.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('')
      .split('.scope{').length - 1
  );
}

describe('ScopeStyleSheet', () => {
  const { render } = createRenderer();
  let host: HTMLElement | undefined;

  afterEach(() => {
    host?.remove();
    host = undefined;
  });

  it('inserts the stylesheet once in each style engine cache', () => {
    host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const cache = createCache({ key: 'shadow', container: shadowRoot });
    const registry = createScopeStyleSheetRegistry();
    const element = document.createElement('div');
    element.className = 'scope';
    shadowRoot.appendChild(element);
    render(
      <React.Fragment>
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        <CacheProvider value={cache}>
          <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
          <ScopeStyleSheet registry={registry} className="scope" styles={styles} />
        </CacheProvider>
      </React.Fragment>,
    );
    expect(countRules(document)).to.equal(1);
    expect(countRules(shadowRoot)).to.equal(1);
    if (!isJsdom()) {
      // The stylesheet of the document doesn't reach the shadow root.
      expect(getComputedStyle(element).getPropertyValue('--color')).to.equal('red');
    }
  });
});
