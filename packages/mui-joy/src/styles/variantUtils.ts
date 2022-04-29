import { CSSObject } from '@mui/system';
import { DefaultColorPalette, PaletteVariant, PaletteRange } from './types/colorSystem';
import { VariantKey } from './types/variants';

export const isVariantPalette = (colorPalette: string | number | Record<string, any>) =>
  colorPalette &&
  typeof colorPalette === 'object' &&
  Object.keys(colorPalette).some((value) =>
    value.match?.(
      /^(plain(Hover|Active|Disabled)?(Color|Bg)|outlined(Hover|Active|Disabled)?(Color|Border|Bg)|soft(Hover|Active|Disabled)?(Color|Bg)|solid(Hover|Active|Disabled)?(Color|Bg))$/,
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
    target.borderColor = value;
  }
};

/**
 *
 * @param name variant name
 * @example 'plain'
 *
 * @param palette object that contains palette tokens
 * @example { primary: { plainColor: '', plainHoverColor: '', ...tokens }, ...other palete }
 *
 * @param getCssVar a function that receive variant token and return a CSS variable
 *
 * result will be the stylesheet based on the palette tokens
 * @example {
 *   color: '--token',
 *   backgroundColor: '--token'
 * }
 * @example {
 *   cursor: 'pointer',
 *   '&:hover': {
 *      color: '--token',
 *   }
 * }
 * @example {
 *   '&:active': {
 *      color: '--token',
 *   }
 * }
 * @example {
 *   pointerEvents: 'none',
 *   cursor: 'default',
 *   '&.Mui-disabled': {
 *      color: '--token',
 *   }
 * }
 */
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
          if (variantVar.includes('Border')) {
            result['--variant-outlinedBorderWidth'] = '1px';
            result.border = 'var(--variant-outlinedBorderWidth) solid';
          }
          // border color should come later
          assignCss(result as any, variantVar, cssVar);
        }
      }
    },
  );
  return result;
};

interface Theme {
  prefix?: string;
  palette: Record<DefaultColorPalette, PaletteRange>;
  vars: { palette: Record<DefaultColorPalette, PaletteRange> };
}

export const createVariant = (variant: VariantKey, theme?: Theme) => {
  let result = {} as Record<DefaultColorPalette | 'context', CSSObject>;

  if (theme) {
    Object.entries(theme.palette).forEach((entry) => {
      const [color, colorPalette] = entry as [
        Exclude<DefaultColorPalette, 'context'>,
        string | number | Record<string, any>,
      ];
      if (isVariantPalette(colorPalette)) {
        result = {
          ...result,
          [color]: createVariantStyle(
            variant,
            // cannot use theme.vars because it is created from all color schemes.
            // @example developer provides `primary.outlinedActiveBorder` to only dark mode.
            //          theme.vars.palette.primary.outlinedActiveBorder always exists regardless of the current color scheme.
            theme.palette[color],
            (variantVar) => theme.vars.palette[color][variantVar],
          ),
        };
      }
    });
  }

  result.context = createVariantStyle(variant, {
    plainColor: 'var(--variant-plainColor)',
    plainHoverColor: `var(--variant-plainHoverColor)`,
    plainHoverBg: 'var(--variant-plainHoverBg)',
    plainActiveBg: 'var(--variant-plainActiveBg)',
    plainDisabledColor: 'var(--variant-plainDisabledColor)',

    outlinedColor: 'var(--variant-outlinedColor)',
    outlinedBorder: 'var(--variant-outlinedBorder)',
    outlinedHoverColor: `var(--variant-outlinedHoverColor)`,
    outlinedHoverBorder: `var(--variant-outlinedHoverBorder)`,
    outlinedHoverBg: `var(--variant-outlinedHoverBg)`,
    outlinedActiveBg: `var(--variant-outlinedActiveBg)`,
    outlinedDisabledColor: `var(--variant-outlinedDisabledColor)`,
    outlinedDisabledBorder: `var(--variant-outlinedDisabledBorder)`,

    softColor: 'var(--variant-softColor)',
    softBg: 'var(--variant-softBg)',
    softHoverBg: 'var(--variant-softHoverBg)',
    softActiveBg: 'var(--variant-softActiveBg)',
    softDisabledColor: 'var(--variant-softDisabledColor)',
    softDisabledBg: 'var(--variant-softDisabledBg)',

    solidBg: 'var(--variant-solidBg)',
    solidHoverBg: 'var(--variant-solidHoverBg)',
    solidActiveBg: 'var(--variant-solidActiveBg)',
    solidDisabledColor: 'var(--variant-solidDisabledColor)',
    solidDisabledBg: 'var(--variant-solidDisabledBg)',
  });
  return result;
};
