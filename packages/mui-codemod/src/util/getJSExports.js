import { readFileSync } from 'fs';
import { parseSync } from '@babel/core';
import traverse from '@babel/traverse';
import memoize from './memoize';

const getJSExports = memoize((file) => {
  const result = new Set();

  const ast = parseSync(readFileSync(file, 'utf8'), {
    filename: file,
  });

  traverse(ast, {
    // ExportAllDeclaration:(a)=>{
    //   result.add(a)
    // }
    ExportNamedDeclaration: (a) => {
      const specifiers = a.get('specifiers');

      const source = a.get('source').node.value;
      console.log(
        specifiers
          .find((specifier) => {
            console.log(specifier.get('exported').node.name);
            return specifier.get('exported').node.name === 'createFilterOptions';
          })
          ?.get('local').node.name,
      );

      result.add(a);
    },
    // ExportDefaultDeclaration: (a) => {
    //   result.add(a);
    // },
  });

  return result;
});

export default getJSExports;
