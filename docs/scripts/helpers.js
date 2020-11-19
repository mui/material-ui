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
 *
 * @param {string} tsFile - the definition file of the styled or regular mui component
 */
function getUnstyledDefinitionFilename(tsFile) {
  if (tsFile.indexOf('Unstyled') > -1) {
    return tsFile;
  }
  let unstyledFile = '';

  const separator = tsFile.indexOf('/') > -1 ? '/' : '\\';

  if (tsFile.endsWith('.d.ts') && tsFile.indexOf('material-ui-unstyled') === -1) {
    unstyledFile = tsFile;
    unstyledFile = unstyledFile.replace(/Styled/g, '');

    const pathParts = unstyledFile.split(separator);

    const componentName = pathParts[pathParts.length - 1].replace('.d.ts', '');
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

  return unstyledFile;
}

module.exports = {
  getLineFeed,
  fixBabelGeneratorIssues,
  fixLineEndings,
  getUnstyledDefinitionFilename,
};
