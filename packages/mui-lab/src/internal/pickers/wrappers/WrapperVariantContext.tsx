import * as React from 'react';

export type WrapperVariant = 'mobile' | 'desktop' | null;

/**
 * TODO consider getting rid from wrapper variant
 * @ignore - internal component.
 */
export const WrapperVariantContext = React.createContext<WrapperVariant>(null);

/**
 * @ignore - internal component.
 */
export const IsStaticVariantContext = React.createContext(false);
