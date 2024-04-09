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
})(({
  theme
}) => (({
  variants: [{
    props: (
      {
        variant,
        ownerState
      }
    ) => variant === 'buffer' && ownerState.variant !== 'normal',
    style: {
      backgroundColor: 'currentColor'
    }
  }, {
    props: {
      variant: 'buffer',
      variant: 'normal'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].light
    }
  }, {
    props: (
      {
        variant,
        ownerState
      }
    ) => variant === 'buffer' && ownerState.color !== 'inherit',
    style: {
      '&:hover': {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
          }
    }
  }, {
    props: {
      variant: 'buffer',
      color: 'inherit'
    },
    style: {
      '&:hover': {
            backgroundColor: 'currentColor',
          }
    }
  }, {
    props: {
      variant: 'buffer'
    },
    style: {
      '&:hover': {}
    }
  }, {
    props: (
      {
        ownerState,
        color
      }
    ) => ownerState.variant !== 'buffer' && color === 'inherit',
    style: {
      backgroundColor: 'currentColor'
    }
  }, {
    props: (
      {
        ownerState
      }
    ) => ownerState.variant !== 'buffer' && ownerState.color !== 'inherit',
    style: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].main
    }
  }]
})));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({
  theme
}) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [{
    props: (
      {
        expand
      }
    ) => !expand,
    style: {
      transform: 'rotate(0deg)'
    }
  }, {
    props: (
      {
        expand
      }
    ) => !!expand,
    style: {
      transform: 'rotate(180deg)'
    }
  }],
}));
