"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MUISymbolsSHARP500GoogleFont;
var _jsxRuntime = require("react/jsx-runtime");
function MUISymbolsSHARP500GoogleFont({
  icons
}) {
  const iconNames = icons && icons.join(',');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("link", {
    rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?family=Material+Symbols+SHARP:opsz,wght,FILL,GRAD@20..48,500,0..1,-25..200${iconNames ? `&icon_names=${iconNames}` : ''}`
  });
}