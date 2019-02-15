/* tslint:disable:unified-signatures */

export type SpacingArgument = number | string;
export type SpacingReturnType = number | string;

export interface Spacing {
  (value1: SpacingArgument): SpacingReturnType;
  (value1: SpacingArgument, value2: SpacingArgument): SpacingReturnType;
  (value1: SpacingArgument, value2: SpacingArgument, value3: SpacingArgument): SpacingReturnType;
  (
    value1: SpacingArgument,
    value2: SpacingArgument,
    value3: SpacingArgument,
    value4: SpacingArgument,
  ): SpacingReturnType;
}

export type SpacingOptions = number | Spacing;

export default function createSpacing(spacing: SpacingOptions): Spacing;
