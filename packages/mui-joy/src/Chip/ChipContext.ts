import * as React from 'react';
import { ChipProps } from './ChipProps';

const ChipColorContext = React.createContext<Pick<ChipProps, 'disabled' | 'variant' | 'color'>>({
  disabled: undefined,
  variant: undefined,
  color: undefined,
});

if (process.env.NODE_ENV !== 'production') {
  ChipColorContext.displayName = 'ChipColorContext';
}

export default ChipColorContext;
