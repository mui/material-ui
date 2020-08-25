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
    props = {},
    defaultProps = {},
    stylesOverrides = {},
    overrides = {},
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
  Object.keys(stylesOverrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.stylesOverrides = stylesOverrides[component];
    theme.components[component] = componentValue;
  });

  Object.keys(overrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.stylesOverrides = overrides[component];
    theme.components[component] = componentValue;
  });

  return theme;
}
