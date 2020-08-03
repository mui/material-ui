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

module.exports = {
  getLineFeed,
  fixBabelGeneratorIssues,
  fixLineEndings,
};
