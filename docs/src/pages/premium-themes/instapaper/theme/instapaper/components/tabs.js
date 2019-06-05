export default ({ theme }) => ({
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
      minHeight: 54,
      fontWeight: 600,
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
      },
    },
    labelIcon: {
      minHeight: null,
      paddingTop: null,
      '& $wrapper :first-child': {
        fontSize: 16,
        marginBottom: 0,
        marginRight: 6,
      },
    },
    textColorInherit: {
      color: '#999',
      '&$selected': {
        color: '#262626',
      },
    },
    wrapper: {
      flexDirection: 'row',
    },
  },
});
