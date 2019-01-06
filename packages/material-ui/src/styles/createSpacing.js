import warning from 'warning';

let warnOnce = false;

// Same logic as /packages/material-ui-system/src/spacing.js
export default function createSpacing(spacing) {
  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
  // https://material.io/design/layout/understanding-layout.html#pixel-density
  const themeSpacing = spacing || 8;
  let output;

  if (typeof themeSpacing === 'number') {
    output = value => themeSpacing * value;
  } else if (typeof themeSpacing === 'function') {
    output = themeSpacing;
  } else {
    warning(
      false,
      [
        `Material-UI: the \`theme.spacing\` value (${themeSpacing}) is invalid.`,
        'It should be a number or a function.',
      ].join('\n'),
    );
    output = value => themeSpacing * value;
  }

  if (!output.hasOwnProperty('unit')) {
    // To remove in v5
    Object.defineProperty(output, 'unit', {
      get: () => {
        if (process.env.NODE_ENV !== 'production') {
          warning(
            warnOnce && process.env.NODE_ENV !== 'test',
            [
              'Material-UI: theme.spacing.unit usage has been deprecated.',
              'It will be removed in v5.',
              'You can replace theme.spacing.unit * 2 with theme.spacing(2).',
            ].join('\n'),
          );
          warnOnce = true;
        }
        return themeSpacing;
      },
    });
  }

  return output;
}
