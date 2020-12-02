export interface BadgeClasses {
  root: string;
  badge: string;
  anchorOriginTopLeftCircular: string;
  anchorOriginTopLeftRectangular: string;
  anchorOriginTopRightCircular: string;
  anchorOriginTopRightRectangular: string;
  anchorOriginBottomLeftCircular: string;
  anchorOriginBottomLeftRectangular: string;
  anchorOriginBottomRightCircular: string;
  anchorOriginBottomRightRectangular: string;
  invisible: string;
}

export const getBadgeUtilityClass: (part: string) => string;

declare const badgeClasses: BadgeClasses;

export default badgeClasses;
