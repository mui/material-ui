/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'node:fs/promises';
import * as prettier from 'prettier';
import glob from 'fast-glob';
import { flatten } from 'es-toolkit/array';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { InjectPropTypesInFileOptions } from '@mui/internal-scripts/typescript-to-proptypes';
import {
  fixBabelGeneratorIssues,
  fixLineEndings,
  getOwnPropsFilenames,
} from '@mui/internal-docs-utils';
import {
  getPropTypesFromFile,
  injectPropTypesInFile,
} from '@mui/internal-scripts/typescript-to-proptypes';
import type { TypeScriptProject } from '@mui/internal-api-docs-builder';
import { createTypeScriptProjectBuilder } from '@mui/internal-api-docs-builder';
import {
  ignoreExternalDocumentation,
  isUnresolvedObjectName,
  propsSettings,
  useExternalDocumentation,
} from '../packages-internal/api-docs-builder-core';

// eslint-disable-next-line import/extensions -- explicit .mjs extension required for tsx to resolve the ESM module
import CORE_TYPESCRIPT_PROJECTS from './coreTypeScriptProjects.mjs';

const getSortLiteralUnions: InjectPropTypesInFileOptions['getSortLiteralUnions'] = (
  component,
  propType,
) =>
  propsSettings.getSortLiteralUnions?.({ componentName: component.name, propName: propType.name });

async function generateProptypes(
  project: TypeScriptProject,
  sourceFile: string,
  tsFile: string,
): Promise<void> {
  const components = getPropTypesFromFile({
    filePath: tsFile,
    project,
    shouldResolveObject: ({ name }) => (isUnresolvedObjectName(name) ? false : undefined),
    checkDeclarations: true,
  });

  if (components.length === 0) {
    return;
  }

  // exclude internal slot components, for example ButtonRoot
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

  cleanComponents.forEach((component) => {
    component.types.forEach((prop) => {
      if (ignoreExternalDocumentation[component.name]?.includes(prop.name)) {
        if (!prop.jsDoc) {
          console.warn(
            `[${component.name}] \`${prop.name}\` is hidden from the API docs and has no JSDoc, so it has no description in IntelliSense.`,
          );
        }
        prop.jsDoc = '@ignore';
      }
    });
  });

  const sourceContent = await fs.readFile(sourceFile, 'utf8');
  const isTsFile = /(\.(ts|tsx))/.test(sourceFile);
  const ownPropsFilenames = getOwnPropsFilenames(tsFile);
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

        if (Array.from(prop.filenames).some((filename) => ownPropsFilenames.has(filename))) {
          shouldDocument = true;
        }

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

  const prettierConfig = await prettier.resolveConfig(process.cwd(), {
    config: path.join(__dirname, '../prettier.config.mjs'),
  });

  const prettified = await prettier.format(result, { ...prettierConfig, filepath: sourceFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(sourceContent, formatted);

  await fs.writeFile(sourceFile, correctedLineEndings);
}

interface HandlerArgv {
  pattern: string;
}
async function run(argv: HandlerArgv) {
  const { pattern } = argv;

  const filePattern = new RegExp(pattern);
  if (pattern.length > 0) {
    console.log(`Only considering declaration files matching ${filePattern}`);
  }

  const buildProject = createTypeScriptProjectBuilder(CORE_TYPESCRIPT_PROJECTS);

  // Matches files where the folder and file both start with uppercase letters
  // Example: AppBar/AppBar.d.ts
  const allFiles = await Promise.all(
    [
      path.resolve(__dirname, '../packages/mui-system/src'),
      path.resolve(__dirname, '../packages/mui-base/src'),
      path.resolve(__dirname, '../packages/mui-material/src'),
      path.resolve(__dirname, '../packages/mui-lab/src'),
    ].map((folderPath) =>
      glob('+([A-Z])*/+([A-Z])*.*@(d.ts|ts|tsx)', {
        absolute: true,
        cwd: folderPath,
      }),
    ),
  );

  const files = flatten(allFiles)
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
    .filter((filePath) => filePattern.test(filePath));

  const promises = files.map<Promise<void>>(async (tsFile) => {
    const sourceFile = tsFile.includes('.d.ts') ? tsFile.replace('.d.ts', '.js') : tsFile;
    try {
      const projectName = tsFile.match(/packages\/mui-([a-zA-Z-]+)\/src/)![1];
      const project = buildProject(projectName);
      await generateProptypes(project, sourceFile, tsFile);
    } catch (error: any) {
      error.message = `${tsFile}: ${error.message}`;
      throw error;
    }
  });

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

yargs()
  .command<HandlerArgv>({
    command: '$0',
    describe: 'Generates Component.propTypes from TypeScript declarations',
    builder: (command) => {
      return command.option('pattern', {
        default: '',
        describe: 'Only considers declaration files matching this pattern.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse(hideBin(process.argv));
