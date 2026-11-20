// @vitest-environment node
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as ReactDOMServer from 'react-dom/server';
import { CacheProvider, ClassNames, Global } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import type { DocumentContext } from 'next/document';
import { documentGetInitialProps } from './pagesRouterV13Document';

// `AppCacheProvider` needs the Pages Router, so the app uses the cache that it receives directly.
function App({ emotionCache }: { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Global styles="@layer theme, mui;" />
      <ClassNames>{({ css }) => <div className={css({ color: 'red' })} />}</ClassNames>
    </CacheProvider>
  );
}

function createDocumentContext() {
  return {
    renderPage: (options: { enhanceApp: (app: typeof App) => React.ComponentType<any> }) => {
      const EnhancedApp = options.enhanceApp(App);
      return { html: ReactDOMServer.renderToString(<EnhancedApp />), head: [] };
    },
    // What Next.js's `Document.getInitialProps()` returns, with its own styles.
    defaultGetInitialProps: async (ctx: DocumentContext) => {
      const { html, head } = await ctx.renderPage();
      return { html, head, styles: [<style key="next" id="next-styles" />] };
    },
  } as unknown as DocumentContext;
}

describe('documentGetInitialProps', () => {
  it("adds Material UI's styles after the other styles, at the end of the head", async () => {
    const props = await documentGetInitialProps(createDocumentContext());
    const styles = React.Children.toArray(props.styles) as React.ReactElement<any>[];

    expect(styles.map((style) => style.props.id ?? style.props['data-emotion'])).toEqual([
      'next-styles',
      // The layer order statement is hydrated along with the regular styles.
      expect.stringMatching(/^mui mui-global /),
      expect.stringMatching(/^mui /),
    ]);
    expect(styles[1].props.dangerouslySetInnerHTML).to.deep.equal({ __html: '@layer theme,mui;' });
    expect(props).not.to.have.property('emotionStyleTags');
  });
});
