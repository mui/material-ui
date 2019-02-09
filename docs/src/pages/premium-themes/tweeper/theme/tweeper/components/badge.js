export default ({ white, theme, nest, BADGE }) => ({
  MuiBadge: {
    root: {
      [`&.${BADGE.dotted}, &.${BADGE.number}`]: {
        [nest(BADGE.badge)]: {
          color: white.text,
          backgroundColor: theme.palette.primary.main,
        },
      },
      [`&.${BADGE.dotted} .${BADGE.badge}`]: {
        width: 6,
        height: 6,
        top: -4,
        right: 2,
      },
      [`&.${BADGE.number} .${BADGE.badge}`]: {
        boxShadow: '#fff 0px 0px 0px 0.14rem',
      },
    },
    colorPrimary: {
      color: white.text,
    },
  },
});
