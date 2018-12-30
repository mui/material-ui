export default ({ linked, linkInverted, muiBaseTheme, primary, attach, nest, TEXT, ICON }) => ({
  MuiTypography: {
    root: {
      [attach(TEXT.link)]: {
        ...linked,
      },
      [attach(TEXT.inline)]: {
        display: 'inline-block',
      },
      [attach(TEXT.indented)]: {
        marginLeft: muiBaseTheme.spacing.unit,
      },
      [attach(TEXT.indentedLarge)]: {
        marginLeft: 20,
      },
      [attach(TEXT.bold)]: {
        fontWeight: 700,
      },
      [attach(TEXT.inverted)]: {
        color: muiBaseTheme.palette.common.white,
      },
      [attach(TEXT.linkInverted)]: linkInverted,
      [attach(TEXT.light)]: {
        color: 'rgb(101, 119, 134)',
      },
      [attach(TEXT.icon)]: {
        display: 'flex',
        alignItems: 'flex-end',
        [nest(ICON.root)]: {
          marginRight: muiBaseTheme.spacing.unit / 2,
        },
      },
      [attach(TEXT.icon, TEXT.inline)]: {
        display: 'inline-flex',
      },
      [`${attach(TEXT.link)}:hover`]: {
        cursor: 'pointer',
        color: primary.main,
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
        color: 'rgb(23, 191, 99)',
      },
      [attach(TEXT.danger)]: {
        color: 'rgb(224, 36, 94)',
      },
    },
  },
});
