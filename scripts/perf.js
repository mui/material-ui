const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');
const waitOn = require('wait-on');
const handler = require('serve-handler');
const http = require('http');

const SERVER = 'localhost';
const PORT = 1122;
const APP = 'test/perf/debug';

http.createServer((request, response) => {
  return handler(request, response);
}).listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});

async function createBrowser() {
  const browser = await puppeteer.launch();

  return {
    openPage: async url => {
      const page = await browser.newPage();
      await page.goto(url);

      return {
        close: () => page.close(),
      };
    },
    close: async () => browser.close(),
  };
}

async function runMeasures(
  browser,
  testCase,
  times,
) {
  const measures = [];

  for (let i = 0; i < times; i++) {
    var start = performance.now();
    const page = await browser.openPage(`http://${SERVER}:${PORT}/${APP}?${testCase}`);
    const end = performance.now();

    measures.push(end - start);
    await page.close();
  }

  return measures;
}

const printMeasures = (measures) => {
  console.log('\nMeasures\n');

  Object.keys(measures).forEach(measureKey => {
    console.log(`\n${measureKey}:\n`);

    let sum = 0;
    const totalNum = measures[measureKey].length;

    measures[measureKey].forEach(measure => {
      sum += measure;
      console.log(`${measure.toFixed(2)}ms`);
    });

    console.log("-------------");
    console.log(`Avg: ${Number(sum/totalNum).toFixed(2)}ms\n`)
  });
}

async function run(argv) {
  await waitOn({
    resources: [
      `http://${SERVER}:${PORT}/${APP}`
    ],
  });

  const browser = await createBrowser();
  let measures = {};

  try {
    measures['@material-ui/system colors'] = await runMeasures(browser, './material-ui-system-colors/index.js', 10);
    measures['styled-system colors'] = await runMeasures(browser, './styled-system-colors/index.js', 10);
    measures['@material-ui/system spaces'] = await runMeasures(browser, './material-ui-system-spaces/index.js', 10);
    measures['styled-system spaces'] = await runMeasures(browser, './styled-system-spaces/index.js', 10);
    measures['@material-ui/system compose'] = await runMeasures(browser, './material-ui-system-compose/index.js', 10);
    measures['styled-system compose'] = await runMeasures(browser, './styled-system-compose/index.js', 10);
    measures['@material-ui/core all-inclusive'] = await runMeasures(browser, './material-ui-system-all-inclusive/index.js', 10)
    measures['styled-components Box + @material-ui/system'] = await runMeasures(browser, './styled-components-box-material-ui-system/index.js', 10);
    measures['styled-components Box + styled-system'] = await runMeasures(browser, './styled-components-box-styled-system/index.js', 10);
    measures['Box emotion'] = await runMeasures(browser, './box-emotion/index.js', 10);
    measures['Box @material-ui/styles'] = await runMeasures(browser, './box-material-ui-styles/index.js', 10);
    measures['Box styled-components'] = await runMeasures(browser, './box-styled-components/index.js', 10);
    measures['Naked styled-components'] = await runMeasures(browser, './naked-styled-components/index.js', 10);
  } finally {
    await browser.close();
  }

  printMeasures(measures);
} 

run();