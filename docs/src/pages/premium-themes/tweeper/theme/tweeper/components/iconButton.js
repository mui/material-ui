export default ({ attach, nest, ICON, ICON_BUTTON }) => ({
  MuiIconButton: {
    root: {
      padding: 10,
      '&:hover': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
      [attach(ICON_BUTTON.success)]: {
        '&:hover': {
          backgroundColor: 'rgba(23, 191, 99, 0.1)',
        },
        [nest(ICON.root)]: {
          color: 'rgb(23, 191, 99)',
        },
      },
      [attach(ICON_BUTTON.danger)]: {
        '&:hover': {
          backgroundColor: 'rgba(224, 36, 94, 0.1)',
        },
        [nest(ICON.root)]: {
          color: 'rgb(224, 36, 94)',
        },
      },
    },
  },
});
