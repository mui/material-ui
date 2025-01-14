/* eslint-disable no-console */
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { fileURLToPath } from 'url';
import { Queue, sleep, retry } from '@mui/internal-waterfall';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));

const legacyIconNames = new Set([
  'battery_20',
  'battery_30',
  'battery_50',
  'battery_60',
  'battery_80',
  'battery_90',
  'battery_charge_20',
  'battery_charge_20_two_tone',
  'battery_charge_30',
  'battery_charge_30_two_tone',
  'battery_charge_50',
  'battery_charge_50_two_tone',
  'battery_charge_60',
  'battery_charge_60_two_tone',
  'battery_charge_80',
  'battery_charge_80_two_tone',
  'battery_charge_90',
  'battery_charge_90_two_tone',
  'signal_cellular_1_bar',
  'signal_cellular_2_bar',
  'signal_cellular_3_bar',
  'signal_cellular_connected_no_internet_1_bar',
  'signal_cellular_connected_no_internet_2_bar',
  'signal_cellular_connected_no_internet_3_bar',
  'signal_wifi_1_bar',
  'signal_wifi_1_bar_lock',
  'signal_wifi_2_bar',
  'signal_wifi_2_bar_lock',
  'signal_wifi_3_bar',
  'signal_wifi_3_bar_lock',
]);

const themeMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_round',
  twotone: '_two_tone',
  sharp: '_sharp',
};

const themeFileMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_rounded',
  twotone: '_two_tone',
  sharp: '_sharp',
};

const familyMap = {
  baseline: 'Material Icons',
  outline: 'Material Icons Outlined',
  round: 'Material Icons Round',
  sharp: 'Material Icons Sharp',
  twotone: 'Material Icons Two Tone',
};

/**
 * Downloads an icon in various themes and saves it as an SVG file.
 *
 * @param {Object} icon - The icon object.
 * @param {string} icon.name - The name of the icon.
 * @param {number} icon.version - The version of the icon.
 * @param {number} icon.popularity - The popularity of the icon.
 * @param {number} icon.codepoint - The codepoint of the icon.
 * @param {string[]} icon.unsupported_families - The unsupported families of the icon.
 * @param {string[]} icon.categories - The categories of the icon.
 * @param {string[]} icon.tags - The tags associated with the icon.
 * @param {number[]} icon.sizes_px - The available sizes of the icon in pixels.
 * @returns {Promise<void[]>} A promise that resolves when all icons are downloaded and saved.
 */
function downloadIcon(icon) {
  console.log(`downloadIcon ${icon.index}: ${icon.name}`);

  return Promise.all(
    Object.keys(themeMap).map(async (theme) => {
      const formattedTheme = themeMap[theme].split('_').join('');
      const family = familyMap[theme];
      if (icon.unsupported_families.includes(family)) {
        console.log(`SKIP: ${icon.name} is not supported in ${family}`);
        return;
      }
      const response = await fetch(
        `https://fonts.gstatic.com/s/i/materialicons${formattedTheme}/${icon.name}/v${icon.version}/24px.svg`,
      );
      if (response.status !== 200) {
        if (response.status === 404) {
          console.log(`NOT FOUND: ${icon.name}${themeFileMap[theme]}_24px.svg`);
          return;
        }
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fse.writeFile(
        path.join(
          currentDirectory,
          `../material-icons/${icon.name}${themeFileMap[theme]}_24px.svg`,
        ),
        SVG,
      );
    }),
  );
}

async function run() {
  try {
    const argv = yargs(process.argv.slice(2))
      .usage('Download the SVG from material.io/resources/icons')
      .describe('start-after', 'Resume at the following index').argv;
    console.log('run', argv);
    await fse.emptyDir(path.join(currentDirectory, '../material-icons'));
    const response = await fetch(
      'https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true',
    );
    const text = await response.text();
    const data = JSON.parse(text.replace(")]}'", ''));
    let icons = data.icons;
    icons = icons.filter((icon) => {
      return !legacyIconNames.has(icon.name);
    });
    icons = icons.map((icon, index) => ({ index, ...icon }));
    icons = icons.splice(argv.startAfter || 0);
    console.log(`${icons.length} icons to download`);

    const queue = new Queue(
      async (icon) => {
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
