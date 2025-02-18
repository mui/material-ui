"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    fillOpacity: ".3",
    d: "M22 8V2L2 22h16V8h4z"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M20 10v8h2v-8h-2zm-8 12V12L2 22h10zm8 0h2v-2h-2v2z"
  })]
}), 'SignalCellularConnectedNoInternet1BarTwoTone');