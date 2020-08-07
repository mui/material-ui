/* eslint-disable no-console */
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import path from 'path';
import synonyms from 'docs/src/pages/components/material-icons/synonyms';
import myDestRewriter from '../../packages/material-ui-icons/renameFilters/material-design-icons';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
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
      // remove the icon name strings from the tags
      icon.tags = not(icon.tags, icon.name.replace('_'));
      // Fix the 3 exceptions
      icon.name = myDestRewriter({ base: icon.name });

      acc[icon.name] = icon.tags;
      return acc;
    }, {});

    // Merge the icon names from both lists
    const iconList = union(Object.keys(materialIcons), Object.keys(synonyms)).sort(
      (a, b) => -b.localeCompare(a),
    );

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
      path.join(__dirname, `../../docs/src/pages/components/material-icons/synonyms.js`),
      newSynonyms,
    );
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

run();
