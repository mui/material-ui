import adaptV4Theme from './adaptV4Theme';
import createMuiTheme from './createMuiTheme';
import createBreakpointsV4 from './createBreakpointsV4';

function createMuiV4Theme(optionsInput = {}, ...argsInput) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      [
        'Material-UI: createMuiV4Theme() is deprecated.',
        'Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme',
      ].join('\n'),
    );
  }

  // Preprocessing of the input theme
  const options = adaptV4Theme(optionsInput);
  const args = argsInput.map((arg) => adaptV4Theme(arg));

  const theme = createMuiTheme(options, ...args);

  // Postprocessing of the input theme
  theme.breakpoints = createBreakpointsV4(options.breakpoints || {});

  return theme;
}

export default createMuiV4Theme;
