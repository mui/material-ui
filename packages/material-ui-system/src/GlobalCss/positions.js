import combineWithBreakpoints from './combineWithBreakpoints';

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function positions(theme) {
  const positionsSelectors = {
    'position-static': { position: 'static' },
    'position-absolute': { position: 'absolute' },
    'position-fixed': { position: 'fixed' },
    'position-relative': { position: 'relative' },
    'position-sticky': { position: 'sticky' },
    'position-initial': { position: 'initial' },
    'position-inherit': { position: 'inherit' },
  };

  values.forEach((val) => {
    positionsSelectors[`top-${val.toString().replace('.', '-')}`] = {
      top: theme.spacing(val),
    };
    positionsSelectors[`bottom-${val.toString().replace('.', '-')}`] = {
      bottom: theme.spacing(val),
    };
    positionsSelectors[`right-${val.toString().replace('.', '-')}`] = {
      right: theme.spacing(val),
    };
    positionsSelectors[`left-${val.toString().replace('.', '-')}`] = {
      left: theme.spacing(val),
    };
  });

  Object.keys(theme.zIndex).forEach((key) => {
    positionsSelectors[`zIndex-${key}`] = {
      zIndex: `${theme.zIndex[key]}`,
    };
  });

  return combineWithBreakpoints(theme, positionsSelectors);
}
