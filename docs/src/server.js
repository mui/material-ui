import address from 'address';
import http from 'http';
import express from 'express';
import url from 'url';
import next from 'next';
import { addTeardown } from 'modules/handleKillSignals';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import log from 'modules/log';

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
});
const nextHandler = nextApp.getRequestHandler();

// Uncatched promise bubbling up to the global scope.
process.on('unhandledRejection', (reason, promise) => {
  log.fatal({
    name: 'unhandledRejection',
    msg: { reason, promise },
  });
});

addTeardown({
  callback: () => nextApp.close(),
  nice: 2,
});

async function run() {
  await nextApp.prepare();
  const app = express();
  app.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname } = parsedUrl;
    const { userLanguage, canonical } = pathnameToLanguage(pathname);

    if (userLanguage !== 'en') {
      // Add support for leading / in development mode.
      pathname = canonical;
      if (pathname !== '/') {
        // The leading / is only added to support static hosting (resolve /index.html).
        // We remove it to normalize the pathname.
        // See `_rewriteUrlForNextExport` on Next.js side.
        pathname = pathname.replace(/\/$/, '');
      }

      nextApp.render(req, res, pathname, {
        userLanguage,
        ...parsedUrl.query,
      });
      return;
    }

    nextHandler(req, res);
  });

  const server = http.createServer(app);
  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    const lanHost = address.ip();
    log.info({
      name: 'http',
      msg: `ready on http://localhost:${port} and http://${lanHost}:${port}`,
    });
  });

  addTeardown({
    callback: () => {
      log.info({
        name: 'http',
        msg: 'server is stopping',
      });
      return new Promise((resolve, reject) => {
        server.close(err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    },
    nice: 1, // Do it first.
  });
}

run();
