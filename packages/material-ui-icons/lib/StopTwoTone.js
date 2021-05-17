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
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M8 8h8v8H8z",
    opacity: ".3"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M6 18h12V6H6v12zM8 8h8v8H8V8z"
  })]
}), 'StopTwoTone');

exports.default = _default;