/* eslint-disable no-console */
import * as path from 'path';
import * as fse from 'fs-extra';
import * as prettier from 'prettier';
import glob from 'fast-glob';
import * as _ from 'lodash';
import {
  CreateTypeScriptProjectOptions,
  fixBabelGeneratorIssues,
  fixLineEndings,
  getUnstyledFilename,
  createTypeScriptProjectBuilder,
  TypeScriptProject,
} from '@mui-internal/docs-utils';
import {
  getPropTypesFromFile,
  injectPropTypesInFile,
  InjectPropTypesInFileOptions,
  LiteralType,
} from '@mui-internal/typescript-to-proptypes';
import { ProjectSettings } from './ProjectSettings';

export async function generatePropTypes(
  projectsSettings: ProjectSettings[],
  pattern: RegExp | null,
  prettierConfigPath: string,
) {
  if (pattern != null) {
    console.log(`Only considering declaration files matching ${pattern.source}`);
  }

  const allTypeScriptProjects = projectsSettings
    .map((setting) => setting.typeScriptProject)
    .reduce((acc, project) => {
      acc[project.name] = project;
      return acc;
    }, {} as Record<string, CreateTypeScriptProjectOptions>);

  const buildTypeScriptProject = createTypeScriptProjectBuilder(allTypeScriptProjects);

  const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
    config: prettierConfigPath,
  });

  const promises: Promise<void>[] = [];
  for (let i = 0; i < projectsSettings.length; i += 1) {
    const projectSettings = projectsSettings[i];
    const typeScriptProject = buildTypeScriptProject(projectSettings.typeScriptProject.name);

    generatePropTypesForProject(typeScriptProject, projectSettings, pattern, prettierConfig);
  }

  const results = await Promise.allSettled(promises);

  const fails = results.filter((result): result is PromiseRejectedResult => {
    return result.status === 'rejected';
  });

  fails.forEach((result) => {
    console.error(result.reason);
  });
  if (fails.length > 0) {
    process.exit(1);
  }
}

function sortBreakpointsLiteralByViewportAscending(a: LiteralType, b: LiteralType) {
  // default breakpoints ordered by their size ascending
  const breakpointOrder: readonly unknown[] = ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'];

  return breakpointOrder.indexOf(a.value) - breakpointOrder.indexOf(b.value);
}

function sortSizeByScaleAscending(a: LiteralType, b: LiteralType) {
  const sizeOrder: readonly unknown[] = ['"small"', '"medium"', '"large"'];
  return sizeOrder.indexOf(a.value) - sizeOrder.indexOf(b.value);
}

async function generatePropTypesForProject(
  typeScriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  pattern: RegExp | null,
  prettierConfig: prettier.Options | null,
) {
  // Matches files where the folder and file both start with uppercase letters
  // Example: AppBar/AppBar.d.ts
  const allFiles = await glob('+([A-Z])*/+([A-Z])*.*@(d.ts|ts|tsx)', {
    absolute: true,
    cwd: projectSettings.rootPath,
  });

  const files = _.flatten(allFiles)
    .filter((filePath) => {
      // Filter out files where the directory name and filename doesn't match
      // Example: Modal/ModalManager.d.ts
      let folderName = path.basename(path.dirname(filePath));
      const fileName = path.basename(filePath).replace(/(\.d\.ts|\.tsx|\.ts)/g, '');

      // An exception is if the folder name starts with Unstable_/unstable_
      // Example: Unstable_Grid2/Grid2.tsx
      if (/(u|U)nstable_/g.test(folderName)) {
        folderName = folderName.slice(9);
      }

      return fileName === folderName;
    })
    .filter((filePath) => pattern?.test(filePath) ?? true);

  const promises = files.map<Promise<void>>(async (tsFile) => {
    const sourceFile = tsFile.includes('.d.ts') ? tsFile.replace('.d.ts', '.js') : tsFile;
    try {
      await generatePropTypesForFile(
        typeScriptProject,
        projectSettings,
        sourceFile,
        tsFile,
        prettierConfig,
      );
    } catch (error: any) {
      error.message = `${tsFile}: ${error.message}`;
      throw error;
    }
  });

  return promises;
}

// Custom order of literal unions by component
const getSortLiteralUnions: InjectPropTypesInFileOptions['getSortLiteralUnions'] = (
  component,
  propType,
) => {
  if (
    component.name === 'Hidden' &&
    (propType.name === 'initialWidth' || propType.name === 'only')
  ) {
    return sortBreakpointsLiteralByViewportAscending;
  }

  if (propType.name === 'size') {
    return sortSizeByScaleAscending;
  }

  return undefined;
};

