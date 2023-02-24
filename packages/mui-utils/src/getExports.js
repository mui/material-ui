import { readFileSync } from 'fs';
import { parseSync } from '@babel/core';
import traverse from '@babel/traverse';

const getExports = (file) => {
  const exports = {
    all: [],
    named: [],
    default: [],
  };

  const ast = parseSync(readFileSync(file, 'utf8'), {
    filename: file,
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
