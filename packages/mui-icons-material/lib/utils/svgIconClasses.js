"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSvgIconUtilityClass = getSvgIconUtilityClass;
var _utils = require("@mui/utils");
function getSvgIconUtilityClass(slot) {
  return (0, _utils.unstable_generateUtilityClass)('MuiSvgIcon', slot);
}
const svgIconClasses = (0, _utils.unstable_generateUtilityClasses)('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);
var _default = svgIconClasses;
exports.default = _default;