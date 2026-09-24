/* eslint-disable no-console */
import path from 'path';
import fs from 'node:fs';
import fetch from 'cross-fetch';
import * as mui from '@mui/icons-material';
import synonyms from 'docs/data/material/components/material-icons/synonyms';
import iconDescriptions from 'docs/data/material/components/material-icons/iconDescriptions.json';
// eslint-disable-next-line import/no-relative-packages
import myDestRewriter from '../../packages/mui-icons-material/renameFilters/material-design-icons';
// eslint-disable-next-line import/no-relative-packages, import/extensions
import { LEGACY_OUTLINE_ICONS } from '../../packages/mui-icons-material/legacyOutlineIcons.mjs';

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

    const iconList = union(
      union(Object.keys(materialIcons), Object.keys(synonyms)),
      Object.keys(iconDescriptions),
    )
      .filter((icon) => {
        // The icon is not in @mui/material so no point in having synonyms.
        // Also exclude legacy *Outline duplicates removed in v9.
        return npmPackageIcons[icon] && !LEGACY_OUTLINE_ICONS.includes(icon);
      })
      .sort((a, b) => -b.localeCompare(a));

    let newSynonyms = 'const synonyms = {\n';
    iconList.forEach((icon) => {
      const synonymsIconStrings = synonyms[icon] ? synonyms[icon].split(' ') : [];

      // Some MD tags have multiple words in a string, so we separate those out to dedupe them
      const materialIconStrings = materialIcons[icon]
        ? materialIcons[icon].reduce((tags, tag) => tags.concat(tag.split(' ')), [])
        : [];

      // Generated keywords and visual description, see the icon-descriptions skill
      const description = iconDescriptions[icon];
      const descriptionStrings = description
        ? `${description.keywords.join(' ')} ${description.visual}`
            .toLowerCase()
            .split(/[^a-z0-9-]+/)
            .filter(Boolean)
        : [];

      // The words of the icon name (ArrowBack -> arrow back), for search engines that match
      // whole words
      const nameStrings = (icon.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) ?? [])
        .map((word) => word.toLowerCase())
        .filter((word) => word.length > 1);

      let mergedStrings = union(
        union(union(synonymsIconStrings, materialIconStrings), descriptionStrings),
        nameStrings,
      );
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

    fs.writeFileSync(
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
