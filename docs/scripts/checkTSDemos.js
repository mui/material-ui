/* eslint-disable no-console */
/**
 * Checks if TS demos are equivalent to their JS counterparts.
 * Equivalent means that the transpiled and formatted TS source is equal to the
 * JS source.
 */
const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const util = require('util');

const exec = util.promisify(childProcess.exec);

async function getUnstagedGitFiles() {
  const { stdout } = await exec('git diff --name-only');
  const list = stdout.trim();

  if (list === '') {
    // "".split(" ") => [""]
    return [];
  }

  return list.split('\n');
}

function fixBabelGeneratorIssues(source) {
  return source.replace(/,\n\n/g, ',\n');
}

exec('yarn docs:typescript')
  .then(() => {
    const prettierConfigPath = path.join(__dirname, '../../prettier.config.js');
    const prettierConfig = prettier.resolveConfig(process.cwd(), { config: prettierConfigPath });

    return Promise.all([getUnstagedGitFiles(), prettierConfig]);
  })
  .then(([changedDemos, prettierConfig]) =>
    Promise.all(
      changedDemos.map(filename => {
        const filepath = path.join(process.cwd(), filename);

        return fse.readFile(filepath).then(source => {
          const prettified = prettier.format(source.toString(), { ...prettierConfig, filepath });
          const formatted = fixBabelGeneratorIssues(prettified);

          return fse.writeFile(filepath, formatted);
        });
      }),
    ),
  )
  .then(() => getUnstagedGitFiles())
  .then(unstagedFiles => {
    if (unstagedFiles.length > 0) {
      console.error(
        [
          'Some demos in TypeScript do not match their counterparts in js.',
          'See CONTRIBUTING.md#About TypeScript demos for further information.',
          'Try fixing the following demos:',
          unstagedFiles.map(jsSourcePath => jsSourcePath.replace(/\.js$/, '.tsx')).join('\n'),
        ].join('\n'),
      );
      process.exit(1);
    }
  });
