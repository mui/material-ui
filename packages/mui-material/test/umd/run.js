const playwright = require('playwright');
const fse = require('fs-extra');
const http = require('http');
const path = require('path');
const express = require('express');
const { expect } = require('chai');

const port = 3090;
const host = '0.0.0.0';

function startServer(app) {
  const server = http.createServer(app);

  function close() {
    // eslint-disable-next-line no-console
    console.info('http: server is stopping');

    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  return new Promise((resolve, reject) => {
    server.listen(port, host, (error) => {
      if (error) {
        reject(error);
      } else {
        // eslint-disable-next-line no-console
        console.info(`http: ready on http://${server.address().address}:${server.address().port}`);

        resolve({ close });
      }
    });
  });
}

async function createApp() {
  const app = express();
  const rootPath = path.join(__dirname, '../../../../');
  const umdPath = '/umd.js';

  let index = await fse.readFile(
    path.join(rootPath, 'examples/material-via-cdn/index.html'),
    'utf8',
  );
  index = index.replace(
    'https://unpkg.com/@mui/material@latest/umd/material-ui.development.js',
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
    path.join(rootPath, 'packages/mui-material/build/umd/material-ui.development.js'),
    'utf8',
  );
  app.get(umdPath, (req, res) => {
    res.send(umd);
  });

  return app;
}

async function startBrowser() {
  // eslint-disable-next-line no-console
  console.info('browser: start');
  const browser = await playwright.chromium.launch({
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

  function close() {
    // eslint-disable-next-line no-console
    console.info('browser:server is stopping');
    return browser.close();
  }

  return { page, close };
}

async function run() {
  let server = { close() {} };
  let closeBrowser = () => {};
  try {
    const app = await createApp();
    server = await startServer(app);

    const { page, close } = await startBrowser();
    closeBrowser = close;

    await page.goto(`http://${host}:${port}`);
    const button = await page.$('button');
    expect(await button.textContent()).to.equal('Super Secret Password');
    await button.click();
    expect(await page.textContent('body')).to.include('1-2-3-4-5');
  } finally {
    await Promise.all([closeBrowser(), server.close()]);
  }
}

run().catch((error) => {
  console.error('test: ', error);
  process.exit(1);
});
