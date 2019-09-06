import fs from 'fs';
import path from 'path';
import { types as t, parseSync } from '@babel/core';
import { Packages } from './packages';

export enum ImportType {
  Default,
  Namespace,
  Named,
}

export type MappedImportsType = Record<string, Array<{ name: string; type: ImportType }>>;

export default (packageName: string): MappedImportsType => {
  const pkgPath = require.resolve(`${packageName}/package.json`);
  const pkg = require(pkgPath);
  const modulePath = path.join(path.dirname(pkgPath), pkg.module ? pkg.module : pkg.main);

  const content = fs.readFileSync(modulePath, 'utf8');
  const ast = parseSync(content, {
    babelrc: false,
    configFile: false,
  });

  if (!ast || !t.isFile(ast)) {
    throw new Error(`Unable to parse ${modulePath}`);
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
        type: spec.local.name === 'default' ? ImportType.Default : ImportType.Named,
      });
    });
  });

  // @material-ui/core exports * from ./colors as colors
  if (packageName === Packages.Core) {
    importLookup['colors'] = [{ name: 'colors', type: ImportType.Namespace }];
  }

  return importLookup;
};
