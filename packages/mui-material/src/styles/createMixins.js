export default function createMixins(breakpoints, spacing, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48,
      },
      [breakpoints.up('sm')]: {
        minHeight: 64,
      },
    },
    ...mixins,
  };
}
