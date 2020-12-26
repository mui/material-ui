import { createStyles as createStylesOriginal } from '@material-ui/styles';

// let warnedOnce = false;

export default function createStyles(styles) {
  // warning(
  //   warnedOnce,
  //   [
  //     'Material-UI: Imports of createStyles from `@material-ui/core/styles` is deprecated.',
  //     'Please use @material-ui/styles',
  //   ].join('\n'),
  // );
  // warnedOnce = true;
  return createStylesOriginal(styles);
}
