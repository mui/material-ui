const importModuleRegexp = /^import [^'"]* from ['"]([^'"\n ][^'"\n ]*)['"]/gm;

function extractImports(code, ignoredModules = []) {
  return (code.match(importModuleRegexp) || [])
    .map((x) => x.replace(importModuleRegexp, '$1'))
    .filter((x) => !ignoredModules.includes(x));
}

module.exports = {
  extractImports,
};
