import fs from 'fs';
import * as babel from '@babel/core';
import * as t from '@babel/types';

export type MappedImportsType = { [K in string]: Array<{ default: boolean; name: string }> };

export default (indexPath: string): MappedImportsType => {
  indexPath = indexPath.replace(/\.js$/, '.d.ts');
  const content = fs.readFileSync(indexPath, 'utf8');

  const ast = babel.parseSync(content, {
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-syntax-typescript'],
  });

  if (!ast || !t.isFile(ast)) {
    throw new Error(`Unable to parse ${indexPath}`);
  }

  const importLookup: MappedImportsType = {};

  ast.program.body.forEach(node => {
    if (!(t.isExportNamedDeclaration(node) && node.source)) {
      return;
    }

    node.specifiers.forEach(spec => {
      if (!t.isExportSpecifier(spec)) {
        return;
      }

      const filePath = node.source!.value.replace(/^\.\//, '');
      if (importLookup[filePath] === undefined) {
        importLookup[filePath] = [];
      }

      importLookup[filePath].push({
        name: spec.exported.name,
        default: spec.local.name === 'default',
      });
    });
  });

  return importLookup;
};
