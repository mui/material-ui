const importModuleRegexp = /^import [^'"]* from ['"]([^'"\n ][^'"\n ]*)['"]/gm;

function extractImports(code) {
  return (code.match(importModuleRegexp) || []).map((x) => x.replace(importModuleRegexp, '$1'));
}

module.exports = extractImports;
