const fs = require('fs');
const { snakeCase } = require('lodash');
const path = require('path');
const yargs = require('yargs');

// https://stackoverflow.com/a/49428486/3406963
function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}

function materialIconIdentifier(muiIconName) {
  return snakeCase(muiIconName).replace(/(\d)_/, '$1');
}

/**
 * @param {Set<string>} icons
 */
function iconsToString(icons) {
  return Array.from(icons, (icon) => {
    return `  - ![${icon}](https://fonts.gstatic.com/s/i/materialicons/${materialIconIdentifier(
      icon,
    )}/v8/24px.svg) ([material.io: ${materialIconIdentifier(
      icon,
    )}](https://material.io/resources/icons/?search=${materialIconIdentifier(
      icon,
    )}&icon=${materialIconIdentifier(icon)}&style=baseline))`;
  }).join('\n');
}

async function main(options) {
  const { patchFile } = options;
  const patchStream = patchFile !== undefined ? fs.createReadStream(patchFile) : process.stdin;
  const patch = await streamToString(patchStream);

  const newIcons = new Set();
  const newIconVariants = new Set();
  const deletedIcons = new Set();
  const deletedIconVariants = new Set();
  const modifiedIcons = new Set();
  const renamedIcons = new Map();
  patch.split(/\n\r?/).forEach((nameStatus) => {
    if (nameStatus.trim() === '') {
      return;
    }

    const [status, name, maybeNewName] = nameStatus.trim().split(/\t/);
    const isMuiIconChange = name.startsWith('packages/material-ui-icons/src/');
    if (!isMuiIconChange) {
      return;
    }

    const iconVariantName = path.basename(name, '.js');
    const variantMatch = iconVariantName.match(/^(\w+)(Outlined|Rounded|Sharp|TwoTone)$/);
    const iconName = variantMatch?.[1] ?? iconVariantName;

    if (status === 'A') {
      // If an icon is added, added variants are implied
      if (variantMatch === null) {
        newIcons.add(iconName);
      } else if (!newIcons.has(iconName)) {
        newIconVariants.add(iconVariantName);
      }
    } else if (status === 'M') {
      modifiedIcons.add(iconVariantName);
    } else if (status === 'D') {
      // If an icon is deleted, deleted variants are implied
      if (variantMatch === null) {
        deletedIcons.add(iconVariantName);
      } else if (!deletedIcons.has(iconName)) {
        deletedIconVariants.add(iconVariantName);
      }
    } else if (status.startsWith('R')) {
      const newName = path.basename(maybeNewName, '.js');
      const [, score] = status.match(/R(\d+)/);
      renamedIcons.set(iconVariantName, { score, newName });
    } else {
      console.warn(`Unable to parse git diff status '${status}'.`);
    }
  });

  const formattedPatch = `
<details>
  <summary>${newIcons.size} new icons</summary>

${iconsToString(newIcons)}
</details>
<details>
  <summary>${newIconVariants.size} new variants</summary>

${iconsToString(newIconVariants)}
</details>
<details>
  <summary>${deletedIcons.size} deleted icons</summary>

${iconsToString(deletedIcons)}
</details>
<details>
  <summary>${deletedIconVariants.size} deleted variants </summary>

${iconsToString(deletedIconVariants)}
</details>
<details>
  <summary>${renamedIcons.size} renamed icons</summary>

${Array.from(renamedIcons.entries(), ([oldIcon, { score, newName: icon }]) => {
  return `  - ![${icon}](https://fonts.gstatic.com/s/i/materialicons/${materialIconIdentifier(
    icon,
  )}/v8/24px.svg) (was ${oldIcon} (copy score: ${score}), [material.io: ${materialIconIdentifier(
    icon,
  )}](https://material.io/resources/icons/?search=${materialIconIdentifier(
    icon,
  )}&icon=${materialIconIdentifier(icon)}&style=baseline))`;
}).join('\n')}
</details>
<details>
  <summary>${modifiedIcons.size} modified variants</summary>

${iconsToString(modifiedIcons)}
</details>
  `;

  // eslint-disable-next-line no-console -- output of the script
  console.log(formattedPatch);
}

yargs
  .command({
    command: '$0 [patchFile]',
    description:
      'Parses a patch containing changes to icons in `@material-ui/icons` and creates a markdown file for human review.',
    handler: main,
    builder: (command) => {
      return command
        .positional('patchFile', {
          type: 'string',
          describe:
            'If you have put the output of `git diff --name-status next` in a file. By default the script uses stdin.',
        })
        .example('git diff --name-status next | $0 > icons-patch.md')
        .example('$0 icons-patch.diff > icons-patch.md');
    },
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
