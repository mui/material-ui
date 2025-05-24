/* eslint-disable no-console */
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { fileURLToPath } from 'url';
import { Queue, sleep, retry } from '@mui/internal-waterfall';
import lockfile from 'proper-lockfile';
import { rewriteName } from '../variantCollectors/material-design-symbols.mjs';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));
const versionFile = path.join(currentDirectory, '../versions.json');

// Icons we don't publish.
// This is just a list of new icons.
// In the future we might change what icons we want to exclude (for example by popularity)
const ignoredIconNames = new Set([
  // TODO v6: Whatsapp duplicates with WhatsApp
  // We don't need it https://fonts.google.com/icons?icon.set=Material+Icons&icon.query=whatsapp
  // 'whatsapp'
  '123',
  '6_ft_apart',
  'add_chart', // Leads to inconsistent casing with `Addchart`
  'exposure_neg_1', // Google product
  'exposure_neg_2', // Google product
  'exposure_plus_1', // Google product
  'exposure_plus_2', // Google product
  'exposure_zero', // Google product
  'horizontal_distribute', // Advanced text editor
  'motion_photos_on', // Google product
  'motion_photos_pause', // Google product
  'motion_photos_paused', // Google product
  'polymer', // Legacy brand
  'vertical_distribute', // Advanced text editor
]);

const legacyIconNames = new Set([]);

const themes = ['outlined', 'rounded', 'sharp'];
const familyMap = {
  outlined: 'Material Symbols Outlined',
  rounded: 'Material Symbols Rounded',
  sharp: 'Material Symbols Sharp',
};
const familyDirMap = {
  outlined: 'materialsymbolsoutlined',
  rounded: 'materialsymbolsrounded',
  sharp: 'materialsymbolssharp',
};

const variants = {
  weight: [100, 200, 300, 400, 500, 600, 700],
  grade: [-25, 0, 200],
  fill: [true, false],
  opticalSize: [20, 24, 40, 48],
};

const skipCombinations = [
  // "Don't use the lightest weight for standard-size (24dp) icons. The minimum weight for the size is 200."
  // source: https://m3.material.io/styles/icons/applying-icons#6136ec4a-296f-4b9c-b90d-4ff2896d1ce7
  { weight: 100, opticalSize: 20 },
  { weight: 100, opticalSize: 24 },
];

function generateVariants() {
  const result = [];

  variants.weight.forEach((weight) => {
    variants.grade.forEach((grade) => {
      variants.fill.forEach((fill) => {
        variants.opticalSize.forEach((opticalSize) => {
          const combo = { fill, weight, grade, opticalSize };

          // if ANY skip rule fully matches this combo, skip it
          const shouldSkip = skipCombinations.some((skip) =>
            Object.entries(skip).every(([key, val]) => combo[key] === val),
          );
          if (shouldSkip) {
            return;
          }

          // build the filename prefix
          let prefix = '';
          if (weight !== 400) {
            prefix += `wght${weight}`;
          }
          if (grade !== 0) {
            prefix += `grad${grade < 0 ? `N${Math.abs(grade)}` : grade}`;
          }
          if (fill) {
            prefix += 'fill1';
          }

          // default when nothing else applied
          let isDefault = false;
          if (!prefix) {
            isDefault = true;
            prefix = 'default';
          }

          const url = `${prefix}/${opticalSize}px.svg`;
          result.push({ fill, weight, grade, opticalSize, url, prefix, isDefault });
        });
      });
    });
  });

  return result;
}

const variantsList = generateVariants();

