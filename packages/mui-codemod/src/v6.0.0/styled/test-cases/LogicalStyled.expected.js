const ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  },
})(
  ({
    theme
  }) => ({
    variants: [{
      props: {
        variant: 'regular'
      },
      style: theme.mixins.toolbar
    }]
  }),
  ({
    theme
  }) => ({
    variants: [{
      props: (
        {
          ownerState
        }
      ) => ownerState.variant !== 'regular',
      style: theme.mixins.toolbar2
    }]
  }),
  ({
    theme
  }) =>
    ({
      variants: [{
        props: (
          {
            disabled,
            ownerState
          }
        ) => ownerState.variant === 'regular' && disabled,
        style: theme.mixins.toolbar3
      }]
    }),
  ({
    theme
  }) =>
    ({
      variants: [{
        props: (
          {
            disabled,
            ownerState
          }
        ) => ownerState.variant !== 'regular' && !disabled,
        style: theme.mixins.toolbar4
      }]
    }),
  ({ theme }) => theme.vars && theme.mixins.toolbar5,
);
