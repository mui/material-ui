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
    d: "M6 13h13v3H6zm0-5h13v3H6z",
    opacity: ".3"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M4 6v12h17V6H4zm15 10H6v-3h13v3zm0-5H6V8h13v3z"
  })]
}), 'ViewStreamTwoTone');

exports.default = _default;