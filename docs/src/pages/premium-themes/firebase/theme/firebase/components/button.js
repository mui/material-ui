export default ({ attach, nest, BUTTON, ICON, muiBaseTheme, red, white }) => ({
  MuiButton: {
    root: {
      color: muiBaseTheme.palette.text.secondary,
      [attach(BUTTON.inverted)]: {
        borderColor: white.secondary,
        color: white.text,
        '&:hover': {
          borderColor: white.primary,
          background: white.hint,
        },
      },
    },
    label: {
      textTransform: 'none',
      letterSpacing: '0.25px',
      fontWeight: 'normal',
      '& svg': {
        fontSize: 20,
      },
      [nest(ICON.left)]: {
        marginRight: muiBaseTheme.spacing.unit,
      },
      [nest(ICON.right)]: {
        marginLeft: muiBaseTheme.spacing.unit,
      },
    },
    outlined: {
      [`&$disabled.${BUTTON.inverted}`]: {
        borderColor: white.text,
        color: white.text,
      },
    },
    contained: {
      boxShadow: muiBaseTheme.shadows[0],
      '&$focusVisible': {
        boxShadow: muiBaseTheme.shadows[0],
      },
      '&:active': {
        boxShadow: muiBaseTheme.shadows[0],
      },
      '&$disabled': {
        boxShadow: muiBaseTheme.shadows[0],
      },
      [attach(BUTTON.danger)]: {
        color: white.text,
        background: red.main,
        '&:hover': {
          background: red.dark,
        },
      },
    },
    containedPrimary: {
      color: muiBaseTheme.palette.common.white,
    },
    fab: {
      boxShadow: muiBaseTheme.shadows[2],
      '&:active': {
        boxShadow: muiBaseTheme.shadows[4],
      },
    },
  },
});
