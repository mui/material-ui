/* eslint-disable no-console */
import * as path from 'path';
import * as fse from 'fs-extra';
import * as ttp from 'typescript-to-proptypes';
import * as prettier from 'prettier';
import glob from 'fast-glob';
import * as _ from 'lodash';
import * as yargs from 'yargs';
import {
  fixBabelGeneratorIssues,
  fixLineEndings,
  getUnstyledFilename,
} from '@mui-internal/docs-utilities';

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

function sortBreakpointsLiteralByViewportAscending(a: ttp.LiteralType, b: ttp.LiteralType) {
  // default breakpoints ordered by their size ascending
  const breakpointOrder: readonly unknown[] = ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'];

  return breakpointOrder.indexOf(a.value) - breakpointOrder.indexOf(b.value);
}

function sortSizeByScaleAscending(a: ttp.LiteralType, b: ttp.LiteralType) {
  const sizeOrder: readonly unknown[] = ['"small"', '"medium"', '"large"'];
  return sizeOrder.indexOf(a.value) - sizeOrder.indexOf(b.value);
}

// Custom order of literal unions by component
const getSortLiteralUnions: ttp.InjectOptions['getSortLiteralUnions'] = (component, propType) => {
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

const tsconfig = ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json'));

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, '../prettier.config.js'),
});

async function generateProptypes(
  program: ttp.ts.Program,
  sourceFile: string,
  tsFile: string = sourceFile,
): Promise<void> {
  const proptypes = ttp.parseFromProgram(tsFile, program, {
    shouldResolveObject: ({ name }) => {
      if (
        name.toLowerCase().endsWith('classes') ||
        name === 'theme' ||
        (name.endsWith('Props') && name !== 'componentsProps' && name !== 'slotProps')
      ) {
        return false;
      }
      return undefined;
    },
    checkDeclarations: true,
  });

  if (proptypes.body.length === 0) {
    return;
  }

  // exclude internal slot components, eg. ButtonRoot
  proptypes.body = proptypes.body.filter((data) => {
    if (data.propsFilename?.endsWith('.tsx')) {
      // only check for .tsx
      const match = data.propsFilename.match(/.*\/([A-Z][a-zA-Z]+)\.tsx/);
      if (match) {
        return data.name === match[1];
      }
    }
    return true;
  });

  proptypes.body.forEach((component) => {
    component.types.forEach((prop) => {
      if (
        !prop.jsDoc ||
        (ignoreExternalDocumentation[component.name] &&
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

  const propsFile = tsFile.replace(/(\.d\.ts|\.tsx|\.ts)/g, 'Props.ts');
  const generatedForTypeScriptFile = sourceFile === tsFile;
  const result = ttp.inject(proptypes, sourceContent, {
    disablePropTypesTypeChecking: generatedForTypeScriptFile,
    babelOptions: {
      filename: sourceFile,
    },
    comment: [
      '----------------------------- Warning --------------------------------',
      '| These PropTypes are generated from the TypeScript type definitions |',
      isTsFile
        ? '|     To update them edit TypeScript types and run "yarn proptypes"  |'
        : '|     To update them edit the d.ts file and run "yarn proptypes"     |',
      '----------------------------------------------------------------------',
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
        const implementedBySelfPropsFile = filename === propsFile;
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
  });

  if (!result) {
    throw new Error('Unable to produce inject propTypes into code.');
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: sourceFile });
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

  // Matches files where the folder and file both start with uppercase letters
  // Example: AppBar/AppBar.d.ts

  const allFiles = await Promise.all(
    [
      path.resolve(__dirname, '../packages/mui-system/src'),
      path.resolve(__dirname, '../packages/mui-base/src'),
      path.resolve(__dirname, '../packages/mui-material/src'),
      path.resolve(__dirname, '../packages/mui-lab/src'),
      path.resolve(__dirname, '../packages/mui-material-next/src'),
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
      const folderName = path.basename(path.dirname(filePath));
      const fileName = path.basename(filePath).replace(/(\.d\.ts|\.tsx|\.ts)/g, '');

      return (
        // Filter out files where the directory name and filename doesn't match
        // Example: Modal/ModalManager.d.ts
        fileName === folderName
      );
    })
    .filter((filePath) => {
      return filePattern.test(filePath);
    });
  // May not be able to understand all files due to mismatch in TS versions.
  // Check `program.getSyntacticDiagnostics()` if referenced files could not be compiled.
  const program = ttp.createTSProgram(files, tsconfig);

  const promises = files.map<Promise<void>>(async (tsFile) => {
    const sourceFile = tsFile.includes('.d.ts') ? tsFile.replace('.d.ts', '.js') : tsFile;
    try {
      await generateProptypes(program, sourceFile, tsFile);
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
