"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;
var React = _interopRequireWildcard(require("react"));
var _SvgIcon = _interopRequireDefault(require("@mui/material/SvgIcon"));
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Internal helper for `@mui/icons-material` to avoid pulling the `@mui/material/utils` barrel
 * into every icon import.
 */function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.default, {
      "data-testid": process.env.NODE_ENV !== 'production' ? `${displayName}Icon` : undefined,
      ref: ref,
      ...props,
      children: path
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = _SvgIcon.default.muiName;
  return /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(Component));
}