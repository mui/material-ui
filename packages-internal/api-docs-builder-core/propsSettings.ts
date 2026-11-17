import type { ProjectSettings } from '@mui/internal-api-docs-builder';

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
 */
export const useExternalDocumentation: Record<string, '*' | readonly string[]> = {
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
export const ignoreExternalDocumentation: Record<string, readonly string[]> = {
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

const sizeOrder: readonly unknown[] = ['"small"', '"medium"', '"large"'];

export function sortSizeByScaleAscending(a: { value: unknown }, b: { value: unknown }) {
  return sizeOrder.indexOf(a.value) - sizeOrder.indexOf(b.value);
}

export const propsSettings: NonNullable<ProjectSettings['propsSettings']> = {
  shouldIncludeProp: ({ componentName, prop }) => {
    if (ignoreExternalDocumentation[componentName]?.includes(prop.name)) {
      return false;
    }
    const externalProps = useExternalDocumentation[componentName];
    if (externalProps === '*' || externalProps?.includes(prop.name)) {
      return true;
    }
    return undefined;
  },
  shouldResolveObject: ({ name, depth }) => {
    if (
      // Only document the shape of the prop itself, not of nested objects.
      depth > 1 ||
      name.toLowerCase().endsWith('classes') ||
      name === 'theme' ||
      name === 'ownerState' ||
      (name.endsWith('Props') && name !== 'componentsProps' && name !== 'slotProps')
    ) {
      return false;
    }
    return undefined;
  },
  getSortLiteralUnions: ({ propName }) =>
    propName === 'size' ? sortSizeByScaleAscending : undefined,
};
