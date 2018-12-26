export default ({ muiBaseTheme, nest, ICON }) => ({
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
      '&:not(:last-child)': {
        marginRight: 60,
      },
      [muiBaseTheme.breakpoints.up('md')]: {
        minWidth: 0,
      },
    },
    labelIcon: {
      minHeight: 53,
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
        color: '#999999',
      },
    },
    labelContainer: {
      padding: 0,
      [muiBaseTheme.breakpoints.up('md')]: {
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    label: {
      textTransform: 'uppercase',
    },
    selected: {
      '& *': {
        color: '#262626 !important',
      },
    },
  },
});