function sanitizeTags(name, tags) {
  const iconName = name.replace('_');
  return tags
    .filter((value) => !iconName.includes(value)) // remove the icon name strings from the tags
    .filter((t) => {
      // remove invalid tags
      if (
        t.includes('Remove') ||
        t.includes('Duplicate') ||
        t.includes('Same as') ||
        t.includes('remove others')
      ) {
        console.log(`Skipping invalid tag (${t}) in ${name}`);
        return false;
      }

      return true;
    })
    .map((t) => t.replace(/'/g, ''));
}

const iconsOutputString = (icons) =>
  icons
    .map(
      ({ name, module }) => `
  {
    name: "${name}",
    module: "${module}",
  },`,
    )
    .join('');

const synonymsOutputString = (icons) =>
  icons
    .map(
      ({ module, name, tags }) => `
  ${module}: '${sanitizeTags(name, tags).join(' ')}',`,
    )
    .join('');

const iconsByCategoriesOutputString = (categories) =>
  Object.keys(categories)
    .map(
      (categoryKey) => `
  "${categoryKey}": [
${categories[categoryKey].map((icon) => `    "${icon}",`).join('\n')}
  ],`,
    )
    .join('');

/**
 * Updates the metadata json files
 * @param {Object[]} icons - The list of icons to update metadata for.
 * @param {string} icons[].name - The name of the icon.
 * @param {number} icons[].popularity - The popularity of the icon.
 * @param {number[]} icons[].sizes_px - The available sizes of the icon in pixels.
 * @param {string[]} icons[].tags - The tags associated with the icon.
 * @param {string[]} icons[].categories - The categories of the icon.
 * @returns {Promise<void[]>} A promise that resolves when the metadata is updated.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateMetadata(icons) {
  // TODO: Are we able to use this data? It's not explicitly licensed
  // https://github.com/google/material-design-icons/issues/1332#issuecomment-1258053181
  icons = icons
    .map((icon) => ({
      ...icon,
      module: rewriteName(icon.name),
    }))
    .sort((a, b) => a.module.localeCompare(b.module));

  const iconsOrderedByPopularity = [...icons].sort((a, b) => {
    // the larger the number, the more popular
    return b.popularity - a.popularity;
  });

  const iconsByCategory = {};
  const iconsByTag = {};
  icons.forEach((icon) => {
    icon.categories.forEach((tag) => {
      if (iconsByCategory[tag]) {
        iconsByCategory[tag].push(icon.name);
      } else {
        iconsByCategory[tag] = [icon.name];
      }
    });

    icon.tags.forEach((tag) => {
      if (iconsByTag[tag]) {
        iconsByTag[tag].push(icon.name);
      } else {
        iconsByTag[tag] = [icon.name];
      }
    });
  });

  await Promise.all([
    fse.writeFile(
      path.join(currentDirectory, '../icons.js'),
      `const icons = [${iconsOutputString(icons)}\n];\n\nexport default icons;\n`,
    ),
    fse.writeFile(
      path.join(currentDirectory, '../iconsOrderedByPopularity.js'),
      `const iconsOrderedByPopularity = [${iconsOutputString(iconsOrderedByPopularity)}\n];\n\nexport default iconsOrderedByPopularity;\n`,
    ),
    fse.writeFile(
      path.join(currentDirectory, '../synonyms.js'),
      `const synonyms = {${synonymsOutputString(icons)}\n};\n\nexport default synonyms;\n`,
    ),
    fse.writeFile(
      path.join(currentDirectory, '../categories.js'),
      `const iconsByCategory = {${iconsByCategoriesOutputString(iconsByCategory)}\n};\n\nexport default iconsByCategory;\n`,
    ),
    fse.writeFile(
      path.join(currentDirectory, '../tags.js'),
      `const iconsByTag = {${iconsByCategoriesOutputString(iconsByTag)}\n};\n\nexport default iconsByTag;\n`,
    ),
  ]);
}

/**
 * Downloads an icon in various themes and variants and saves it as an SVG file.
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
async function downloadIconVariants(icon) {
  console.log(`downloadIconVariants ${icon.index}: ${icon.name}`);

  await Promise.all(
    themes.map(async (theme) => {
      const family = familyMap[theme];
      if (icon.unsupported_families.includes(family)) {
        return;
      }

      const queue = new Queue(
        async (variant) => {
          await retry(async ({ tries }) => {
            await sleep((tries - 1) * 100);

            const fileUrl = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols${theme}/${icon.name}/${variant.url}`;
            const response = await fetch(fileUrl);
            if (response.status !== 200) {
              throw new Error(`status ${response.status} for ${fileUrl}`);
            }
            const SVG = await response.text();

            // output the SVG, mirror the same structure as the material repo in case we move to submodules
            // https://github.com/google/material-design-icons/tree/master/symbols/web
            const directory = path.join(
              currentDirectory,
              `../material-symbols/${icon.name}/${familyDirMap[theme]}`,
            );
            const svgPath = `${directory}/${icon.name}${!variant.isDefault ? `_${variant.prefix}` : ''}_${variant.opticalSize}px.svg`;
            await fse.ensureDir(directory);
            await fse.writeFile(svgPath, SVG);
          });
        },
        { concurrency: 5 },
      );
      queue.push(variantsList);
      await queue.wait({ empty: true });
    }),
  );

  // update the version file after all icons have been successfully downloaded
  const release = await lockfile.lock(versionFile, { retries: 10 });
  const versions = await fse.readJSON(versionFile);
  versions[icon.name] = icon.version;
  await fse.writeJSON(versionFile, versions, { spaces: 2 });
  release();
}

async function run() {
  try {
    const argv = yargs(process.argv.slice(2))
      .usage('Download the SVG from material.io/resources/icons')
      .describe('start-after', 'Resume at the following index').argv;
    console.log('run', argv);

    await fse.ensureDir(path.join(currentDirectory, '../material-symbols'));
    await fse.ensureDir(path.join(currentDirectory, '../'));
    const response = await fetch(
      'https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true',
    );
    const text = await response.text();
    // Use same parsing method as material repo:
    // https://github.com/google/material-design-icons/blob/941fa95d7f6084a599a54ca71bc565f48e7c6d9e/update/update_symbols.py#L90
    const data = JSON.parse(text.substring(5));
    let icons = data.icons;

    const supportedSet = new Set(Object.values(familyMap));
    icons = icons.filter((icon) => {
      return (
        !icon.unsupported_families.some((family) => supportedSet.has(family)) &&
        !ignoredIconNames.has(icon.name) &&
        !legacyIconNames.has(icon.name)
      );
    });

    await updateMetadata(icons);

    const totalIcons = icons.length;
    console.log(`total icons: ${totalIcons}`);

    // allow resuming the download at a given index
    icons = icons.map((icon, index) => ({ index, ...icon }));
    icons = icons.splice(argv.startAfter || 0);

    // we don't need to download the icons that haven't been updated
    // since the last time we downloaded them
    const versions = await fse.readJSON(versionFile).catch(() => {
      console.log('version file not found, creating a new one');
      fse.writeJSON(versionFile, {});
      return {};
    });
    icons = icons.filter((icon) => icon.version !== versions[icon.name]);

    console.log(`${icons.length} icons to download`);

    const queue = new Queue(
      async (icon) => {
        await retry(async ({ tries }) => {
          await sleep((tries - 1) * 100);
          await downloadIconVariants(icon);
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
