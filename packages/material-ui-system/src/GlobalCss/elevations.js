import combineWithBreakpoints from './combineWithBreakpoints';

export default function elevations(theme) {
  const elevationsSelectors = {};

  theme.shadows.forEach((shadow, idx) => {
    elevationsSelectors[`elevation-${idx}`] = { boxShadow: shadow };
  });

  return combineWithBreakpoints(theme, elevationsSelectors);
}
