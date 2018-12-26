export default ({ muiBaseTheme, attach, nest, APP_BAR, TOOLBAR, shade }) => ({
  MuiAppBar: {
    colorDefault: {
      backgroundColor: muiBaseTheme.palette.common.white,
    },
    root: {
      [nest(TOOLBAR.root)]: {
        minHeight: 'auto',
      },
      [nest(TOOLBAR.narrow)]: {
        padding: '8px 24px',
      },
      [attach(APP_BAR.shaded)]: {
        backgroundColor: shade.light,
      },
    },
  },
});
