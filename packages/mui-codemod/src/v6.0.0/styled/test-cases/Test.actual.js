const a = {
  // textAlign: 'center',
  // flex: '0 0 auto',
  // fontSize: theme.typography.pxToRem(24),
  // padding: 8,
  // borderRadius: '50%',
  // overflow: 'visible', // Explicitly set the default value to solve a bug on IE11.
  // color: (theme.vars || theme).palette.action.active,
  // transition: theme.transitions.create('background-color', {
  //   duration: theme.transitions.duration.shortest,
  // }),
  // ...theme.vars ? {} : {},
  // ...(!ownerState.disableRipple && {
  //   '&:hover': {
  //     backgroundColor: theme.vars
  //       ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
  //       : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
  //     // Reset on touch devices, it doesn't add specificity
  //     '@media (hover: none)': {
  //       backgroundColor: 'transparent',
  //     },
  //   },
  // }),
  // ...(ownerState.edge === 'start' && {
  //   marginLeft: ownerState.size === 'small' ? -3 : -12,
  // }),
  // ...(ownerState.edge === 'end' && {
  //   marginRight: ownerState.size === 'small' ? -3 : -12,
  // }),
  '&:hover': {
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? -3 : -12,
    }),
  },
  // variants: [
  //   {
  //     props: ({ disabled, ownerState }) => disabled,
  //     props2: { disabled: true },

  //     style: {
  //       '&:hover': {
  //         backgroundColor: theme.vars
  //           ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
  //           : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
  //         // Reset on touch devices, it doesn't add specificity
  //         '@media (hover: none)': {
  //           backgroundColor: 'transparent',
  //         },
  //       },
  //     },
  //   },
  //   {
  //     props: {
  //       edge: 'start',
  //     },

  //     style: {
  //       marginLeft: ownerState.size === 'small' ? -3 : -12,
  //     },
  //   },
  //   {
  //     props: {
  //       edge: 'end',
  //     },

  //     style: {
  //       marginRight: ownerState.size === 'small' ? -3 : -12,
  //     },
  //   },
  // ],
};
