export default ({ attach, TOOLBAR }) => ({
  MuiToolbar: {
    root: {
      [attach(TOOLBAR.root)]: {
        minHeight: 'auto',
      },
      [attach(TOOLBAR.narrow)]: {
        padding: '8px 24px',
      },
    },
  },
});
