const os = require('os');

/**
 * @param {string} source
 */
function getLineFeed(source) {
  const match = source.match(/\r?\n/);
  return match === null ? os.EOL : match[0];
}

const fixBabelIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r?\n){2}/g);
/**
 * @param {string} source
 */
function fixBabelGeneratorIssues(source) {
  return source.replace(fixBabelIssuesRegExp, '\n');
}

/**
 * @param {string} source
 * @param {string} target
 */
function fixLineEndings(source, target) {
  return target.replace(/\r?\n/g, getLineFeed(source));
}

/**
 * Converts styled or regular component d.ts file to unstyled d.ts
 * @param {string} filename - the file of the styled or regular mui component
 */
function getUnstyledFilename(filename, definitionFile = false) {
  if (filename.indexOf('Unstyled') > -1) {
    return filename;
  }
  let unstyledFile = '';

  const separator = filename.indexOf('/') > -1 ? '/' : '\\';

  if (filename.indexOf('material-ui-unstyled') === -1) {
    unstyledFile = filename.replace('.d.ts', '').replace('.ts', '').replace('.js', '');
    unstyledFile = unstyledFile.replace(/Styled/g, '');

    const pathParts = unstyledFile.split(separator);

    const componentName = pathParts[pathParts.length - 1];
    const directoryName = pathParts[pathParts.length - 2];

    const componentNameReg = new RegExp(componentName, 'g');

    if (separator === '/') {
      unstyledFile = unstyledFile.replace(
        /packages\/material-ui-lab|packages\/material-ui/g,
        'packages/material-ui-unstyled',
      );
    } else {
      unstyledFile = unstyledFile.replace(
        /packages\\material-ui-lab|packages\\material-ui/g,
        'packages\\material-ui-unstyled',
      );
    }

    unstyledFile = unstyledFile.replace(componentNameReg, `${componentName}Unstyled`);

    if (directoryName !== componentName) {
      const directoryNameReg = new RegExp(directoryName, 'g');
      unstyledFile = unstyledFile.replace(directoryNameReg, `${directoryName}Unstyled`);
    }
  }

  return definitionFile ? `${unstyledFile}.d.ts` : `${unstyledFile}.js`;
}

module.exports = {
  getLineFeed,
  fixBabelGeneratorIssues,
  fixLineEndings,
  getUnstyledFilename,
};
