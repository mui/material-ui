'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 */
const GridContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  GridContext.displayName = 'GridContext';
}

export default GridContext;
