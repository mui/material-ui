const transformV4ThemeToV5 = (inputTheme) => {
  const {
    props,
    variants,
    overrides,
    ...other
  } = inputTheme;
  const theme = {
    ...other,
    components: {},
  };

  Object.keys(variants).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.variants = variants[component];
    theme.components[component] = componentValue;
  });

  Object.keys(props).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.props = props[component];
    theme.components[component] = componentValue;
  });
    
  Object.keys(overrides).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.overrides = overrides[component];
    theme.components[component] = componentValue;
  });

  return theme;
}

export default transformV4ThemeToV5;