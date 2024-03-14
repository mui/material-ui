import { CSSObject } from '@mui/system';
import { DefaultColorPalette, PaletteVariant } from './types/colorSystem';
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
 * @example { primary: { plainColor: '', plainHoverColor: '', ...tokens }, ...other palette }
 *
 * @param getCssVar a function that receive variant token and return a CSS variable
 *
 * result will be the stylesheet based on the palette tokens
 * @example {
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '0px',
 * }
 * @example {
 *   cursor: 'pointer',
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '1px',
 * }
 * @example {
 *   pointerEvents: 'none',
 *   cursor: 'default',
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '0px',
 * }
 */
export const createVariantStyle = (
  name: string,
  palette: Partial<PaletteVariant> | undefined,
  getCssVar?: (variantVar: keyof PaletteVariant) => string,
) => {
  const result: CSSObject = {};
  (Object.entries(palette || {}) as Array<[keyof PaletteVariant, string]>).forEach(
    ([variantVar, value]) => {
      if (variantVar.match(new RegExp(`${name}(color|bg|border)`, 'i')) && !!value) {
        const cssVar = getCssVar ? getCssVar(variantVar) : value;
        if (variantVar.includes('Disabled')) {
          result.pointerEvents = 'none';
          result.cursor = 'default';
          result['--Icon-color'] = 'currentColor';
        }
        if (variantVar.match(/(Hover|Active|Disabled)/)) {
          assignCss(result as any, variantVar, cssVar);
        } else {
          // initial state
          if (!result['--variant-borderWidth']) {
            // important to prevent inheritance, otherwise the children will have the wrong styles e.g.
            //   <Card variant="outlined">
            //     <Typography variant="soft">
            result['--variant-borderWidth'] = '0px';
          }
          if (variantVar.includes('Border')) {
            result['--variant-borderWidth'] = '1px';
            result.border = 'var(--variant-borderWidth) solid';
          }
          // border color should come later
          assignCss(result as any, variantVar, cssVar);
        }
      }
    },
  );
  return result;
};

interface ThemeFragment {
  cssVarPrefix?: string;
  getCssVar: (...args: any[]) => string;
  palette: Record<string, any>;
}

// It's used only in extendTheme, so it's safe to always include default values
export const createVariant = (variant: VariantKey, theme?: ThemeFragment) => {
  let result = {} as Record<DefaultColorPalette | 'context', CSSObject>;
  if (theme) {
    const { getCssVar, palette } = theme;
    Object.entries(palette).forEach((entry) => {
      const [color, colorPalette] = entry as [
        Exclude<DefaultColorPalette, 'context'>,
        string | number | Record<string, any>,
      ];
      if (isVariantPalette(colorPalette) && typeof colorPalette === 'object') {
        result = {
          ...result,
          [color]: createVariantStyle(
            variant,
            colorPalette,
            (variantVar) =>
              `var(--variant-${variantVar}, ${getCssVar(
                `palette-${color}-${variantVar}`,
                palette[color][variantVar],
              )})`,
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
    softHoverColor: 'var(--variant-softHoverColor)',
    softHoverBg: 'var(--variant-softHoverBg)',
    softActiveBg: 'var(--variant-softActiveBg)',
    softDisabledColor: 'var(--variant-softDisabledColor)',
    softDisabledBg: 'var(--variant-softDisabledBg)',

    solidColor: 'var(--variant-solidColor)',
    solidBg: 'var(--variant-solidBg)',
    solidHoverBg: 'var(--variant-solidHoverBg)',
    solidActiveBg: 'var(--variant-solidActiveBg)',
    solidDisabledColor: 'var(--variant-solidDisabledColor)',
    solidDisabledBg: 'var(--variant-solidDisabledBg)',
  });
  return result;
};
