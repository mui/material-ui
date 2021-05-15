"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _jsxRuntime = require("react/jsx-runtime");

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "18",
    cy: "6",
    r: "5"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M11 6c0-1.07.25-2.09.69-3H5c-1.1 0-2 .9-2 2v14c0 .55.23 1.05.59 1.41l9.46-9.46C11.79 9.68 11 7.93 11 6zm3.29 6.66c-1.35.3-2.29 1.53-2.29 2.92V21h7c1.1 0 2-.9 2-2v-6.48c-.95-.17-1.95-.27-3-.27-1.32 0-2.56.15-3.71.41z"
  })]
}), 'StreetviewRounded');

exports.default = _default;