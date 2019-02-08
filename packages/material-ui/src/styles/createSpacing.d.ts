export type Spacing = (value: number | string) => number | string;

export type SpacingOptions = number | Spacing;

export default function createSpacing(spacing: SpacingOptions): Spacing;