async function generatePropTypesForFile(
  project: TypeScriptProject,
  projectSettings: ProjectSettings,
  sourceFile: string,
  tsFile: string,
  prettierConfig: prettier.Options | null,
): Promise<void> {
  const components = getPropTypesFromFile({
    filePath: tsFile,
    project,
    shouldResolveObject: ({ name }) => {
      if (
        name.toLowerCase().endsWith('classes') ||
        name === 'theme' ||
        name === 'ownerState' ||
        (name.endsWith('Props') && name !== 'componentsProps' && name !== 'slotProps')
      ) {
        return false;
      }
      return undefined;
    },
    checkDeclarations: true,
  });

  if (components.length === 0) {
    return;
  }

  // exclude internal slot components, e.g. ButtonRoot
  const cleanComponents = components.filter((component) => {
    if (component.propsFilename?.endsWith('.tsx')) {
      // only check for .tsx
      const match = component.propsFilename.match(/.*\/([A-Z][a-zA-Z]+)\.tsx/);
      if (match) {
        return component.name === match[1];
      }
    }
    return true;
  });

  const { useExternalDocumentation = {}, ignoreExternalDocumentation = {} } = projectSettings;

  cleanComponents.forEach((component) => {
    component.types.forEach((prop) => {
      if (
        !prop.jsDoc ||
        (project.name !== 'base' &&
          ignoreExternalDocumentation[component.name] &&
          ignoreExternalDocumentation[component.name].includes(prop.name))
      ) {
        prop.jsDoc = '@ignore';
      }
    });
  });

  const sourceContent = await fse.readFile(sourceFile, 'utf8');
  const isTsFile = /(\.(ts|tsx))/.test(sourceFile);
  // If the component inherits the props from some unstyled components
  // we don't want to add those propTypes again in the Material UI/Joy UI propTypes
  const unstyledFile = getUnstyledFilename(tsFile, true);
  const unstyledPropsFile = unstyledFile.replace('.d.ts', '.types.ts');

  // TODO remove, should only have .types.ts
  const propsFile = tsFile.replace(/(\.d\.ts|\.tsx|\.ts)/g, 'Props.ts');
  const propsFileAlternative = tsFile.replace(/(\.d\.ts|\.tsx|\.ts)/g, '.types.ts');
  const generatedForTypeScriptFile = sourceFile === tsFile;
  const result = injectPropTypesInFile({
    components,
    target: sourceContent,
    options: {
      disablePropTypesTypeChecking: generatedForTypeScriptFile,
      babelOptions: {
        filename: sourceFile,
      },
      comment: [
        '┌────────────────────────────── Warning ──────────────────────────────┐',
        '│ These PropTypes are generated from the TypeScript type definitions. │',
        isTsFile
          ? '│ To update them, edit the TypeScript types and run `pnpm proptypes`. │'
          : '│    To update them, edit the d.ts file and run `pnpm proptypes`.     │',
        '└─────────────────────────────────────────────────────────────────────┘',
      ].join('\n'),
      ensureBabelPluginTransformReactRemovePropTypesIntegration: true,
      getSortLiteralUnions,
      reconcilePropTypes: (prop, previous, generated) => {
        const usedCustomValidator = previous !== undefined && !previous.startsWith('PropTypes');
        const ignoreGenerated =
          previous !== undefined &&
          previous.startsWith('PropTypes /* @typescript-to-proptypes-ignore */');

        if (
          ignoreGenerated &&
          // `ignoreGenerated` implies that `previous !== undefined`
          previous!
            .replace('PropTypes /* @typescript-to-proptypes-ignore */', 'PropTypes')
            .replace(/\s/g, '') === generated.replace(/\s/g, '')
        ) {
          throw new Error(
            `Unused \`@typescript-to-proptypes-ignore\` directive for prop '${prop.name}'.`,
          );
        }

        if (usedCustomValidator || ignoreGenerated) {
          // `usedCustomValidator` and `ignoreGenerated` narrow `previous` to `string`
          return previous!;
        }

        return generated;
      },
      shouldInclude: ({ component, prop }) => {
        if (prop.name === 'children') {
          return true;
        }
        let shouldDocument;
        const { name: componentName } = component;

        prop.filenames.forEach((filename) => {
          const isExternal = filename !== tsFile;
          const implementedByUnstyledVariant =
            filename === unstyledFile || filename === unstyledPropsFile;
          const implementedBySelfPropsFile =
            filename === propsFile || filename === propsFileAlternative;
          if (!isExternal || implementedByUnstyledVariant || implementedBySelfPropsFile) {
            shouldDocument = true;
          }
        });

        if (
          useExternalDocumentation[componentName] &&
          (useExternalDocumentation[componentName] === '*' ||
            useExternalDocumentation[componentName].includes(prop.name))
        ) {
          shouldDocument = true;
        }

        return shouldDocument;
      },
    },
  });

  if (!result) {
    throw new Error('Unable to produce inject propTypes into code.');
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: sourceFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(sourceContent, formatted);

  await fse.writeFile(sourceFile, correctedLineEndings);
}
