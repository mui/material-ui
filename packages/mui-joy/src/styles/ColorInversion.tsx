import * as React from 'react';
import { useTheme } from './ThemeProvider';
import defaultTheme from './defaultTheme';
import { ColorPaletteProp, VariantProp } from './types';

const ColorInversion = React.createContext<undefined | Array<VariantProp>>(undefined);

export const useColorInversion = (childVariant: VariantProp | undefined) => {
  const overridableVariants = React.useContext(ColorInversion);
  return {
    /**
     * Resolve the `color` value for the component.
     * @param {ColorPaletteProp | 'inherit' | undefined} instanceColorProp The color defined on the instance.
     * @param {ColorPaletteProp | 'inherit' | undefined} defaultColorProp The default color to use when variant inversion is not enabled.
     */
    getColor: (
      instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
      defaultColorProp: ColorPaletteProp | 'inherit' | undefined,
    ): ColorPaletteProp | 'context' | undefined => {
      if (overridableVariants && childVariant) {
        if (overridableVariants.includes(childVariant)) {
          // @ts-ignore internal logic
          return instanceColorProp || 'context';
        }
      }
      // @ts-ignore internal logic
      return instanceColorProp || defaultColorProp;
    },
  };
};

interface ColorInversionProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
}

export function ColorInversionProvider({ children, variant }: ColorInversionProviderProps) {
  const theme = useTheme();
  return (
    <ColorInversion.Provider
      value={
        variant
          ? // `theme` could come from other emotion/styled-components context.
            (theme.colorInversionConfig ?? defaultTheme.colorInversionConfig)[variant]
          : undefined
      }
    >
      {children}
    </ColorInversion.Provider>
  );
}

export default ColorInversion;
