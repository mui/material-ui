import { CSSObject } from '@mui/system';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import {
  ColorPaletteProp,
  ColorSystem,
  DefaultColorPalette,
  PaletteVariant,
} from './types/colorSystem';
import { Variants } from './types/variants';

export const isVariantPalette = (colorPalette: string | number | Record<string, any>) =>
  colorPalette &&
  typeof colorPalette === 'object' &&
  !!Object.keys(colorPalette)
    .join(',')
    .match(
      /(plain(Hover|Active|Disabled)?(Color|Bg)|outlined(Hover|Active|Disabled)?(Color|Border|Bg)|soft(Hover|Active|Disabled)?(Color|Bg)|solid(Hover|Active|Disabled)?(Color|Bg))/,
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
  source: Record<string, any>,
  key: string,
  value: string | undefined | null,
) => {
  if (value) {
    if (key.includes('Disabled')) {
      source.pointerEvents = 'none';
      source.cursor = 'default';
    }
    if (key.match(/(Hover|Active|Disabled)/)) {
      assignCss(source as any, key, value);
    } else {
      // initial state
      if (!source['--variant-borderWidth']) {
        // important to prevent inheritance, otherwise the children will have the wrong styles e.g.
        //   <Card variant="outlined">
        //     <Typography variant="soft">
        source['--variant-borderWidth'] = '0px';
      }
      if (key.includes('Border')) {
        source['--variant-borderWidth'] = '1px';
        source.border = 'var(--variant-borderWidth) solid';
      }
      // border color should come later
      assignCss(source as any, key, value);
    }
  }
  return source;
};

export const createVariants = (colorPalette: ColorSystem['palette'], cssVarPrefix: string) => {
  const result = {} as Variants;
  (
    Object.entries({
      ...colorPalette,
      context: {
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
      },
    }) as Array<[ColorPaletteProp, PaletteVariant]>
  ).forEach(([color, palette]) => {
    if (isVariantPalette(palette)) {
      (Object.entries(palette) as Array<[string, string | number | null | undefined]>).forEach(
        ([variantVar, value]) => {
          if (value) {
            const matches = variantVar.match(/^(.*)(color|bg|border)$/i);
            if (matches) {
              const variantName = matches[1] as keyof Variants;
              result[variantName] = result[variantName] || {};
              result[variantName][color] = result[variantName][color] || {};

              let cssValue = `var(--${
                cssVarPrefix ? `${cssVarPrefix}-` : ''
              }palette-${color}-${variantVar}, ${value})`;
              if ((color as string) === 'context') {
                cssValue = value.toString();
              }

              createVariantStyle(result[variantName][color], variantVar, cssValue);
            }
          }
        },
      );
    }
  });
  return result;
};

interface ThemeFragment {
  cssVarPrefix?: string;
  getCssVar: (...args: any[]) => string;
  palette: Record<string, any>;
}

