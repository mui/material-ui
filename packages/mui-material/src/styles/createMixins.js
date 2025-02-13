export default function createMixins(breakpoints, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [breakpoints.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48,
        },
      },
      [breakpoints.up('sm')]: {
        minHeight: 64,
      },
    },
    ...mixins,
  };
}
