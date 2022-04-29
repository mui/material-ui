import * as React from 'react';
import { CSSObject, unstable_createGetCssVar as createGetCssVar } from '@mui/system';
import { ColorPaletteProp, VariantProp } from './types';
import { DefaultColorPalette, PaletteRange } from './types/colorSystem';
import { isVariantPalette } from './variantUtils';

const VariantOverride = React.createContext<undefined | Array<VariantProp>>(undefined);

const createPrefixVar = (prefix: string | undefined | null) => {
  return (cssVar: string) => `--${prefix ? `${prefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

interface Theme {
  prefix?: string;
  palette: Record<Exclude<DefaultColorPalette, 'context'>, PaletteRange>;
  vars: { palette: Record<Exclude<DefaultColorPalette, 'context'>, PaletteRange> };
}

export const createPlainOverride = (theme: Theme) => {
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

export const createSoftOverride = (theme: Theme) => {
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

export const createSolidOverride = (theme: Theme) => {
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

export const useVariantOverride = (childVariant: VariantProp | undefined) => {
  const overriableVariants = React.useContext(VariantOverride);
  return {
    getColor: (
      instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
      defaultColorProp: ColorPaletteProp | 'inherit' | undefined,
    ): ColorPaletteProp | undefined => {
      if (overriableVariants && childVariant) {
        if (overriableVariants.includes(childVariant)) {
          // @ts-ignore internal logic
          return instanceColorProp || 'context';
        }
      }
      // @ts-ignore internal logic
      return instanceColorProp || defaultColorProp;
    },
  };
};

interface VariantOverrideMapping
  extends Partial<Record<VariantProp, Array<VariantProp> | undefined>> {}

interface VariantOverrideProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
  variantOverrideMapping?: VariantOverrideMapping;
}

const defaultVariantOverrideMapping: VariantOverrideMapping = {
  soft: ['plain', 'outlined', 'soft', 'solid'],
  solid: ['plain', 'outlined', 'soft', 'solid'],
};

export const VariantOverrideProvider = ({
  children,
  variant,
  variantOverrideMapping = defaultVariantOverrideMapping,
}: VariantOverrideProviderProps) => {
  return (
    <VariantOverride.Provider value={variant ? variantOverrideMapping[variant] : undefined}>
      {children}
    </VariantOverride.Provider>
  );
};

export default VariantOverride;
