import fse from 'fs-extra';
import 'isomorphic-fetch';

const BASE_URL = 'https://material.io/tools/icons/static/icons';

const themeMap = {
  baseline: '',
  outline: 'outlined',
  round: 'rounded',
  twotone: 'two_tone',
  sharp: 'sharp',
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

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index]);
  }
}

async function getCategories() {
  const response = await fetch('https://material.io/tools/icons/static/data.json');
  const data = await response.json();
  return data.categories;
}

async function downloadFile(url, filePath) {
  const response = await fetch(url);
  const data = await response.text();
  await fse.writeFile(filePath, data);

  /* eslint-disable-next-line no-console */
  console.log('downloadFile', filePath);
}

async function downloadByCategory(category) {
  await asyncForEach(category.icons, async icon => {
    await Promise.all(
      Object.keys(themeMap).map(async theme => {
        const size = sizes[icon.id] && sizes[icon.id][theme] ? sizes[icon.id][theme] : 24;
        const url = `${BASE_URL}/${theme}-${icon.id}-${size}px.svg`;
        const filePath = `./material-design-icons/ic_${icon.id}_${themeMap[theme]}_${size}px.svg`;
        await downloadFile(url, filePath);
      }),
    );
    await sleep(500);
  });
}

async function run() {
  await fse.ensureDir('material-design-icons');
  const categories = await getCategories();
  await asyncForEach(categories, category => {
    return downloadByCategory(category);
  });
}

run();
