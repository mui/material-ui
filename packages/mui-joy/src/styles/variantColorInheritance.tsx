import * as React from 'react';
import { ColorPaletteProp, VariantProp } from '@mui/joy/styles/types';

const VariantColorContext = React.createContext<string | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  VariantColorContext.displayName = 'VariantColorContext';
}

/**
 * @internal For internal usage only.
 *
 * Use this function in a slot to get the matched default variant and color when the parent's variant and/or color changes.
 */
export function getChildVariantAndColor(
  parentVariant: VariantProp | undefined,
  parentColor: ColorPaletteProp | undefined,
) {
  let childColor = parentColor;
  let childVariant = parentVariant;
  if (parentVariant === 'outlined') {
    childColor = 'neutral';
    childVariant = 'plain';
  }
  if (parentVariant === 'plain') {
    childColor = 'neutral';
  }
  return { variant: childVariant, color: childColor };
}

/**
 * @internal For internal usage only.
 *
 * This hook should be used in a children that are connected with its parent
 * to get the matched default variant and color when the parent's variant and/or color changes.
 *
 * For example, the `Option` component in `Select` component is using this function.
 */
export function useVariantColor(
  instanceVariant: VariantProp | undefined,
  instanceColor: ColorPaletteProp | undefined,
  alwaysInheritColor: boolean = false,
) {
  const value = React.useContext(VariantColorContext);
  const [variant, color] =
    typeof value === 'string' ? (value.split(':') as [VariantProp, ColorPaletteProp]) : [];
  const result = getChildVariantAndColor(variant || undefined, color || undefined);
  result.variant = instanceVariant || result.variant;
  result.color = instanceColor || (alwaysInheritColor ? color : result.color);
  return result;
}

/**
 * @internal For internal usage only.
 */
export function VariantColorProvider({
  children,
  color,
  variant,
}: React.PropsWithChildren<{
  variant: VariantProp | undefined;
  color: ColorPaletteProp | undefined;
}>) {
  return (
    <VariantColorContext.Provider value={`${variant || ''}:${color || ''}`}>
      {children}
    </VariantColorContext.Provider>
  );
}
