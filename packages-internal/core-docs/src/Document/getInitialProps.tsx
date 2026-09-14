import * as React from 'react';
import type { DocumentContext } from 'next/document';
import { documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import createEmotionCache from '../DocsApp/createEmotionCache';
import { pathnameToLanguage } from '../helpers/helpers';

type DocumentOptions = NonNullable<Parameters<typeof documentGetInitialProps>[1]>;

export type DocumentPlugin = NonNullable<DocumentOptions['plugins']>[number];

/**
 * Server-side counterpart of `DemoContextValue['StyleEngineWrapper']`. Called
 * once per request; `dispose` runs after the response props are resolved.
 */
export type DocumentStyleEngine = () => {
  plugin: DocumentPlugin;
  dispose?: () => void;
};

export function createGetInitialProps({
  styleEngine,
}: {
  styleEngine?: DocumentStyleEngine;
} = {}) {
  async function getInitialPropsDocument(ctx: DocumentContext) {
    const engine = styleEngine?.();

    try {
      const finalProps = await documentGetInitialProps(ctx, {
        emotionCache: createEmotionCache(),
        plugins: engine ? [engine.plugin] : [],
      });

      // `ctx.req` is undefined during the static export (`output: 'export'`), so the
      // canonical URL fell back to the homepage on every page.
      let url = (ctx.req?.url ?? ctx.asPath ?? '').replace(/[?#].*$/, '');
      if (url && url[url.length - 1] !== '/') {
        url += '/';
      }

      const isProd = process.env.ANALYTICS_ENV === 'production';
      const google = isProd ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';
      const apollo = isProd ? '6a35da279dcd68001e2385f2' : 'dev-id';

      return {
        ...finalProps,
        canonicalAsServer: pathnameToLanguage(url ?? '').canonicalAsServer,
        analytics: {
          google,
          apollo,
        },
        userLanguage: ctx.query.userLanguage || 'en',
        styles: [
          <style id="material-icon-font" key="material-icon-font" />,
          <style id="font-awesome-css" key="font-awesome-css" />,
          ...finalProps.emotionStyleTags,
          <style id="app-search" key="app-search" />,
          <style id="prismjs" key="prismjs" />,
          ...React.Children.toArray(finalProps.styles),
        ],
      };
    } finally {
      engine?.dispose?.();
    }
  }

  return getInitialPropsDocument;
}
