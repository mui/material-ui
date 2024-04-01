const FormHelperTextRoot = styled('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.size && styles[`size${capitalize(ownerState.size)}`],
      ownerState.contained && styles.contained,
      ownerState.filled && styles.filled,
    ];
  },
})(({ theme, ownerState }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: 'left',
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
  },
  [`&.${formHelperTextClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main,
  },
  ...(ownerState.size === 'small' && {
    marginTop: 4,
  }),
  ...(ownerState.contained && {
    marginLeft: 14,
    marginRight: 14,
  }),
}));
