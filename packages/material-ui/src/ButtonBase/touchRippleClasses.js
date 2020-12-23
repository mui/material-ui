export function getTouchRippleUtilityClass(name) {
  return `MuiTouchRipple-${name}`;
}

const touchRippleClasses = {
  root: getTouchRippleUtilityClass('root'),
  ripple: getTouchRippleUtilityClass('ripple'),
  rippleVisible: getTouchRippleUtilityClass('rippleVisible'),
  ripplePulsate: getTouchRippleUtilityClass('ripplePulsate'),
  child: getTouchRippleUtilityClass('child'),
  childLeaving: getTouchRippleUtilityClass('childLeaving'),
  childPulsate: getTouchRippleUtilityClass('childPulsate'),
};

export default touchRippleClasses;
