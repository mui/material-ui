import * as React from 'react';
import { ChipProps } from './ChipProps';

const ChipColorContext = React.createContext<Pick<ChipProps, 'disabled' | 'variant' | 'palette'>>({
  disabled: undefined,
  variant: undefined,
  palette: undefined,
});

export default ChipColorContext;
