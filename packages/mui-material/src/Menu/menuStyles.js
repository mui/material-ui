/** @type {import('@mui/system').CSSInterpolation} */
export const menuPaperStyles = {
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
};

/** @type {import('@mui/system').CSSInterpolation} */
export const menuListStyles = {
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
};
