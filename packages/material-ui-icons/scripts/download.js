/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

import fse from 'fs-extra';
import fetch from 'isomorphic-fetch';

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

function getIconList(callback) {
  fetch('https://material.io/tools/icons/static/data.json')
    .then(response => response.json())
    .then(data => {
      callback(data.categories);
    })
    .catch(error => console.error(error));
}

const downloadByCategory = async category => {
  async function asyncForEach(array, callback) {
    function sleep(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }

    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index]);
      await sleep(500);
    }
  }

  async function downloadFile(url, filePath) {
    await fetch(url)
      .then(response => response.text())
      .then(data => {
        fse.writeFile(filePath, data, err => {
          if (err) {
            return console.error(err);
          }
          return console.log(filePath);
        });
      });
  }

  await asyncForEach(category.icons, async icon => {
    Object.keys(themeMap).forEach(theme => {
      const size = sizes[icon.id] && sizes[icon.id][theme] ? sizes[icon.id][theme] : 24;
      const url = `${BASE_URL}/${theme}-${icon.id}-${size}px.svg`;
      const filePath = `./material-design-icons/ic_${icon.id}_${themeMap[theme]}_${size}px.svg`;
      downloadFile(url, filePath);
    });
  });
};

fse.ensureDir('material-design-icons');

getIconList(iconList => {
  iconList.forEach(category => {
    downloadByCategory(category);
  });
});
