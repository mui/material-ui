import * as React from 'react';
import { AppType } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';

const isBrowser = typeof document !== 'undefined';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui', insertionPoint });
}

interface EmotionCacheProviderProps {
  emotionCache?: EmotionCache;
}

const defaultEmotionCache = createEmotionCache();

export function AppCacheProvider({
  emotionCache = defaultEmotionCache,
  children,
}: React.PropsWithChildren<EmotionCacheProviderProps>) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}

interface Plugin {
  enhanceApp: (
    App: React.ComponentType<React.ComponentProps<AppType>>,
  ) => (props: any) => JSX.Element;
  resolveProps: (initialProps: DocumentInitialProps) => Promise<DocumentInitialProps>;
}

/**
 * A utility to compose multiple `getInitialProps` functions.
 */
export function createGetInitialProps(plugins: Plugin[]) {
  return async function getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => plugins.reduce((result, plugin) => plugin.enhanceApp(result), App),
      });

    const initialProps = await Document.getInitialProps(ctx);

    const finalProps = await plugins.reduce(
      async (result, plugin) => plugin.resolveProps(await result),
      Promise.resolve(initialProps),
    );

    return finalProps;
  };
}

export interface DocumentHeadTagsProps {
  emotionStyleTags: React.JSX.Element[];
}

export function DocumentHeadTags({ emotionStyleTags }: DocumentHeadTagsProps) {
  return (
    <React.Fragment>
      <meta name="emotion-insertion-point" content="" />
      {emotionStyleTags}
    </React.Fragment>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
export async function documentGetInitialProps(
  ctx: DocumentContext,
  options?: {
    emotionCache?: EmotionCache;
    plugins?: Plugin[];
  },
) {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = options?.emotionCache ?? createEmotionCache();

  return createGetInitialProps([
    {
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & EmotionCacheProviderProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
      resolveProps: async (initialProps) => {
        const { extractCriticalToChunks } = createEmotionServer(cache);
        const { styles } = extractCriticalToChunks(initialProps.html);
        return {
          ...initialProps,
          emotionStyleTags: styles.map((style) => (
            <style
              data-emotion={`${style.key} ${style.ids.join(' ')}`}
              key={style.key}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.css }}
            />
          )),
        };
      },
    },
    ...(options?.plugins ?? []),
  ])(ctx) as Promise<DocumentInitialProps & DocumentHeadTagsProps>;
}
