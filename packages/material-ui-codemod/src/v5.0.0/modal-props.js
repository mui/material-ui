/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

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
    .toSource();

  if (hasDisableBackdropClick || hasDisableBackdropClick) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      '$1// You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#modal)\n$2',
    );
  }

  if (hasDisableBackdropClick) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      '$1// `disableBackdropClick` is removed by codemod.\n$2',
    );
  }

  if (handleOnEscapeKeyDown) {
    source = source.replace(
      /(<Modal)([\s\S]*>)/gm,
      '$1\n// `handleOnEscapeKeyDown` is removed by codemod.\n$2',
    );
  }

  return source;
}
