export interface BadgeUnstyledClasses {
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

export function getBadgeUtilityClass(slot: string): string;

declare const badgeUnstyledClasses: BadgeUnstyledClasses;

export default badgeUnstyledClasses;
