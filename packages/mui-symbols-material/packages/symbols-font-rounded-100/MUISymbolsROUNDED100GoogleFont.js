"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MUISymbolsROUNDED100GoogleFont;
var _jsxRuntime = require("react/jsx-runtime");
function MUISymbolsROUNDED100GoogleFont({
  icons
}) {
  const iconNames = icons && icons.join(',');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("link", {
    rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?family=Material+Symbols+ROUNDED:opsz,wght,FILL,GRAD@20..48,100,0..1,-25..200${iconNames ? `&icon_names=${iconNames}` : ''}`
  });
}