export default ({ linked, linkInverted, theme, attach, nest, TEXT, ICON }) => ({
  MuiTypography: {
    root: {
      [attach(TEXT.link)]: {
        ...linked,
      },
      [attach(TEXT.inline)]: {
        display: 'inline-block',
      },
      [attach(TEXT.indented)]: {
        marginLeft: theme.spacing.unit,
      },
      [attach(TEXT.indentedLarge)]: {
        marginLeft: 20,
      },
      [attach(TEXT.bold)]: {
        fontWeight: 700,
      },
      [attach(TEXT.inverted)]: {
        color: theme.palette.common.white,
      },
      [attach(TEXT.linkInverted)]: linkInverted,
      [attach(TEXT.light)]: {
        color: '#657786',
      },
      [attach(TEXT.icon)]: {
        display: 'flex',
        alignItems: 'flex-end',
        [nest(ICON.root)]: {
          marginRight: theme.spacing.unit / 2,
        },
      },
      [attach(TEXT.icon, TEXT.inline)]: {
        display: 'inline-flex',
      },
      [`${attach(TEXT.link)}:hover`]: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
      [attach(TEXT.primary)]: {
        fontSize: 19,
        fontWeight: 700,
        lineHeight: 1.3125,
      },
      [attach(TEXT.secondary)]: {
        fontSize: 13,
      },
      [attach(TEXT.success)]: {
        color: '#17bf63',
      },
      [attach(TEXT.danger)]: {
        color: '#e0245e',
      },
    },
  },
});
