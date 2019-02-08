export default ({ attach, nest, primary, theme, red, white, BUTTON, ICON }) => ({
  MuiButton: {
    root: {
      padding: '5px 9px',
      border: '1px solid transparent',
      minHeight: 30,
      [attach(BUTTON.inverted)]: {
        borderColor: white.secondary,
        color: white.text,
      },
      [`${attach(BUTTON.inverted)}:hover`]: {
        borderColor: white.primary,
        background: white.hint,
      },
    },
    label: {
      textTransform: 'none',
      fontWeight: 600,
      lineHeight: '18px',
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
      borderColor: '#dbdbdb',
      '&$disabled.inverted': {
        borderColor: white.text,
        color: white.text,
      },
    },
    contained: {
      borderColor: primary.main,
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
      '&:hover': {
        backgroundColor: primary.main,
      },
      '&:active': {
        opacity: 0.6,
      },
    },
  },
});
