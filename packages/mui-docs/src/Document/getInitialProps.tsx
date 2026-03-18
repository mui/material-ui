import * as React from 'react';
import type { DocumentContext } from 'next/document';
import { documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import createEmotionCache from '../DocsApp/createEmotionCache';
import { pathnameToLanguage } from '../helpers/helpers';

export function createGetInitialProps({
  setupStyledComponents = false,
}: {
  setupStyledComponents: boolean;
}) {
  async function getInitialPropsDocument(ctx: DocumentContext) {
    const styledComponentsSheet = setupStyledComponents
      ? new (await import('styled-components')).ServerStyleSheet()
      : null;

    try {
      const finalProps = await documentGetInitialProps(ctx, {
        emotionCache: createEmotionCache(),
        plugins: styledComponentsSheet
          ? [
              {
                enhanceApp: (App) => (props) =>
                  styledComponentsSheet.collectStyles(<App {...props} />),
                resolveProps: async (initialProps) => ({
                  ...initialProps,
                  styles: [
                    styledComponentsSheet.getStyleElement(),
                    ...React.Children.toArray(initialProps.styles),
                  ],
                }),
              },
            ]
          : [],
      });

      // All the URLs should have a leading /.
      // This is missing in the Next.js static export.
      let url = ctx.req?.url;
      if (url && url[url.length - 1] !== '/') {
        url += '/';
      }

      const isProd =
        process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging';
      const google = isProd ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';
      const apollo = isProd ? '691c2e920c5e20000d7801b6' : 'dev-id';

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
      if (styledComponentsSheet) {
        styledComponentsSheet.seal();
      }
    }
  }

  return getInitialPropsDocument;
}
