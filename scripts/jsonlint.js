/* eslint-disable no-console */
const chalk = require('chalk');
const fse = require('fs-extra');
const glob = require('glob-gitignore');
const path = require('path');

const passMessage = (message) => `✓ ${chalk.gray(message)}`;
const failMessage = (message) => `✗ ${chalk.whiteBright(message)}`;

async function run() {
  const workspaceRoot = path.resolve(__dirname, '..');

  const eslintignoreContent = await fse.readFile(path.join(workspaceRoot, '.eslintignore'), {
    encoding: 'utf8',
  });
  const eslintignore = eslintignoreContent.split(/\r?\n/).slice(0, -1);

  const filenames = glob.sync('**/*.json', {
    cwd: workspaceRoot,
    ignore: [...eslintignore, 'tsconfig*.json', 'tslint.json'],
  });

  let passed = true;
  const checks = filenames.map(async (filename) => {
    const content = await fse.readFile(path.join(workspaceRoot, filename), { encoding: 'utf8' });
    try {
      JSON.parse(content);
      console.log(passMessage(filename));
    } catch (error) {
      passed = false;
      console.error(failMessage(`Error parsing ${filename}:\n\n${String(error)}`));
    }
  });

  await Promise.all(checks);
  if (passed === false) {
    throw new Error('At least one file did not pass. Check the console output');
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
