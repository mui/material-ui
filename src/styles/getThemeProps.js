function getThemeProps(params) {
  const { theme, name } = params;

  if (!name || !theme.props || !theme.props[name]) {
    return {};
  }

  return theme.props[name];
}

export default getThemeProps;
