export default function adaptV4Theme(inputTheme) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      [
        'Material-UI: adaptV4Theme() is deprecated.',
        'Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme',
      ].join('\n'),
    );
  }

  const { props = {}, variants = {}, overrides = {}, ...other } = inputTheme;
  const theme = {
    ...other,
    components: {},
  };

  Object.keys(variants).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.variants = variants[component];
    theme.components[component] = componentValue;
  });

  Object.keys(props).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.props = props[component];
    theme.components[component] = componentValue;
  });

  Object.keys(overrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.overrides = overrides[component];
    theme.components[component] = componentValue;
  });

  return theme;
}
