import combineWithBreakpoints from './combineWithBreakpoints';

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17];

export default function positions(theme) {
  const positions = {
    'position-static': { position: 'static' },
    'position-absolute': { position: 'absolute' },
    'position-fixed': { position: 'fixed' },
    'position-relative': { position: 'relative' },
    'position-sticky': { position: 'sticky' },
    'position-initial': { position: 'initial' },
    'position-inherit': { position: 'inherit' },
  };

  values.forEach((val, idx) => {
    positions[`top-${idx}`] = {
      top: theme.spacing(val),
    };
    positions[`bottom-${idx}`] = {
      bottom: theme.spacing(val),
    };
    positions[`right-${idx}`] = {
      right: theme.spacing(val),
    };
    positions[`left-${idx}`] = {
      left: theme.spacing(val),
    };
  });

  Object.keys(theme.zIndex).forEach((key) => {
    positions[`zIndex-${key}`] = {
      zIndex: theme.zIndex[key],
    };
  });

  return combineWithBreakpoints(theme, positions);
}
