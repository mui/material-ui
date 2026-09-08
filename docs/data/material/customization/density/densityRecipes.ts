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
      'xx-small': 8,
      'x-small': 12,
      small: 16,
      medium: 24,
      large: 32,
      'x-large': 48,
      'xx-large': 64,
      'touch-target': 44,
      'icon-target': 24,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    scale: {
      'xx-small': 4,
      'x-small': 8,
      small: 12,
      medium: 16,
      large: 24,
      'x-large': 32,
      'xx-large': 48,
      'touch-target': 32,
    },
  },
  {
    id: 'high',
    label: 'High',
    scale: {
      'xx-small': 2,
      'x-small': 4,
      small: 8,
      medium: 12,
      large: 16,
      'x-large': 24,
      'xx-large': 32,
      'touch-target': 24,
    },
  },
];

export default densityRecipes;
