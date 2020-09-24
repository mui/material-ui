import { createUnarySpacing } from '@material-ui/system';

export type SpacingOptions =
  | number
  | Spacing
  | ((abs: number) => number | string)
  | Array<string | number>;

export type SpacingArgument = number | string;

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.
/* tslint:disable:unified-signatures */
export interface Spacing {
  (): string;
  (value: number): string;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument,
  ): string;
}
/* tslint:enable:unified-signatures */

export default function createSpacing(spacingInput: SpacingOptions = 8): Spacing {
  // Already transformed.
  if ((spacingInput as any).mui) {
    return spacingInput as Spacing;
  }

  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons and type, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage
  const transform = createUnarySpacing({
    spacing: spacingInput,
  });

  const spacing = (...args: Array<number | string>): string => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(args.length <= 4)) {
        console.error(
          `Material-UI: Too many arguments provided, expected between 0 and 4, got ${args.length}`,
        );
      }
    }

    if (args.length === 0) {
      args[0] = 1;
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
