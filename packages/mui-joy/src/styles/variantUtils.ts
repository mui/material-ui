import { CSSObject, unstable_createGetCssVar as createGetCssVar } from '@mui/system';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
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

const createPrefixVar = (cssVarPrefix: string | undefined | null) => {
  return (cssVar: string) =>
    `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

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
          [color]: createVariantStyle(variant, colorPalette, (variantVar) =>
            getCssVar(`palette-${color}-${variantVar}`, palette[color][variantVar]),
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
    solidHoverColor: 'var(--variant-solidHoverColor)',
    solidHoverBg: 'var(--variant-solidHoverBg)',
    solidActiveBg: 'var(--variant-solidActiveBg)',
    solidDisabledColor: 'var(--variant-solidDisabledColor)',
    solidDisabledBg: 'var(--variant-solidDisabledBg)',
  });
  return result;
};

export const createSoftInversion = (
  theme: ThemeFragment & {
    getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
  },
  addDefaultValues?: boolean,
) => {
  const getCssVarDefault = createGetCssVar(theme.cssVarPrefix);
  const prefixVar = createPrefixVar(theme.cssVarPrefix);
  const result = {} as Record<DefaultColorPalette, CSSObject>;

  const getCssVar = addDefaultValues
    ? (cssVar: string) => {
        const tokens = cssVar.split('-');
        const color = tokens[1];
        const value = tokens[2];
        return getCssVarDefault(cssVar, theme.palette?.[color]?.[value]);
      }
    : getCssVarDefault;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result[color] = {
        '--Badge-ringColor': getCssVar(`palette-${color}-softBg`),
        [prefixVar('--shadowChannel')]: getCssVar(`palette-${color}-darkChannel`),
        [theme.getColorSchemeSelector('dark')]: {
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-300`),
          [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.1)`,
          [prefixVar('--palette-background-surface')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.08)`,
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.4)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.2)`,
          '--variant-plainColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          '--variant-plainHoverColor': getCssVar(`palette-${color}-50`),
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,

          '--variant-outlinedColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          '--variant-outlinedHoverColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-600`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,

          '--variant-softColor': getCssVar(`palette-${color}-100`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.48)`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,

          '--variant-solidColor': '#fff',
          '--variant-solidBg': getCssVar(`palette-${color}-500`),
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': getCssVar(`palette-${color}-400`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-400`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
        },
        // `light` (default color scheme) should come last in case that `theme.getColorSchemeSelector()` return the same value
        [theme.getColorSchemeSelector('light')]: {
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-500`),
          [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.1)`,
          [prefixVar('--palette-background-surface')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.08)`,
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.32)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.48)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.8)`,
          [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.68)`,
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.32)`,
          '--variant-plainColor': `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.8)`,
          '--variant-plainHoverColor': `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 1)`,
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,

          '--variant-outlinedColor': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 1)`,
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          '--variant-outlinedHoverColor': getCssVar(`palette-${color}-600`),
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.12)`,

          '--variant-softColor': getCssVar(`palette-${color}-600`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          '--variant-softHoverColor': getCssVar(`palette-${color}-700`),
          '--variant-softHoverBg': getCssVar(`palette-${color}-200`),
          '--variant-softActiveBg': getCssVar(`palette-${color}-300`),
          '--variant-softDisabledColor': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,

          '--variant-solidColor': getCssVar('palette-common-white'),
          '--variant-solidBg': getCssVar(`palette-${color}-600`),
          '--variant-solidHoverColor': getCssVar('palette-common-white'),
          '--variant-solidHoverBg': getCssVar(`palette-${color}-500`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-500`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
        },
      };
    }
  });
  return result;
};

export const createSolidInversion = (theme: ThemeFragment, addDefaultValues?: boolean) => {
  const getCssVarDefault = createGetCssVar(theme.cssVarPrefix);
  const prefixVar = createPrefixVar(theme.cssVarPrefix);
  const result = {} as Record<DefaultColorPalette, CSSObject>;

  const getCssVar = addDefaultValues
    ? (cssVar: string) => {
        const tokens = cssVar.split('-');
        const color = tokens[1];
        const value = tokens[2];
        return getCssVarDefault(cssVar, theme.palette[color][value]);
      }
    : getCssVarDefault;

  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      if (color === 'warning') {
        result.warning = {
          '--Badge-ringColor': getCssVar(`palette-${color}-solidBg`),
          [prefixVar('--shadowChannel')]: getCssVar(`palette-${color}-darkChannel`),
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.16)`,
          [prefixVar('--palette-background-surface')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.1)`,
          [prefixVar('--palette-background-popup')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.36)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-900`),
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-500`),
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.2)`,

          '--variant-plainColor': getCssVar(`palette-${color}-700`),
          '--variant-plainHoverColor': getCssVar(`palette-${color}-800`),
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,

          '--variant-outlinedColor': getCssVar(`palette-${color}-700`),
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.5)`,
          '--variant-outlinedHoverColor': getCssVar(`palette-${color}-800`),
          '--variant-outlinedHoverBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,

          '--variant-softColor': getCssVar(`palette-${color}-800`),
          '--variant-softHoverColor': getCssVar(`palette-${color}-900`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.28)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,

          '--variant-solidColor': '#fff',
          '--variant-solidBg': getCssVar(`palette-${color}-600`),
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': getCssVar(`palette-${color}-700`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-800`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
        };
      } else {
        result[color] = {
          colorScheme: 'dark',
          '--Badge-ringColor': getCssVar(`palette-${color}-solidBg`),
          [prefixVar('--shadowChannel')]: getCssVar(`palette-${color}-darkChannel`),
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-200`),
          [prefixVar('--palette-background-body')]: 'rgba(0 0 0 / 0.1)',
          [prefixVar('--palette-background-surface')]: 'rgba(0 0 0 / 0.06)',
          [prefixVar('--palette-background-popup')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.36)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-common-white`),
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-200`),
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.32)`,

          '--variant-plainColor': getCssVar(`palette-${color}-50`),
          '--variant-plainHoverColor': `#fff`,
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,

          '--variant-outlinedColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.5)`,
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-softColor': getCssVar(`palette-common-white`),
          '--variant-softHoverColor': getCssVar(`palette-common-white`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.24)`,
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.36)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.16)`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`,

          '--variant-solidColor': getCssVar(
            `palette-${color}-${color === 'neutral' ? '600' : '500'}`,
          ),
          '--variant-solidBg': getCssVar(`palette-common-white`),
          '--variant-solidHoverColor': getCssVar(`palette-${color}-700`),
          '--variant-solidHoverBg': getCssVar(`palette-common-white`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-200`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`,
        };
      }
    }
  });
  return result;
};
