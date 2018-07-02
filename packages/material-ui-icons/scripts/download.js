/* eslint-disable no-console */

import fse from 'fs-extra';
import yargs from 'yargs';
import 'isomorphic-fetch';

const themeMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_rounded',
  twotone: '_two_tone',
  sharp: '_sharp',
};

// Some icons have different sizes.
const sizes = {
  cast_for_education: {
    baseline: 48,
  },
  domain: {
    baseline: 48,
  },
  play_circle_filled_white: {
    baseline: 48,
  },
  settings: {
    baseline: 20,
  },
  star_rate: {
    baseline: 18,
    outline: 18,
    round: 18,
    twotone: 18,
    sharp: 18,
  },
  weekend: {
    baseline: 48,
  },
};

async function asyncForEach(array, callback, startAfter = 0) {
  for (let index = startAfter; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index);
  }
}

function downloadIcon(icon, index) {
  console.log(`downloadIcon ${index}: ${icon.id}`);

  return Promise.all(
    Object.keys(themeMap).map(async theme => {
      const size = sizes[icon.id] && sizes[icon.id][theme] ? sizes[icon.id][theme] : 24;
      const response = await fetch(
        `https://material.io/tools/icons/static/icons/${theme}-${icon.id}-${size}px.svg`,
      );
      const SVG = await response.text();
      await fse.writeFile(
        `./material-design-icons/${icon.id}${themeMap[theme]}_${size}px.svg`,
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
    await fse.ensureDir('material-design-icons');
    const response = await fetch('https://material.io/tools/icons/static/data.json');
    const data = await response.json();
    const icons = data.categories.reduce((acc, item) => {
      return acc.concat(item.icons);
    }, []);
    console.log(`${icons.length} icons to download`);
    await asyncForEach(icons, downloadIcon, argv.startAfter);
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

run();
