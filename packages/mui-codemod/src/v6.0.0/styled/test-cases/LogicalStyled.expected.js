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

const ToggleButton = styled('button')(({
  theme
}) => ({
  padding: '0.5rem 1rem',
  borderRadius: theme.vars.radius.sm,
  display: 'inline-flex',
  justifyContent: 'center',
  gap: '8px',
  minHeight: 40,
  fontFamily: theme.vars.fontFamily.body,
  fontSize: theme.vars.fontSize.md,
  fontWeight: theme.vars.fontWeight.md,
  alignItems: 'center',
  border: '1px solid',
  borderColor: theme.vars.palette.neutral.outlinedBorder,
  backgroundColor: theme.vars.palette.background.body,
  boxShadow: theme.vars.shadow.md,
  [theme.focus.selector]: theme.focus.default,
  ...theme.variants.plain.neutral,
  variants: [{
    props: {
      "aria-pressed": 'false'
    },
    style: {
      '&:hover': theme.variants.plainHover.neutral,
      '&:active': theme.variants.plainActive.neutral,
    }
  }, {
    props: {
      "aria-pressed": 'true'
    },
    style: {
      color: theme.vars.palette.danger.plainColor,
      backgroundColor: theme.vars.palette.background.body,
      boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
    }
  }]
}));
