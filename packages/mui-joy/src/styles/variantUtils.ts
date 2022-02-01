import { CSSObject } from '@mui/system';
import { DefaultVariantKey, DefaultContextualOverrides } from './types/variants';
import { ColorPaletteProp, DefaultColorPalette } from './types/colorSystem';

export const createLightModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-600)`,
  textHoverBg: `var(--joy-palette-${color}-100)`,
  textActiveBg: `var(--joy-palette-${color}-200)`,
  textDisabledColor: `var(--joy-palette-${color}-200)`,

  outlinedColor: `var(--joy-palette-${color}-600)`,
  outlinedBorder: `var(--joy-palette-${color}-200)`,
  outlinedHoverBg: `var(--joy-palette-${color}-100)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-300)`,
  outlinedActiveBg: `var(--joy-palette-${color}-200)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-200)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-100)`,

  lightColor: `var(--joy-palette-${color}-700)`,
  lightBg: `var(--joy-palette-${color}-100)`,
  lightHoverBg: `var(--joy-palette-${color}-200)`,
  lightActiveBg: `var(--joy-palette-${color}-300)`,
  lightDisabledColor: `var(--joy-palette-${color}-300)`,
  lightDisabledBg: `var(--joy-palette-${color}-50)`,

  containedColor: '#fff',
  containedBg: `var(--joy-palette-${color}-600)`,
  containedHoverBg: `var(--joy-palette-${color}-700)`,
  containedActiveBg: `var(--joy-palette-${color}-800)`,
  containedDisabledBg: `var(--joy-palette-${color}-200)`,
});

export const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
  textColor: `var(--joy-palette-${color}-300)`,
  textHoverBg: `var(--joy-palette-${color}-800)`,
  textActiveBg: `var(--joy-palette-${color}-700)`,
  textDisabledColor: `var(--joy-palette-${color}-800)`,

  outlinedColor: `var(--joy-palette-${color}-200)`,
  outlinedBorder: `var(--joy-palette-${color}-700)`,
  outlinedHoverBg: `var(--joy-palette-${color}-900)`,
  outlinedHoverBorder: `var(--joy-palette-${color}-600)`,
  outlinedActiveBg: `var(--joy-palette-${color}-900)`,
  outlinedDisabledColor: `var(--joy-palette-${color}-800)`,
  outlinedDisabledBorder: `var(--joy-palette-${color}-800)`,

  lightColor: `var(--joy-palette-${color}-200)`,
  lightBg: `var(--joy-palette-${color}-900)`,
  lightHoverBg: `var(--joy-palette-${color}-800)`,
  lightActiveBg: `var(--joy-palette-${color}-700)`,
  lightDisabledColor: `var(--joy-palette-${color}-800)`,
  lightDisabledBg: `var(--joy-palette-${color}-900)`,

  containedColor: `#fff`,
  containedBg: `var(--joy-palette-${color}-600)`,
  containedHoverBg: `var(--joy-palette-${color}-700)`,
  containedActiveBg: `var(--joy-palette-${color}-800)`,
  containedDisabledBg: `var(--joy-palette-${color}-300)`,
});

export const getTextDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context' ? `var(--joy-variant-textColor)` : `var(--joy-palette-${color}-textColor)`,
  backgroundColor:
    color === 'context' ? `var(--joy-variant-textBg)` : `var(--joy-palette-${color}-textBg)`,
});

export const getTextHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    color:
      color === 'context'
        ? `var(--joy-variant-textHoverColor, var(--joy-variant-textColor))`
        : `var(--joy-palette-${color}-textHoverColor, var(--joy-palette-${color}-textColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-textHoverBg)`
        : `var(--joy-palette-${color}-textHoverBg)`,
  },
});

export const getTextActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    color:
      color === 'context'
        ? `var(--joy-variant-textActiveColor, var(--joy-variant-textColor))`
        : `var(--joy-palette-${color}-textActiveColor, var(--joy-palette-${color}-textColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-textActiveBg)`
        : `var(--joy-palette-${color}-textActiveBg)`,
  },
});

export const getTextDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    color:
      color === 'context'
        ? `var(--joy-variant-textDisabledColor)`
        : `var(--joy-palette-${color}-textDisabledColor)`,
  },
});

export const getOutlinedDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-outlinedColor)`
      : `var(--joy-palette-${color}-outlinedColor)`,
  // this variable prefix cannot be configured. It is intended to be the used as a reference to the global outlined border's width
  '--variant-outlined-borderWidth': '1px',
  borderWidth: 'var(--variant-outlined-borderWidth, 1px)',
  borderStyle: 'solid',
  borderColor:
    color === 'context'
      ? `var(--joy-variant-outlinedBorder)`
      : `var(--joy-palette-${color}-outlinedBorder)`,
  backgroundColor:
    color === 'context'
      ? `var(--joy-variant-outlinedBg)`
      : `var(--joy-palette-${color}-outlinedBg)`,
});

export const getOutlinedHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverColor, var(--joy-variant-outlinedColor))`
        : `var(--joy-palette-${color}-outlinedHoverColor, var(--joy-palette-${color}-outlinedColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverBg)`
        : `var(--joy-palette-${color}-outlinedHoverBg)`,
    borderColor:
      color === 'context'
        ? `var(--joy-variant-outlinedHoverBorder)`
        : `var(--joy-palette-${color}-outlinedHoverBorder)`,
  },
});

