/* eslint-disable no-console */

import fse from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import Queue from 'modules/waterfall/Queue';
import sleep from 'modules/waterfall/sleep';
import retry from 'modules/waterfall/retry';
import 'isomorphic-fetch';

const themeMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_rounded',
  twotone: '_two_tone',
  sharp: '_sharp',
};

function downloadIcon(icon) {
  console.log(`downloadIcon ${icon.index}: ${icon.id}`);

  return Promise.all(
    Object.keys(themeMap).map(async theme => {
      let endUrl;
      if (icon.imageUrls && icon.imageUrls[theme]) {
        endUrl = icon.imageUrls[theme];
      } else {
        endUrl = `${theme}-${icon.id}-24px.svg`;
      }
      const size = endUrl.match(/^.*-([0-9]+)px.svg$/)[1];
      const response = await fetch(`https://material.io/tools/icons/static/icons/${endUrl}`);
      if (response.status !== 200) {
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fse.writeFile(
        path.join(
          __dirname,
          `../material-io-tools-icons/ic_${icon.id}${themeMap[theme]}_${size}px.svg`,
        ),
        SVG,
      );
    }),
  );
}

async function run() {
  try {
    const argv = yargs
      .usage('Download the SVG from material.io/tools/icons')
      .describe('start-after', 'Resume at the following index').argv;
    console.log('run', argv);
    await fse.ensureDir(path.join(__dirname, '../material-io-tools-icons'));
    const response = await fetch('https://material.io/tools/icons/static/data.json');
    const data = await response.json();
    let icons = data.categories.reduce((acc, item) => acc.concat(item.icons), []);
    icons = icons.map((icon, index) => ({ index, ...icon }));
    icons = icons.splice(argv.startAfter || 0);
    console.log(`${icons.length} icons to download`);

    const queue = new Queue(
      async icon => {
        await retry(async ({ tries }) => {
          await sleep((tries - 1) * 100);
          await downloadIcon(icon);
        });
      },
      { concurrency: 5 },
    );
    queue.push(icons);
    await queue.wait({ empty: true });
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

run();
