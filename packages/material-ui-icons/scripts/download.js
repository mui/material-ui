/* eslint-disable no-console */
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import Queue from 'modules/waterfall/Queue';
import sleep from 'modules/waterfall/sleep';
import retry from 'modules/waterfall/retry';

// Icons we don't publish.
// This is just a list of new icons.
// In the future we might change what icons we want to exclude (e.g. by popularity)
const ignoredIconNames = new Set([
  'ads_click',
  'area_chart',
  'back_hand',
  'checklist',
  'checklist_rtl',
  'compost',
  'cruelty_free',
  'data_exploration',
  'disabled_visible',
  'draw',
  'drive_file_move_rtl',
  'edit_calendar',
  'edit_note',
  'emergency',
  'free_cancellation',
  'front_hand',
  'generating_tokens',
  'group_off',
  'hotel_class',
  'incomplete_circle',
  'new_label',
  'personal_injury',
  'pin_end',
  'pin_invoke',
  'private_connectivity',
  'real_estate_agent',
  'recycling',
  'space_dashboard',
  'tips_and_updates',
  'water_drop',
  'waving_hand',
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

function downloadIcon(icon) {
  console.log(`downloadIcon ${icon.index}: ${icon.name}`);

  return Promise.all(
    Object.keys(themeMap).map(async (theme) => {
      const formattedTheme = themeMap[theme].split('_').join('');
      const response = await fetch(
        `https://fonts.gstatic.com/s/i/materialicons${formattedTheme}/${icon.name}/v${icon.version}/24px.svg`,
      );
      if (response.status !== 200) {
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fse.writeFile(
        path.join(__dirname, `../material-icons/${icon.name}${themeFileMap[theme]}_24px.svg`),
        SVG,
      );
    }),
  );
}

async function run() {
  try {
    const argv = yargs
      .usage('Download the SVG from material.io/resources/icons')
      .describe('start-after', 'Resume at the following index').argv;
    console.log('run', argv);
    await fse.emptyDir(path.join(__dirname, '../material-icons'));
    const response = await fetch('https://fonts.google.com/metadata/icons');
    const text = await response.text();
    const data = JSON.parse(text.replace(")]}'", ''));
    let icons = data.icons;
    icons = icons.filter((icon) => {
      return !ignoredIconNames.has(icon.name);
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
