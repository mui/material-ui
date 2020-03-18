/* tslint:disable:unified-signatures */

export type SpacingArgument = number;

export interface Spacing {
  (): number;
  (value: SpacingArgument): number;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument,
  ): string;
}

export type SpacingOptions = number | ((factor: number) => string | number);

export default function createSpacing(spacing: SpacingOptions): Spacing;
