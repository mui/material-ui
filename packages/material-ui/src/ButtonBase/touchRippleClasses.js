import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTouchRippleUtilityClass(slot) {
  return generateUtilityClass('MuiTouchRipple', slot);
}

const touchRippleClasses = generateUtilityClasses('MuiTouchRipple', [
  'root',
  'ripple',
  'rippleVisible',
  'ripplePulsate',
  'child',
  'childLeaving',
  'childPulsate',
]);

export default touchRippleClasses;
