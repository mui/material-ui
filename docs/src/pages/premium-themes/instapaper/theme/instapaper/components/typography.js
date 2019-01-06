export default ({ attach, nest, linked, linkInverted, theme, primary, TEXT, ICON }) => ({
  MuiTypography: {
    root: {
      [attach(TEXT.link)]: {
        ...linked,
        textDecoration: 'underline',
      },
      [`${attach(TEXT.link)}:hover`]: {
        cursor: 'pointer',
        color: primary.main,
      },
      [attach(TEXT.indented)]: {
        marginLeft: theme.spacing(1),
      },
      [attach(TEXT.indentedLg)]: {
        marginLeft: theme.spacing(3),
      },
      [attach(TEXT.bold)]: {
        fontWeight: 600,
      },
      [attach(TEXT.inverted)]: {
        color: theme.palette.common.white,
      },
      [attach(TEXT.linkInverted)]: linkInverted,
      [attach(TEXT.light)]: {
        opacity: 0.6,
      },
      [attach(TEXT.icon)]: {
        display: 'flex',
        alignItems: 'flex-end',
        [nest(ICON.root)]: {
          marginRight: theme.spacing(0.5),
        },
      },
      [attach(TEXT.lightWeight)]: {
        fontWeight: 200,
      },
    },
    subtitle1: {
      lineHeight: '24px',
    },
  },
});
