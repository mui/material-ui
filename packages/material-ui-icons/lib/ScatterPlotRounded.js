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
    r: "4"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "11",
    cy: "6",
    r: "4"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    cx: "17",
    cy: "17",
    r: "4"
  })]
}), 'ScatterPlotRounded');

exports.default = _default;