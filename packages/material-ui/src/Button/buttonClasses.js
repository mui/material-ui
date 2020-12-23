export function getButtonUtilityClass(name) {
  return `MuiButton-${name}`;
}

const buttonClasses = {
  root: getButtonUtilityClass('root'),
  label: getButtonUtilityClass('label'),
  text: getButtonUtilityClass('text'),
  textInherit: getButtonUtilityClass('textInherit'),
  textPrimary: getButtonUtilityClass('textPrimary'),
  textSecondary: getButtonUtilityClass('textSecondary'),
  outlined: getButtonUtilityClass('outlined'),
  outlinedInherit: getButtonUtilityClass('outlinedInherit'),
  outlinedPrimary: getButtonUtilityClass('outlinedPrimary'),
  outlinedSecondary: getButtonUtilityClass('outlinedSecondary'),
  contained: getButtonUtilityClass('contained'),
  containedInherit: getButtonUtilityClass('containedInherit'),
  containedPrimary: getButtonUtilityClass('containedPrimary'),
  containedSecondary: getButtonUtilityClass('containedSecondary'),
  disableElevation: getButtonUtilityClass('disableElevation'),
  focusVisible: getButtonUtilityClass('focusVisible'),
  disabled: getButtonUtilityClass('disabled'),
  colorInherit: getButtonUtilityClass('colorInherit'),
  textSizeSmall: getButtonUtilityClass('textSizeSmall'),
  textSizeMedium: getButtonUtilityClass('textSizeMedium'),
  textSizeLarge: getButtonUtilityClass('textSizeLarge'),
  outlinedSizeSmall: getButtonUtilityClass('outlinedSizeSmall'),
  outlinedSizeMedium: getButtonUtilityClass('outlinedSizeMedium'),
  outlinedSizeLarge: getButtonUtilityClass('outlinedSizeLarge'),
  containedSizeSmall: getButtonUtilityClass('containedSizeSmall'),
  containedSizeMedium: getButtonUtilityClass('containedSizeMedium'),
  containedSizeLarge: getButtonUtilityClass('containedSizeLarge'),
  sizeMedium: getButtonUtilityClass('sizeMedium'),
  sizeSmall: getButtonUtilityClass('sizeSmall'),
  sizeLarge: getButtonUtilityClass('sizeLarge'),
  fullWidth: getButtonUtilityClass('fullWidth'),
  startIcon: getButtonUtilityClass('startIcon'),
  endIcon: getButtonUtilityClass('endIcon'),
  iconSizeSmall: getButtonUtilityClass('iconSizeSmall'),
  iconSizeMedium: getButtonUtilityClass('iconSizeMedium'),
  iconSizeLarge: getButtonUtilityClass('iconSizeLarge'),
};

export default buttonClasses;
