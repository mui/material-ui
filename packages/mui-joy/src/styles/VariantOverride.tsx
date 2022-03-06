import * as React from 'react';
import { ColorPaletteProp } from './types';

const VariantOverride = React.createContext(false);

export const useVariantOverride = () => {
  const isVariantOverride = React.useContext(VariantOverride);
  return {
    getColor: (
      instanceColorProp: ColorPaletteProp | undefined,
      themeColorProp: ColorPaletteProp | undefined,
      defaultColor: ColorPaletteProp | undefined,
    ) => {
      if (isVariantOverride) {
        return instanceColorProp || 'context';
      }
      return instanceColorProp || themeColorProp || defaultColor;
    },
  };
};

export const VariantOverrideProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: boolean }>) => {
  const isNestedVariantOverride = React.useContext(VariantOverride);
  return (
    <VariantOverride.Provider value={isNestedVariantOverride || value}>
      {children}
    </VariantOverride.Provider>
  );
};
