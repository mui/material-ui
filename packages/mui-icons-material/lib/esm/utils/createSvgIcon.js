'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SvgIcon from '../SvgIcon';

/**
 * Private module reserved for @mui packages.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/_jsx(SvgIcon, _extends({
      "data-testid": `${displayName}Icon`,
      ref: ref
    }, props, {
      children: path
    }));
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}