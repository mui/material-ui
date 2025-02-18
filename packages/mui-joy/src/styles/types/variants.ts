import { OverridableStringUnion } from '@mui/types';
import { CSSObject } from '@mui/system';
import { ColorPaletteProp } from './colorSystem';

export interface VariantPropOverrides {}

export type DefaultVariantProp = 'plain' | 'outlined' | 'soft' | 'solid';

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

type State = 'Hover' | 'Active' | 'Disabled';

export type VariantKey = DefaultVariantProp | `${DefaultVariantProp}${State}`;

export type DefaultVariantKey =
  | Exclude<DefaultVariantProp, 'solid'>
  | `${Exclude<DefaultVariantProp, 'solid'>}${State}`;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface VariantPlain extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantPlainHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantPlainActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantPlainDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantOutlined extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantSoft extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSoftHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSoftActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSoftDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantSolid extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSolidHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSolidActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSolidDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface Variants {
  plain: VariantPlain;
  plainHover: VariantPlainHover;
  plainActive: VariantPlainActive;
  plainDisabled: VariantPlainDisabled;

  outlined: VariantOutlined;
  outlinedHover: VariantOutlinedHover;
  outlinedActive: VariantOutlinedActive;
  outlinedDisabled: VariantOutlinedDisabled;

  soft: VariantSoft;
  softHover: VariantSoftHover;
  softActive: VariantSoftActive;
  softDisabled: VariantSoftDisabled;

  solid: VariantSolid;
  solidHover: VariantSolidHover;
  solidActive: VariantSolidActive;
  solidDisabled: VariantSolidDisabled;
}

export interface VariantPlainInversion extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedInversion extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSoftInversion extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSolidInversion extends Record<ColorPaletteProp, CSSObject> {}
