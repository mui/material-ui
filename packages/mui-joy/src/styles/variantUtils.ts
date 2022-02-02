import { CSSObject } from '@mui/system';
import { ColorPaletteProp, PaletteVariant, PaletteRange } from './types/colorSystem';

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

export const isVariantPalette = (colorPalette: string | number | Record<string, any>) =>
  colorPalette &&
  typeof colorPalette === 'object' &&
  Object.keys(colorPalette).some((value) =>
    value.match?.(
      /^(text(Color|Bg)|outlined(Color|Border|Bg)|light(Color|Bg)|contained(Color|Bg))$/,
    ),
  );

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
  palette: Partial<PaletteRange> | undefined,
  getCssVar?: (variantVar: keyof PaletteVariant) => string,
) => {
  const result: CSSObject = {};
  (Object.entries(palette || {}) as Array<[keyof PaletteVariant, string]>).forEach(
    ([variantVar, value]) => {
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
    },
  );
  return result;
};
