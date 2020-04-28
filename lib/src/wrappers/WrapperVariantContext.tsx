import { createContext } from 'react';
import { WrapperVariant } from './Wrapper';

// consider getting rid from wrapper variant
export const WrapperVariantContext = createContext<WrapperVariant | null>(null);

export const IsStaticVariantContext = createContext(false);
