// @flow

export default function createMixins(breakpoints: Object, spacing: Object, mixins: Object) {
  return {
    gutters: (styles: Object) => {
      styles.paddingLeft = spacing.unit * 2;
      styles.paddingRight = spacing.unit * 2;
      styles[breakpoints.up('sm')] = {
        paddingLeft: spacing.unit * 3,
        paddingRight: spacing.unit * 3,
      };
      return styles;
    },
    ...mixins,
  };
}
