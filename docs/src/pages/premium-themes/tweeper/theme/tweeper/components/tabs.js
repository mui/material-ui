export default ({ theme, attach, nest, ICON, TABS, TAB }) => ({
  MuiTabs: {
    root: {
      [attach(TABS.underline)]: {
        borderBottom: '1px solid #e6ecf0',
      },
      [`& .${TAB.selected} .${TAB.wrapper} *`]: {
        color: theme.palette.primary.main,
      },
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  MuiTab: {
    root: {
      minHeight: 53,
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
      },
      [attach(TAB.onlyIcon)]: {
        [nest(TAB.wrapper)]: {
          width: 'auto',
          padding: 8,
          borderRadius: 25,
          color: '#657786',
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
          },
        },
      },
    },
    textColorInherit: {
      opacity: 1,
    },
    wrapper: {
      [nest(ICON.root)]: {
        fontSize: 26.25,
      },
    },
    labelContainer: {
      width: '100%',
      padding: 15,
      [theme.breakpoints.up('md')]: {
        padding: 15,
      },
      '&:hover': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
    },
    label: {
      textTransform: 'none',
      fontSize: 15,
      fontWeight: 700,
      color: '#657786',
    },
  },
});
