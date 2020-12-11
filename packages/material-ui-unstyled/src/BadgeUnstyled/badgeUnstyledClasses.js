export function getBadgeUtilityClass(name) {
  return `MuiBadge-${name}`;
}

const badgeUnstyledClasses = {
  root: getBadgeUtilityClass('root'),
  badge: getBadgeUtilityClass('badge'),
  dot: getBadgeUtilityClass('dot'),
  anchorOriginTopLeftCircular: getBadgeUtilityClass('anchorOriginTopLeftCircular'),
  anchorOriginTopLeftRectangular: getBadgeUtilityClass('anchorOriginTopLeftRectangular'),
  anchorOriginTopRightCircular: getBadgeUtilityClass('anchorOriginTopRightCircular'),
  anchorOriginTopRightRectangular: getBadgeUtilityClass('anchorOriginTopRightRectangular'),
  anchorOriginBottomLeftCircular: getBadgeUtilityClass('anchorOriginBottomLeftCircular'),
  anchorOriginBottomLeftRectangular: getBadgeUtilityClass('anchorOriginBottomLeftRectangular'),
  anchorOriginBottomRightCircular: getBadgeUtilityClass('anchorOriginBottomRightCircular'),
  anchorOriginBottomRightRectangular: getBadgeUtilityClass('anchorOriginBottomRightRectangular'),
  invisible: getBadgeUtilityClass('invisible'),
};

export default badgeUnstyledClasses;
