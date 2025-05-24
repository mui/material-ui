'use client';

import { jsx as _jsx } from "react/jsx-runtime";
export default function MUISymbolsROUNDED500GoogleFont({
  icons
}) {
  const iconNames = icons && icons.join(',');
  return /*#__PURE__*/_jsx("link", {
    rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?family=Material+Symbols+ROUNDED:opsz,wght,FILL,GRAD@20..48,500,0..1,-25..200${iconNames ? `&icon_names=${iconNames}` : ''}`
  });
}