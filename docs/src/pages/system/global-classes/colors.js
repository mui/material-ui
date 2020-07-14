const r = (val, accumulator, colors) => {
  if (typeof val === 'string') {
    colors[accumulator] = { backgroundColor: val };
    colors[`${accumulator}--text`] = { color: val };
    colors[`${accumulator}--hover`] = { '&:hover': { backgroundColor: val } };
    colors[`${accumulator}--text--hover`] = { '&:hover': { color: val } };
  } else if (typeof val === 'object' && val !== null) {
    Object.keys(val).forEach((key) => {
      r(
        val[key],
        `${accumulator}${accumulator.length > 1 ? '-' : ''}${key}`,
        colors,
      );
    });
  }
};

export default function colors(theme) {
  const colors = {};
  r(theme.palette, '.', colors);
  console.log(colors);
  return colors;
}
