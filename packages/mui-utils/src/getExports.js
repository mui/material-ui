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
      //   const specifiers = a.get('specifiers');

      //   const source = a.get('source').node.value;
      //   console.log(
      //     specifiers
      //       .find((specifier) => {
      //         console.log(specifier.get('exported').node.name);
      //         return specifier.get('exported').node.name === 'createFilterOptions';
      //       })
      //       ?.get('local').node.name,
      //   );
    },
    ExportDefaultDeclaration: (data) => {
      exports.default.push(data);
    },
  });

  return exports;
};

export default getExports;
