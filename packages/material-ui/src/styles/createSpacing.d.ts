/* tslint:disable:unified-signatures */

export type SpacingArgument = number;

export interface Spacing {
  (): number;
  (value1: SpacingArgument): number;
  (value1: SpacingArgument, value2: SpacingArgument): string;
  (value1: SpacingArgument, value2: SpacingArgument, value3: SpacingArgument): string;
  (
    value1: SpacingArgument,
    value2: SpacingArgument,
    value3: SpacingArgument,
    value4: SpacingArgument,
  ): string;
}

export type SpacingOptions = number | Spacing;

export default function createSpacing(spacing: SpacingOptions): Spacing;
