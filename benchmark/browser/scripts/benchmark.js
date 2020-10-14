/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const http = require('http');

const PORT = 1122;
const APP = 'benchmark/browser';

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

      return page;
    },
    close: () => browser.close(),
  };
}

const getMedian = (measures) => {
  const length = measures.length;
  measures.sort();
  if (length % 2 === 0) {
    return (measures[length / 2] + measures[length / 2 - 1]) / 2;
  }
  return measures[parseInt(length / 2, 10)];
};

const printMeasure = (name, measures) => {
  console.log(`\n${name}:\n`);

  let sum = 0;
  const totalNum = measures.length;

  measures.forEach((measure) => {
    sum += measure;
    console.log(`${measure.toFixed(2)}ms`);
  });

  console.log('-------------');
  console.log(`Avg: ${Number(sum / totalNum).toFixed(2)}ms`);
  console.log(`Median: ${Number(getMedian(measures)).toFixed(2)}ms`);
};

async function runMeasures(browser, testCaseName, testCase, times) {
  const measures = [];

  for (let i = 0; i < times; i += 1) {
    const url = `http://localhost:${PORT}/${APP}?${testCase}`;
    const page = await browser.openPage(url);

    const benchmark = await page.evaluate(() => {
      return window.timing.render;
    });

    measures.push(benchmark);
    await page.close();
  }

  printMeasure(testCaseName, measures);

  return measures;
}

async function run() {
  const [server, browser] = await Promise.all([createServer({ port: PORT }), createBrowser()]);

  try {
    await runMeasures(browser, 'noop (baseline)', './noop/index.js', 10);
    await runMeasures(
      browser,
      'styled-components Box + @material-ui/system',
      './styled-components-box-material-ui-system/index.js',
      10,
    );
    await runMeasures(
      browser,
      'styled-components Box + styled-system',
      './styled-components-box-styled-system/index.js',
      10,
    );
    await runMeasures(browser, 'Box emotion', './box-emotion/index.js', 10);
    await runMeasures(browser, 'Box @material-ui/styles', './box-material-ui-styles/index.js', 10);
    await runMeasures(browser, 'Box styled-components', './box-styled-components/index.js', 10);
    await runMeasures(
      browser,
      'Basic styled-components box',
      './basic-styled-components/index.js',
      10,
    );
  } finally {
    await Promise.all([browser.close(), server.close()]);
  }
}

run();
