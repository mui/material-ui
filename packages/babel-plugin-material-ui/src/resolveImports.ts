import fs from 'fs';
import path from 'path';
import * as babel from '@babel/core';
import * as t from '@babel/types';
import { Packages } from './packages';

export type MappedImportsType = {
  [K in string]: Array<{ default: boolean; namespaceImport?: boolean; name: string }>
};

export default (indexPath: string, packageName: string): MappedImportsType => {
  let esPath = path.join(path.dirname(indexPath), 'es/index.js');
  if (!fs.existsSync(esPath)) {
    // If the file doesn't exist we're running the tests. The index.js file is
    // not transpiled so the exports can be collected from there
    esPath = indexPath;
  }
  const content = fs.readFileSync(esPath, 'utf8');

  const ast = babel.parseSync(content, {
    babelrc: false,
    configFile: false,
  });

  if (!ast || !t.isFile(ast)) {
    throw new Error(`Unable to parse ${esPath}`);
  }

  const importLookup: MappedImportsType = {};

  ast.program.body.forEach(node => {
    if (!(t.isExportNamedDeclaration(node) && node.source)) {
      return;
    }

    // Remove ./ from the file path
    const filePath = node.source.value.replace(/^\.\//, '');

    node.specifiers.forEach(spec => {
      if (!t.isExportSpecifier(spec)) {
        return;
      }

      if (importLookup[filePath] === undefined) {
        importLookup[filePath] = [];
      }

      importLookup[filePath].push({
        name: spec.exported.name,
        default: spec.local.name === 'default',
      });
    });
  });

  // @material-ui/core exports * from ./colors as colors
  if (packageName === Packages.Core) {
    importLookup['colors'] = [{ name: 'colors', default: false, namespaceImport: true }];
  }

  return importLookup;
};
