export const getUtilityClass = (name) => {
  return `MuiBadge-${name}`;
};

const badgeClasses = {
  root: getUtilityClass('root'),
  badge: getUtilityClass('badge'),
  dot: getUtilityClass('dot'),
  anchorOriginTopLeftCircular: getUtilityClass('anchorOriginTopLeftCircular'),
  anchorOriginTopLeftRectangular: getUtilityClass('anchorOriginTopLeftRectangular'),
  anchorOriginTopRightCircular: getUtilityClass('anchorOriginTopRightCircular'),
  anchorOriginTopRightRectangular: getUtilityClass('anchorOriginTopRightRectangular'),
  anchorOriginBottomLeftCircular: getUtilityClass('anchorOriginBottomLeftCircular'),
  anchorOriginBottomLeftRectangular: getUtilityClass('anchorOriginBottomLeftRectangular'),
  anchorOriginBottomRightCircular: getUtilityClass('anchorOriginBottomRightCircular'),
  anchorOriginBottomRightRectangular: getUtilityClass('anchorOriginBottomRightRectangular'),
  colorError: getUtilityClass('colorError'),
  colorPrimary: getUtilityClass('colorPrimary'),
  colorSecondary: getUtilityClass('colorSecondary'),
  invisible: getUtilityClass('invisible'),
};

export default badgeClasses;
