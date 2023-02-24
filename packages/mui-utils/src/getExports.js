import { parseSync } from '@babel/core';
import traverse from '@babel/traverse';

const getExports = (file, fileName) => {
  const exports = {
    all: [],
    named: [],
    default: [],
  };

  const ast = parseSync(file, {
    filename: fileName,
  });

  traverse(ast, {
    ExportAllDeclaration: (data) => {
      exports.all.push(data);
    },
    ExportNamedDeclaration: (data) => {
      exports.named.push(data);
    },
    ExportDefaultDeclaration: (data) => {
      exports.default.push(data);
    },
  });

  return exports;
};

export default getExports;
