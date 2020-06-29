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

const todoComponents = [
  // lab
  'PaginationItem',
  'Skeleton',
  'TabList',
  'ToggleButton',
  // core
  // requires https://github.com/merceyz/typescript-to-proptypes/pull/21
  'Grid',
  'GridList',
  'GridListTile',
  'Hidden',
  'Icon',
  'IconButton',
  'InputAdornment',
  'Link',
  'List',
  'ListItem',
  'ListSubheader',
  'MenuItem',
  'Modal',
  'RootRef',
  'Slider',
  'StepButton',
  'SvgIcon',
  'SwipeableDrawer',
  'Tab',
  'Table',
  'TableBody',
  'TableContainer',
  'TableFooter',
  'TableHead',
  'TablePagination',
  'TableRow',
  'TableSortLabel',
  'Toolbar',
  'Typography',
];

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
  Input: useExternalPropsFromInputBase,
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
  Fab: ['focusVisibleClassName'],
  Fade: transitionCallbacks,
  Grow: transitionCallbacks,
  InputBase: ['aria-describedby'],
  Menu: ['PaperProps'],
  Slide: transitionCallbacks,
  TextField: ['hiddenLabel'],
  Zoom: transitionCallbacks,
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
    reconcilePropTypes: (prop, previous, generated) => {
      const usedCustomValidator = previous !== undefined && !previous.startsWith('PropTypes');
      const ignoreGenerated =
        previous !== undefined &&
        previous.startsWith('PropTypes /* @typescript-to-proptypes-ignore */');
      if (usedCustomValidator || ignoreGenerated) {
        // `usedCustomValidator` and `ignoreGenerated` narrow `previous` to `string`
        return previous!;
      }

      return generated;
    },
    shouldInclude: ({ component, prop, usedProps }) => {
      if (prop.name === 'children') {
        return true;
      }
      let shouldDocument;

      const documentRegExp = new RegExp(/\r?\n?@document/);
      if (prop.jsDoc && documentRegExp.test(prop.jsDoc)) {
        prop.jsDoc = prop.jsDoc.replace(documentRegExp, '');
        shouldDocument = true;
      } else {
        prop.filenames.forEach((filename) => {
          const isExternal = filename !== tsFile;
          if (!isExternal) {
            shouldDocument = true;
          }
        });
      }

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
  'disable-cache': boolean;
  pattern: string;
  verbose: boolean;
}
async function run(argv: HandlerArgv) {
  const { 'disable-cache': ignoreCache, pattern, verbose } = argv;

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

    if (!ignoreCache && (await fse.stat(jsFile)).mtimeMs > (await fse.stat(tsFile)).mtimeMs) {
      // Javascript version is newer, skip file
      return GenerateResult.Skipped;
    }

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
        .option('disable-cache', {
          default: false,
          describe: 'Considers all files on every run',
          type: 'boolean',
        })
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
