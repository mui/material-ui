// @flow weak

export default function createComponents(theme) {
  const { palette, typography } = theme;
  const components = {};

  components.button = {
    primary: palette.primary,
    secondary: palette.secondary,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeightMedium,
    fontFamily: typography.fontFamily,
    textTransform: 'uppercase',
  };

  return components;
}
