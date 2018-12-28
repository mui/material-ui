/* eslint-disable no-console */

import fse from 'fs-extra';
import yargs from 'yargs';
import path from 'path';
import util from 'util';
import glob from 'glob';

const globAsync = util.promisify(glob);

async function generateIndex(options) {
  const files = await globAsync(path.join(options.out, '*.js'));
  const index = files
    .map(file => {
      const typename = path.basename(file).replace('.js', '');
      return `export { default as ${typename} } from './${typename}';\n`;
    })
    .join('');

  await fse.writeFile(path.join(options.out, 'index.js'), index);
}

async function main(options) {
  try {
    const exists1 = await fse.exists(options.out);
    if (!exists1) {
      await fse.mkdir(options.out);
    }

    await generateIndex(options);
  } catch (err) {
    console.log(err);
  }
}

if (require.main === module) {
  const argv = yargs
    .usage('Create index file for icon components.\nUsage: $0')
    .demand('out')
    .describe('out', 'Directory for the icon components').argv;
  main(argv);
}

export default {
  main,
};
