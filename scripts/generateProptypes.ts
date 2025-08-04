/* eslint-disable no-console */
import * as path from 'path';
import * as fse from 'fs-extra';
import * as prettier from 'prettier';
import glob from 'fast-glob';
import * as _ from 'lodash';
import * as yargs from 'yargs';
import { LiteralType } from '@mui/internal-scripts/typescript-to-proptypes/src/models';
import {
  fixBabelGeneratorIssues,
  fixLineEndings,
  getUnstyledFilename,
} from '@mui/internal-docs-utils';
import {
  getPropTypesFromFile,
  injectPropTypesInFile,
  InjectPropTypesInFileOptions,
} from '@mui/internal-scripts/typescript-to-proptypes';
import {
  createTypeScriptProjectBuilder,
  TypeScriptProject,
} from '@mui-internal/api-docs-builder/utils/createTypeScriptProject';

import CORE_TYPESCRIPT_PROJECTS from './coreTypeScriptProjects';

const useExternalPropsFromInputBase = [
  'autoComplete',
  'autoFocus',
  'color',
  'defaultValue',
  'disabled',
  'endAdornment',
  'error',
  'id',
  'inputProps',
  'inputRef',
  'margin',
  'maxRows',
  'minRows',
  'name',
  'onChange',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'startAdornment',
  'value',
];

/**
 * A map of components and their props that should be documented
 * but are not used directly in their implementation.
 *
 * TODO: In the future we want to remove them from the API docs in favor
 * of dynamically loading them. At that point this list should be removed.
 * TODO: typecheck values
 */
const useExternalDocumentation: Record<string, '*' | readonly string[]> = {
  Button: ['disableRipple'],
  Box: ['component', 'sx'],
  // `classes` is always external since it is applied from a HOC
  // In DialogContentText we pass it through
  // Therefore it's considered "unused" in the actual component but we still want to document it.
  DialogContentText: ['classes'],
  FilledInput: useExternalPropsFromInputBase,
  IconButton: ['disableRipple'],
  Input: useExternalPropsFromInputBase,
  MenuItem: ['dense'],
  OutlinedInput: useExternalPropsFromInputBase,
  Radio: ['disableRipple', 'id', 'inputProps', 'inputRef', 'required'],
  Checkbox: ['defaultChecked'],
  Container: ['component'],
  Stack: ['component'],
  Switch: [
    'checked',
    'defaultChecked',
    'disabled',
    'disableRipple',
    'edge',
    'id',
    'inputProps',
    'inputRef',
    'onChange',
    'required',
    'value',
  ],
  SwipeableDrawer: [
    'anchor',
    'hideBackdrop',
    'ModalProps',
    'PaperProps',
    'transitionDuration',
    'variant',
  ],
  Tab: ['disableRipple'],
  TextField: ['margin'],
  ToggleButton: ['disableRipple'],
};
const transitionCallbacks = [
  'onEnter',
  'onEntered',
  'onEntering',
  'onExit',
  'onExiting',
  'onExited',
];
/**
 * These are components that use props implemented by external components.
 * Those props have their own JSDoc which we don't want to emit in our docs
 * but do want them to have JSDoc in IntelliSense
 * TODO: In the future we want to ignore external docs on the initial load anyway
 * since they will be fetched dynamically.
 */
const ignoreExternalDocumentation: Record<string, readonly string[]> = {
  Button: ['focusVisibleClassName', 'type'],
  Collapse: transitionCallbacks,
  CardActionArea: ['focusVisibleClassName'],
  AccordionSummary: ['onFocusVisible'],
  Dialog: ['BackdropProps'],
  Drawer: ['BackdropProps'],
  Fab: ['focusVisibleClassName'],
  Fade: transitionCallbacks,
  Grow: transitionCallbacks,
  ListItem: ['focusVisibleClassName'],
  InputBase: ['aria-describedby'],
  Menu: ['PaperProps'],
  MenuItem: ['disabled'],
  Slide: transitionCallbacks,
  SwipeableDrawer: ['anchor', 'hideBackdrop', 'ModalProps', 'PaperProps', 'variant'],
  TextField: ['hiddenLabel'],
  Zoom: transitionCallbacks,
};

function sortSizeByScaleAscending(a: LiteralType, b: LiteralType) {
  const sizeOrder: readonly unknown[] = ['"small"', '"medium"', '"large"'];
  return sizeOrder.indexOf(a.value) - sizeOrder.indexOf(b.value);
}

// Custom order of literal unions by component
const getSortLiteralUnions: InjectPropTypesInFileOptions['getSortLiteralUnions'] = (
  component,
  propType,
) => {
  if (propType.name === 'size') {
    return sortSizeByScaleAscending;
  }

  return undefined;
};

async function generateProptypes(
  project: TypeScriptProject,
  sourceFile: string,
  tsFile: string,
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

  const prettierConfig = await prettier.resolveConfig(process.cwd(), {
    config: path.join(__dirname, '../prettier.config.mjs'),
  });

  const prettified = await prettier.format(result, { ...prettierConfig, filepath: sourceFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(sourceContent, formatted);

  await fse.writeFile(sourceFile, correctedLineEndings);
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
      path.resolve(__dirname, '../packages/mui-joy/src'),
    ].map((folderPath) =>
      glob('+([A-Z])*/+([A-Z])*.*@(d.ts|ts|tsx)', {
        absolute: true,
        cwd: folderPath,
      }),
    ),
  );

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

yargs
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
  .parse();
