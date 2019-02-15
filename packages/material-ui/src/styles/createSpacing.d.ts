export type Spacing = (...value: Array<number|string>) => number | string;

export type SpacingOptions = number | Spacing;

export default function createSpacing(spacing: SpacingOptions): Spacing;
