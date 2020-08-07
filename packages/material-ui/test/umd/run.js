const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const http = require('http');
const path = require('path');
const express = require('express');
const expect = require('expect-puppeteer');
const { addTeardown, shutdown } = require('../../../../modules/handleKillSignals');
const log = require('../../../../modules/log');

const port = 3090;
const host = '0.0.0.0';

function startServer(app) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(port, host, (err) => {
      if (err) {
        reject(err);
        return;
      }

      log.info({
        name: 'http',
        msg: `ready on http://${server.address().address}:${server.address().port}`,
      });

      resolve();
    });

    addTeardown({
      callback: () => {
        log.info({
          name: 'http',
          msg: 'server is stopping',
        });
        return new Promise((resolve2, reject2) => {
          server.close((err) => {
            if (err) {
              reject2(err);
              return;
            }
            resolve2();
          });
        });
      },
      nice: 1, // Do it first.
    });
  });
}

async function createApp() {
  const app = express();
  const rootPath = path.join(__dirname, '../../../../');
  const umdPath = '/umd.js';

  let index = await fse.readFile(path.join(rootPath, 'examples/cdn/index.html'), 'utf8');
  index = index.replace(
    'https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js',
    umdPath,
  );
  index = index.replace(
    'function App() {',
    `
const {
  Button,
  Dialog,
} = MaterialUI;

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Super Secret Password</Button>
      <Dialog open={open}>
        1-2-3-4-5
      </Dialog>
    </React.Fragment>
  );
     `,
  );
  app.get('/', (req, res) => {
    res.send(index);
  });

  const umd = await fse.readFile(
    path.join(rootPath, 'packages/material-ui/build/umd/material-ui.development.js'),
    'utf8',
  );
  app.get(umdPath, (req, res) => {
    res.send(umd);
  });

  return app;
}

async function startBrowser() {
  log.info({
    name: 'browser',
    msg: 'start',
  });
  const browser = await puppeteer.launch({
    args: [
      '--single-process', // Solve mono-thread issue on CircleCI
      // https://github.com/GoogleChrome/puppeteer/blob/5d6535ca0c82efe2ca50450818d5fb20aa015658/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
      '--no-sandbox', // Solve user security sandboxing issue.
      // '--disable-web-security', // Solve weird crossorigin anonymous issue on CircleCI
    ],
  });
  const page = await browser.newPage();
  page.on('pageerror', (err) => {
    throw err;
  });

  addTeardown({
    callback: () => {
      log.info({
        name: 'browser',
        msg: 'server is stopping',
      });
      return browser.close();
    },
    nice: 2,
  });

  return page;
}

process.on('unhandledRejection', (reason, promise) => {
  log.fatal({
    name: 'unhandledRejection',
    msg: { reason, promise },
  });
  process.exit(1);
});

async function run() {
  try {
    const app = await createApp();
    await startServer(app);

    const page = await startBrowser();
    await page.goto(`http://${host}:${port}`);
    await expect(page).toClick('button', { text: 'Super Secret Password' });
    await expect(page).toMatch('1-2-3-4-5');
  } catch (err) {
    log.fatal({
      name: 'test',
      msg: { err },
    });
    process.exit(1);
  }

  shutdown('SIGINT', 'done');
}

run();
