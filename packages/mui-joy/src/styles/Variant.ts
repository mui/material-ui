import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp } from './ColorSystem';

export interface VariantPropOverrides {}

type DefaultVariantProp = 'text' | 'outlined' | 'filled' | 'contained';

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

type State = 'Hover' | 'Active' | 'Disabled';

type VariantKey = VariantProp | 'containedContext' | `${VariantProp}${State}`;

export type DefaultVariantKey =
  | DefaultVariantProp
  | 'containedContext'
  | `${DefaultVariantProp}${State}`;

export type Variant = {
  [k in VariantKey]: Record<ColorPaletteProp, object>;
};
