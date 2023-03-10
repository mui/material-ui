import * as ts from 'typescript';
import path from 'path';
import fs from 'fs';

export interface TypeScriptProject {
  name: string;
  rootPath: string;
  exports: Record<string, ts.Symbol>;
  program: ts.Program;
  checker: ts.TypeChecker;
}

interface CreateTypeScriptProjectOptions {
  name: string;
  rootPath: string;
  /**
   * Config to use to build this package.
   * The path must be relative to the root path.
   * @default 'tsconfig.build.json`
   */
  tsConfigPath?: string;
  /**
   * File used as root of the package.
   * The path must be relative to the root path.
   */
  entryPointPath: string;
}

export const createTypeScriptProject = (
  options: CreateTypeScriptProjectOptions,
): TypeScriptProject => {
  const {
    name,
    rootPath,
    tsConfigPath: inputTsConfigPath = 'tsconfig.build.json',
    entryPointPath: inputEntryPointPath = 'src/index.ts',
  } = options;

  const tsConfigPath = path.join(rootPath, inputTsConfigPath);
  const entryPointPath = path.join(rootPath, inputEntryPointPath);

  const tsConfigFile = ts.readConfigFile(tsConfigPath, (filePath) =>
    fs.readFileSync(filePath).toString(),
  );

  if (tsConfigFile.error) {
    throw tsConfigFile.error;
  }

  const tsConfigFileContent = ts.parseJsonConfigFileContent(
    tsConfigFile.config,
    ts.sys,
    path.dirname(tsConfigPath),
  );

  if (tsConfigFileContent.errors.length > 0) {
    throw tsConfigFileContent.errors[0];
  }

  const program = ts.createProgram({
    rootNames: [entryPointPath],
    options: tsConfigFileContent.options,
  });

  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryPointPath);

  const exports = Object.fromEntries(
    checker.getExportsOfModule(checker.getSymbolAtLocation(sourceFile!)!).map((symbol) => {
      return [symbol.name, symbol];
    }),
  );

  return {
    name,
    rootPath,
    exports,
    program,
    checker,
  };
};
