import { promises as fs } from 'fs';
import { URL } from 'url';
import * as process from 'process';

/**
 * @typedef {object} FixtureContext
 * @property {URL} fixtureUrl
 * @property {object} fixtureTemplateValues
 */

/**
 * @param {URL} destinationUrl
 * @param {string} templateSource
 * @param {Record<string, string>} templateValues
 */
async function writeFromTemplate(destinationUrl, templateSource, templateValues) {
  const source = Object.entries(templateValues).reduce((partialCode, [name, value]) => {
    return partialCode.replace(`{{{${name}}}}`, value);
  }, templateSource);
  await fs.writeFile(destinationUrl, source);
}

/**
 * @param {FixtureContext} context
 */
async function writeNodeESMFixture(context) {
  const { fixtureUrl, fixtureTemplateValues } = context;
  const destinationPath = new URL('./node-esm.fixture.js', fixtureUrl);
  const templateSource = await fs.readFile(new URL('node-esm.template', fixtureUrl), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeNodeCJSFixture(context) {
  const { fixtureUrl, fixtureTemplateValues } = context;
  const destinationPath = new URL('./node-cjs.fixture.js', fixtureUrl);
  const templateSource = await fs.readFile(new URL('node-cjs.template', fixtureUrl), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeNextWebpackFixture(context) {
  const { fixtureUrl, fixtureTemplateValues } = context;
  const destinationUrl = new URL('./pages/next-webpack.fixture.js', fixtureUrl);
  const templateSource = await fs.readFile(new URL('./next-webpack.template', fixtureUrl), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationUrl, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeSnowpackFixture(context) {
  const { fixtureUrl, fixtureTemplateValues } = context;
  const destinationUrl = new URL('./src/snowpack.fixture.js', fixtureUrl);
  await fs.mkdir(new URL('.', destinationUrl), { recursive: true });
  const templateSource = await fs.readFile(new URL('snowpack.template', fixtureUrl), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationUrl, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeViteFixture(context) {
  const { fixtureUrl: fixturePath, fixtureTemplateValues } = context;
  const destinationPath = new URL('./vite.fixture.js', fixturePath);
  const templateSource = await fs.readFile(new URL('vite.template', fixturePath), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeEsbuildFixture(context) {
  const { fixtureUrl, fixtureTemplateValues } = context;
  const destinationPath = new URL('./esbuild.fixture.js', fixtureUrl);
  const templateSource = await fs.readFile(new URL('esbuild.template', fixtureUrl), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeGatsbyFixture(context) {
  const { fixtureUrl: fixturePath, fixtureTemplateValues } = context;
  const destinationPath = new URL('./src/pages/gatsby.fixture.js', fixturePath);
  const templateSource = await fs.readFile(new URL('gatsby.template', fixturePath), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

async function readFixtureTemplateValues(fileUrl) {
  const code = await fs.readFile(fileUrl, { encoding: 'utf8' });

  const importsMatch = code.match(/\/\/ #region imports(.+?)\/\/ #endregion/s);
  const [imports] = importsMatch;

  const lines = imports.split(/\n+/).filter((line) => {
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
  });
  const requires = lines
    .map((line) => {
      const [, specifier, module] = /import (.*) from ['"](.*)['"]/.exec(line);
      if (specifier.startsWith('*')) {
        return `const ${specifier.replace('* as ', '')} = require('${module}')`;
      }
      if (specifier.startsWith('{')) {
        return `const ${specifier.replace(' as ', ': ')} = require('${module}')`;
      }
      return `const { default: ${specifier} } = require('${module}')`;
    })
    .join('\n');

  const usageMatch = code.match(/\/\/ #region usage(.+?)\/\/ #endregion/s);
  const [usage] = usageMatch;

  return { imports, usage, requires };
}

function resolveFixtureUrl(fixtureName) {
  return new URL(`../fixtures/${fixtureName}/`, import.meta.url);
}

/**
 * @param {object} context
 * @param {string} context.fixture
 */
async function run(context) {
  const { fixture } = context;

  if (fixture === undefined) {
    throw new Error(`Usage: ${process.argv[1]} <fixture>`);
  }

  const fixtureTemplateValues = await readFixtureTemplateValues(
    new URL('./fixtureTemplateValues.js', import.meta.url),
  );

  switch (fixture) {
    case 'node-cjs':
      await writeNodeCJSFixture({
        fixtureUrl: resolveFixtureUrl('node-cjs'),
        fixtureTemplateValues,
      });
      break;
    case 'node-esm':
      await writeNodeESMFixture({
        fixtureUrl: resolveFixtureUrl('node-esm'),
        fixtureTemplateValues,
      });
      break;
    case 'next-webpack4':
      await writeNextWebpackFixture({
        fixtureUrl: resolveFixtureUrl('next-webpack4'),
        fixtureTemplateValues,
      });
      break;
    case 'next-webpack5':
      await writeNextWebpackFixture({
        fixtureUrl: resolveFixtureUrl('next-webpack5'),
        fixtureTemplateValues,
      });
      break;
    case 'snowpack':
      await writeSnowpackFixture({
        fixtureUrl: resolveFixtureUrl('snowpack'),
        fixtureTemplateValues,
      });
      break;
    case 'vite':
      await writeViteFixture({
        fixtureUrl: resolveFixtureUrl('vite'),
        fixtureTemplateValues,
      });
      break;
    case 'esbuild':
      await writeEsbuildFixture({
        fixtureUrl: resolveFixtureUrl('esbuild'),
        fixtureTemplateValues,
      });
      break;
    // TODO remove, no longer relevant since https://github.com/mui/material-ui/pull/38567
    case 'gatsby':
      await writeGatsbyFixture({
        fixtureUrl: resolveFixtureUrl('gatsby'),
        fixtureTemplateValues,
      });
      break;
    default:
      throw new TypeError(`Can't handle fixture '${fixture}'`);
  }
}

run({ fixture: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
