'use client';
import * as React from 'react';
import { StyleSheetContext } from 'styled-components';

/**
 * For internal usage in `@mui/system` package.
 * Returns the style sheet of the closest `StyleSheetManager`. A subtree with its own style sheet inserts its styles
 * somewhere else, like a shadow root, so it can't share a stylesheet with the rest of the tree.
 */
export default function useStyleCache(): object | null {
  return React.useContext(StyleSheetContext).styleSheet ?? null;
}
