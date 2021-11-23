import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp } from './ColorSystem';

export interface VariantPropOverrides {}

export interface ContextualOverrides {}

export type DefaultVariantProp = 'text' | 'outlined' | 'light' | 'contained';

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

export type DefaultContextualOverrides = 'containedOverrides';

export type ContextualOverrideKeys = OverridableStringUnion<
  DefaultContextualOverrides,
  ContextualOverrides
>;

type State = 'Hover' | 'Active' | 'Disabled';

type VariantKey = VariantProp | 'containedOverrides' | `${VariantProp}${State}`;

export type DefaultVariantKey = DefaultVariantProp | `${DefaultVariantProp}${State}`;

export type Variants = {
  [k in VariantKey]: Record<ColorPaletteProp, object>;
} & {
  [k in ContextualOverrideKeys]: Record<Exclude<ColorPaletteProp, 'context'>, object>;
};
