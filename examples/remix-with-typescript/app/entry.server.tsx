import * as React from 'react';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';

function renderFullPage(html: string, css: string) {
  const bodyTagContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1];
  const headTagContent = html.match(/<head[^>]*>([\s\S]*)<\/head>/)?.[1];

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        ${css}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
	      ${headTagContent}
      </head>
      <body>
        ${bodyTagContent}
      </body>
    </html>
  `;
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const initialMarkup = renderToString(
    <CacheProvider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>,
  );

  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialMarkup);
  const emotionCSS = constructStyleTagsFromChunks(emotionStyles);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(renderFullPage(initialMarkup, emotionCSS), {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
