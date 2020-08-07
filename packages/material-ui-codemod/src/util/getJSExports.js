import memoize from './memoize';
import { readFileSync } from 'fs';
import { parseSync } from '@babel/core';
import traverse from '@babel/traverse';

const getJSExports = memoize((file) => {
  const result = new Set();

  const ast = parseSync(readFileSync(file, 'utf8'), {
    filename: file,
  });

  traverse(ast, {
    ExportSpecifier: ({ node: { exported } }) => {
      result.add(exported.name);
    },
  });

  return result;
});

export default getJSExports;
