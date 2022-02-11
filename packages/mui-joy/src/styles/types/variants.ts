import { OverridableStringUnion } from '@mui/types';
import { CSSObject } from '@mui/system';
import { ColorPaletteProp } from './colorSystem';

export interface VariantPropOverrides {}

export interface ContextualOverrides {}

export type DefaultVariantProp = 'text' | 'outlined' | 'light' | 'contained';

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

export type DefaultContextualOverrides = `${DefaultVariantProp}Overrides`;

export type ContextualOverrideKeys = OverridableStringUnion<
  DefaultContextualOverrides,
  ContextualOverrides
>;

type State = 'Hover' | 'Active' | 'Disabled';

export type VariantKey = DefaultVariantProp | `${DefaultVariantProp}${State}`;

export type DefaultVariantKey =
  | Exclude<DefaultVariantProp, 'contained'>
  | `${Exclude<DefaultVariantProp, 'contained'>}${State}`;

type BaseContextOverrides = Record<
  DefaultContextualOverrides,
  Record<Exclude<ColorPaletteProp, 'context'>, CSSObject>
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface VariantText extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantTextHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantTextActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantTextDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantOutlined extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantLight extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantLightHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantLightActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantLightDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantContained extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantContainedHover extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantContainedActive extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantContainedDisabled extends Record<ColorPaletteProp, CSSObject> {}

export interface Variants extends BaseContextOverrides {
  text: VariantText;
  textHover: VariantTextHover;
  textActive: VariantTextActive;
  textDisabled: VariantTextDisabled;

  outlined: VariantOutlined;
  outlinedHover: VariantOutlinedHover;
  outlinedActive: VariantOutlinedActive;
  outlinedDisabled: VariantOutlinedDisabled;

  light: VariantLight;
  lightHover: VariantLightHover;
  lightActive: VariantLightActive;
  lightDisabled: VariantLightDisabled;

  contained: VariantContained;
  containedHover: VariantContainedHover;
  containedActive: VariantContainedActive;
  containedDisabled: VariantContainedDisabled;
}
