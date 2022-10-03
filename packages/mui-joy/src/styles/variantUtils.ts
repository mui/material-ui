import { CSSObject, unstable_createGetCssVar as createGetCssVar } from '@mui/system';
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
  palette: Partial<PaletteRange> | undefined,
  getCssVar?: (variantVar: keyof PaletteVariant) => string,
) => {
  const result: CSSObject = {};
  (Object.entries(palette || {}) as Array<[keyof PaletteVariant, string]>).forEach(
    ([variantVar, value]) => {
      if (variantVar.match(new RegExp(`${name}(color|bg|border)`, 'i')) && !!value) {
        const cssVar = getCssVar ? getCssVar(variantVar) : value;
        if (variantVar.includes('Hover')) {
          result.cursor = 'pointer';
        }
        if (variantVar.includes('Disabled')) {
          result.pointerEvents = 'none';
          result.cursor = 'default';
        }
        if (variantVar.match(/(Hover|Active|Disabled)/)) {
          assignCss(result as any, variantVar, cssVar);
        } else {
          // initial state
          if (!result['--variant-borderWidth']) {
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
  prefix?: string;
  getCssVar: (...args: any[]) => string;
  palette: Record<string, any>;
}

const createPrefixVar = (prefix: string | undefined | null) => {
  return (cssVar: string) => `--${prefix ? `${prefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

export const createTextOverrides = (theme: ThemeFragment) => {
  const { prefix, getCssVar } = theme;
  const prefixVar = createPrefixVar(prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-overrideTextPrimary`),
          [prefixVar('--palette-text-secondary')]: getCssVar(
            `palette-${color}-overrideTextSecondary`,
          ),
          [prefixVar('--palette-text-tertiary')]: getCssVar(
            `palette-${color}-overrideTextTertiary`,
          ),
        },
      };
    }
  });
  return result;
};

export const createContainedOverrides = (theme: ThemeFragment) => {
  const { prefix, getCssVar } = theme;
  const prefixVar = createPrefixVar(prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          [prefixVar('--palette-text-primary')]: '#fff',
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-200`),
          '--variant-focusVisible': `rgba(255 255 255 / 0.32)`,

          '--variant-plainColor': getCssVar(`palette-${color}-100`),
          '--variant-plainHoverColor': `#fff`,
          '--variant-plainHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-plainActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-plainDisabledColor': getCssVar(`palette-${color}-300`),

          '--variant-outlinedColor': getCssVar(`palette-${color}-100`),
          '--variant-outlinedBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-200`),
          '--variant-outlinedHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-outlinedDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-softColor': '#fff',
          '--variant-softBg': `rgba(255 255 255 / 0.12)`,
          '--variant-softHoverBg': `rgba(255 255 255 / 0.2)`,
          '--variant-softActiveBg': `rgba(255 255 255 / 0.08)`,
          '--variant-softDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-softDisabledBg': `rgba(255 255 255 / 0.08)`,

          '--variant-solidBg': getCssVar(`palette-${color}-700`, 'rgba(0 0 0 / 0.16)'),
          '--variant-solidHoverBg': 'rgba(0 0 0 / 0.32)',
          '--variant-solidActiveBg': 'rgba(0 0 0 / 0.48)',
          '--variant-solidDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-solidDisabledBg': `rgba(255 255 255 / 0.08)`,
        },
      };
    }
  });
  return result;
};

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
            getCssVar(`palette-${color}-${variantVar}`),
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

export const createPlainOverride = (theme: ThemeFragment) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '[data-mui-color-scheme="light"] &': {
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-800`),
            [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
              `palette-${color}-darkChannel`,
            )} / 0.72)`,
            [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
              `palette-${color}-darkChannel`,
            )} / 0.64)`,
          },
          '[data-mui-color-scheme="dark"] &': {
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
            [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
              `palette-${color}-lightChannel`,
            )} / 0.72)`,
            [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
              `palette-${color}-lightChannel`,
            )} / 0.6)`,
          },
        },
      };
    }
  });
  return result;
};

export const createSoftOverride = (theme: ThemeFragment) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '--Badge-ringColor': getCssVar(`palette-${color}-softBg`),
          '[data-mui-color-scheme="light"] &': {
            [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.1)`,
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-800`),
            [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-700`),
            [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
              `palette-${color}-darkChannel`,
            )} / 0.64)`,
            '--variant-plainColor': getCssVar(`palette-${color}-600`),
            '--variant-plainHoverColor': getCssVar(`palette-${color}-700`),
            '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
            '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
            '--variant-plainDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,

            '--variant-outlinedColor': getCssVar(`palette-${color}-600`),
            '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
            '--variant-outlinedHoverColor': getCssVar(`palette-${color}-700`),
            '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-500`),
            '--variant-outlinedHoverBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.16)`,
            '--variant-outlinedActiveBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.32)`,
            '--variant-outlinedDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.2)`,

            '--variant-softColor': getCssVar(`palette-${color}-700`),
            '--variant-softBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
            '--variant-softHoverColor': getCssVar(`palette-${color}-800`),
            '--variant-softHoverBg': getCssVar(`palette-${color}-200`),
            '--variant-softActiveBg': getCssVar(`palette-${color}-300`),
            '--variant-softDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,

            '--variant-solidColor': '#fff',
            '--variant-solidBg': getCssVar(`palette-${color}-700`),
            '--variant-solidHoverColor': '#fff',
            '--variant-solidHoverBg': getCssVar(`palette-${color}-600`),
            '--variant-solidActiveBg': getCssVar(`palette-${color}-500`),
            '--variant-solidDisabledColor': `rgba(${getCssVar(
              `palette-${color}-darkChannel`,
            )} / 0.6)`,
            '--variant-solidDisabledBg': `rgba(${getCssVar(
              `palette-${color}-darkChannel`,
            )} / 0.12)`,
          },
          '[data-mui-color-scheme="dark"] &': {
            [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.1)`,
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
            [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
              `palette-${color}-lightChannel`,
            )} / 0.72)`,
            [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
              `palette-${color}-lightChannel`,
            )} / 0.6)`,
            '--variant-plainColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.88)`,
            '--variant-plainHoverColor': '#fff',
            '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
            '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
            '--variant-plainDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,

            '--variant-outlinedColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.88)`,
            '--variant-outlinedHoverColor': '#fff',
            '--variant-outlinedBg': 'initial',
            '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
            '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-600`),
            '--variant-outlinedHoverBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.16)`,
            '--variant-outlinedActiveBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.32)`,
            '--variant-outlinedDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.2)`,

            '--variant-softColor': getCssVar(`palette-${color}-100`),
            '--variant-softBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
            '--variant-softHoverColor': '#fff',
            '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
            '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
            '--variant-softDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,

            '--variant-solidColor': '#fff',
            '--variant-solidBg': getCssVar(`palette-${color}-600`),
            '--variant-solidHoverColor': '#fff',
            '--variant-solidHoverBg': getCssVar(`palette-${color}-500`),
            '--variant-solidActiveBg': getCssVar(`palette-${color}-400`),
            '--variant-solidDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-solidDisabledBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.12)`,
          },
        },
      };
    }
  });
  return result;
};

export const createSolidOverride = (theme: ThemeFragment) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '--Badge-ringColor': getCssVar(`palette-${color}-solidBg`),
          [prefixVar('--palette-background-body')]: 'rgba(0 0 0 / 0.1)',
          [prefixVar('--palette-text-primary')]: '#fff',
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-200`),
          '--variant-focusVisible': `rgba(255 255 255 / 0.32)`,

          '--variant-plainColor': getCssVar(`palette-${color}-50`),
          '--variant-plainHoverColor': `#fff`,
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': getCssVar(`palette-${color}-300`),

          '--variant-outlinedColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-200`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.32)`,
          '--variant-outlinedDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-softColor': getCssVar(`palette-${color}-50`),
          '--variant-softHoverColor': '#fff',
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.32)`,
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.6)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.08)`,

          '--variant-solidColor': getCssVar(`palette-${color}-600`),
          '--variant-solidBg': getCssVar(`palette-${color}-50`),
          '--variant-solidHoverColor': getCssVar(`palette-${color}-700`),
          '--variant-solidHoverBg': getCssVar(`palette-${color}-100`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-200`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.6)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.08)`,
        },
      };
    }
  });
  return result;
};
