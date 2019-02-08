export default ({ attach, theme, nest, ICON, TAB }) => ({
  MuiTabs: {
    root: {
      borderTop: '1px solid #efefef',
      overflow: 'visible',
    },
    fixed: {
      overflowX: 'visible',
    },
    indicator: {
      height: 1,
      transform: 'translateY(-53px)',
      backgroundColor: '#262626',
    },
  },
  MuiTab: {
    root: {
      lineHeight: 'inherit',
      minWidth: 0,
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
        marginRight: 30,
        marginLeft: 30,
      },
      [attach(TAB.selected)]: {
        [nest(TAB.label)]: {
          fontWeight: 600,
        },
        '& *': {
          color: '#262626 !important',
        },
      },
    },
    labelIcon: {
      minHeight: 53,
      paddingTop: 0,
      '& .MuiTab-wrapper': {
        flexDirection: 'row',
      },
      [nest(ICON.root)]: {
        fontSize: 16,
        marginRight: 6,
      },
    },
    wrapper: {
      flexDirection: 'row',
      '& *': {
        color: '#999',
      },
    },
    labelContainer: {
      padding: 0,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    label: {
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },
});
