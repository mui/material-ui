import warning from 'warning';

let hasWarned;
const warn = () => {
  warning(hasWarned, `The 'material-ui/lib/utils/styles.js' utility module has been deprecated.
    It will be removed with v0.16.0.`);
  hasWarned = true;
};

export const mergeStyles = (...args) => {
  warn();
  return Object.assign({}, ...args);
};

export function prepareStyles(muiTheme, ...styles) {
  warn();
  return muiTheme.prepareStyles(...styles);
}

export default {
  mergeStyles,
  prepareStyles,
};
