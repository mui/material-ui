import path from 'node:path';
import yargs from 'yargs';
import { generatePropTypes, ProjectSettings } from '@mui-internal/proptypes-builder';

const workspaceRoot = path.resolve(__dirname, '..');

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
const useMaterialUiExternalDocumentation: Record<string, '*' | readonly string[]> = {
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
const ignoreMaterialUiExternalDocumentation: Record<string, readonly string[]> = {
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

interface CommandOptions {
  pattern: string;
}

const projectSettings: ProjectSettings[] = [
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-system/src'),
    typeScriptProject: {
      name: 'system',
      rootPath: path.join(workspaceRoot, 'packages/mui-system'),
      entryPointPath: 'src/index.d.ts',
    },
    useExternalDocumentation: {
      Container: ['component'],
      Stack: ['component'],
    },
  },
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-base/src'),
    typeScriptProject: {
      name: 'base',
      rootPath: path.join(workspaceRoot, 'packages/mui-base'),
      entryPointPath: 'src/index.d.ts',
    },
    useExternalDocumentation: {
      Input: ['inputRef'],
    },
  },
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-material/src'),
    typeScriptProject: {
      name: 'material',
      rootPath: path.join(workspaceRoot, 'packages/mui-material'),
      entryPointPath: 'src/index.d.ts',
    },
    useExternalDocumentation: useMaterialUiExternalDocumentation,
    ignoreExternalDocumentation: ignoreMaterialUiExternalDocumentation,
  },
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-lab/src'),
    typeScriptProject: {
      name: 'lab',
      rootPath: path.join(workspaceRoot, 'packages/mui-lab'),
      entryPointPath: 'src/index.d.ts',
    },
  },
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-material-next/src'),
    typeScriptProject: {
      name: 'material-next',
      rootPath: path.join(workspaceRoot, 'packages/mui-material-next'),
      entryPointPath: 'src/index.ts',
    },
    useExternalDocumentation: useMaterialUiExternalDocumentation,
    ignoreExternalDocumentation: ignoreMaterialUiExternalDocumentation,
  },
  {
    rootPath: path.resolve(workspaceRoot, 'packages/mui-joy/src'),
    typeScriptProject: {
      name: 'joy',
      rootPath: path.join(workspaceRoot, 'packages/mui-joy'),
      entryPointPath: 'src/index.ts',
    },
    useExternalDocumentation: {
      Box: ['component', 'sx'],
      Container: ['component'],
      Input: useExternalPropsFromInputBase,
      Stack: ['component'],
    },
    ignoreExternalDocumentation: {
      Button: ['focusVisibleClassName', 'type'],
    },
  },
];

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const pattern = argv.pattern == null || argv.pattern === '' ? null : new RegExp(argv.pattern);
  const prettierConfigPath = path.join(__dirname, '../prettier.config.js');
  return generatePropTypes(projectSettings, pattern, prettierConfigPath);
}

yargs(process.argv.slice(2))
  .command<CommandOptions>({
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
