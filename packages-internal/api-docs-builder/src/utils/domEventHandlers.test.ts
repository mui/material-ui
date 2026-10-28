import path from 'node:path';
import { describe, it, expect } from 'vitest';
import * as ts from '@typescript/typescript6';
import { DOM_EVENT_HANDLERS } from './domEventHandlers';

function getReactDomEventHandlers() {
  const fileName = path.join(import.meta.dirname, 'domAttributes.virtual.ts');
  const source = `import type { DOMAttributes } from 'react';
export interface Attributes extends DOMAttributes<HTMLElement> {}`;
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
    types: [],
    noEmit: true,
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (name, languageVersion, ...other) =>
    name === fileName
      ? ts.createSourceFile(name, source, languageVersion)
      : getSourceFile(name, languageVersion, ...other);
  const program = ts.createProgram([fileName], options, host);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(fileName)!;
  const symbol = checker.getSymbolAtLocation(sourceFile)!;
  const attributes = checker.getExportsOfModule(symbol).find((s) => s.name === 'Attributes')!;
  return checker
    .getDeclaredTypeOfSymbol(attributes)
    .getProperties()
    .map((property) => property.name)
    .filter((name) => /^on[A-Z]/.test(name))
    .sort();
}

describe('DOM_EVENT_HANDLERS', () => {
  it('matches the event handlers of React.DOMAttributes', () => {
    expect([...DOM_EVENT_HANDLERS].sort()).to.deep.equal(getReactDomEventHandlers());
  });
});
