export default ({ theme, attach, TAB }) => ({
  MuiTabs: {
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  MuiTab: {
    root: {
      minHeight: 53,
      textTransform: 'none',
      fontWeight: 700,
      minWidth: 0,
      padding: 0,
      '&:hover': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 15,
        minWidth: 0,
        padding: 0,
      },
      [attach(TAB.onlyIcon)]: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '& $wrapper': {
          width: 'auto',
          padding: 8,
          borderRadius: 25,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
          },
        },
      },
    },
    textColorInherit: {
      opacity: 1,
      color: '#657786',
    },
  },
});
