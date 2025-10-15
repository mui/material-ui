import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';

export interface TypeScriptProject {
  name: string;
  rootPath: string;
  exports: Record<string, ts.Symbol>;
  program: ts.Program;
  checker: ts.TypeChecker;
}

export interface CreateTypeScriptProjectOptions {
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
   * This property is used to gather the exports of the project.
   *
   * Use an array to target more than one entrypoint.
   *
   * @example 'src/index.d.ts'
   * @example ['src/index.d.ts', 'src/PigmentStack/PigmentStack.tsx']
   *          `PigmentStack` cannot be included in the `index.d.ts` file because it is using Pigment CSS specific API.
   */
  entryPointPath?: string | string[];
  /**
   * Files to include in the project.
   * By default, it will use the files defined in the tsconfig.
   */
  files?: string[];
}

export const createTypeScriptProject = (
  options: CreateTypeScriptProjectOptions,
): TypeScriptProject => {
  const {
    name,
    rootPath,
    tsConfigPath: inputTsConfigPath = 'tsconfig.build.json',
    entryPointPath: inputEntryPointPath,
    files,
  } = options;

  const tsConfigPath = path.join(rootPath, inputTsConfigPath);

  const tsConfigFile = ts.readConfigFile(tsConfigPath, (filePath) =>
    fs.readFileSync(filePath).toString(),
  );

  if (tsConfigFile.error) {
    throw tsConfigFile.error;
  }

  // The build config does not parse the `.d.ts` files, but we sometimes need them to get the exports.
  if (tsConfigFile.config.exclude) {
    tsConfigFile.config.exclude = tsConfigFile.config.exclude.filter(
      (pattern: string) => pattern !== 'src/**/*.d.ts',
    );
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
    rootNames: files ?? tsConfigFileContent.fileNames,
    options: tsConfigFileContent.options,
  });

  const checker = program.getTypeChecker();

  let exports: TypeScriptProject['exports'] = {};
  if (inputEntryPointPath) {
    const arrayEntryPointPath = Array.isArray(inputEntryPointPath)
      ? inputEntryPointPath
      : [inputEntryPointPath];
    arrayEntryPointPath.forEach((entry) => {
      const entryPointPath = path.join(rootPath, entry);
      const sourceFile = program.getSourceFile(entryPointPath);

      const pathData = path.parse(entryPointPath);

      exports = {
        ...exports,
        ...Object.fromEntries(
          checker.getExportsOfModule(checker.getSymbolAtLocation(sourceFile!)!).map((symbol) => {
            return [symbol.name, symbol];
          }),
        ),
        ...(pathData.name !== 'index' && {
          // use the default export when the entrypoint is not `index`.
          [pathData.name]: checker.getSymbolAtLocation(sourceFile!)!,
        }),
      };
    });
  } else {
    exports = {};
  }

  return {
    name,
    rootPath,
    exports,
    program,
    checker,
  };
};

export type TypeScriptProjectBuilder = (
  projectName: string,
  options?: { files?: string[] },
) => TypeScriptProject;

export const createTypeScriptProjectBuilder = (
  projectsConfig: Record<string, Omit<CreateTypeScriptProjectOptions, 'name'>>,
): TypeScriptProjectBuilder => {
  const projects = new Map<string, TypeScriptProject>();

  return (projectName: string, options: { files?: string[] } = {}) => {
    const cachedProject = projects.get(projectName);
    if (cachedProject != null) {
      return cachedProject;
    }

    // eslint-disable-next-line no-console
    console.log(`Building new TS project: ${projectName}`);

    const project = createTypeScriptProject({
      name: projectName,
      ...projectsConfig[projectName],
      ...options,
    });

    projects.set(projectName, project);
    return project;
  };
};