export const createSoftInversion = (
  theme: ThemeFragment & {
    colorSchemes: Record<DefaultColorScheme, ColorSystem>;
    getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
  },
) => {
  const result = {} as Record<DefaultColorPalette, CSSObject>;

  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      const lightColors = theme.colorSchemes?.light?.palette?.[color] || {};
      const darkColors = theme.colorSchemes?.dark?.palette?.[color] || {};
      result[color] = {
        '--Badge-ringColor': `var(--joy-palette-${color}-softBg${
          darkColors.softBg ? `, ${darkColors.softBg}` : ''
        })`,
        '--joy-shadowChannel': `var(--joy-palette-${color}-darkChannel${
          darkColors.darkChannel ? `, ${darkColors.darkChannel}` : ''
        })`,
        [theme.getColorSchemeSelector('dark')]: {
          '--joy-palette-focusVisible': `var(--joy-palette-${color}-300${
            darkColors[300] ? `, ${darkColors[300]}` : ''
          })`,
          '--joy-palette-background-body': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.1)`,
          '--joy-palette-background-surface': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.08)`,
          '--joy-palette-background-level1': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.2)`,
          '--joy-palette-background-level2': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.4)`,
          '--joy-palette-background-level3': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.6)`,
          '--joy-palette-text-primary': `var(--joy-palette-${color}-100${
            // @ts-ignore module augmentation
            darkColors[100] ? `, ${darkColors[100]}` : ''
          })`,
          '--joy-palette-text-secondary': `rgba(var(--joy-palette-${color}-lightChannel${
            darkColors.lightChannel ? `, ${darkColors.lightChannel}` : ''
          }) / 0.72)`,
          '--joy-palette-text-tertiary': `rgba(var(--joy-palette-${color}-lightChannel${
            darkColors.lightChannel ? `, ${darkColors.lightChannel}` : ''
          }) / 0.6)`,
          '--joy-palette-divider': `rgba(var(--joy-palette-${color}-lightChannel${
            darkColors.lightChannel ? `, ${darkColors.lightChannel}` : ''
          }) / 0.2)`,
          '--variant-plainColor': `rgba(var(--joy-palette-${color}-lightChannel${
            darkColors.lightChannel ? `, ${darkColors.lightChannel}` : ''
          }) / 1)`,
          '--variant-plainHoverColor': `var(--joy-palette-${color}-50${
            darkColors[50] ? `, ${darkColors[50]}` : ''
          })`,
          '--variant-plainHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.16)`,
          '--variant-plainActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-plainDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.72)`,

          '--variant-outlinedColor': `rgba(var(--joy-palette-${color}-lightChannel${
            darkColors.lightChannel ? `, ${darkColors.lightChannel}` : ''
          }) / 1)`,
          '--variant-outlinedHoverColor': `var(--joy-palette-${color}-50${
            darkColors[50] ? `, ${darkColors[50]}` : ''
          })`,
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.4)`,
          '--variant-outlinedHoverBorder': `var(--joy-palette-${color}-600${
            darkColors[600] ? `, ${darkColors[600]}` : ''
          })`,
          '--variant-outlinedHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.16)`,
          '--variant-outlinedActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.2)`,

          '--variant-softColor': `var(--joy-palette-${color}-100${
            // @ts-ignore module augmentation
            darkColors[100] ? `, ${darkColors[100]}` : ''
          })`,
          '--variant-softBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.24)`,
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-softActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.48)`,
          '--variant-softDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-softDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.12)`,

          '--variant-solidColor': '#fff',
          '--variant-solidBg': `var(--joy-palette-${color}-500${
            darkColors[500] ? `, ${darkColors[500]}` : ''
          })`,
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': `var(--joy-palette-${color}-400${
            darkColors[400] ? `, ${darkColors[400]}` : ''
          })`,
          '--variant-solidActiveBg': `var(--joy-palette-${color}-400${
            darkColors[400] ? `, ${darkColors[400]}` : ''
          })`,
          '--variant-solidDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-solidDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            darkColors.mainChannel ? `, ${darkColors.mainChannel}` : ''
          }) / 0.12)`,
        },
        // `light` (default color scheme) should come last in case that `theme.getColorSchemeSelector()` return the same value
        [theme.getColorSchemeSelector('light')]: {
          '--joy-palette-focusVisible': `var(--joy-palette-${color}-500${
            lightColors[500] ? `, ${lightColors[500]}` : ''
          })`,
          '--joy-palette-background-body': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.1)`,
          '--joy-palette-background-surface': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.08)`,
          '--joy-palette-background-level1': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.2)`,
          '--joy-palette-background-level2': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.32)`,
          '--joy-palette-background-level3': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.48)`,
          '--joy-palette-text-primary': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--joy-palette-text-secondary': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.8)`,
          '--joy-palette-text-tertiary': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.68)`,
          '--joy-palette-divider': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-plainColor': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.8)`,
          '--variant-plainHoverColor': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 1)`,
          '--variant-plainHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,
          '--variant-plainActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.24)`,
          '--variant-plainDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.6)`,

          '--variant-outlinedColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 1)`,
          '--variant-outlinedBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.4)`,
          '--variant-outlinedHoverColor': `var(--joy-palette-${color}-600${
            lightColors[600] ? `, ${lightColors[600]}` : ''
          })`,
          '--variant-outlinedHoverBorder': `var(--joy-palette-${color}-300${
            lightColors[300] ? `, ${lightColors[300]}` : ''
          })`,
          '--variant-outlinedHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.24)`,
          '--variant-outlinedDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.6)`,
          '--variant-outlinedDisabledBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,

          '--variant-softColor': `var(--joy-palette-${color}-600${
            lightColors[600] ? `, ${lightColors[600]}` : ''
          })`,
          '--variant-softBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.72)`,
          '--variant-softHoverColor': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-softHoverBg': `var(--joy-palette-${color}-200${
            lightColors[200] ? `, ${lightColors[200]}` : ''
          })`,
          '--variant-softActiveBg': `var(--joy-palette-${color}-300${
            lightColors[300] ? `, ${lightColors[300]}` : ''
          })`,
          '--variant-softDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.6)`,
          '--variant-softDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.08)`,

          '--variant-solidColor': `#fff`,
          '--variant-solidBg': `var(--joy-palette-${color}-600${
            lightColors[600] ? `, ${lightColors[600]}` : ''
          })`,
          '--variant-solidHoverColor': `#fff`,
          '--variant-solidHoverBg': `var(--joy-palette-${color}-500${
            lightColors[500] ? `, ${lightColors[500]}` : ''
          })`,
          '--variant-solidActiveBg': `var(--joy-palette-${color}-500${
            lightColors[500] ? `, ${lightColors[500]}` : ''
          })`,
          '--variant-solidDisabledColor': `rgba(palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 6)`,
          '--variant-solidDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.08)`,
        },
      };
    }
  });
  return result;
};

