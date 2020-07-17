import combineWithBreakpoints from './combineWithBreakpoints';

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function positions(theme) {
  const positionsSelectors = {
    'position-static': { position: 'static !important' },
    'position-absolute': { position: 'absolute !important' },
    'position-fixed': { position: 'fixed !important' },
    'position-relative': { position: 'relative !important' },
    'position-sticky': { position: 'sticky !important' },
    'position-initial': { position: 'initial !important' },
    'position-inherit': { position: 'inherit !important' },
  };

  values.forEach((val) => {
    positionsSelectors[`top-${val.toString().replace('.', '-')}`] = {
      top: `${theme.spacing(val)}px !important`,
    };
    positionsSelectors[`bottom-${val.toString().replace('.', '-')}`] = {
      bottom: `${theme.spacing(val)}px !important`,
    };
    positionsSelectors[`right-${val.toString().replace('.', '-')}`] = {
      right: `${theme.spacing(val)}px !important`,
    };
    positionsSelectors[`left-${val.toString().replace('.', '-')}`] = {
      left: `${theme.spacing(val)}px !important`,
    };
  });

  Object.keys(theme.zIndex).forEach((key) => {
    positionsSelectors[`zIndex-${key}`] = {
      zIndex: `${theme.zIndex[key]} !important`,
    };
  });

  return combineWithBreakpoints(theme, positionsSelectors);
}
