import combineWithBreakpoints from './combineWithBreakpoints';

const r = (val, accumulator, colors) => {
  if (typeof val === 'string') {
    colors[`bg-${accumulator}`] = { backgroundColor: `${val} !important` };
    colors[`text-${accumulator}`] = { color: `${val} !important` };
    colors[`hover\\:bg-${accumulator}`] = {
      '&:hover': { backgroundColor: `${val} !important` },
    };
    colors[`hover\\:text-${accumulator}`] = { '&:hover': { color: `${val} !important` } };
  } else if (typeof val === 'object' && val !== null) {
    Object.keys(val).forEach((key) => {
      r(val[key], `${accumulator}${accumulator.length > 0 ? '-' : ''}${key}`, colors);
    });
  }
};

export default function colors(theme) {
  const colors = {};
  r(theme.palette, '', colors);
  return combineWithBreakpoints(theme, colors);
}
