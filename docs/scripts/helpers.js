const os = require('os');

function getLineFeed(source) {
  const match = source.match(/\r?\n/);
  return match === null ? os.EOL : match[0];
}

const fixBabelIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r?\n){2}/g);
function fixBabelGeneratorIssues(source) {
  return source.replace(fixBabelIssuesRegExp, '\n');
}

function fixLineEndings(source, target) {
  return target.replace(/\r?\n/g, getLineFeed(source));
}

module.exports = {
  getLineFeed,
  fixBabelGeneratorIssues,
  fixLineEndings,
};
