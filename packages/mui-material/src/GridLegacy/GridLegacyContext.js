'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 */
const GridLegacyContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  GridLegacyContext.displayName = 'GridLegacyContext';
}

export default GridLegacyContext;
