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
  ({ theme }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 8,
    borderRadius: '50%',

    // Explicitly set the default value to solve a bug on IE11.
    overflow: 'visible',

    color: (theme.vars || theme).palette.action.active,

    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),

    variants: [
      {
        props: {
          disableRipple: false,
        },

        style: {
          '&:hover': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      {
        props: ({ edge, ownerState }) => edge === 'start' && ownerState.size === 'small',

        style: {
          marginLeft: -3,
        },
      },
      {
        props: ({ edge, ownerState }) => edge === 'start' && ownerState.size !== 'small',

        style: {
          marginLeft: -12,
        },
      },
      {
        props: ({ edge, ownerState }) => edge === 'end' && ownerState.size === 'small',

        style: {
          marginRight: -3,
        },
      },
      {
        props: ({ edge, ownerState }) => edge === 'end' && ownerState.size !== 'small',

        style: {
          marginRight: -12,
        },
      },
    ],
  }),
  ({ theme }) => {
    const palette = (theme.vars || theme).palette?.[ownerState.color];
    return {
      [`&.${iconButtonClasses.disabled}`]: {
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.action.disabled,
      },

      variants: [
        {
          props: {
            color: 'inherit',
          },

          style: {
            color: 'inherit',
          },
        },
        {
          props: {},

          style: {
            color: palette?.main,
          },
        },
        {
          props: {
            disableRipple: false,
          },

          style: {
            '&:hover': {
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
        {
          props: {
            palette: true,
          },

          style: {
            backgroundColor: theme.vars
              ? `rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(palette.main, theme.palette.action.hoverOpacity),
          },
        },
        {
          props: {
            size: 'small',
          },

          style: {
            padding: 5,
            fontSize: theme.typography.pxToRem(18),
          },
        },
        {
          props: {
            size: 'large',
          },

          style: {
            padding: 12,
            fontSize: theme.typography.pxToRem(28),
          },
        },
      ],
    };
  },
);
