const importModuleRegexp =
  /^\s*import (?:["'\s]*(?:[\w*{}\n, ]+)from\s*)?["'\s]*([^"'{}$\s]+)["'\s].*/gm;

function extractImports(code) {
  return (code.match(importModuleRegexp) || []).map((x) => x.replace(importModuleRegexp, '$1'));
}

module.exports = extractImports;
