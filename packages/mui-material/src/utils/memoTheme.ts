import { CSSInterpolation } from '@mui/styled-engine';
import { Theme } from '../styles/createTheme';

type ThemeStyleFunction = (props: { theme: Theme }) => CSSInterpolation;

// We need to pass an argument as `{ theme }` for PigmentCSS, but we don't want to
// allocate more objects.
const arg = { theme: undefined as unknown as Theme };

/**
 * Memoize style function on theme.
 * Intended to be used in styled() calls that only need access to the theme.
 */
export default function memoTheme(styleFn: ThemeStyleFunction) {
  let lastValue: CSSInterpolation;
  let lastTheme: Theme;

  return (props: { theme: Theme }) => {
    let value = lastValue;
    if (value === undefined || props.theme !== lastTheme) {
      arg.theme = props.theme;

      value = styleFn(arg);

      lastValue = value;
      lastTheme = props.theme;
    }

    return value;
  };
}
