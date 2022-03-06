import * as React from 'react';
import { ColorPaletteProp, VariantProp } from './types';

const VariantOverride = React.createContext<VariantProp | undefined>(undefined);

export const useVariantOverride = (childVariant: VariantProp | undefined) => {
  const upperVariant = React.useContext(VariantOverride);
  return {
    getColor: (
      instanceColorProp: ColorPaletteProp | undefined,
      themeColorProp: ColorPaletteProp | undefined,
      defaultColor?: ColorPaletteProp,
    ) => {
      if (upperVariant && upperVariant.match(/^(light|contained)$/)) {
        if (upperVariant !== 'light' || childVariant !== 'contained') {
          return instanceColorProp || 'context';
        }
      }
      return instanceColorProp || themeColorProp || defaultColor;
    },
  };
};

export const VariantOverrideProvider = ({
  children,
  variant,
}: React.PropsWithChildren<{ variant: VariantProp | undefined }>) => {
  const upperVariant = React.useContext(VariantOverride);
  return (
    <VariantOverride.Provider value={variant || upperVariant}>{children}</VariantOverride.Provider>
  );
};
