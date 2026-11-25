'use client';
import * as React from 'react';
import { StyleSheetContext } from 'styled-components';

// A `StyleSheetManager` that only sets `namespace` or `stylisPlugins` keeps the style sheet of its parent
// and compiles the styles differently, so a cache is a style sheet with a compiler.
const caches = new WeakMap<object, WeakMap<object, object>>();

/**
 * For internal usage in `@mui/system` package.
 * Returns an object that stands for the style sheet and the compiler of the closest `StyleSheetManager`.
 * A subtree with its own inserts its styles somewhere else, like a shadow root, or writes them differently,
 * like under a `namespace`, so it can't share a stylesheet with the rest of the tree.
 */
export default function useStyleCache(): object | null {
  const { styleSheet, stylis } = React.useContext(StyleSheetContext);
  let compilers = caches.get(styleSheet);
  if (!compilers) {
    compilers = new WeakMap();
    caches.set(styleSheet, compilers);
  }
  let cache = compilers.get(stylis);
  if (!cache) {
    cache = {};
    compilers.set(stylis, cache);
  }
  return cache;
}
