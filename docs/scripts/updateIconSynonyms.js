/* eslint-disable no-console */

import 'isomorphic-fetch';
import fse from 'fs-extra';
import path from 'path';
import synonyms from 'docs/src/pages/components/material-icons/synonyms';
import myDestRewriter from '../../packages/material-ui-icons/renameFilters/material-design-icons';

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function union(a, b) {
  return [...new Set([...a, ...b])];
}

async function run() {
  try {
    const response = await fetch('https://fonts.google.com/metadata/icons');
    const text = await response.text();
    const data = await JSON.parse(text.replace(")]}'", ''));
    let materialIcons = data.icons;

    const iconsReducer = (acc, icon) => {
      // remove the icon name strings from the tags
      icon.tags = not(icon.tags, icon.name.replace('_'));
      // Fix the 3 exceptions
      icon.name = myDestRewriter({ base: `ic_${icon.name}` });

      acc[icon.name] = icon.tags;
      return acc;
    };

    materialIcons = materialIcons.reduce(iconsReducer, {});

    // Merge the icon names from both lists
    const iconList = union(Object.keys(materialIcons), Object.keys(synonyms)).sort();

    let newSynonyms = 'const synonyms = {\n';
    iconList.forEach(icon => {
      const synonymsIconStrings = synonyms[icon] ? synonyms[icon].split(' ') : [];
      const materialIconStrings = materialIcons[icon] ? materialIcons[icon] : [];
      const mergedStrings = union(synonymsIconStrings, materialIconStrings).join(' ');

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
