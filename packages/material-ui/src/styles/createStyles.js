// import warning from 'warning';
import { createStyles as createStylesOriginal } from '@material-ui/styles';

// let warnOnce = false;

// To remove in v5
export default function createStyles(styles) {
  // warning(
  //   warnOnce,
  //   [
  //     'Material-UI: createStyles from @material-ui/core/styles is deprecated.',
  //     'Please use @material-ui/styles/createStyles',
  //   ].join('\n'),
  // );
  // warnOnce = true;
  return createStylesOriginal(styles);
}
