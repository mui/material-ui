/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');
const handler = require('serve-handler');
const http = require('http');

const PORT = 1122;
const APP = 'benchmark';

function createServer(options) {
  const { port } = options;
  const server = http.createServer((request, response) => {
    return handler(request, response);
  });

  function close() {
    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({ close });
    });
  });
}

async function createBrowser() {
  const browser = await puppeteer.launch();

  return {
    openPage: async (url) => {
      const page = await browser.newPage();
      await page.goto(url);

      return {
        page,
        close: () => page.close(),
      };
    },
    close: async () => browser.close(),
  };
}

async function runMeasures(browser, testCase, times) {
  const measures = [];

  for (let i = 0; i < times; i += 1) {
    const { page, close } = await browser.openPage(`http://localhost:${PORT}/${APP}?${testCase}`);

    const benchmark = await page.evaluate(() => {
      const { loadEventEnd, navigationStart } = performance.timing;
      return loadEventEnd - navigationStart;
    });

    measures.push(benchmark);
    await close();
  }

  return measures;
}

const printMeasures = (measures) => {
  console.log('\nMeasures\n');

  Object.keys(measures).forEach((measureKey) => {
    console.log(`\n${measureKey}:\n`);

    let sum = 0;
    const totalNum = measures[measureKey].length;

    measures[measureKey].forEach((measure) => {
      sum += measure;
      console.log(`${measure.toFixed(2)}ms`);
    });

    console.log('-------------');
    console.log(`Avg: ${Number(sum / totalNum).toFixed(2)}ms\n`);
  });
};

async function run() {
  const [server, browser] = await Promise.all([createServer({ port: PORT }), createBrowser()]);
  const measures = {};

  try {
    measures['@material-ui/system colors'] = await runMeasures(
      browser,
      './material-ui-system-colors/index.js',
      10,
    );
    measures['styled-system colors'] = await runMeasures(
      browser,
      './styled-system-colors/index.js',
      10,
    );
    measures['@material-ui/system spaces'] = await runMeasures(
      browser,
      './material-ui-system-spaces/index.js',
      10,
    );
    measures['styled-system spaces'] = await runMeasures(
      browser,
      './styled-system-spaces/index.js',
      10,
    );
    measures['@material-ui/system compose'] = await runMeasures(
      browser,
      './material-ui-system-compose/index.js',
      10,
    );
    measures['styled-system compose'] = await runMeasures(
      browser,
      './styled-system-compose/index.js',
      10,
    );
    measures['@material-ui/core all-inclusive'] = await runMeasures(
      browser,
      './material-ui-system-all-inclusive/index.js',
      10,
    );
    measures['styled-components Box + @material-ui/system'] = await runMeasures(
      browser,
      './styled-components-box-material-ui-system/index.js',
      10,
    );
    measures['styled-components Box + styled-system'] = await runMeasures(
      browser,
      './styled-components-box-styled-system/index.js',
      10,
    );
    measures['Box emotion'] = await runMeasures(browser, './box-emotion/index.js', 10);
    measures['Box @material-ui/styles'] = await runMeasures(
      browser,
      './box-material-ui-styles/index.js',
      10,
    );
    measures['Box styled-components'] = await runMeasures(
      browser,
      './box-styled-components/index.js',
      10,
    );
    measures['Naked styled-components'] = await runMeasures(
      browser,
      './naked-styled-components/index.js',
      10,
    );
  } finally {
    await Promise.all([browser.close(), server.close()]);
  }

  printMeasures(measures);
}

run();
