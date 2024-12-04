// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

const sortBreakpointsValues = (values) => {
  const breakpointsAsArray = Object.keys(values).map((key) => ({ key, val: values[key] })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return { ...acc, [obj.key]: obj.val };
  }, {});
};

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0, // phone
      sm: 600, // tablet
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screen
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints;

  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);

    return (
      `@media (min-width:${
        typeof values[start] === 'number' ? values[start] : start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 && typeof values[keys[endIndex]] === 'number'
          ? values[keys[endIndex]]
          : end) -
        step / 100
      }${unit})`
    );
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }

  return {
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other,
  };
}
