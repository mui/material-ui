import createBreakpoints from './createBreakpoints';
import createV4Spacing from './createV4Spacing';

export default function adaptV4Theme(inputTheme) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      [
        'Material-UI: adaptV4Theme() is deprecated.',
        'Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme',
      ].join('\n'),
    );
  }

  const {
    defaultProps = {},
    mixins = {},
    overrides = {},
    palette = {},
    props = {},
    styleOverrides = {},
    ...other
  } = inputTheme;
  const theme = {
    ...other,
    components: {},
  };

  // default props
  Object.keys(defaultProps).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });

  Object.keys(props).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  });

  // css overrides
  Object.keys(styleOverrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });

  Object.keys(overrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  });

  // theme.spacing
  theme.spacing = createV4Spacing(inputTheme.spacing);

  // theme.mixins.gutters
  const breakpoints = createBreakpoints(inputTheme.breakpoints || {});
  const spacing = theme.spacing;

  theme.mixins = {
    gutters: (styles = {}) => {
      return {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        ...styles,
        [breakpoints.up('sm')]: {
          paddingLeft: spacing(3),
          paddingRight: spacing(3),
          ...styles[breakpoints.up('sm')],
        },
      };
    },
    ...mixins,
  };

  // theme.palette.text.hint
  theme.palette = {
    text: {
      hint: palette.type === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
    },
    ...palette,
  };

  return theme;
}
