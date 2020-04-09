/* tslint:disable:unified-signatures */

export type SpacingArgument = number | string;

export interface Spacing {
  (): number;
  (value: number): number;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument
  ): string;
}

export type SpacingOptions = number | ((factor: number) => string | number) | number[];

export default function createSpacing(spacing: SpacingOptions): Spacing;
