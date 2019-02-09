export default ({ white, attach, nest, APP_BAR, LIST_ITEM, TOOLBAR }) => ({
  MuiAppBar: {
    root: {
      [attach(APP_BAR.root)]: {
        backgroundColor: white.text,
        [nest(LIST_ITEM.root)]: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      [nest(TOOLBAR.root)]: {
        minHeight: 53,
        maxWidth: 1000,
        padding: '0 10px',
        margin: 'auto',
        width: '100%',
      },
    },
  },
});
