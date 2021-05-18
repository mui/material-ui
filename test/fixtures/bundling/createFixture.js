const { promises: fs } = require('fs');
const path = require('path');

/**
 * @typedef {object} FixtureContext
 * @property {string} fixturePath
 * @property {object} fixtureTemplateValues
 */

async function writeFromTemplate(destinationPath, templateSource, templateValues) {
  const source = Object.entries(templateValues).reduce((partialCode, [name, value]) => {
    return partialCode.replace(`{{{${name}}}}`, value);
  }, templateSource);
  await fs.writeFile(destinationPath, source);
}

/**
 * @param {FixtureContext} context
 */
async function writeNodeESMFixture(context) {
  const { fixturePath, fixtureTemplateValues } = context;
  const destinationPath = path.resolve(fixturePath, './node-esm.fixture.js');
  const templateSource = await fs.readFile(path.resolve(fixturePath, 'node-esm.template'), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeNextWebpackFixture(context) {
  const { fixturePath, fixtureTemplateValues } = context;
  const destinationPath = path.resolve(fixturePath, './pages/next-webpack.fixture.js');
  const templateSource = await fs.readFile(path.resolve(fixturePath, 'next-webpack.template'), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} contextu
 */
async function writeCRAFixture(context) {
  const { fixturePath, fixtureTemplateValues } = context;
  const destinationPath = path.resolve(fixturePath, './src/create-react-app.fixture.js');
  const templateSource = await fs.readFile(path.resolve(fixturePath, 'create-react-app.template'), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

/**
 * @param {FixtureContext} context
 */
async function writeSnowpackFixture(context) {
  const { fixturePath, fixtureTemplateValues } = context;
  const destinationPath = path.resolve(fixturePath, './src/snowpack.fixture.js');
  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  const templateSource = await fs.readFile(path.resolve(fixturePath, 'snowpack.template'), {
    encoding: 'utf8',
  });

  await writeFromTemplate(destinationPath, templateSource, fixtureTemplateValues);
}

async function readFixtureTemplateValues(filePath) {
  const code = await fs.readFile(filePath, { encoding: 'utf8' });

  const importsMatch = code.match(/\/\/ #region imports(.+?)\/\/ #endregion/s);
  const [imports] = importsMatch;

  const usageMatch = code.match(/\/\/ #region usage(.+?)\/\/ #endregion/s);
  const [usage] = usageMatch;

  return { imports, usage };
}

/**
 * @param {object} context
 * @param {boolean} context.modules
 */
async function run(context) {
  const { fixture } = context;

  if (fixture === undefined) {
    throw new Error(`Usage: ${path.basename(process.argv[1])} <fixture>`);
  }

  const fixtureTemplateValues = await readFixtureTemplateValues(
    path.resolve(__dirname, './fixtureTemplateValues.js'),
  );

  switch (fixture) {
    case 'node-esm':
      await writeNodeESMFixture({
        fixturePath: path.resolve(__dirname, 'node-esm'),
        fixtureTemplateValues,
      });
      break;
    case 'next-webpack4':
      await writeNextWebpackFixture({
        fixturePath: path.resolve(__dirname, 'next-webpack4'),
        fixtureTemplateValues,
      });
      break;
    case 'next-webpack5':
      await writeNextWebpackFixture({
        fixturePath: path.resolve(__dirname, 'next-webpack5'),
        fixtureTemplateValues,
      });
      break;
    case 'create-react-app':
      await writeCRAFixture({
        fixturePath: path.resolve(__dirname, 'create-react-app'),
        fixtureTemplateValues,
      });
      break;
    case 'snowpack':
      await writeSnowpackFixture({
        fixturePath: path.resolve(__dirname, 'snowpack'),
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
