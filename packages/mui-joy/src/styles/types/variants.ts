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

export interface VariantPlain extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantPlainHover extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantPlainActive extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantPlainDisabled extends Record<ColorPaletteProp | 'context', CSSObject> {}

export interface VariantOutlined extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantOutlinedHover extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantOutlinedActive extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantOutlinedDisabled extends Record<ColorPaletteProp | 'context', CSSObject> {}

export interface VariantSoft extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSoftHover extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSoftActive extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSoftDisabled extends Record<ColorPaletteProp | 'context', CSSObject> {}

export interface VariantSolid extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSolidHover extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSolidActive extends Record<ColorPaletteProp | 'context', CSSObject> {}
export interface VariantSolidDisabled extends Record<ColorPaletteProp | 'context', CSSObject> {}

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

export interface ColorInversion {
  plain?: VariantPlainInversion;
  outlined?: VariantOutlinedInversion;
  soft: VariantSoftInversion;
  solid: VariantSolidInversion;
}

export interface ColorInversionConfig
  extends Partial<Record<VariantProp, Array<VariantProp> | undefined>> {}
