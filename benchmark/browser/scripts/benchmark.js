/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const path = require('path');
const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const http = require('http');

const PORT = 1122;

function createServer(options) {
  const { port } = options;
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: path.resolve(__dirname, '../') });
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
  console.log(`${name}:`);

  let sum = 0;
  const totalNum = measures.length;

  measures.forEach((measure) => {
    sum += measure;
    // Uncomment for more details
    // console.log(`${measure.toFixed(2)}ms`);
  });

  console.log(
    `mean: ${Number(sum / totalNum).toFixed(2)}ms, median: ${Number(getMedian(measures)).toFixed(
      2,
    )}ms`,
  );
  console.log('-------------');
};

async function runMeasures(browser, testCaseName, testCase, times = 10) {
  const measures = [];

  for (let i = 0; i < times; i += 1) {
    const url = `http://localhost:${PORT}/?${testCase}`;
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
    // Test that there no significant offset
    await runMeasures(browser, 'noop (baseline)', './noop/index.js');
    // Test the cost of React primitives
    await runMeasures(browser, 'React primitives', './primitives/index.js');
    // Test the cost of React components abstraction
    await runMeasures(browser, 'React components', './components/index.js');
    // Test that @material-ui/styled-engine doesn't add an signifiant overhead
    await runMeasures(browser, 'Styled Material-UI', './styled-material-ui/index.js');
    await runMeasures(browser, 'Styled emotion', './styled-emotion/index.js');
    await runMeasures(browser, 'Styled SC', './styled-sc/index.js');
    // Test the performance compared to the v4 standard
    await runMeasures(browser, 'makeStyles', './make-styles/index.js');
    // Test the Box perf with alternatives
    await runMeasures(browser, 'Box Baseline', './box-baseline/index.js');
    await runMeasures(browser, 'Box Material-UI', './box-material-ui/index.js');
    await runMeasures(browser, 'Box Theme-UI', './box-theme-ui/index.js');
    await runMeasures(browser, 'Box Chakra-UI', './box-chakra-ui/index.js');
    // Test the system perf difference with alternatives
    await runMeasures(
      browser,
      'styled-components Box + @material-ui/system',
      './styled-components-box-material-ui-system/index.js',
    );
    await runMeasures(
      browser,
      'styled-components Box + styled-system',
      './styled-components-box-styled-system/index.js',
    );
  } finally {
    await Promise.all([browser.close(), server.close()]);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
