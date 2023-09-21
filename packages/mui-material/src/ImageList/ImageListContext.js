'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
const ImageListContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ImageListContext.displayName = 'ImageListContext';
}

export default ImageListContext;
