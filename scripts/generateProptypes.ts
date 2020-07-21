/* eslint-disable no-console */
import * as path from 'path';
import * as fse from 'fs-extra';
import * as ttp from 'typescript-to-proptypes';
import * as prettier from 'prettier';
import * as globCallback from 'glob';
import { promisify } from 'util';
import * as _ from 'lodash';
import * as yargs from 'yargs';
import { fixBabelGeneratorIssues, fixLineEndings } from '../docs/scripts/helpers';

const glob = promisify(globCallback);

enum GenerateResult {
  Success,
  Skipped,
  NoComponent,
  Failed,
  TODO,
}

/**
 * Includes component names for which we can't generate .propTypes from the TypeScript types.
 */
const todoComponents: string[] = [];

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
  'name',
  'onChange',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'rowsMax',
  // TODO: why no rowsMin?
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
const useExternalDocumentation: Record<string, string[]> = {
  Button: ['disableRipple'],
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
 * Those props have their own JSDOC which we don't want to emit in our docs
 * but do want them to have JSDOC in IntelliSense
 * TODO: In the future we want to ignore external docs on the initial load anyway
 * since they will be fetched dynamically.
 */
const ignoreExternalDocumentation: Record<string, string[]> = {
  Button: ['focusVisibleClassName', 'type'],
  Collapse: transitionCallbacks,
  CardActionArea: ['focusVisibleClassName'],
  AccordionSummary: ['onFocusVisible'],
  Dialog: ['BackdropProps'],
  Drawer: ['BackdropProps'],
  Fab: ['focusVisibleClassName'],
  Fade: transitionCallbacks,
  Grow: transitionCallbacks,
  InputBase: ['aria-describedby'],
  Menu: ['PaperProps'],
  MenuItem: ['button', 'disabled', 'selected'],
  Slide: transitionCallbacks,
  SwipeableDrawer: ['anchor', 'hideBackdrop', 'ModalProps', 'PaperProps', 'variant'],
  TextField: ['hiddenLabel'],
  Zoom: transitionCallbacks,
};

function sortBreakpointsLiteralByViewportAscending(a: ttp.LiteralNode, b: ttp.LiteralNode) {
  // default breakpoints ordered by their size ascending
  const breakpointOrder: unknown[] = ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'];

  return breakpointOrder.indexOf(a.value) - breakpointOrder.indexOf(b.value);
}
// Custom order of literal unions by component
const getSortLiteralUnions: ttp.InjectOptions['getSortLiteralUnions'] = (component, propType) => {
  if (
    component.name === 'Hidden' &&
    (propType.name === 'initialWidth' || propType.name === 'only')
  ) {
    return sortBreakpointsLiteralByViewportAscending;
  }

  return undefined;
};

const tsconfig = ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json'));

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, '../prettier.config.js'),
});

async function generateProptypes(
  tsFile: string,
  jsFile: string,
  program: ttp.ts.Program,
): Promise<GenerateResult> {
  const proptypes = ttp.parseFromProgram(tsFile, program, {
    shouldResolveObject: ({ name }) => {
      if (name.toLowerCase().endsWith('classes') || name === 'theme' || name.endsWith('Props')) {
        return false;
      }
      return undefined;
    },
    checkDeclarations: true,
  });

  if (proptypes.body.length === 0) {
    return GenerateResult.NoComponent;
  }

  proptypes.body.forEach((component) => {
    component.types.forEach((prop) => {
      if (prop.name === 'classes' && prop.jsDoc) {
        prop.jsDoc += '\nSee [CSS API](#css) below for more details.';
      } else if (
        !prop.jsDoc ||
        (ignoreExternalDocumentation[component.name] &&
          ignoreExternalDocumentation[component.name].includes(prop.name))
      ) {
        prop.jsDoc = '@ignore';
      }
    });
  });

  const jsContent = await fse.readFile(jsFile, 'utf8');

  const result = ttp.inject(proptypes, jsContent, {
    removeExistingPropTypes: true,
    babelOptions: {
      filename: jsFile,
    },
    comment: [
      '----------------------------- Warning --------------------------------',
      '| These PropTypes are generated from the TypeScript type definitions |',
      '|     To update them edit the d.ts file and run "yarn proptypes"     |',
      '----------------------------------------------------------------------',
    ].join('\n'),
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

      prop.filenames.forEach((filename) => {
        const isExternal = filename !== tsFile;
        if (!isExternal) {
          shouldDocument = true;
        }
      });

      const { name: componentName } = component;
      if (
        useExternalDocumentation[componentName] &&
        useExternalDocumentation[componentName].includes(prop.name)
      ) {
        shouldDocument = true;
      }

      return shouldDocument;
    },
  });

  if (!result) {
    return GenerateResult.Failed;
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: jsFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(jsContent, formatted);

  await fse.writeFile(jsFile, correctedLineEndings);
  return GenerateResult.Success;
}

interface HandlerArgv {
  pattern: string;
  verbose: boolean;
}
async function run(argv: HandlerArgv) {
  const { pattern, verbose } = argv;

  const filePattern = new RegExp(pattern);
  if (pattern.length > 0) {
    console.log(`Only considering declaration files matching ${filePattern}`);
  }

  // Matches files where the folder and file both start with uppercase letters
  // Example: AppBar/AppBar.d.ts

  const allFiles = await Promise.all(
    [
      path.resolve(__dirname, '../packages/material-ui/src'),
      path.resolve(__dirname, '../packages/material-ui-lab/src'),
    ].map((folderPath) =>
      glob('+([A-Z])*/+([A-Z])*.d.ts', {
        absolute: true,
        cwd: folderPath,
      }),
    ),
  );

  const files = _.flatten(allFiles)
    // Filter out files where the directory name and filename doesn't match
    // Example: Modal/ModalManager.d.ts
    .filter((filePath) => {
      const folderName = path.basename(path.dirname(filePath));
      const fileName = path.basename(filePath, '.d.ts');

      return fileName === folderName;
    })
    .filter((filePath) => {
      return filePattern.test(filePath);
    });
  const program = ttp.createProgram(files, tsconfig);

  const promises = files.map<Promise<GenerateResult>>(async (tsFile) => {
    const jsFile = tsFile.replace('.d.ts', '.js');

    if (todoComponents.includes(path.basename(jsFile, '.js'))) {
      return GenerateResult.TODO;
    }

    return generateProptypes(tsFile, jsFile, program);
  });

  const results = await Promise.all(promises);

  if (verbose) {
    files.forEach((file, index) => {
      console.log('%s - %s', GenerateResult[results[index]], path.basename(file, '.d.ts'));
    });
  }

  console.log('--- Summary ---');
  const groups = _.groupBy(results, (x) => x);

  _.forOwn(groups, (count, key) => {
    console.log('%s: %d', GenerateResult[(key as unknown) as GenerateResult], count.length);
  });

  console.log('Total: %d', results.length);
}

yargs
  .command({
    command: '$0',
    describe: 'Generates Component.propTypes from TypeScript declarations',
    builder: (command) => {
      return command
        .option('verbose', {
          default: false,
          describe: 'Logs result for each file',
          type: 'boolean',
        })
        .option('pattern', {
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