export const getOutlinedActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedActiveColor, var(--joy-variant-outlinedColor))`
        : `var(--joy-palette-${color}-outlinedActiveColor, var(--joy-palette-${color}-outlinedColor))`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-outlinedActiveBg)`
        : `var(--joy-palette-${color}-outlinedActiveBg)`,
  },
});

export const getOutlinedDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    color:
      color === 'context'
        ? `var(--joy-variant-outlinedDisabledColor)`
        : `var(--joy-palette-${color}-outlinedDisabledColor)`,
    borderColor:
      color === 'context'
        ? `var(--joy-variant-outlinedDisabledBorder)`
        : `var(--joy-palette-${color}-outlinedDisabledBorder)`,
  },
});

export const getFilledDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-lightColor)`
      : `var(--joy-palette-${color}-lightColor)`,
  backgroundColor:
    color === 'context' ? `var(--joy-variant-lightBg)` : `var(--joy-palette-${color}-lightBg)`,
});

export const getFilledHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-lightHoverBg)`
        : `var(--joy-palette-${color}-lightHoverBg)`,
  },
});

export const getFilledActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-lightActiveBg)`
        : `var(--joy-palette-${color}-lightActiveBg)`,
  },
});

export const getFilledDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    color:
      color === 'context'
        ? `var(--joy-variant-lightDisabledColor)`
        : `var(--joy-palette-${color}-lightDisabledColor)`,
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-lightDisabledBg)`
        : `var(--joy-palette-${color}-lightDisabledBg)`,
  },
});

export const getContainedDefaultVariant = (color: ColorPaletteProp) => ({
  color:
    color === 'context'
      ? `var(--joy-variant-containedColor)`
      : `var(--joy-palette-${color}-containedColor)`,
  backgroundColor:
    color === 'context'
      ? `var(--joy-variant-containedBg)`
      : `var(--joy-palette-${color}-containedBg)`,
});

export const getContainedHoverVariant = (color: ColorPaletteProp) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedHoverBg)`
        : `var(--joy-palette-${color}-containedHoverBg)`,
  },
});

export const getContainedActiveVariant = (color: ColorPaletteProp) => ({
  '&:active': {
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedActiveBg)`
        : `var(--joy-palette-${color}-containedActiveBg)`,
  },
});

export const getContainedDisabledVariant = (color: ColorPaletteProp) => ({
  '&.Mui-disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    backgroundColor:
      color === 'context'
        ? `var(--joy-variant-containedDisabledBg)`
        : `var(--joy-palette-${color}-containedDisabledBg)`,
  },
});

export const getContainedOverrides = (color: ColorPaletteProp) => ({
  // typography
  '--joy-palette-text-primary': `#fff`,
  '--joy-palette-text-secondary': `var(--joy-palette-${color}-100)`,
  '--joy-palette-text-tertiary': `var(--joy-palette-${color}-200)`,

  // other variants
  '--joy-variant-textColor': `var(--joy-palette-${color}-100)`,
  '--joy-variant-textBg': `transparent`,
  '--joy-variant-textHoverBg': `var(--joy-palette-${color}-${color === 'neutral' ? '500' : '400'})`,
  '--joy-variant-textActiveBg': `var(--joy-palette-${color}-700)`,
  '--joy-variant-outlinedColor': `#fff`,
  '--joy-variant-outlinedBorder': `var(--joy-palette-${color}-400)`,
  '--joy-variant-outlinedHoverBorder': `var(--joy-palette-${color}-400)`,
  '--joy-variant-outlinedBg': `transparent`,
  '--joy-variant-outlinedHoverBg': `rgba(255, 255, 255, 0.12)`,
  '--joy-variant-outlinedActiveBg': `var(--joy-palette-${color}-700)`,
  '--joy-variant-lightColor': `#fff`,
  '--joy-variant-lightBg': `rgba(255, 255, 255, 0.2)`,
  '--joy-variant-lightHoverBg': `var(--joy-palette-${color}-400)`,
  '--joy-variant-lightActiveBg': `var(--joy-palette-${color}-400)`,
});

export const createVariant = (variant: DefaultVariantKey | DefaultContextualOverrides) => {
  const colors: DefaultColorPalette[] = [
    'neutral',
    'primary',
    'danger',
    'info',
    'success',
    'warning',
    'context',
  ];
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  const generatorMap: Record<DefaultVariantKey | DefaultContextualOverrides, Function> = {
    text: getTextDefaultVariant,
    textHover: getTextHoverVariant,
    textActive: getTextActiveVariant,
    textDisabled: getTextDisabledVariant,
    outlined: getOutlinedDefaultVariant,
    outlinedHover: getOutlinedHoverVariant,
    outlinedActive: getOutlinedActiveVariant,
    outlinedDisabled: getOutlinedDisabledVariant,
    light: getFilledDefaultVariant,
    lightHover: getFilledHoverVariant,
    lightActive: getFilledActiveVariant,
    lightDisabled: getFilledDisabledVariant,
    contained: getContainedDefaultVariant,
    containedHover: getContainedHoverVariant,
    containedActive: getContainedActiveVariant,
    containedDisabled: getContainedDisabledVariant,
    containedOverrides: getContainedOverrides,
  };
  colors.forEach((color) => {
    // no need to add context node inside `containedOverrides`
    if (color !== 'context' || (color === 'context' && variant !== 'containedOverrides')) {
      result = { ...result, [color]: generatorMap[variant](color) };
    }
  });
  return result;
};
