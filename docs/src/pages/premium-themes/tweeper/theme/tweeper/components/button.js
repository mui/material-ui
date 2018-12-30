export default ({
  primary,
  muiBaseTheme,
  red,
  white,
  attach,
  nest,
  BUTTON,
  ICON,
}) => ({
  MuiButton: {
    label: {
      textTransform: 'none',
      fontSize: 15,
      fontWeight: 700,
      [nest(ICON.root)]: {
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
      borderColor: primary.main,
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
      },
      [`${attach(BUTTON.danger)}:hover`]: {
        background: red.dark,
      },
    },
    containedPrimary: {
      color: muiBaseTheme.palette.common.white,
    },
    extendedFab: {
      [nest(ICON.root)]: {
        marginRight: muiBaseTheme.spacing.unit,
      },
    },
  },
});
