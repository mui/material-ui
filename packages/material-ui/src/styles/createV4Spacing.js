import { createUnarySpacing } from '@material-ui/system';

export default function createV4Spacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  }

  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons and type, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage
  const transform = createUnarySpacing({
    spacing: spacingInput,
  });

  const spacing = (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(args.length <= 4)) {
        console.error(
          `Material-UI: Too many arguments provided, expected between 0 and 4, got ${args.length}`,
        );
      }
    }

    if (args.length === 0) {
      return transform(1);
    }

    if (args.length === 1) {
      return transform(args[0]);
    }

    return args
      .map((argument) => {
        if (typeof argument === 'string') {
          return argument;
        }
        const output = transform(argument);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };

  spacing.mui = true;

  return spacing;
}
