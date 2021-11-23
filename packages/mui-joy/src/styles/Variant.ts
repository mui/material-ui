import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp } from './ColorSystem';

export interface VariantPropOverrides {}

export type DefaultVariantProp = 'text' | 'outlined' | 'filled' | 'contained';

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

type State = 'Hover' | 'Active' | 'Disabled';

type VariantKey = VariantProp | 'containedOverrides' | `${VariantProp}${State}`;

export type DefaultVariantKey =
  | DefaultVariantProp
  | 'containedOverrides'
  | `${DefaultVariantProp}${State}`;

export type Variant = {
  [k in Exclude<VariantKey, 'containedOverrides'>]: Record<ColorPaletteProp, object>;
} & {
  containedOverrides: Record<Exclude<ColorPaletteProp, 'context'>, object>;
};
