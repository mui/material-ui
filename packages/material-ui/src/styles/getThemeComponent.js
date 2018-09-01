function getThemeComponent(params) {
  const { theme, name } = params;

  if (!name || !theme.components || !theme.components[name]) {
    return null;
  }

  return theme.components[name];
}

export default getThemeComponent;
