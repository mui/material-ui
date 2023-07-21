import * as React from 'react';
import { ColorPaletteProp, VariantProp } from '@mui/joy/styles/types';

const VariantColorContext = React.createContext<string | undefined>(undefined);

/**
 * @internal For internal usage only.
 *
 * This function should be used in a children that are connected with its parent
 * to get the matched default variant and color when the parent's variant and/or color changes.
 *
 * For example, the `Option` component in `Select` component is using this function.
 */
export function useVariantColor() {
  const value = React.useContext(VariantColorContext);
  const [variant, color] =
    typeof value === 'string' ? (value.split(':') as [VariantProp, ColorPaletteProp]) : [];
  let childColor = color;
  let childVariant = variant;
  if (variant === 'outlined') {
    childColor = 'neutral';
    childVariant = 'plain';
  }
  if (variant === 'plain') {
    childColor = 'neutral';
  }
  return { variant: childVariant, color: childColor } as const;
}

/**
 * @internal For internal usage only.
 */
export function VariantColorProvider({
  children,
  color,
  variant,
}: React.PropsWithChildren<{ variant: VariantProp; color: ColorPaletteProp }>) {
  return (
    <VariantColorContext.Provider value={`${variant}:${color}`}>
      {children}
    </VariantColorContext.Provider>
  );
}
