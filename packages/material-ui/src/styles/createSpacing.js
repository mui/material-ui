import warning from 'warning';

let warnOnce;

export default function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  }

  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
  // https://material.io/design/layout/understanding-layout.html#pixel-density
  let transform;

  if (typeof spacingInput === 'function') {
    transform = spacingInput;
  } else {
    warning(
      typeof spacingInput === 'number',
      [
        `Material-UI: the \`theme.spacing\` value (${spacingInput}) is invalid.`,
        'It should be a number or a function.',
      ].join('\n'),
    );
    transform = factor => {
      warning(
        typeof factor === 'number',
        `Expected spacing argument to be a number, got ${factor}`,
      );
      return spacingInput * factor;
    };
  }

  const spacing = (...args) => {
    warning(args.length <= 4, `Too many arguments, expected [1, 4], got ${args.length}`);

    if (args.length === 1) {
      return transform(args[0]);
    }

    return args
      .map(factor => {
        const output = transform(factor);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };

  // Backward compatibility, to remove in v5.
  Object.defineProperty(spacing, 'unit', {
    get: () => {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          warnOnce && process.env.NODE_ENV !== 'test',
          [
            'Material-UI: theme.spacing.unit usage has been deprecated.',
            'It will be removed in v5.',
            'You can replace `theme.spacing.unit * y` with `theme.spacing(y)`.',
            '',
            'You can use the `https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod/README.md#theme-spacing-api` migration helper to make the process smoother.',
          ].join('\n'),
        );
        warnOnce = true;
      }
      return spacingInput;
    },
  });
  spacing.mui = true;

  return spacing;
}
