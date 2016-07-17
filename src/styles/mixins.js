
export default function createMixins(breakpoints) {
  function gutters(styles) {
    styles.paddingLeft = 16;
    styles.paddingRight = 16;
    styles[breakpoints.up('sm')] = {
      paddingLeft: 24,
      paddingRight: 24,
    };
    return styles;
  }

  return { gutters };
}
