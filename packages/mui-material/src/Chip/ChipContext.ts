'use client';
import * as React from 'react';

export interface ChipContextType {
  color?: string | undefined;
  disabled?: boolean | undefined;
  size?: string | undefined;
  variant?: string | undefined;
}

/**
 * @ignore - internal component.
 */
const ChipContext = React.createContext<ChipContextType>({});

if (process.env.NODE_ENV !== 'production') {
  ChipContext.displayName = 'ChipContext';
}

export default ChipContext;
