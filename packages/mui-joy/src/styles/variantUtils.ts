import { CSSObject } from '@mui/system';
import { DefaultVariantKey, VariantKey } from './types/variants';
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

export const createContainedOverrides = () => {
  const colors: DefaultColorPalette[] = [
    'neutral',
    'primary',
    'danger',
    'info',
    'success',
    'warning',
  ];
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  colors.forEach((color) => {
    result = { ...result, [color]: getContainedOverrides(color) };
  });
  return result;
};

const assignCss = (target: Record<string, string>, variantVar: string, value: string) => {
  if (variantVar.includes('Color')) {
    target.color = value;
  }
  if (variantVar.includes('Bg')) {
    target.backgroundColor = value;
  }
  if (variantVar.includes('Border')) {
    target.border = '1px solid';
    target.borderColor = value;
  }
};

export const createVariantStyle = (
  name: string,
  palette: Record<string, string> | undefined,
  getCssVar?: (variantVar: string) => string,
) => {
  const result: CSSObject = {};
  (Object.entries(palette || {}) as Array<[string, string]>).forEach(([variantVar, value]) => {
    if (variantVar.match(new RegExp(`${name}(color|bg|border)`, 'i')) && !!value) {
      const cssVar = getCssVar ? getCssVar(variantVar) : value;
      if (variantVar.includes('Hover')) {
        if (!result['&:hover']) {
          result.cursor = 'pointer';
          result['&:hover'] = {};
        }
        assignCss(result['&:hover'] as any, variantVar, cssVar);
      } else if (variantVar.includes('Active')) {
        if (!result['&:active']) {
          result['&:active'] = {};
        }
        assignCss(result['&:active'] as any, variantVar, cssVar);
      } else if (variantVar.includes('Disabled')) {
        if (!result['&.Mui-disabled']) {
          result['&.Mui-disabled'] = {
            pointerEvents: 'none',
            cursor: 'default',
          };
        }
        assignCss(result['&.Mui-disabled'] as any, variantVar, cssVar);
      } else {
        assignCss(result as any, variantVar, cssVar);
      }
    }
  });
  return result;
};

export const createContextVariant = (variant: DefaultVariantKey) => ({
  context: createVariantStyle(variant, {
    textColor: 'var(--joy-variant-textColor)',
    textBg: 'var(--joy-variant-textBg)',
    textHoverColor: `var(--joy-variant-textHoverColor, var(--joy-variant-textColor))`,
    textHoverBg: 'var(--joy-variant-textHoverBg)',
    textActiveColor: 'var(--joy-variant-textActiveColor, var(--joy-variant-textHoverColor))',
    textActiveBg: 'var(--joy-variant-textHoverBg)',
    textDisabledColor: 'var(--joy-variant-textDisabledColor)',

    outlinedColor: 'var(--joy-variant-outlinedColor)',
    outlinedBorder: 'var(--joy-variant-outlinedBorder)',
    outlinedBg: 'var(--joy-variant-outlinedBg)',
    outlinedHoverColor: `var(--joy-variant-outlinedHoverColor, var(--joy-variant-outlinedColor))`,
    outlinedHoverBorder: `var(--joy-variant-outlinedHoverBorder, var(--joy-variant-outlinedBorder))`,
    outlinedHoverBg: `var(--joy-variant-outlinedHoverBg)`,
    outlinedActiveColor: `var(--joy-variant-outlinedActiveColor, var(--joy-variant-outlinedHoverColor))`,
    outlinedActiveBg: `var(--joy-variant-outlinedActiveBg)`,
    outlinedDisabledColor: `var(--joy-variant-outlinedDisabledColor)`,
    outlinedDisabledBorder: `var(--joy-variant-outlinedDisabledBorder)`,
    outlinedDisabledBg: `var(--joy-variant-outlinedDisabledBg)`,

    lightColor: 'var(--joy-variant-lightColor)',
    lightBg: 'var(--joy-variant-lightBg)',
    lightHoverColor: 'var(--joy-variant-lightHoverColor, var(--joy-variant-lightColor))',
    lightHoverBg: 'var(--joy-variant-lightHoverBg)',
    lightActiveColor: 'var(--joy-variant-lightActiveColor, var(--joy-variant-lightHoverColor))',
    lightActiveBg: 'var(--joy-variant-lightActiveBg)',
    lightDisabledColor: 'var(--joy-variant-lightDisabledColor)',
    lightDisabledBg: 'var(--joy-variant-lightDisabledBg)',
  }),
});

export const createVariant = (variant: VariantKey, theme: any) => {
  const colors: DefaultColorPalette[] = [
    'neutral',
    'primary',
    'danger',
    'info',
    'success',
    'warning',
  ];
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  colors.forEach((color) => {
    result = {
      ...result,
      [color]: createVariantStyle(
        variant,
        theme.palette[color],
        (variantVar) => theme.vars.palette[color][variantVar],
      ),
    };
  });
  return result;
};
