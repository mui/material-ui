// @flow weak

export default function createMixins(breakpoints, spacing) {
  function gutters(styles) {
    styles.paddingLeft = spacing.unit * 2;
    styles.paddingRight = spacing.unit * 2;
    styles[breakpoints.up('sm')] = {
      paddingLeft: spacing.unit * 3,
      paddingRight: spacing.unit * 3,
    };
    return styles;
  }

  return { gutters };
}
