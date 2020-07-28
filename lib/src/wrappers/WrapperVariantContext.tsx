import * as React from 'react';
import { WrapperVariant } from './Wrapper';

// consider getting rid from wrapper variant
export const WrapperVariantContext = React.createContext<WrapperVariant | null>(null);

export const IsStaticVariantContext = React.createContext(false);
