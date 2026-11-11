import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { chromium } from '@playwright/test';

const KNOWN_STATES = ['default', 'open', 'dark', 'brand'];

const { values } = parseArgs({
  options: {
    suite: { type: 'string' },
    out: { type: 'string' },
    states: { type: 'string', default: KNOWN_STATES.join(',') },
    url: { type: 'string', default: 'http://localhost:5001' },
    match: { type: 'string', default: '' },
  },
});

if (!values.suite || !values.out) {
  throw new Error(
    'Usage: capture.mjs --suite <Suite> --out <dir> [--states a,b] [--match <regexp>] [--url <base>]',
  );
}

const states = values.states.split(',');
const unknownStates = states.filter((state) => !KNOWN_STATES.includes(state));
if (unknownStates.length > 0) {
  throw new Error(
    `Unknown state: ${unknownStates.join(', ')}. Use one of ${KNOWN_STATES.join(', ')}.`,
  );
}

const fixtureDir = path.resolve('test/regressions/fixtures', values.suite);
const fixtures = (await fs.readdir(fixtureDir))
  .filter((file) => /\.(js|tsx?)$/.test(file))
  .map((file) => file.replace(/\.\w+$/, ''))
  .filter((fixture) => new RegExp(values.match).test(fixture));
if (fixtures.length === 0) {
  throw new Error(`No fixture in ${fixtureDir} matches --match '${values.match}'.`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });

async function capture(fixture, state) {
  const [scenario, variant] = fixture.split('--');
  const route = `/regression-${values.suite}/${fixture}`;
  await page.goto(`${values.url}${route}?state=${state}#no-dev`);
  await page.evaluate(() => window.muiFixture.fontsReady);
  await page.waitForSelector(
    `[data-testid="testcase"][data-testpath="${route}"]:not([aria-busy="true"])`,
  );
  const target = await page.waitForSelector('[data-testid="screenshot-target"]');
  const fullPage = await target.evaluate((element) => element.hasAttribute('data-full-page'));
  await page.waitForTimeout(400);
  const file = path.resolve(values.out, scenario, `${variant}-${state}.png`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await (fullPage ? page : target).screenshot({ path: file });
  process.stdout.write(`${file}\n`);
}

const jobs = fixtures.flatMap((fixture) => states.map((state) => [fixture, state]));
try {
  await jobs.reduce(
    (previous, [fixture, state]) => previous.then(() => capture(fixture, state)),
    Promise.resolve(),
  );
} finally {
  await browser.close();
}
