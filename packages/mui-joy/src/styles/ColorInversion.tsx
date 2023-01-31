import * as React from 'react';
import { useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import { ColorPaletteProp, VariantProp } from './types';
/**
 *
 * Demos:
 *
 * - [Color inversion](https://mui.com/main-features/color-inversion/)
 *
 * API:
 *
 * - [ColorInversion API](https://mui.com/joy-ui/api/color-inversion/)
 */
const ColorInversion = React.createContext<undefined | Array<VariantProp>>(undefined);

export const useColorInversion = (childVariant: VariantProp | undefined) => {
  const overriableVariants = React.useContext(ColorInversion);
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

interface ColorInversionProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
}

export function ColorInversionProvider({ children, variant }: ColorInversionProviderProps) {
  const theme = useSystemTheme(defaultTheme);
  return (
    <ColorInversion.Provider value={variant ? theme.colorInversionConfig[variant] : undefined}>
      {children}
    </ColorInversion.Provider>
  );
}

export default ColorInversion;
