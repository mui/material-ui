'use client';

import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

/**
 * Internal helper for `@mui/icons-material` to avoid pulling the `@mui/material/utils` barrel
 * into every icon import.
 */
import { jsx as _jsx } from 'react/jsx-runtime';
export default function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/ _jsx(SvgIcon, {
      'data-testid': process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined,
      ref: ref,
      ...props,
      children: path,
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon.muiName;
  return /*#__PURE__*/ React.memo(/*#__PURE__*/ React.forwardRef(Component));
}
