import { OverridableStringUnion } from '@mui/types';
import { createUnarySpacing } from '../spacing';

export type SpacingOptions =
  | number
  | string
  | Spacing
  | ((abs: number) => number | string)
  | ((abs: number | string) => number | string)
  | ReadonlyArray<string | number>;

/**
 * Augment this interface to register named keys accepted by `theme.spacing()`
 * so they surface in autocompletion (e.g. a preset's spacing-scale steps).
 * Type-level only: unregistered strings remain valid and pass through as raw CSS.
 * Same convention as `BreakpointOverrides` — a key registered `false` is excluded.
 */
export interface SpacingKeyOverrides {}

export type SpacingKey = OverridableStringUnion<never, SpacingKeyOverrides>;

// `(string & {})` keeps any raw CSS string valid while letting registered
// SpacingKey literals surface in autocompletion.
export type SpacingArgument = number | SpacingKey | (string & {});

/**
 * The value an sx spacing prop (`p`, `mx`, `gap`, …) accepts: a registered scale
 * name, a spacing multiplier, or raw CSS. Declared with `(string & {})` rather
 * than `string` on purpose — a bare `string` member would absorb the `SpacingKey`
 * literals during union reduction and they would stop autocompleting.
 */
export type SpacingPropValue = SpacingKey | number | (string & {});

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.
export interface Spacing {
  /** The raw `spacing` theme option this function was created from. */
  unit?: SpacingOptions | undefined;
  (): string;
  (value: SpacingArgument): string;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument,
  ): string;
}

export default function createSpacing(
  spacingInput: SpacingOptions = 8,
  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://m2.material.io/design/layout/understanding-layout.html
  transform = createUnarySpacing({
    spacing: spacingInput,
  }),
): Spacing {
  // Already transformed.
  if ((spacingInput as any).mui) {
    return spacingInput as Spacing;
  }

  const spacing = (...argsInput: ReadonlyArray<number | string>): string => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(argsInput.length <= 4)) {
        console.error(
          `MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`,
        );
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;

    return args
      .map((argument) => {
        const output = transform(argument);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };

  spacing.mui = true;
  spacing.unit = spacingInput;

  return spacing;
}