export const createSolidInversion = (
  theme: ThemeFragment & { colorSchemes: Record<DefaultColorScheme, ColorSystem> },
) => {
  const result = {} as Record<DefaultColorPalette, CSSObject>;

  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      const lightColors = theme.colorSchemes?.light?.palette?.[color] || {};
      if (color === 'warning') {
        result.warning = {
          '--Badge-ringColor': `var(--joy-palette-${color}-solidBg${
            lightColors.solidBg ? `, ${lightColors.solidBg}` : ''
          })`,
          '--joy-shadowChannel': `var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          })`,
          '--joy-palette-focusVisible': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--joy-palette-background-body': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.16)`,
          '--joy-palette-background-surface': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.1)`,
          '--joy-palette-background-popup': `var(--joy-palette-${color}-100)`,
          '--joy-palette-background-level1': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.2)`,
          '--joy-palette-background-level2': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.36)`,
          '--joy-palette-background-level3': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.6)`,
          '--joy-palette-text-primary': `var(--joy-palette-${color}-900${
            lightColors[900] ? `, ${lightColors[900]}` : ''
          })`,
          '--joy-palette-text-secondary': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--joy-palette-text-tertiary': `var(--joy-palette-${color}-500${
            lightColors[500] ? `, ${lightColors[500]}` : ''
          })`,
          '--joy-palette-divider': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.2)`,

          '--variant-plainColor': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-plainHoverColor': `var(--joy-palette-${color}-800${
            lightColors[800] ? `, ${lightColors[800]}` : ''
          })`,
          '--variant-plainHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,
          '--variant-plainActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-plainDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.72)`,

          '--variant-outlinedColor': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-outlinedBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.5)`,
          '--variant-outlinedHoverColor': `var(--joy-palette-${color}-800${
            lightColors[800] ? `, ${lightColors[800]}` : ''
          })`,
          '--variant-outlinedHoverBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.6)`,
          '--variant-outlinedHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.2)`,

          '--variant-softColor': `var(--joy-palette-${color}-800${
            lightColors[800] ? `, ${lightColors[800]}` : ''
          })`,
          '--variant-softHoverColor': `var(--joy-palette-${color}-900${
            lightColors[900] ? `, ${lightColors[900]}` : ''
          })`,
          '--variant-softBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.2)`,
          '--variant-softHoverBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.28)`,
          '--variant-softActiveBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.12)`,
          '--variant-softDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-softDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.08)`,

          '--variant-solidColor': '#fff',
          '--variant-solidBg': `var(--joy-palette-${color}-600${
            lightColors[600] ? `, ${lightColors[600]}` : ''
          })`,
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-solidActiveBg': `var(--joy-palette-${color}-800${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-solidDisabledColor': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.72)`,
          '--variant-solidDisabledBg': `rgba(var(--joy-palette-${color}-mainChannel${
            lightColors.mainChannel ? `, ${lightColors.mainChannel}` : ''
          }) / 0.08)`,
        };
      } else {
        result[color] = {
          colorScheme: 'dark',
          '--Badge-ringColor': `var(--joy-palette-${color}-solidBg${
            lightColors.solidBg ? `, ${lightColors.solidBg}` : ''
          })`,
          '--joy-shadowChannel': `var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          })`,
          '--joy-palette-focusVisible': `var(--joy-palette-${color}-200${
            lightColors[200] ? `, ${lightColors[200]}` : ''
          })`,
          '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
          '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
          '--joy-palette-background-popup': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--joy-palette-background-level1': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.2)`,
          '--joy-palette-background-level2': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.36)`,
          '--joy-palette-background-level3': `rgba(var(--joy-palette-${color}-darkChannel${
            lightColors.darkChannel ? `, ${lightColors.darkChannel}` : ''
          }) / 0.6)`,
          '--joy-palette-text-primary': `#fff`,
          '--joy-palette-text-secondary': `var(--joy-palette-${color}-100${
            // @ts-ignore module augmentation
            lightColors[100] ? `, ${lightColors[100]}` : ''
          })`,
          '--joy-palette-text-tertiary': `var(--joy-palette-${color}-200${
            lightColors[200] ? `, ${lightColors[200]}` : ''
          })`,
          '--joy-palette-divider': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.32)`,

          '--variant-plainColor': `var(--joy-palette-${color}-50${
            lightColors[50] ? `, ${lightColors[50]}` : ''
          })`,
          '--variant-plainHoverColor': `#fff`,
          '--variant-plainHoverBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.12)`,
          '--variant-plainActiveBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.32)`,
          '--variant-plainDisabledColor': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.72)`,

          '--variant-outlinedColor': `var(--joy-palette-${color}-50${
            lightColors[50] ? `, ${lightColors[50]}` : ''
          })`,
          '--variant-outlinedBorder': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.5)`,
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': `var(--joy-palette-${color}-300${
            lightColors[300] ? `, ${lightColors[300]}` : ''
          })`,
          '--variant-outlinedHoverBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-softColor': `#fff`,
          '--variant-softHoverColor': `#fff`,
          '--variant-softBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.24)`,
          '--variant-softHoverBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.36)`,
          '--variant-softActiveBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.16)`,
          '--variant-softDisabledColor': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.72)`,
          '--variant-softDisabledBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.1)`,

          '--variant-solidColor': `var(--joy-palette-${color}-500${
            lightColors[500] ? `, ${lightColors[500]}` : ''
          })`,
          ...(color === 'neutral' && {
            '--variant-solidColor': `var(--joy-palette-${color}-600${
              lightColors[600] ? `, ${lightColors[600]}` : ''
            })`,
          }),
          '--variant-solidBg': `#fff`,
          '--variant-solidHoverColor': `var(--joy-palette-${color}-700${
            lightColors[700] ? `, ${lightColors[700]}` : ''
          })`,
          '--variant-solidHoverBg': `#fff`,
          '--variant-solidActiveBg': `var(--joy-palette-${color}-200${
            lightColors[200] ? `, ${lightColors[200]}` : ''
          })`,
          '--variant-solidDisabledColor': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.72)`,
          '--variant-solidDisabledBg': `rgba(var(--joy-palette-${color}-lightChannel${
            lightColors.lightChannel ? `, ${lightColors.lightChannel}` : ''
          }) / 0.1)`,
        };
      }
    }
  });
  return result;
};
