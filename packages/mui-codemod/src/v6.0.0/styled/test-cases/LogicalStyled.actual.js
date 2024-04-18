const ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  },
})(
  ({ theme, ownerState }) => ownerState.variant === 'regular' && theme.mixins.toolbar,
  ({ theme, ownerState }) => ownerState.variant !== 'regular' && theme.mixins.toolbar2,
  ({ theme, ownerState, disabled }) =>
    ownerState.variant === 'regular' && disabled && theme.mixins.toolbar3,
  ({ theme, ownerState, disabled }) =>
    ownerState.variant !== 'regular' && !disabled && theme.mixins.toolbar4,
  ({ theme }) => theme.vars && theme.mixins.toolbar5,
);
