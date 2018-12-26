export default ({ muiBaseTheme }) => ({
  MuiTabs: {
    root: {
      marginLeft: muiBaseTheme.spacing.unit,
      '&.tabs--inverted': {
        '& .tabs__indicator': {
          backgroundColor: muiBaseTheme.palette.common.white,
        },
      },
    },
    indicator: {
      height: 3,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
  },
  MuiTab: {
    root: {
      textTransform: 'initial',
      margin: `0 ${muiBaseTheme.spacing.unit * 2}px`,
      minWidth: 0,
      [muiBaseTheme.breakpoints.up('md')]: {
        minWidth: 0,
      },
    },
    label: {
      fontWeight: 'normal',
    },
    labelContainer: {
      padding: 0,
      [muiBaseTheme.breakpoints.up('md')]: {
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
});
