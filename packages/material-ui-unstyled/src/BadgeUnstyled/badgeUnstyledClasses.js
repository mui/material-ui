import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export function getBadgeUtilityClass(slot) {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeUnstyledClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'dot',
  'anchorOriginTopLeftCircular',
  'anchorOriginTopLeftRectangular',
  'anchorOriginTopRightCircular',
  'anchorOriginTopRightRectangular',
  'anchorOriginBottomLeftCircular',
  'anchorOriginBottomLeftRectangular',
  'anchorOriginBottomRightCircular',
  'anchorOriginBottomRightRectangular',
  'invisible',
]);

export default badgeUnstyledClasses;
