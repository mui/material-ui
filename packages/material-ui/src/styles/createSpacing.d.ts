/* tslint:disable:unified-signatures */

export type SpacingArgument = number | string;

export interface Spacing {
  (): string;
  (value: number): string;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument
  ): string;
}

export type SpacingOptions =
  | number
  | Spacing
  | ((factor: number) => string | number)
  | ((factor: number | string) => string | number)
  | Array<string | number>;

export default function createSpacing(spacing: SpacingOptions): Spacing;
