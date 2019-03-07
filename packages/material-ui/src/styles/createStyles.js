// import warning from 'warning';
import { createStyles as createStylesOriginal } from '@material-ui/styles';

// let warnOnce = false;

// To remove in v5
export default function createStyles(styles) {
  // warning(
  //   warnOnce,
  //   [
  //     'Material-UI: @material-ui/core/styles/createStyles is deprecated.',
  //     'Please use @material-ui/styles/createStyles',
  //   ].join('\n'),
  // );
  // warnOnce = true;
  return createStylesOriginal(styles);
}
