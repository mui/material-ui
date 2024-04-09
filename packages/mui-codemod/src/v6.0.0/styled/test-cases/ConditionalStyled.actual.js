const LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.bar,
      styles[`barColor${capitalize(ownerState.color)}`],
      (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') &&
        styles.bar1Indeterminate,
      ownerState.variant === 'determinate' && styles.bar1Determinate,
      ownerState.variant === 'buffer' && styles.bar1Buffer,
    ];
  },
})(({ ownerState, theme }) => ({
  ...(ownerState.variant === 'buffer' && {
    backgroundColor:
      ownerState.variant !== 'normal'
        ? 'currentColor'
        : (theme.vars || theme).palette[ownerState.color].light,
    '&:hover': {
      ...(ownerState.color !== 'inherit'
        ? {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
          }
        : {
            backgroundColor: 'currentColor',
          }),
    },
  }),
}));
