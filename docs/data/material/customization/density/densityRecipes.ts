import type { DensityScaleOverrides } from '@mui/material/styles';

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
      xxSmall: 8,
      xSmall: 12,
      small: 16,
      medium: 24,
      large: 32,
      xLarge: 48,
      xxLarge: 64,
      touchTarget: 44,
      iconSize: 24,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    scale: {
      xxSmall: 4,
      xSmall: 8,
      small: 12,
      medium: 16,
      large: 24,
      xLarge: 32,
      xxLarge: 48,
      touchTarget: 32,
    },
  },
  {
    id: 'high',
    label: 'High',
    scale: {
      xxSmall: 2,
      xSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      xLarge: 24,
      xxLarge: 32,
      touchTarget: 24,
    },
  },
];

export default densityRecipes;
