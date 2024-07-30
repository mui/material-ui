/* eslint-disable no-console */
import path from 'path';
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import * as mui from '@mui/icons-material';
import synonyms from 'docs/data/material/components/material-icons/synonyms';
import myDestRewriter from '../../packages/mui-icons-material/renameFilters/material-design-icons';

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function union(a, b) {
  return [...new Set([...a, ...b])];
}

async function run() {
  try {
    const response = await fetch('https://fonts.google.com/metadata/icons');
    const text = await response.text();
    const data = JSON.parse(text.replace(")]}'", ''));

    const materialIcons = data.icons.reduce((acc, icon) => {
      icon.tags = not(icon.tags, icon.name.replace('_')) // remove the icon name strings from the tags
        .filter((t) => {
          // remove invalid tags
          if (
            t.includes('Remove') ||
            t.includes('Duplicate') ||
            t.includes('Same as') ||
            t.includes('remove others')
          ) {
            console.log(`Skipping invalid tag (${t}) in ${icon.name}`);
            return false;
          }

          return true;
        })
        .map((t) => t.replace(/'/g, ''));

      // Fix names that can't be exported as ES modules.
      icon.name = myDestRewriter({ base: icon.name });

      acc[icon.name] = icon.tags;
      return acc;
    }, {});

    const npmPackageIcons = Object.keys(mui).reduce((acc, icon) => {
      const name = icon.replace(/(Outlined|TwoTone|Rounded|Sharp)$/, '');
      acc[name] = true;
      return acc;
    }, {});

    const iconList = union(Object.keys(materialIcons), Object.keys(synonyms))
      .filter((icon) => {
        // The icon is not in @mui/material so no point in having synonyms.
        return npmPackageIcons[icon];
      })
      .sort((a, b) => -b.localeCompare(a));

    let newSynonyms = 'const synonyms = {\n';
    iconList.forEach((icon) => {
      const synonymsIconStrings = synonyms[icon] ? synonyms[icon].split(' ') : [];

      // Some MD tags have multiple words in a string, so we separate those out to dedupe them
      const materialIconStrings = materialIcons[icon]
        ? materialIcons[icon].reduce((tags, tag) => tags.concat(tag.split(' ')), [])
        : [];

      let mergedStrings = union(synonymsIconStrings, materialIconStrings);
      mergedStrings = mergedStrings
        // remove strings that are substrings of others
        .filter((tag) => !mergedStrings.some((one) => one.includes(tag) && one !== tag))
        .sort()
        .join(' ');

      if (mergedStrings !== '') {
        newSynonyms += `  ${icon}: '${mergedStrings}',\n`;
      }
    });
    newSynonyms += '};\n\nexport default synonyms;\n';

    fse.writeFile(
      path.join(__dirname, `../../docs/data/material/components/material-icons/synonyms.js`),
      newSynonyms,
    );

    console.log('Stats:');
    console.log(`${iconList.length} synonyms icons in the generated file`);
    console.log(`${Object.keys(npmPackageIcons).length} icons in @mui/material`);
    console.log(`${Object.keys(materialIcons).length} icons in Material Design`);
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

run();
