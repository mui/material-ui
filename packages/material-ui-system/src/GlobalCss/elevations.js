import combineWithBreakpoints from './combineWithBreakpoints';

export default function elevations(theme) {
  const elevations = {};

  theme.shadows.forEach((shadow, idx) => {
    elevations[`elevation-${idx}`] = { boxShadow: `${shadow} !important` };
  });

  return combineWithBreakpoints(theme, elevations);
}
