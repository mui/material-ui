const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})(
  ({ theme, ownerState }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 8,
    borderRadius: '50%',
    overflow: 'visible', // Explicitly set the default value to solve a bug on IE11.
    color: (theme.vars || theme).palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    ...(!ownerState.disableRipple && {
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
          : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    }),
    ...(ownerState.edge === 'start' && {
      marginLeft: ownerState.size === 'small' ? -3 : -12,
    }),
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? -3 : -12,
    }),
  }),
  ({ theme, ownerState }) => {
    const palette = (theme.vars || theme).palette?.[ownerState.color];
    return {
      ...(ownerState.color === 'inherit' && {
        color: 'inherit',
      }),
      ...(ownerState.color !== 'inherit' &&
        ownerState.color !== 'default' && {
          color: palette?.main,
          ...(!ownerState.disableRipple && {
            '&:hover': {
              ...(palette && {
                backgroundColor: theme.vars
                  ? `rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(palette.main, theme.palette.action.hoverOpacity),
              }),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
          }),
        }),
      ...(ownerState.size === 'small' && {
        padding: 5,
        fontSize: theme.typography.pxToRem(18),
      }),
      ...(ownerState.size === 'large' && {
        padding: 12,
        fontSize: theme.typography.pxToRem(28),
      }),
      [`&.${iconButtonClasses.disabled}`]: {
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.action.disabled,
      },
    };
  },
);
