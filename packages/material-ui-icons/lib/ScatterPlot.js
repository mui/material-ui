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
    cx: "7",
    cy: "14",
    r: "3"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "11",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "16.6",
    cy: "17.6",
    r: "3"
  })]
}), 'ScatterPlot');

exports.default = _default;