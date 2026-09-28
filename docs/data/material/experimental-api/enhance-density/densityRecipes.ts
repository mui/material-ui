import { private_defaultDensityScale as defaultScale } from '@mui/material/styles';
import type { DensityScaleOverrides } from '@mui/material/styles';

const { touchTarget, iconSize, ...defaultSteps } = defaultScale;

export interface DensityRecipe {
  id: string;
  label: string;
  scale: DensityScaleOverrides;
}

const densityRecipes: DensityRecipe[] = [
  {
    id: 'low',
    label: 'Low',
    scale: {
      spacing: {
        xxSmall: 8,
        xSmall: 12,
        small: 16,
        medium: 24,
        large: 32,
        xLarge: 48,
        xxLarge: 64,
      },
      touchTarget: 44,
      iconSize: 24,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    // the shipped defaults, read from the enhancer rather than restated
    scale: { spacing: defaultSteps, touchTarget, iconSize },
  },
  {
    id: 'high',
    label: 'High',
    scale: {
      spacing: {
        xxSmall: 2,
        xSmall: 4,
        small: 8,
        medium: 12,
        large: 16,
        xLarge: 24,
        xxLarge: 32,
      },
      touchTarget: 24,
    },
  },
];

export default densityRecipes;
