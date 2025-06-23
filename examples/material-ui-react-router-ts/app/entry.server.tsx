import { Transform } from 'node:stream';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';
import { createReadableStreamFromReadable } from '@react-router/node';
import { isbot } from 'isbot';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createCache';

export const streamTimeout = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof ReactDOMServer.RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? 'onAllReady' : 'onShellReady';

    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      <CacheProvider value={cache}>
        <ServerRouter context={routerContext} url={request.url} />
      </CacheProvider>,
      {
        [readyOption]() {
          shellRendered = true;

          // Collect the HTML chunks
          const chunks: Buffer[] = [];

          // Create transform stream to collect HTML and inject styles
          const transformStream = new Transform({
            transform(chunk, _encoding, callback) {
              // Collect chunks, don't pass them through yet
              chunks.push(chunk);
              callback();
            },
            flush(callback) {
              // Combine all chunks into HTML string
              const html = Buffer.concat(chunks).toString();

              // Extract emotion styles from the collected HTML
              const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html));

              if (styles) {
                const injectedHtml = html.replace('</head>', `${styles}</head>`);
                this.push(injectedHtml);
              } else {
                this.push(html);
              }

              callback();
            },
          });

          const stream = createReadableStreamFromReadable(transformStream);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(transformStream);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    setTimeout(abort, streamTimeout + 1000);
  });
}
