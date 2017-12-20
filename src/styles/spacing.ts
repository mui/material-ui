export interface Spacing {
  unit: number;
}

export type SpacingOptions = Partial<Spacing>;

const spacing: Spacing = {
  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
  // https://material.io/guidelines/layout/metrics-keylines.html#metrics-keylines-baseline-grids
  unit: 8,
};

export default spacing;
