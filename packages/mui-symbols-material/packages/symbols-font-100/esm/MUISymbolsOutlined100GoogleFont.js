'use client';

import { jsx as _jsx } from "react/jsx-runtime";
export default function MUISymbolsOutlined100GoogleFont({
  icons
}) {
  const iconNames = icons && icons.join(',');
  return /*#__PURE__*/_jsx("link", {
    rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100,0..1,-25..200${iconNames ? `&icon_names=${iconNames}` : ''}`
  });
}