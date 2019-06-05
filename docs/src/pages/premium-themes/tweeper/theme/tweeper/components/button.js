export default ({ theme, red, white, attach, nest, BUTTON, ICON }) => ({
  MuiButton: {
    label: {
      textTransform: 'none',
      fontSize: 15,
      fontWeight: 700,
      [nest(ICON.root)]: {
        fontSize: 20,
      },
      [nest(ICON.left)]: {
        marginRight: theme.spacing(1),
      },
      [nest(ICON.right)]: {
        marginLeft: theme.spacing(1),
      },
    },
    outlined: {
      borderRadius: 100,
      '&$disabled': {
        [attach(BUTTON.inverted)]: {
          borderColor: white.text,
          color: white.text,
        },
      },
    },
    outlinedPrimary: {
      minHeight: 30,
      padding: '0 1em',
      [attach(BUTTON.large)]: {
        minHeight: 39,
      },
      borderColor: theme.palette.primary.main,
    },
    contained: {
      boxShadow: theme.shadows[0],
      '&$focusVisible': {
        boxShadow: theme.shadows[0],
      },
      '&:active': {
        boxShadow: theme.shadows[0],
      },
      '&$disabled': {
        boxShadow: theme.shadows[0],
      },
      [attach(BUTTON.danger)]: {
        color: white.text,
        background: red.main,
      },
      [`${attach(BUTTON.danger)}:hover`]: {
        background: red.dark,
      },
    },
    containedPrimary: {
      color: theme.palette.common.white,
    },
  },
});
