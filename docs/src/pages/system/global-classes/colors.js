const r = (val, accumulator, colors) => {
  if (typeof val === 'string') {
    colors[`.bg-${accumulator}`] = { backgroundColor: val };
    colors[`.text-${accumulator}`] = { color: val };
    colors[`.hover-bg-${accumulator}`] = {
      '&:hover': { backgroundColor: val },
    };
    colors[`.hover-text-${accumulator}`] = { '&:hover': { color: val } };
  } else if (typeof val === 'object' && val !== null) {
    Object.keys(val).forEach((key) => {
      r(
        val[key],
        `${accumulator}${accumulator.length > 0 ? '-' : ''}${key}`,
        colors,
      );
    });
  }
};

export default function colors(theme) {
  const colors = {};
  r(theme.palette, '', colors);
  return colors;
}
