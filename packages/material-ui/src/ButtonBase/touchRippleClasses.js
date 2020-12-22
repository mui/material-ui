export function getTouchRippleUtilityClass(name) {
  return `MuiTouchRipple-${name}`;
}

const touchRippleClasses = {
  root: getTouchRippleUtilityClass('root'),
  ripple: getTouchRippleUtilityClass('ripple'),
  rippleVisible: getTouchRippleUtilityClass('rippleVisible'),
  ripplePulsate: getTouchRippleUtilityClass('ripplePulsate'),
  child: getTouchRippleUtilityClass('child'),
  childLeavinge: getTouchRippleUtilityClass('childLeavinge'),
  childPulsate: getTouchRippleUtilityClass('childPulsate'),
};

export default touchRippleClasses;
