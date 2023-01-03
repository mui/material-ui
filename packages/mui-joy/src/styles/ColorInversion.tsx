import * as React from 'react';
import { useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import { ColorPaletteProp, VariantProp } from './types';

const VariantOverride = React.createContext<undefined | Array<VariantProp>>(undefined);

export const useColorInversion = (childVariant: VariantProp | undefined) => {
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

interface ColorInversionProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
}

export function ColorInversionProvider({ children, variant }: ColorInversionProviderProps) {
  const theme = useSystemTheme(defaultTheme);
  return (
    <VariantOverride.Provider value={variant ? theme.colorInversionConfig[variant] : undefined}>
      {children}
    </VariantOverride.Provider>
  );
}

export default VariantOverride;
