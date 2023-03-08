import { EOL } from 'os';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  let hasDisableBackdropClick = false;
  let handleOnEscapeKeyDown = false;

  let source = j(file.source)
    .findJSXElements('Modal')

    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (node.type === 'JSXAttribute') {
          if (node.name.name === 'disableBackdropClick') {
            hasDisableBackdropClick = true;
            delete attributes[index];
          }
          if (node.name.name === 'onEscapeKeyDown') {
            handleOnEscapeKeyDown = true;
            delete attributes[index];
          }
        }
      });
    })
    .toSource(printOptions);

  if (hasDisableBackdropClick) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      `$1// You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal)${EOL}$2`,
    );
  }

  if (hasDisableBackdropClick) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      `$1// \`disableBackdropClick\` is removed by codemod.${EOL}$2`,
    );
  }

  if (handleOnEscapeKeyDown) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      `$1${EOL}// \`handleOnEscapeKeyDown\` is removed by codemod.${EOL}$2`,
    );
  }

  return source;
}
